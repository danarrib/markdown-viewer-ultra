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
  let mermaidInjected = false;

  // Mermaid is ~2.7MB, so it's only injected the first time a page is found to
  // contain a ```mermaid block. Both files are loaded into the page main world
  // (where mermaid attaches globalThis.mermaid); the bootstrap then renders.
  // Subsequent renders (toggle / theme flip) just signal the loaded bootstrap.
  const renderMermaid = () =>
    document.dispatchEvent(new CustomEvent('mvu-mermaid-render'));

  const ensureMermaid = () => {
    if (mermaidInjected) {
      renderMermaid();
      return;
    }
    mermaidInjected = true;
    const lib = document.createElement('script');
    lib.src = chrome.runtime.getURL('mermaid.min.js');
    lib.onload = () => {
      const boot = document.createElement('script');
      boot.src = chrome.runtime.getURL('mermaid-bootstrap.js');
      (document.head || document.documentElement).appendChild(boot);
    };
    // Strict page CSP can block extension scripts; allow a later retry.
    lib.onerror = () => { mermaidInjected = false; };
    (document.head || document.documentElement).appendChild(lib);
  };

  // Swap each `<pre><code class="language-mermaid">` for a `.mvu-mermaid` div
  // holding the decoded diagram source. Returns true if any were found.
  const transformMermaid = () => {
    const blocks = document.querySelectorAll(
      'article.markdown-body pre > code.language-mermaid'
    );
    blocks.forEach((code) => {
      const src = code.textContent;
      const div = document.createElement('div');
      div.className = 'mermaid mvu-mermaid';
      div.setAttribute('data-mvu-src', src);
      div.textContent = src;
      const pre = code.closest('pre');
      if (pre && pre.parentNode) pre.parentNode.replaceChild(div, pre);
    });
    return blocks.length > 0;
  };

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
      `<article class="markdown-body mvu-article" dir="auto">${clean}</article>` +
      footerHtml('footerSeeOriginal');
    const hasMermaid = transformMermaid();
    document.querySelectorAll('article.markdown-body pre code').forEach((el) => {
      try { hljs.highlightElement(el); } catch (_) { /* unsupported language — leave plain */ }
    });
    if (hasMermaid) ensureMermaid();
    const pathLeaf = decodeURIComponent(location.pathname.split('/').pop() || '');
    if (!document.title || document.title === location.href || document.title === pathLeaf) {
      const h = document.body.querySelector('h1, h2');
      if (h) document.title = h.textContent.trim();
    }
  };

  const renderRaw = () => {
    document.body.className = 'mvu-body mvu-raw-mode';
    document.body.innerHTML =
      `<pre class="mvu-raw" dir="auto">${escapeHtml(rawText)}</pre>` +
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

  const applyContentWidth = (width) => {
    const root = document.documentElement;
    root.classList.remove('mvu-width-narrow', 'mvu-width-wide', 'mvu-width-full');
    if (width === 'wide') root.classList.add('mvu-width-wide');
    else if (width === 'full') root.classList.add('mvu-width-full');
  };

  chrome.storage.sync.get({ darkMode: 'auto', contentWidth: 'narrow' }, (s) => {
    applyDarkMode(s.darkMode);
    applyContentWidth(s.contentWidth);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;
    if (changes.darkMode) {
      applyDarkMode(changes.darkMode.newValue);
      if (mermaidInjected) renderMermaid();
    }
    if (changes.contentWidth) applyContentWidth(changes.contentWidth.newValue);
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
