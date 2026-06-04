const FEEDBACK_URL = 'https://github.com/danarrib/markdown-viewer-ultra/issues/1';
const CHANGELOG_URL =
  'https://github.com/danarrib/markdown-viewer-ultra/blob/master/CHANGELOG.md';

chrome.runtime.onInstalled.addListener((details) => {
  chrome.runtime.setUninstallURL(FEEDBACK_URL);

  // On a real update to a new version, open the changelog. Guarding on a
  // version change keeps dev reloads and same-version 'update' events silent.
  if (
    details.reason === 'update' &&
    details.previousVersion !== chrome.runtime.getManifest().version
  ) {
    chrome.tabs.create({ url: CHANGELOG_URL });
  }
});
