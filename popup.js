const themeInputs = document.querySelectorAll('input[name="theme"]');
const widthInputs = document.querySelectorAll('input[name="width"]');
const renderSection = document.getElementById('render-section');
const toggleBtn = document.getElementById('toggle-render');
const stateNote = document.getElementById('render-state-note');
const notMd = document.getElementById('not-md');

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

const showNotMarkdown = () => {
  renderSection.classList.add('hidden');
  notMd.classList.remove('hidden');
};

const showMarkdownControls = (isRendered) => {
  renderSection.classList.remove('hidden');
  notMd.classList.add('hidden');
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
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => resolve(tabs[0]));
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
    showNotMarkdown();
    return;
  }
  const resp = await sendToContent(tab.id, { type: 'getState' });
  if (resp && resp.isMarkdown) showMarkdownControls(resp.isRendered);
  else showNotMarkdown();
})();

toggleBtn.addEventListener('click', async () => {
  const tab = await queryActiveTab();
  if (!tab || !tab.id) return;
  const resp = await sendToContent(tab.id, { type: 'toggleRender' });
  if (resp) updateRenderUi(resp.isRendered);
});
