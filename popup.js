const themeInputs = document.querySelectorAll('input[name="theme"]');
const renderSection = document.getElementById('render-section');
const toggleBtn = document.getElementById('toggle-render');
const stateNote = document.getElementById('render-state-note');
const notMd = document.getElementById('not-md');

const updateRenderUi = (rendered) => {
  toggleBtn.textContent = rendered ? 'Show raw markdown' : 'Show rendered';
  stateNote.textContent = rendered
    ? 'Currently showing rendered view.'
    : 'Currently showing raw text.';
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

chrome.storage.sync.get({ darkMode: 'auto' }, ({ darkMode }) => {
  const el = document.getElementById('theme-' + darkMode);
  if (el) el.checked = true;
});

themeInputs.forEach((input) => {
  input.addEventListener('change', () => {
    if (input.checked) chrome.storage.sync.set({ darkMode: input.value });
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
