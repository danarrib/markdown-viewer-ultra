const themeInputs = document.querySelectorAll('input[name="theme"]');
const widthInputs = document.querySelectorAll('input[name="width"]');
const renderSection = document.getElementById('render-section');
const toggleBtn = document.getElementById('toggle-render');
const stateNote = document.getElementById('render-state-note');
const notMdSection = document.getElementById('not-md-section');
const fileAccessHint = document.getElementById('file-access-hint');
const openExtSettingsBtn = document.getElementById('open-ext-settings');

document.querySelectorAll('[data-i18n]').forEach((el) => {
  const key = el.getAttribute('data-i18n');
  const msg = chrome.i18n.getMessage(key);
  if (!msg) return;
  if (el.hasAttribute('data-i18n-html')) el.innerHTML = msg;
  else el.textContent = msg;
});

const versionEl = document.getElementById('version');
if (versionEl) versionEl.textContent = 'v' + chrome.runtime.getManifest().version;

const updateRenderUi = (rendered) => {
  toggleBtn.textContent = chrome.i18n.getMessage(
    rendered ? 'popupShowRaw' : 'popupShowRendered'
  );
  stateNote.textContent = chrome.i18n.getMessage(
    rendered ? 'popupStateRendered' : 'popupStateRaw'
  );
};

const isFileAccessAllowed = () =>
  new Promise((resolve) => {
    if (!chrome.extension || !chrome.extension.isAllowedFileSchemeAccess) {
      resolve(true);
      return;
    }
    chrome.extension.isAllowedFileSchemeAccess((allowed) => {
      if (chrome.runtime.lastError) resolve(true);
      else resolve(Boolean(allowed));
    });
  });

const showNotMarkdown = async (tab) => {
  const maybeFileUrl =
    !tab || !tab.url || tab.url.toLowerCase().startsWith('file://');
  const showHint = maybeFileUrl && !(await isFileAccessAllowed());
  fileAccessHint.classList.toggle('hidden', !showHint);
  renderSection.classList.add('hidden');
  notMdSection.classList.remove('hidden');
};

const showMarkdownControls = (isRendered) => {
  renderSection.classList.remove('hidden');
  notMdSection.classList.add('hidden');
  updateRenderUi(isRendered);
};

chrome.storage.sync.get(
  { darkMode: 'auto', contentWidth: 'narrow' },
  ({ darkMode, contentWidth }) => {
    const themeEl = document.getElementById('theme-' + darkMode);
    if (themeEl) themeEl.checked = true;
    const widthEl = document.getElementById('width-' + contentWidth);
    if (widthEl) widthEl.checked = true;
  }
);

themeInputs.forEach((input) => {
  input.addEventListener('change', () => {
    if (input.checked) chrome.storage.sync.set({ darkMode: input.value });
  });
});

widthInputs.forEach((input) => {
  input.addEventListener('change', () => {
    if (input.checked) chrome.storage.sync.set({ contentWidth: input.value });
  });
});

const queryActiveTab = () =>
  new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
      resolve(tabs && tabs[0])
    );
  });

const sendToContent = (tabId, payload) =>
  new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, payload, (resp) => {
      if (chrome.runtime.lastError) resolve(null);
      else resolve(resp);
    });
  });

(async () => {
  const tab = await queryActiveTab();
  if (!tab || !tab.id) {
    await showNotMarkdown(tab);
    return;
  }
  const resp = await sendToContent(tab.id, { type: 'getState' });
  if (resp && resp.isMarkdown) showMarkdownControls(resp.isRendered);
  else await showNotMarkdown(tab);
})();

toggleBtn.addEventListener('click', async () => {
  const tab = await queryActiveTab();
  if (!tab || !tab.id) return;
  const resp = await sendToContent(tab.id, { type: 'toggleRender' });
  if (resp) updateRenderUi(resp.isRendered);
});

if (openExtSettingsBtn) {
  openExtSettingsBtn.addEventListener('click', () => {
    const url = chrome.runtime.id
      ? `chrome://extensions/?id=${chrome.runtime.id}`
      : 'chrome://extensions';
    chrome.tabs.create({ url }, () => {
      void chrome.runtime.lastError;
    });
  });
}
