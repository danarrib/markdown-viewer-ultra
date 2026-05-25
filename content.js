(() => {
  const MD_MIMES = new Set(['text/markdown', 'text/x-markdown']);
  const MD_EXT = /\.(md|markdown|mdown|mkd|mkdn)(?:$|\?|#)/i;

  const ct = (document.contentType || '').toLowerCase();
  const isMdMime = MD_MIMES.has(ct);
  const isMdByExt = ct.startsWith('text/plain') && MD_EXT.test(location.pathname);
  if (!isMdMime && !isMdByExt) return;

  const pre = document.body && document.body.querySelector(':scope > pre');
  const rawText = pre ? pre.innerText : document.body.innerText;
  if (!rawText) return;

  marked.setOptions({ gfm: true, breaks: false });

  let isRendered = true;

  const escapeHtml = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const t = (key) => chrome.i18n.getMessage(key) || key;

  const footerHtml = (linkKey) =>
    `<footer class="mvu-footer">${t('footerPrefix')} &mdash; ` +
    `<a href="#" id="mvu-toggle">${t(linkKey)}</a></footer>`;

  const renderRendered = () => {
    const dirty = marked.parse(rawText);
    const clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
    document.body.className = 'mvu-body';
    document.body.innerHTML =
      `<article class="markdown-body mvu-article">${clean}</article>` +
      footerHtml('footerSeeOriginal');
    document.querySelectorAll('article.markdown-body pre code').forEach((el) => {
      try { hljs.highlightElement(el); } catch (_) { /* unsupported language — leave plain */ }
    });
    const pathLeaf = decodeURIComponent(location.pathname.split('/').pop() || '');
    if (!document.title || document.title === location.href || document.title === pathLeaf) {
      const h = document.body.querySelector('h1, h2');
      if (h) document.title = h.textContent.trim();
    }
  };

  const renderRaw = () => {
    document.body.className = 'mvu-body mvu-raw-mode';
    document.body.innerHTML =
      `<pre class="mvu-raw">${escapeHtml(rawText)}</pre>` +
      footerHtml('footerSeeRendered');
  };

  const apply = () => {
    if (isRendered) renderRendered();
    else renderRaw();
    const toggle = document.getElementById('mvu-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        isRendered = !isRendered;
        apply();
      });
    }
  };

  const applyDarkMode = (mode) => {
    const root = document.documentElement;
    root.classList.remove('mvu-force-dark', 'mvu-force-light');
    if (mode === 'dark') root.classList.add('mvu-force-dark');
    else if (mode === 'light') root.classList.add('mvu-force-light');
  };

  chrome.storage.sync.get({ darkMode: 'auto' }, ({ darkMode }) => applyDarkMode(darkMode));

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.darkMode) applyDarkMode(changes.darkMode.newValue);
  });

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg && msg.type === 'getState') {
      sendResponse({ isMarkdown: true, isRendered });
    } else if (msg && msg.type === 'toggleRender') {
      isRendered = !isRendered;
      apply();
      sendResponse({ isRendered });
    }
    return false;
  });

  document.documentElement.classList.add('mvu-root');
  apply();
})();
