/* Runs in the page main world (injected by content.js when a page contains
   mermaid blocks). mermaid.min.js loads first and sets globalThis.mermaid;
   this script themes + renders the .mermaid nodes and re-renders on demand
   when content.js dispatches `mvu-mermaid-render` (raw/render toggle, theme
   flip). Communication is one-way via a DOM event on the shared document. */
(() => {
  if (window.__mvuMermaidBootstrapped) return;
  window.__mvuMermaidBootstrapped = true;

  // Map the extension's force-theme classes (or OS preference) to a mermaid theme.
  const pickTheme = () => {
    const cl = document.documentElement.classList;
    if (cl.contains('mvu-force-dark')) return 'dark';
    if (cl.contains('mvu-force-light')) return 'default';
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'default';
  };

  const render = async () => {
    if (!window.mermaid) return;
    const nodes = Array.from(document.querySelectorAll('.mvu-mermaid'));
    if (!nodes.length) return;
    // Restore the original source and clear mermaid's processed flag so a
    // theme flip / toggle re-renders cleanly instead of re-parsing an SVG.
    nodes.forEach((n) => {
      const src = n.getAttribute('data-mvu-src');
      if (src != null) {
        n.textContent = src;
        n.removeAttribute('data-processed');
      }
    });
    try {
      window.mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: pickTheme(),
      });
      await window.mermaid.run({ nodes, suppressErrors: true });
    } catch (_) {
      /* leave the diagram source visible on failure */
    }
  };

  document.addEventListener('mvu-mermaid-render', render);
  render();
})();
