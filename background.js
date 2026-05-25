const FEEDBACK_URL = 'https://github.com/danarrib/markdown-viewer-ultra/issues/1';

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.setUninstallURL(FEEDBACK_URL);
});
