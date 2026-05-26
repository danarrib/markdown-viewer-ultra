# Chrome Web Store Listing — Markdown Viewer Ultra

Paste-ready copy for the [Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole). Update the version line in the changelog block each release.

---

## Submission flow

1. Bump `version` in `manifest.json` if updating (semver fine)
2. ZIP the *contents* of this folder (not the folder itself). The command below lists every shipping file explicitly — README, sample.md, store-assets, PRIVACY.md, store-listing.md, and `.git/` are intentionally omitted.
   ```powershell
   $version = (Get-Content manifest.json -Raw | ConvertFrom-Json).version
   Compress-Archive `
     -Path manifest.json,background.js,content.js,popup.html,popup.js,popup.css,styles.css,github-markdown.css,hljs-theme.css,marked.min.js,purify.min.js,highlight.min.js,icons,_locales `
     -DestinationPath "md-viewer-ultra-v$version.zip" `
     -CompressionLevel Optimal
   ```
3. Upload at `chrome.google.com/webstore/devconsole` → New item / new version
4. Paste copy from the sections below into the matching fields
5. Set **Visibility: Unlisted** for first release — lets you test the install flow with the public listing URL before going Public
6. Submit. First review can take a few hours to ~3 days; subsequent updates are usually faster.

---

## Listing basics

**Name**
```
Markdown Viewer Ultra
```

**Category**
```
Productivity
```

**Language**
```
English (United States)
```

**Single purpose** (CWS requires one sentence)
```
Render Markdown content as formatted HTML when a page is served with the text/markdown MIME type or has a Markdown file extension.
```

---

## Short description (max 132 characters)

```
Render Markdown files and text/markdown responses with syntax highlighting, light/dark themes, and adjustable width.
```

(116 chars — leaves room if you want to tweak.)

---

## Detailed description

The Chrome Web Store lets you publish a separate "Detailed description" per locale (Dashboard → Listings tab → add language). Paste the matching block below into each locale's field. English is the default fallback for any locale not represented here.

### English — `en` (default)

```
Markdown Viewer Ultra turns any page Chrome would otherwise show as raw text into a clean, GitHub-style document — automatically.

If a server responds with Content-Type: text/markdown (or you open a .md / .markdown file served as plain text), the extension parses it with GFM-compatible Markdown, sanitizes the output, and replaces the raw view with formatted HTML: headings, tables, code blocks, task lists, blockquotes, images, and links — exactly as you'd expect them to look on GitHub.

WHAT IT RENDERS
• text/markdown and text/x-markdown responses
• Local and remote .md, .markdown, .mdown, .mkd, .mkdn files served as text/plain
• GitHub-Flavored Markdown: tables, task lists, strikethrough, fenced code, autolinks

FEATURES
• Toolbar popup with three themes: Auto (follows your OS), Light, Dark
• Content-width picker: Narrow (920px), Wide (1440px), or Full (fills the window)
• Syntax highlighting for ~30 common languages (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, and more) — colors follow the active theme
• Localized UI in 17 languages: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• "See original" link in the page footer to flip to the raw Markdown source, and "See rendered" to flip back
• Same toggles are available in the popup
• GitHub-style typography and code-block coloring (including light/dark prettylights palette)
• Mobile-friendly responsive layout
• Theme + width preferences sync across your signed-in Chrome browsers

PRIVACY
• No data collection — at all
• No network requests — every render happens locally in your browser
• No analytics, no telemetry, no tracking
• The only things stored are your theme and width preferences, kept in Chrome's built-in storage
• On uninstall, Chrome opens the project's feedback page so you can tell us what to fix

SECURITY
• Output is sanitized with DOMPurify before being inserted into the page
• Manifest V3, no remote code, no eval — all libraries (marked, DOMPurify, highlight.js, github-markdown-css) are bundled locally
• Open source — review the code yourself

HOW TO USE
1. Install the extension
2. (Optional) Enable "Allow access to file URLs" on the extension's details page if you want it to work on local .md files
3. Open any Markdown page — it renders automatically
4. Click the toolbar icon to switch theme, change width, or view the original source

PERMISSIONS
• Storage — saves your theme and width preferences
• Access to all sites — needed because Markdown can be served from any domain, and Chrome only exposes the response MIME type after the page loads. The extension exits immediately on every page that isn't Markdown.

Questions, bugs, or feature requests? Open an issue on the project page.
```

### Português (Brasil) — `pt-BR`

```
Markdown Viewer Ultra transforma qualquer página que o Chrome exibiria como texto bruto em um documento limpo, no estilo do GitHub — automaticamente.

Quando um servidor responde com Content-Type: text/markdown (ou você abre um arquivo .md / .markdown servido como texto puro), a extensão analisa o conteúdo com Markdown compatível com GFM, sanitiza a saída e substitui a visualização bruta por HTML formatado: títulos, tabelas, blocos de código, listas de tarefas, citações, imagens e links — exatamente como apareceriam no GitHub.

O QUE É RENDERIZADO
• Respostas text/markdown e text/x-markdown
• Arquivos .md, .markdown, .mdown, .mkd, .mkdn locais e remotos servidos como text/plain
• GitHub-Flavored Markdown: tabelas, listas de tarefas, riscado, blocos de código cercados, autolinks

RECURSOS
• Popup na barra de ferramentas com três temas: Auto (segue o sistema operacional), Claro, Escuro
• Seletor de largura do conteúdo: Estreita (920px), Larga (1440px) ou Total (preenche a janela)
• Destaque de sintaxe para cerca de 30 linguagens comuns (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, entre outras) — as cores seguem o tema ativo
• Interface localizada em 17 idiomas: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• Link "Ver original" no rodapé da página para alternar para o Markdown bruto e "Ver renderizado" para voltar
• Os mesmos controles estão disponíveis no popup
• Tipografia no estilo GitHub e coloração de blocos de código (incluindo paleta prettylights claro/escuro)
• Layout responsivo amigável para dispositivos móveis
• Preferências de tema e largura sincronizam entre seus navegadores Chrome conectados

PRIVACIDADE
• Sem coleta de dados — nenhuma
• Sem requisições de rede — toda renderização ocorre localmente no seu navegador
• Sem analytics, sem telemetria, sem rastreamento
• A única coisa armazenada são suas preferências de tema e largura, no armazenamento integrado do Chrome
• Na desinstalação, o Chrome abre a página de feedback do projeto para que você possa nos contar o que melhorar

SEGURANÇA
• A saída é sanitizada com DOMPurify antes de ser inserida na página
• Manifest V3, sem código remoto, sem eval — todas as bibliotecas (marked, DOMPurify, highlight.js, github-markdown-css) são incluídas localmente
• Código aberto — verifique você mesmo

COMO USAR
1. Instale a extensão
2. (Opcional) Ative "Permitir acesso a URLs de arquivo" na página de detalhes da extensão se quiser que funcione em arquivos .md locais
3. Abra qualquer página Markdown — ela é renderizada automaticamente
4. Clique no ícone da barra de ferramentas para alternar tema, mudar a largura ou ver o original

PERMISSÕES
• Armazenamento — salva suas preferências de tema e largura
• Acesso a todos os sites — necessário porque o Markdown pode ser servido por qualquer domínio, e o Chrome só expõe o tipo MIME da resposta depois que a página carrega. A extensão sai imediatamente em toda página que não é Markdown.

Dúvidas, bugs ou pedidos de recursos? Abra uma issue na página do projeto.
```

### Español — `es`

```
Markdown Viewer Ultra convierte automáticamente cualquier página que Chrome mostraría como texto plano en un documento limpio, estilo GitHub.

Cuando un servidor responde con Content-Type: text/markdown (o abres un archivo .md / .markdown servido como texto plano), la extensión lo analiza con Markdown compatible con GFM, sanea la salida y reemplaza la vista cruda con HTML formateado: encabezados, tablas, bloques de código, listas de tareas, citas, imágenes y enlaces — tal y como se verían en GitHub.

QUÉ SE RENDERIZA
• Respuestas text/markdown y text/x-markdown
• Archivos .md, .markdown, .mdown, .mkd, .mkdn locales y remotos servidos como text/plain
• GitHub-Flavored Markdown: tablas, listas de tareas, tachado, bloques de código, autoenlaces

CARACTERÍSTICAS
• Popup en la barra de herramientas con tres temas: Auto (sigue tu SO), Claro, Oscuro
• Selector de ancho del contenido: Estrecho (920px), Amplio (1440px) o Completo (ocupa la ventana)
• Resaltado de sintaxis para unos 30 lenguajes comunes (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, y más) — los colores siguen el tema activo
• Interfaz localizada en 17 idiomas: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• Enlace "Ver original" en el pie de página para cambiar al Markdown sin procesar y "Ver renderizado" para volver
• Los mismos controles están disponibles en el popup
• Tipografía estilo GitHub y coloreado de bloques de código (incluida la paleta prettylights claro/oscuro)
• Diseño responsive optimizado para móvil
• Las preferencias de tema y ancho se sincronizan entre tus navegadores Chrome con sesión iniciada

PRIVACIDAD
• Sin recolección de datos — ninguna
• Sin solicitudes de red — toda la renderización ocurre localmente en tu navegador
• Sin analítica, sin telemetría, sin rastreo
• Lo único que se guarda son tus preferencias de tema y ancho, en el almacenamiento integrado de Chrome
• Al desinstalar, Chrome abre la página de feedback del proyecto para que nos digas qué arreglar

SEGURIDAD
• La salida se sanea con DOMPurify antes de insertarla en la página
• Manifest V3, sin código remoto, sin eval — todas las bibliotecas (marked, DOMPurify, highlight.js, github-markdown-css) van empaquetadas localmente
• Código abierto — revísalo tú mismo

CÓMO USAR
1. Instala la extensión
2. (Opcional) Activa "Permitir acceso a URLs de archivo" en la página de detalles de la extensión si quieres que funcione con archivos .md locales
3. Abre cualquier página Markdown — se renderiza automáticamente
4. Haz clic en el icono de la barra de herramientas para cambiar tema, ancho o ver el original

PERMISOS
• Almacenamiento — guarda tus preferencias de tema y ancho
• Acceso a todos los sitios — necesario porque el Markdown puede servirse desde cualquier dominio, y Chrome solo expone el tipo MIME de la respuesta después de cargar la página. La extensión sale de inmediato en cada página que no es Markdown.

¿Preguntas, errores o solicitudes de funciones? Abre un issue en la página del proyecto.
```

### Français — `fr`

```
Markdown Viewer Ultra transforme automatiquement toute page que Chrome afficherait en texte brut en un document propre, façon GitHub.

Quand un serveur répond avec Content-Type: text/markdown (ou que vous ouvrez un fichier .md / .markdown servi en texte brut), l'extension analyse le contenu avec un Markdown compatible GFM, désinfecte la sortie et remplace la vue brute par du HTML formaté : titres, tableaux, blocs de code, listes de tâches, citations, images et liens — exactement comme ils apparaîtraient sur GitHub.

CE QUI EST RENDU
• Réponses text/markdown et text/x-markdown
• Fichiers .md, .markdown, .mdown, .mkd, .mkdn locaux et distants servis en text/plain
• GitHub-Flavored Markdown : tableaux, listes de tâches, barré, blocs de code, liens automatiques

FONCTIONNALITÉS
• Popup dans la barre d'outils avec trois thèmes : Auto (suit votre OS), Clair, Sombre
• Sélecteur de largeur du contenu : Étroite (920px), Large (1440px) ou Pleine (occupe la fenêtre)
• Coloration syntaxique pour une trentaine de langages courants (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, et d'autres) — les couleurs suivent le thème actif
• Interface localisée en 17 langues : English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• Lien "Voir l'original" dans le pied de page pour basculer vers le Markdown brut, et "Voir le rendu" pour revenir
• Les mêmes commandes sont disponibles dans le popup
• Typographie style GitHub et coloration des blocs de code (palette prettylights claire/sombre comprise)
• Mise en page responsive adaptée au mobile
• Les préférences de thème et de largeur se synchronisent entre vos navigateurs Chrome connectés

CONFIDENTIALITÉ
• Aucune collecte de données — du tout
• Aucune requête réseau — tout le rendu se fait localement dans votre navigateur
• Aucune analytique, aucune télémétrie, aucun pistage
• Seules vos préférences de thème et de largeur sont enregistrées, dans le stockage intégré de Chrome
• À la désinstallation, Chrome ouvre la page de retour du projet pour que vous nous disiez quoi corriger

SÉCURITÉ
• La sortie est désinfectée par DOMPurify avant d'être insérée dans la page
• Manifest V3, pas de code distant, pas d'eval — toutes les bibliothèques (marked, DOMPurify, highlight.js, github-markdown-css) sont fournies localement
• Open source — vérifiez le code vous-même

UTILISATION
1. Installez l'extension
2. (Optionnel) Activez "Autoriser l'accès aux URL de fichier" sur la page de détails de l'extension pour qu'elle fonctionne avec les fichiers .md locaux
3. Ouvrez n'importe quelle page Markdown — elle est rendue automatiquement
4. Cliquez sur l'icône de la barre d'outils pour changer de thème, de largeur ou voir la source

AUTORISATIONS
• Stockage — enregistre vos préférences de thème et de largeur
• Accès à tous les sites — nécessaire car le Markdown peut être servi depuis n'importe quel domaine, et Chrome n'expose le type MIME de la réponse qu'après le chargement de la page. L'extension s'arrête immédiatement sur toute page qui n'est pas du Markdown.

Questions, bugs ou demandes de fonctionnalités ? Ouvrez une issue sur la page du projet.
```

### Deutsch — `de`

```
Markdown Viewer Ultra verwandelt jede Seite, die Chrome sonst als Rohtext anzeigen würde, automatisch in ein sauberes Dokument im GitHub-Stil.

Wenn ein Server mit Content-Type: text/markdown antwortet (oder Sie eine .md- / .markdown-Datei öffnen, die als Klartext ausgeliefert wird), parst die Erweiterung den Inhalt mit GFM-kompatiblem Markdown, säubert die Ausgabe und ersetzt die Rohansicht durch formatiertes HTML: Überschriften, Tabellen, Codeblöcke, Aufgabenlisten, Zitate, Bilder und Links — genau so, wie sie auf GitHub aussehen würden.

WAS GERENDERT WIRD
• text/markdown- und text/x-markdown-Antworten
• Lokale und entfernte .md-, .markdown-, .mdown-, .mkd-, .mkdn-Dateien, die als text/plain ausgeliefert werden
• GitHub-Flavored Markdown: Tabellen, Aufgabenlisten, Durchgestrichenes, eingerahmte Codeblöcke, Auto-Links

FUNKTIONEN
• Symbolleisten-Popup mit drei Themes: Auto (folgt Ihrem Betriebssystem), Hell, Dunkel
• Inhaltsbreite wählen: Schmal (920px), Breit (1440px) oder Voll (füllt das Fenster)
• Syntax-Hervorhebung für rund 30 gängige Sprachen (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS und weitere) — die Farben folgen dem aktiven Theme
• Lokalisierte Oberfläche in 17 Sprachen: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• Link "Original anzeigen" im Seitenfuß zum Wechsel auf das Quell-Markdown und "Gerendert anzeigen" zum Zurückwechseln
• Dieselben Schalter sind auch im Popup verfügbar
• GitHub-Typografie und Codeblock-Färbung (inklusive Prettylights-Palette hell/dunkel)
• Responsives Layout, mobilfreundlich
• Theme- und Breiten-Einstellungen synchronisieren zwischen Ihren angemeldeten Chrome-Browsern

DATENSCHUTZ
• Keine Datenerfassung — überhaupt nicht
• Keine Netzwerkanfragen — jeglicher Rendering-Vorgang findet lokal im Browser statt
• Keine Analytik, keine Telemetrie, kein Tracking
• Gespeichert werden nur Ihre Theme- und Breiten-Einstellungen, im integrierten Chrome-Speicher
• Beim Deinstallieren öffnet Chrome die Feedback-Seite des Projekts, damit Sie uns sagen können, was wir verbessern sollen

SICHERHEIT
• Die Ausgabe wird mit DOMPurify desinfiziert, bevor sie in die Seite eingefügt wird
• Manifest V3, kein Remote-Code, kein eval — alle Bibliotheken (marked, DOMPurify, highlight.js, github-markdown-css) sind lokal gebündelt
• Open Source — Code selbst überprüfbar

VERWENDUNG
1. Erweiterung installieren
2. (Optional) "Zugriff auf Datei-URLs erlauben" auf der Detailseite der Erweiterung aktivieren, damit sie mit lokalen .md-Dateien funktioniert
3. Eine beliebige Markdown-Seite öffnen — sie wird automatisch gerendert
4. Auf das Symbolleisten-Icon klicken, um Theme oder Breite zu ändern oder das Original anzuzeigen

BERECHTIGUNGEN
• Speicher — sichert Ihre Theme- und Breiten-Einstellungen
• Zugriff auf alle Websites — nötig, da Markdown von jeder Domain ausgeliefert werden kann und Chrome den Antwort-MIME-Typ erst nach dem Laden offenlegt. Die Erweiterung beendet sich sofort auf jeder Seite, die kein Markdown ist.

Fragen, Fehler oder Funktionswünsche? Eröffnen Sie ein Issue auf der Projektseite.
```

### Italiano — `it`

```
Markdown Viewer Ultra trasforma automaticamente qualsiasi pagina che Chrome mostrerebbe come testo grezzo in un documento pulito, in stile GitHub.

Quando un server risponde con Content-Type: text/markdown (o apri un file .md / .markdown servito come testo semplice), l'estensione lo analizza con Markdown compatibile GFM, sanitizza l'output e sostituisce la visualizzazione grezza con HTML formattato: intestazioni, tabelle, blocchi di codice, liste di task, citazioni, immagini e link — esattamente come apparirebbero su GitHub.

COSA VIENE RENDERIZZATO
• Risposte text/markdown e text/x-markdown
• File .md, .markdown, .mdown, .mkd, .mkdn locali e remoti serviti come text/plain
• GitHub-Flavored Markdown: tabelle, liste di task, barrato, blocchi di codice, autolink

CARATTERISTICHE
• Popup nella barra degli strumenti con tre temi: Auto (segue il sistema operativo), Chiaro, Scuro
• Selettore della larghezza del contenuto: Stretta (920px), Larga (1440px) o Piena (riempie la finestra)
• Evidenziazione della sintassi per circa 30 linguaggi comuni (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, e altri) — i colori seguono il tema attivo
• Interfaccia localizzata in 17 lingue: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• Link "Mostra originale" nel piè di pagina per passare al Markdown originale e "Mostra renderizzato" per tornare
• Gli stessi controlli sono disponibili nel popup
• Tipografia in stile GitHub e colorazione dei blocchi di codice (inclusa la palette prettylights chiaro/scuro)
• Layout responsive, ottimo su mobile
• Le preferenze di tema e larghezza si sincronizzano tra i tuoi browser Chrome con accesso effettuato

PRIVACY
• Nessuna raccolta di dati — di nessun tipo
• Nessuna richiesta di rete — ogni rendering avviene localmente nel browser
• Nessuna analitica, nessuna telemetria, nessun tracciamento
• Vengono memorizzate solo le tue preferenze di tema e larghezza, nello storage integrato di Chrome
• Alla disinstallazione, Chrome apre la pagina di feedback del progetto per consentirti di dirci cosa migliorare

SICUREZZA
• L'output viene sanitizzato con DOMPurify prima di essere inserito nella pagina
• Manifest V3, nessun codice remoto, nessun eval — tutte le librerie (marked, DOMPurify, highlight.js, github-markdown-css) sono incluse localmente
• Open source — puoi controllare il codice tu stesso

COME USARE
1. Installa l'estensione
2. (Opzionale) Attiva "Consenti accesso agli URL dei file" nella pagina dei dettagli dell'estensione se vuoi che funzioni con i file .md locali
3. Apri una qualsiasi pagina Markdown — viene renderizzata automaticamente
4. Clicca sull'icona della barra degli strumenti per cambiare tema, larghezza o vedere l'originale

AUTORIZZAZIONI
• Archiviazione — salva le tue preferenze di tema e larghezza
• Accesso a tutti i siti — necessario perché il Markdown può essere servito da qualsiasi dominio, e Chrome espone il tipo MIME della risposta solo dopo il caricamento della pagina. L'estensione esce immediatamente in ogni pagina che non è Markdown.

Domande, bug o richieste di funzionalità? Apri una issue sulla pagina del progetto.
```

### 日本語 — `ja`

```
Markdown Viewer Ultra は、Chrome が通常テキストとして表示するページを、自動的に GitHub 風の整ったドキュメントに変換します。

サーバーが Content-Type: text/markdown で応答した場合（または .md / .markdown ファイルがプレーンテキストとして配信された場合）、拡張機能は GFM 互換の Markdown でコンテンツを解析し、出力をサニタイズして、生のビューを整形済み HTML（見出し、表、コードブロック、タスクリスト、引用、画像、リンク）に置き換えます。GitHub での表示と同じ見た目です。

対応する形式
• text/markdown および text/x-markdown レスポンス
• ローカルおよびリモートの .md, .markdown, .mdown, .mkd, .mkdn ファイル（text/plain として配信）
• GitHub-Flavored Markdown：テーブル、タスクリスト、打ち消し線、フェンス付きコードブロック、自動リンク

機能
• ツールバーのポップアップに 3 つのテーマ：自動（OS に追従）、ライト、ダーク
• コンテンツ幅の選択：狭い（920px）、広い（1440px）、全幅（ウィンドウいっぱい）
• 約 30 種類の主要言語に対応したシンタックスハイライト（JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS など）— 色はアクティブなテーマに追従
• 17 言語にローカライズ：English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• ページのフッターにある「原文を表示」リンクで Markdown の原文に切り替え、「レンダリングを表示」で戻る
• 同じ操作はポップアップからも可能
• GitHub スタイルのタイポグラフィとコードブロックの配色（prettylights ライト/ダークパレット対応）
• モバイル対応のレスポンシブレイアウト
• テーマと幅の設定は、サインインしている Chrome ブラウザ間で同期

プライバシー
• データ収集は一切なし
• ネットワークリクエストなし — レンダリングはすべてブラウザ内でローカルに行われます
• 解析なし、テレメトリなし、トラッキングなし
• 保存されるのはテーマと幅の設定のみで、Chrome 標準のストレージに保管されます
• アンインストール時、Chrome はプロジェクトのフィードバックページを開きます。改善点をお聞かせください

セキュリティ
• 出力はページに挿入される前に DOMPurify でサニタイズされます
• Manifest V3、リモートコードなし、eval なし — すべてのライブラリ（marked, DOMPurify, highlight.js, github-markdown-css）は同梱
• オープンソース — コードはご自身でご確認いただけます

使い方
1. 拡張機能をインストール
2. （任意）ローカルの .md ファイルでも動作させたい場合は、拡張機能の詳細ページで「ファイル URL へのアクセスを許可する」を有効化
3. 任意の Markdown ページを開く — 自動的にレンダリングされます
4. ツールバーのアイコンをクリックして、テーマや幅の変更、原文表示の切り替え

権限
• ストレージ — テーマと幅の設定を保存
• すべてのサイトへのアクセス — Markdown はどのドメインからでも配信される可能性があり、Chrome はページが読み込まれた後にしかレスポンスの MIME タイプを公開しないため必要です。拡張機能は Markdown でないページではすぐに終了します。

ご質問、不具合、機能リクエストがありましたら、プロジェクトページに Issue を作成してください。
```

### 简体中文 — `zh-CN`

```
Markdown Viewer Ultra 自动将 Chrome 原本以纯文本显示的页面变成整洁的 GitHub 风格文档。

当服务器返回 Content-Type: text/markdown（或您打开以纯文本形式提供的 .md / .markdown 文件）时，扩展会使用兼容 GFM 的 Markdown 解析内容，对输出进行净化，并将原始视图替换为格式化的 HTML：标题、表格、代码块、任务列表、引用、图片和链接——与 GitHub 上的样式完全一致。

渲染内容
• text/markdown 和 text/x-markdown 响应
• 以 text/plain 提供的本地或远程 .md, .markdown, .mdown, .mkd, .mkdn 文件
• GitHub-Flavored Markdown：表格、任务列表、删除线、围栏代码块、自动链接

功能
• 工具栏弹出窗口提供三种主题：自动（跟随系统）、亮色、暗色
• 内容宽度选择器：窄（920px）、宽（1440px）或全宽（填满窗口）
• 对约 30 种常见语言的语法高亮（JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS 等）——颜色跟随当前主题
• 17 种语言界面：English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• 页脚的"查看原文"链接可切换到原始 Markdown，"查看渲染"可返回
• 弹出窗口中也提供相同的开关
• GitHub 风格的排版和代码块配色（包括亮色/暗色 prettylights 调色板）
• 适配移动端的响应式布局
• 主题和宽度偏好在已登录的 Chrome 浏览器之间同步

隐私
• 不收集任何数据
• 无网络请求——所有渲染都在浏览器本地完成
• 无分析、无遥测、无跟踪
• 仅保存您的主题和宽度偏好，存储在 Chrome 内置存储中
• 卸载时，Chrome 会打开项目反馈页面，欢迎告诉我们需要改进什么

安全
• 输出在插入页面前会使用 DOMPurify 进行净化
• Manifest V3，无远程代码，无 eval——所有库（marked, DOMPurify, highlight.js, github-markdown-css）均本地打包
• 开源——欢迎自行查阅代码

如何使用
1. 安装扩展
2. （可选）在扩展详情页启用"允许访问文件 URL"，以便对本地 .md 文件生效
3. 打开任意 Markdown 页面——会自动渲染
4. 点击工具栏图标切换主题、调整宽度或查看原文

权限
• 存储——保存您的主题和宽度偏好
• 访问所有网站——必需，因为 Markdown 可来自任何域，而 Chrome 只在页面加载后才暴露响应的 MIME 类型。扩展会在每个非 Markdown 页面上立即退出。

有问题、bug 或功能请求？请在项目页面提交 Issue。
```

### Português (Portugal) — `pt-PT`

```
Markdown Viewer Ultra transforma automaticamente qualquer página que o Chrome apresentaria como texto bruto num documento limpo, ao estilo do GitHub.

Quando um servidor responde com Content-Type: text/markdown (ou abre um ficheiro .md / .markdown apresentado como texto simples), a extensão analisa o conteúdo com Markdown compatível com GFM, sanitiza a saída e substitui a vista bruta por HTML formatado: cabeçalhos, tabelas, blocos de código, listas de tarefas, citações, imagens e ligações — exatamente como apareceriam no GitHub.

O QUE É APRESENTADO
• Respostas text/markdown e text/x-markdown
• Ficheiros .md, .markdown, .mdown, .mkd, .mkdn locais e remotos apresentados como text/plain
• GitHub-Flavored Markdown: tabelas, listas de tarefas, rasurado, blocos de código cercados, ligações automáticas

FUNCIONALIDADES
• Popup na barra de ferramentas com três temas: Auto (segue o seu SO), Claro, Escuro
• Seletor de largura do conteúdo: Estreita (920px), Larga (1440px) ou Total (preenche a janela)
• Realce de sintaxe para cerca de 30 linguagens comuns (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, entre outras) — as cores seguem o tema ativo
• Interface localizada em 17 idiomas: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• Ligação "Ver original" no rodapé da página para alternar para o Markdown bruto e "Ver renderizado" para voltar
• Os mesmos controlos estão disponíveis no popup
• Tipografia ao estilo GitHub e coloração de blocos de código (incluindo paleta prettylights claro/escuro)
• Layout responsivo, adaptado a dispositivos móveis
• Preferências de tema e largura sincronizam entre os seus navegadores Chrome com sessão iniciada

PRIVACIDADE
• Sem recolha de dados — nenhuma
• Sem pedidos de rede — toda a apresentação acontece localmente no seu navegador
• Sem analítica, sem telemetria, sem rastreio
• A única coisa armazenada são as suas preferências de tema e largura, no armazenamento integrado do Chrome
• Ao desinstalar, o Chrome abre a página de feedback do projeto para que nos possa dizer o que melhorar

SEGURANÇA
• A saída é sanitizada com DOMPurify antes de ser inserida na página
• Manifest V3, sem código remoto, sem eval — todas as bibliotecas (marked, DOMPurify, highlight.js, github-markdown-css) estão incluídas localmente
• Código aberto — verifique você mesmo

COMO USAR
1. Instale a extensão
2. (Opcional) Ative "Permitir acesso a URLs de ficheiro" na página de detalhes da extensão para funcionar com ficheiros .md locais
3. Abra qualquer página Markdown — é apresentada automaticamente
4. Clique no ícone da barra de ferramentas para alternar o tema, mudar a largura ou ver o original

PERMISSÕES
• Armazenamento — guarda as suas preferências de tema e largura
• Acesso a todos os sites — necessário porque o Markdown pode ser apresentado a partir de qualquer domínio, e o Chrome só expõe o tipo MIME da resposta depois de a página carregar. A extensão termina imediatamente em todas as páginas que não sejam Markdown.

Dúvidas, erros ou pedidos de funcionalidades? Abra um issue na página do projeto.
```

### 繁體中文 — `zh-TW`

```
Markdown Viewer Ultra 自動將 Chrome 原本以純文字顯示的頁面變成整潔的 GitHub 風格文件。

當伺服器回傳 Content-Type: text/markdown（或您開啟以純文字形式提供的 .md / .markdown 檔案）時，擴充功能會使用相容 GFM 的 Markdown 解析內容，對輸出進行淨化，並將原始檢視取代為格式化的 HTML：標題、表格、程式碼區塊、任務清單、引言、圖片和連結——完全與 GitHub 上的樣式一致。

渲染內容
• text/markdown 和 text/x-markdown 回應
• 以 text/plain 提供的本機或遠端 .md, .markdown, .mdown, .mkd, .mkdn 檔案
• GitHub-Flavored Markdown：表格、任務清單、刪除線、圍欄程式碼區塊、自動連結

功能
• 工具列彈出視窗提供三種主題：自動（跟隨系統）、亮色、暗色
• 內容寬度選擇器：窄（920px）、寬（1440px）或全寬（填滿視窗）
• 對約 30 種常見語言的語法上色（JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS 等）——色彩跟隨目前主題
• 17 種語言介面：English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• 頁腳的「檢視原文」連結可切換到原始 Markdown，「檢視渲染」可返回
• 彈出視窗中也提供相同的開關
• GitHub 風格的排版和程式碼區塊配色（包括亮色/暗色 prettylights 調色盤）
• 適配行動裝置的響應式版面
• 主題和寬度偏好在已登入的 Chrome 瀏覽器之間同步

隱私
• 不收集任何資料
• 無網路要求——所有渲染都在瀏覽器本機完成
• 無分析、無遙測、無追蹤
• 僅儲存您的主題和寬度偏好，存放在 Chrome 內建儲存中
• 解除安裝時，Chrome 會開啟專案回饋頁面，歡迎告訴我們需要改進什麼

安全
• 輸出在插入頁面前會用 DOMPurify 進行淨化
• Manifest V3，無遠端程式碼，無 eval——所有函式庫（marked, DOMPurify, highlight.js, github-markdown-css）皆本機封裝
• 開源——歡迎自行查閱程式碼

如何使用
1. 安裝擴充功能
2. （選用）在擴充功能詳細資料頁啟用「允許存取檔案 URL」，以便對本機 .md 檔案生效
3. 開啟任意 Markdown 頁面——會自動渲染
4. 點擊工具列圖示切換主題、調整寬度或檢視原文

權限
• 儲存——儲存您的主題和寬度偏好
• 存取所有網站——必要，因為 Markdown 可來自任何網域，而 Chrome 只在頁面載入後才公開回應的 MIME 類型。擴充功能會在每個非 Markdown 頁面上立即結束。

有問題、bug 或功能請求？請在專案頁面提交 Issue。
```

### Русский — `ru`

```
Markdown Viewer Ultra автоматически превращает любую страницу, которую Chrome показал бы как сырой текст, в опрятный документ в стиле GitHub.

Когда сервер отвечает с Content-Type: text/markdown (или вы открываете файл .md / .markdown, отдаваемый как обычный текст), расширение разбирает его с помощью совместимого с GFM Markdown, очищает вывод и заменяет сырой вид отформатированным HTML: заголовки, таблицы, блоки кода, списки задач, цитаты, изображения и ссылки — точно так, как они выглядели бы на GitHub.

ЧТО РЕНДЕРИТСЯ
• Ответы text/markdown и text/x-markdown
• Локальные и удалённые файлы .md, .markdown, .mdown, .mkd, .mkdn, отдаваемые как text/plain
• GitHub-Flavored Markdown: таблицы, списки задач, зачёркивание, ограждённые блоки кода, автоссылки

ВОЗМОЖНОСТИ
• Всплывающее окно на панели инструментов с тремя темами: Авто (следует ОС), Светлая, Тёмная
• Выбор ширины контента: Узкая (920px), Широкая (1440px) или Полная (заполняет окно)
• Подсветка синтаксиса для ~30 распространённых языков (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS и другие) — цвета следуют текущей теме
• Локализованный интерфейс на 17 языках: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• Ссылка «Показать исходник» в подвале страницы для переключения на исходный Markdown и «Показать рендер» для возврата
• Те же переключатели доступны во всплывающем окне
• Типографика в стиле GitHub и подсветка блоков кода (включая палитру prettylights светлая/тёмная)
• Адаптивный макет, удобный на мобильных
• Настройки темы и ширины синхронизируются между вашими браузерами Chrome с входом в аккаунт

КОНФИДЕНЦИАЛЬНОСТЬ
• Никаких данных не собирается — вообще
• Никаких сетевых запросов — весь рендеринг происходит локально в браузере
• Никакой аналитики, телеметрии или трекинга
• Хранятся только ваши настройки темы и ширины, во встроенном хранилище Chrome
• При удалении Chrome открывает страницу обратной связи проекта, чтобы вы могли сказать, что улучшить

БЕЗОПАСНОСТЬ
• Вывод очищается DOMPurify перед вставкой в страницу
• Manifest V3, никакого удалённого кода, никакого eval — все библиотеки (marked, DOMPurify, highlight.js, github-markdown-css) включены локально
• Открытый исходный код — проверьте сами

КАК ПОЛЬЗОВАТЬСЯ
1. Установите расширение
2. (Необязательно) Включите «Разрешить доступ к URL файлов» на странице сведений расширения, чтобы работало с локальными .md
3. Откройте любую Markdown-страницу — она отрендерится автоматически
4. Нажмите значок на панели инструментов, чтобы переключить тему, ширину или посмотреть исходник

РАЗРЕШЕНИЯ
• Хранилище — сохраняет ваши настройки темы и ширины
• Доступ ко всем сайтам — нужен, потому что Markdown может отдаваться с любого домена, а Chrome раскрывает MIME-тип ответа только после загрузки страницы. Расширение немедленно завершает работу на каждой не-Markdown странице.

Вопросы, баги или пожелания? Откройте issue на странице проекта.
```

### हिन्दी — `hi`

```
Markdown Viewer Ultra स्वचालित रूप से उन पेजों को, जिन्हें Chrome कच्चे टेक्स्ट के रूप में दिखाता, GitHub-शैली के सुव्यवस्थित दस्तावेज़ में बदल देता है।

जब कोई सर्वर Content-Type: text/markdown के साथ प्रतिक्रिया देता है (या आप .md / .markdown फ़ाइल खोलते हैं जो plain text के रूप में परोसी जा रही है), तो एक्सटेंशन GFM-संगत Markdown से सामग्री को पार्स करता है, आउटपुट को साफ़ करता है, और कच्चे दृश्य को फ़ॉर्मेट किए गए HTML से बदल देता है: शीर्षक, तालिकाएँ, कोड ब्लॉक, कार्य सूचियाँ, उद्धरण, चित्र और लिंक — बिल्कुल वैसे जैसे GitHub पर दिखते हैं।

क्या रेंडर होता है
• text/markdown और text/x-markdown प्रतिक्रियाएँ
• स्थानीय और रिमोट .md, .markdown, .mdown, .mkd, .mkdn फ़ाइलें जो text/plain के रूप में परोसी जाती हैं
• GitHub-Flavored Markdown: तालिकाएँ, कार्य सूचियाँ, स्ट्राइकथ्रू, फ़ेंस्ड कोड ब्लॉक, ऑटो-लिंक

विशेषताएँ
• टूलबार पॉपअप में तीन थीम: स्वचालित (आपके OS का अनुसरण), हल्की, गहरी
• कंटेंट चौड़ाई चयनकर्ता: संकीर्ण (920px), चौड़ी (1440px) या पूर्ण (विंडो भर देती है)
• लगभग 30 सामान्य भाषाओं के लिए सिंटैक्स हाइलाइटिंग (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, आदि) — रंग सक्रिय थीम का अनुसरण करते हैं
• 17 भाषाओं में स्थानीयकृत इंटरफ़ेस: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• पेज फ़ुटर में "मूल देखें" लिंक से कच्चे Markdown पर जाने का विकल्प और "रेंडर देखें" से वापस लौटने का
• वही टॉगल पॉपअप में भी उपलब्ध हैं
• GitHub-शैली टाइपोग्राफ़ी और कोड-ब्लॉक रंग (हल्की/गहरी prettylights पैलेट सहित)
• मोबाइल-अनुकूल रिस्पॉन्सिव लेआउट
• थीम और चौड़ाई वरीयताएँ आपके साइन-इन किए हुए Chrome ब्राउज़र के बीच सिंक होती हैं

गोपनीयता
• कोई डेटा संग्रह नहीं — बिल्कुल नहीं
• कोई नेटवर्क अनुरोध नहीं — सारा रेंडरिंग आपके ब्राउज़र में स्थानीय रूप से होता है
• कोई एनालिटिक्स नहीं, कोई टेलीमेट्री नहीं, कोई ट्रैकिंग नहीं
• केवल आपकी थीम और चौड़ाई वरीयताएँ संग्रहीत होती हैं, Chrome के अंतर्निहित स्टोरेज में
• अनइंस्टॉल पर, Chrome प्रोजेक्ट का फ़ीडबैक पेज खोलता है ताकि आप बता सकें कि क्या ठीक करना है

सुरक्षा
• आउटपुट को पेज में डालने से पहले DOMPurify से साफ़ किया जाता है
• Manifest V3, कोई रिमोट कोड नहीं, कोई eval नहीं — सभी लाइब्रेरीज़ (marked, DOMPurify, highlight.js, github-markdown-css) स्थानीय रूप से बंडल हैं
• ओपन सोर्स — कोड स्वयं देखें

उपयोग कैसे करें
1. एक्सटेंशन इंस्टॉल करें
2. (वैकल्पिक) एक्सटेंशन के विवरण पेज पर "फ़ाइल URL तक पहुँच की अनुमति दें" चालू करें ताकि यह स्थानीय .md फ़ाइलों पर काम करे
3. कोई भी Markdown पेज खोलें — यह स्वचालित रूप से रेंडर होगा
4. थीम बदलने, चौड़ाई बदलने या मूल देखने के लिए टूलबार आइकन पर क्लिक करें

अनुमतियाँ
• संग्रहण — आपकी थीम और चौड़ाई वरीयताएँ सहेजता है
• सभी साइटों तक पहुँच — आवश्यक है क्योंकि Markdown किसी भी डोमेन से परोसा जा सकता है, और Chrome प्रतिक्रिया का MIME प्रकार पेज लोड होने के बाद ही उजागर करता है। एक्सटेंशन उन सभी पेजों पर तुरंत बंद हो जाता है जो Markdown नहीं हैं।

प्रश्न, बग या फ़ीचर अनुरोध? प्रोजेक्ट पेज पर एक issue खोलें।
```

### বাংলা — `bn`

```
Markdown Viewer Ultra স্বয়ংক্রিয়ভাবে যেকোনো পৃষ্ঠা — যা Chrome কাঁচা টেক্সট হিসেবে দেখাতো — তাকে পরিচ্ছন্ন, GitHub-শৈলীর ডকুমেন্টে রূপান্তর করে।

যখন কোনো সার্ভার Content-Type: text/markdown দিয়ে সাড়া দেয় (অথবা আপনি plain text হিসেবে পরিবেশিত একটি .md / .markdown ফাইল খোলেন), এক্সটেনশনটি GFM-সামঞ্জস্যপূর্ণ Markdown দিয়ে বিষয়বস্তু পার্স করে, আউটপুট স্যানিটাইজ করে, এবং কাঁচা ভিউকে ফরম্যাট করা HTML দিয়ে প্রতিস্থাপন করে: শিরোনাম, টেবিল, কোড ব্লক, টাস্ক তালিকা, উদ্ধৃতি, ছবি এবং লিঙ্ক — ঠিক যেমন GitHub-এ দেখাবে।

কী রেন্ডার হয়
• text/markdown এবং text/x-markdown প্রতিক্রিয়া
• text/plain হিসেবে পরিবেশিত স্থানীয় ও দূরবর্তী .md, .markdown, .mdown, .mkd, .mkdn ফাইল
• GitHub-Flavored Markdown: টেবিল, টাস্ক তালিকা, স্ট্রাইকথ্রু, ফেন্সড কোড ব্লক, অটো-লিঙ্ক

বৈশিষ্ট্য
• টুলবার পপআপে তিনটি থিম: স্বয়ংক্রিয় (আপনার OS অনুসরণ করে), হালকা, গাঢ়
• বিষয়বস্তু প্রস্থ নির্বাচক: সংকীর্ণ (920px), প্রশস্ত (1440px) বা সম্পূর্ণ (উইন্ডো পূর্ণ করে)
• ~30টি সাধারণ ভাষার জন্য সিনট্যাক্স হাইলাইটিং (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, এবং আরও) — রঙ সক্রিয় থিম অনুসরণ করে
• 17টি ভাষায় স্থানীয়কৃত UI: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• পৃষ্ঠার ফুটারে "মূল দেখুন" লিঙ্ক কাঁচা Markdown-এ যেতে এবং "রেন্ডার দেখুন" ফিরে আসতে
• একই টগল পপআপেও উপলব্ধ
• GitHub-শৈলীর টাইপোগ্রাফি এবং কোড-ব্লক রঙ (হালকা/গাঢ় prettylights প্যালেটসহ)
• মোবাইল-বান্ধব রেসপনসিভ লেআউট
• থিম এবং প্রস্থ পছন্দগুলি আপনার সাইন-ইন করা Chrome ব্রাউজারগুলির মধ্যে সিঙ্ক হয়

গোপনীয়তা
• কোনো ডেটা সংগ্রহ নয় — একেবারেই নয়
• কোনো নেটওয়ার্ক অনুরোধ নয় — সমস্ত রেন্ডারিং আপনার ব্রাউজারে স্থানীয়ভাবে ঘটে
• কোনো অ্যানালিটিক্স নয়, কোনো টেলিমেট্রি নয়, কোনো ট্র্যাকিং নয়
• শুধু আপনার থিম এবং প্রস্থ পছন্দগুলি সংরক্ষিত হয়, Chrome-এর অন্তর্নিহিত স্টোরেজে
• আনইনস্টল করলে, Chrome প্রকল্পের ফিডব্যাক পৃষ্ঠা খোলে যাতে আপনি বলতে পারেন কী ঠিক করতে হবে

নিরাপত্তা
• আউটপুট পৃষ্ঠায় যোগ করার আগে DOMPurify দিয়ে স্যানিটাইজ করা হয়
• Manifest V3, কোনো দূরবর্তী কোড নেই, কোনো eval নেই — সমস্ত লাইব্রেরি (marked, DOMPurify, highlight.js, github-markdown-css) স্থানীয়ভাবে বান্ডেল করা
• ওপেন সোর্স — কোড নিজেই দেখুন

কীভাবে ব্যবহার করবেন
1. এক্সটেনশনটি ইনস্টল করুন
2. (ঐচ্ছিক) স্থানীয় .md ফাইল কাজ করানোর জন্য এক্সটেনশনের বিস্তারিত পৃষ্ঠায় "ফাইল URL-এ অ্যাক্সেস অনুমতি দিন" সক্রিয় করুন
3. যেকোনো Markdown পৃষ্ঠা খুলুন — এটি স্বয়ংক্রিয়ভাবে রেন্ডার হবে
4. থিম পরিবর্তন, প্রস্থ পরিবর্তন বা মূল দেখার জন্য টুলবার আইকনে ক্লিক করুন

অনুমতি
• স্টোরেজ — আপনার থিম এবং প্রস্থ পছন্দগুলি সংরক্ষণ করে
• সমস্ত সাইটে অ্যাক্সেস — প্রয়োজনীয় কারণ Markdown যেকোনো ডোমেন থেকে পরিবেশিত হতে পারে, এবং Chrome পৃষ্ঠা লোড হওয়ার পরেই প্রতিক্রিয়ার MIME টাইপ প্রকাশ করে। এক্সটেনশনটি Markdown নয় এমন প্রতিটি পৃষ্ঠায় অবিলম্বে বন্ধ হয়ে যায়।

প্রশ্ন, বাগ বা বৈশিষ্ট্যের অনুরোধ? প্রকল্প পৃষ্ঠায় একটি issue খুলুন।
```

### ਪੰਜਾਬੀ — `pa`

```
Markdown Viewer Ultra ਆਪਣੇ ਆਪ ਕਿਸੇ ਵੀ ਪੰਨੇ ਨੂੰ — ਜੋ Chrome ਕੱਚੇ ਟੈਕਸਟ ਵਜੋਂ ਦਿਖਾਉਂਦਾ — GitHub-ਸਟਾਈਲ ਦੇ ਸਾਫ਼ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਬਦਲ ਦਿੰਦਾ ਹੈ।

ਜਦੋਂ ਕੋਈ ਸਰਵਰ Content-Type: text/markdown ਨਾਲ ਜਵਾਬ ਦਿੰਦਾ ਹੈ (ਜਾਂ ਤੁਸੀਂ plain text ਵਜੋਂ ਪਰੋਸੀ ਕੋਈ .md / .markdown ਫਾਈਲ ਖੋਲ੍ਹਦੇ ਹੋ), ਐਕਸਟੈਨਸ਼ਨ GFM-ਅਨੁਕੂਲ Markdown ਨਾਲ ਸਮੱਗਰੀ ਨੂੰ ਪਾਰਸ ਕਰਦਾ ਹੈ, ਆਉਟਪੁੱਟ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰਦਾ ਹੈ, ਅਤੇ ਕੱਚੇ ਦ੍ਰਿਸ਼ ਨੂੰ ਫਾਰਮੈਟ ਕੀਤੇ HTML ਨਾਲ ਬਦਲਦਾ ਹੈ: ਸਿਰਲੇਖ, ਟੇਬਲ, ਕੋਡ ਬਲਾਕ, ਕਾਰਜ ਸੂਚੀਆਂ, ਉਦਾਹਰਣਾਂ, ਚਿੱਤਰ ਅਤੇ ਲਿੰਕ — ਠੀਕ ਜਿਵੇਂ GitHub ਉੱਤੇ ਦਿਖਾਈ ਦਿੰਦੇ।

ਕੀ ਰੈਂਡਰ ਹੁੰਦਾ ਹੈ
• text/markdown ਅਤੇ text/x-markdown ਜਵਾਬ
• text/plain ਵਜੋਂ ਪਰੋਸੀਆਂ ਸਥਾਨਕ ਅਤੇ ਰਿਮੋਟ .md, .markdown, .mdown, .mkd, .mkdn ਫਾਈਲਾਂ
• GitHub-Flavored Markdown: ਟੇਬਲ, ਕਾਰਜ ਸੂਚੀਆਂ, ਸਟਰਾਈਕਥਰੂ, ਫੈਂਸਡ ਕੋਡ ਬਲਾਕ, ਆਟੋ-ਲਿੰਕ

ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ
• ਟੂਲਬਾਰ ਪੌਪਅੱਪ ਵਿੱਚ ਤਿੰਨ ਥੀਮ: ਆਟੋ (ਤੁਹਾਡੇ OS ਦੇ ਮਗਰ ਚਲਦਾ ਹੈ), ਹਲਕਾ, ਗੂੜਾ
• ਸਮੱਗਰੀ ਚੌੜਾਈ ਚੋਣਕਾਰ: ਤੰਗ (920px), ਚੌੜਾ (1440px) ਜਾਂ ਪੂਰਾ (ਵਿੰਡੋ ਭਰਦਾ ਹੈ)
• ਲਗਭਗ 30 ਆਮ ਭਾਸ਼ਾਵਾਂ ਲਈ ਸਿੰਟੈਕਸ ਹਾਈਲਾਈਟਿੰਗ (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, ਆਦਿ) — ਰੰਗ ਮੌਜੂਦਾ ਥੀਮ ਦੇ ਮਗਰ ਚਲਦੇ ਹਨ
• 17 ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਸਥਾਨਕ ਕੀਤਾ ਇੰਟਰਫੇਸ: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• ਪੰਨੇ ਦੇ ਫੁੱਟਰ ਵਿੱਚ "ਅਸਲ ਦੇਖੋ" ਲਿੰਕ ਕੱਚੇ Markdown ਉੱਤੇ ਜਾਣ ਲਈ ਅਤੇ "ਰੈਂਡਰ ਦੇਖੋ" ਵਾਪਸ ਆਉਣ ਲਈ
• ਉਹੀ ਟੌਗਲ ਪੌਪਅੱਪ ਵਿੱਚ ਵੀ ਉਪਲਬਧ ਹਨ
• GitHub-ਸਟਾਈਲ ਟਾਈਪੋਗ੍ਰਾਫੀ ਅਤੇ ਕੋਡ-ਬਲਾਕ ਰੰਗ (ਹਲਕਾ/ਗੂੜਾ prettylights ਪੈਲੇਟ ਸਮੇਤ)
• ਮੋਬਾਈਲ-ਅਨੁਕੂਲ ਰਿਸਪੌਂਸਿਵ ਲੇਆਉਟ
• ਥੀਮ ਅਤੇ ਚੌੜਾਈ ਤਰਜੀਹਾਂ ਤੁਹਾਡੇ ਸਾਈਨ-ਇਨ ਕੀਤੇ Chrome ਬਰਾਊਜ਼ਰਾਂ ਵਿਚਕਾਰ ਸਿੰਕ ਹੁੰਦੀਆਂ ਹਨ

ਗੋਪਨੀਯਤਾ
• ਕੋਈ ਡਾਟਾ ਇਕੱਠਾ ਨਹੀਂ — ਬਿਲਕੁਲ ਨਹੀਂ
• ਕੋਈ ਨੈੱਟਵਰਕ ਬੇਨਤੀ ਨਹੀਂ — ਸਾਰਾ ਰੈਂਡਰਿੰਗ ਤੁਹਾਡੇ ਬਰਾਊਜ਼ਰ ਵਿੱਚ ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਹੁੰਦਾ ਹੈ
• ਕੋਈ ਐਨਾਲਿਟਿਕਸ ਨਹੀਂ, ਕੋਈ ਟੈਲੀਮੈਟਰੀ ਨਹੀਂ, ਕੋਈ ਟ੍ਰੈਕਿੰਗ ਨਹੀਂ
• ਸਿਰਫ਼ ਤੁਹਾਡੀਆਂ ਥੀਮ ਅਤੇ ਚੌੜਾਈ ਤਰਜੀਹਾਂ ਸੰਭਾਲੀਆਂ ਜਾਂਦੀਆਂ ਹਨ, Chrome ਦੇ ਅੰਦਰੂਨੀ ਸਟੋਰੇਜ ਵਿੱਚ
• ਅਣਇੰਸਟਾਲ 'ਤੇ, Chrome ਪ੍ਰੋਜੈਕਟ ਦਾ ਫੀਡਬੈਕ ਪੰਨਾ ਖੋਲ੍ਹਦਾ ਹੈ ਤਾਂ ਜੋ ਤੁਸੀਂ ਦੱਸ ਸਕੋ ਕਿ ਕੀ ਠੀਕ ਕਰਨਾ ਹੈ

ਸੁਰੱਖਿਆ
• ਆਉਟਪੁੱਟ ਨੂੰ ਪੰਨੇ ਵਿੱਚ ਪਾਉਣ ਤੋਂ ਪਹਿਲਾਂ DOMPurify ਨਾਲ ਸੁਰੱਖਿਅਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ
• Manifest V3, ਕੋਈ ਰਿਮੋਟ ਕੋਡ ਨਹੀਂ, ਕੋਈ eval ਨਹੀਂ — ਸਾਰੀਆਂ ਲਾਇਬ੍ਰੇਰੀਆਂ (marked, DOMPurify, highlight.js, github-markdown-css) ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਬੰਡਲ ਹਨ
• ਓਪਨ ਸੋਰਸ — ਕੋਡ ਖੁਦ ਦੇਖੋ

ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ
1. ਐਕਸਟੈਨਸ਼ਨ ਇੰਸਟਾਲ ਕਰੋ
2. (ਵਿਕਲਪਿਕ) ਸਥਾਨਕ .md ਫਾਈਲਾਂ ਉੱਤੇ ਕੰਮ ਕਰਨ ਲਈ ਐਕਸਟੈਨਸ਼ਨ ਦੇ ਵੇਰਵੇ ਪੰਨੇ ਉੱਤੇ "ਫਾਈਲ URL ਤੱਕ ਪਹੁੰਚ ਦੀ ਆਗਿਆ ਦਿਓ" ਚਾਲੂ ਕਰੋ
3. ਕੋਈ ਵੀ Markdown ਪੰਨਾ ਖੋਲ੍ਹੋ — ਇਹ ਆਪਣੇ ਆਪ ਰੈਂਡਰ ਹੋਵੇਗਾ
4. ਥੀਮ ਬਦਲਣ, ਚੌੜਾਈ ਬਦਲਣ ਜਾਂ ਅਸਲ ਦੇਖਣ ਲਈ ਟੂਲਬਾਰ ਆਈਕਨ ਉੱਤੇ ਕਲਿੱਕ ਕਰੋ

ਇਜਾਜ਼ਤਾਂ
• ਸਟੋਰੇਜ — ਤੁਹਾਡੀਆਂ ਥੀਮ ਅਤੇ ਚੌੜਾਈ ਤਰਜੀਹਾਂ ਸੰਭਾਲਦੀ ਹੈ
• ਸਾਰੀਆਂ ਸਾਈਟਾਂ ਉੱਤੇ ਪਹੁੰਚ — ਲੋੜੀਂਦੀ ਹੈ ਕਿਉਂਕਿ Markdown ਕਿਸੇ ਵੀ ਡੋਮੇਨ ਤੋਂ ਪਰੋਸਿਆ ਜਾ ਸਕਦਾ ਹੈ, ਅਤੇ Chrome ਪੰਨੇ ਦੇ ਲੋਡ ਹੋਣ ਤੋਂ ਬਾਅਦ ਹੀ ਜਵਾਬ ਦੀ MIME ਕਿਸਮ ਦਿਖਾਉਂਦਾ ਹੈ। ਐਕਸਟੈਨਸ਼ਨ ਉਹਨਾਂ ਸਾਰੇ ਪੰਨਿਆਂ 'ਤੇ ਤੁਰੰਤ ਬੰਦ ਹੋ ਜਾਂਦਾ ਹੈ ਜੋ Markdown ਨਹੀਂ ਹਨ।

ਸਵਾਲ, ਬੱਗ ਜਾਂ ਫੀਚਰ ਬੇਨਤੀਆਂ? ਪ੍ਰੋਜੈਕਟ ਪੰਨੇ ਉੱਤੇ ਇੱਕ issue ਖੋਲ੍ਹੋ।
```

### Türkçe — `tr`

```
Markdown Viewer Ultra, Chrome'un ham metin olarak göstereceği herhangi bir sayfayı otomatik olarak temiz, GitHub tarzı bir belgeye dönüştürür.

Bir sunucu Content-Type: text/markdown ile yanıt verdiğinde (veya plain text olarak sunulan bir .md / .markdown dosyası açtığınızda), uzantı içeriği GFM uyumlu Markdown ile ayrıştırır, çıktıyı temizler ve ham görünümü biçimlendirilmiş HTML ile değiştirir: başlıklar, tablolar, kod blokları, görev listeleri, alıntılar, görseller ve bağlantılar — tıpkı GitHub'da görüneceği gibi.

NE RENDER EDİLİR
• text/markdown ve text/x-markdown yanıtları
• text/plain olarak sunulan yerel ve uzak .md, .markdown, .mdown, .mkd, .mkdn dosyaları
• GitHub-Flavored Markdown: tablolar, görev listeleri, üstü çizili, çitli kod blokları, otomatik bağlantılar

ÖZELLİKLER
• Araç çubuğu açılır penceresinde üç tema: Otomatik (işletim sisteminizi izler), Açık, Koyu
• İçerik genişliği seçici: Dar (920px), Geniş (1440px) veya Tam (pencereyi doldurur)
• Yaklaşık 30 yaygın dil için sözdizimi vurgusu (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, ve daha fazlası) — renkler etkin temayı izler
• 17 dilde yerelleştirilmiş arayüz: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• Sayfa altbilgisindeki "Orijinali gör" bağlantısı ham Markdown'a geçmek için ve geri dönmek için "Render edilmişi gör"
• Aynı geçişler açılır pencerede de mevcuttur
• GitHub tarzı tipografi ve kod bloğu renklendirme (açık/koyu prettylights paleti dahil)
• Mobil uyumlu duyarlı düzen
• Tema ve genişlik tercihleri oturum açtığınız Chrome tarayıcıları arasında senkronize olur

GİZLİLİK
• Veri toplama yok — hiç
• Ağ isteği yok — tüm render işlemi tarayıcınızda yerel olarak gerçekleşir
• Analitik yok, telemetri yok, izleme yok
• Yalnızca tema ve genişlik tercihleriniz saklanır, Chrome'un yerleşik depolamasında
• Kaldırıldığında, Chrome neyi düzeltmemiz gerektiğini söyleyebilmeniz için projenin geri bildirim sayfasını açar

GÜVENLİK
• Çıktı, sayfaya eklenmeden önce DOMPurify ile temizlenir
• Manifest V3, uzak kod yok, eval yok — tüm kütüphaneler (marked, DOMPurify, highlight.js, github-markdown-css) yerel olarak paketlenmiştir
• Açık kaynak — kodu kendiniz inceleyin

NASIL KULLANILIR
1. Uzantıyı yükleyin
2. (İsteğe bağlı) Yerel .md dosyalarında çalışması için uzantının ayrıntılar sayfasında "Dosya URL'lerine erişime izin ver" seçeneğini etkinleştirin
3. Herhangi bir Markdown sayfası açın — otomatik olarak render edilir
4. Temayı değiştirmek, genişliği değiştirmek veya orijinali görmek için araç çubuğu simgesine tıklayın

İZİNLER
• Depolama — tema ve genişlik tercihlerinizi kaydeder
• Tüm sitelere erişim — gerekli çünkü Markdown herhangi bir alan adından sunulabilir ve Chrome yanıtın MIME türünü yalnızca sayfa yüklendikten sonra ortaya çıkarır. Uzantı, Markdown olmayan her sayfada hemen sonlanır.

Sorular, hatalar veya özellik istekleri? Proje sayfasında bir issue açın.
```

### עברית — `he`

```
Markdown Viewer Ultra הופך אוטומטית כל דף ש-Chrome היה מציג כטקסט גולמי למסמך נקי בסגנון GitHub.

כאשר שרת מגיב עם Content-Type: text/markdown (או שאתם פותחים קובץ .md / .markdown המוגש כטקסט פשוט), התוסף מנתח את התוכן באמצעות Markdown תואם GFM, מחטא את הפלט ומחליף את התצוגה הגולמית ב-HTML מעוצב: כותרות, טבלאות, בלוקי קוד, רשימות משימות, ציטוטים, תמונות וקישורים — בדיוק כפי שהיו נראים ב-GitHub.

מה מעובד
• תגובות text/markdown ו-text/x-markdown
• קבצי .md, .markdown, .mdown, .mkd, .mkdn מקומיים ומרוחקים המוגשים כ-text/plain
• GitHub-Flavored Markdown: טבלאות, רשימות משימות, קו חוצה, בלוקי קוד מגודרים, קישורים אוטומטיים

תכונות
• חלון קופץ בסרגל הכלים עם שלוש ערכות נושא: אוטומטי (עוקב אחר מערכת ההפעלה), בהיר, כהה
• בורר רוחב התוכן: צר (920px), רחב (1440px) או מלא (ממלא את החלון)
• הדגשת תחביר ל-30 שפות נפוצות (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS ועוד) — הצבעים עוקבים אחר ערכת הנושא הפעילה
• ממשק מתורגם ל-17 שפות: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• קישור "הצג מקור" בכותרת התחתונה של הדף למעבר ל-Markdown הגולמי ו-"הצג מעובד" לחזרה
• אותם מתגים זמינים גם בחלון הקופץ
• טיפוגרפיה בסגנון GitHub וצביעת בלוקי קוד (כולל לוחות צבעים prettylights בהיר/כהה)
• פריסה רספונסיבית, ידידותית למובייל
• העדפות ערכת נושא ורוחב מסונכרנות בין דפדפני Chrome המחוברים שלכם

פרטיות
• ללא איסוף נתונים — כלל
• ללא בקשות רשת — כל העיבוד מתרחש מקומית בדפדפן שלכם
• ללא ניתוח נתונים, ללא טלמטריה, ללא מעקב
• הדבר היחיד הנשמר הוא העדפות ערכת הנושא והרוחב שלכם, באחסון המובנה של Chrome
• בעת הסרת ההתקנה, Chrome פותח את דף המשוב של הפרויקט כדי שתוכלו לספר לנו מה לתקן

אבטחה
• הפלט מחוטא באמצעות DOMPurify לפני שהוא משולב בדף
• Manifest V3, ללא קוד מרוחק, ללא eval — כל הספריות (marked, DOMPurify, highlight.js, github-markdown-css) ארוזות מקומית
• קוד פתוח — בדקו את הקוד בעצמכם

כיצד להשתמש
1. התקינו את התוסף
2. (אופציונלי) הפעילו "אפשר גישה לכתובות URL של קבצים" בדף הפרטים של התוסף כדי שיעבוד עם קבצי .md מקומיים
3. פתחו כל דף Markdown — הוא יעובד אוטומטית
4. לחצו על סמל סרגל הכלים כדי להחליף ערכת נושא, לשנות רוחב או להציג את המקור

הרשאות
• אחסון — שומר את העדפות ערכת הנושא והרוחב שלכם
• גישה לכל האתרים — נדרשת מכיוון ש-Markdown יכול להיות מוגש מכל דומיין, ו-Chrome חושף את סוג ה-MIME של התגובה רק לאחר טעינת הדף. התוסף יוצא מיד מכל דף שאינו Markdown.

שאלות, באגים או בקשות לתכונות? פתחו issue בדף הפרויקט.
```

### العربية — `ar`

```
يحوّل Markdown Viewer Ultra تلقائيًا أي صفحة كان Chrome سيعرضها كنص خام إلى مستند نظيف على طراز GitHub.

عندما يستجيب الخادم بـ Content-Type: text/markdown (أو تفتح ملف .md / .markdown يُقدَّم كنص عادي)، تقوم الإضافة بتحليل المحتوى باستخدام Markdown متوافق مع GFM، وتنظّف الإخراج، وتستبدل العرض الخام بـ HTML منسّق: عناوين وجداول وكتل كود وقوائم مهام واقتباسات وصور وروابط — تمامًا كما كانت ستظهر على GitHub.

ما يتم عرضه
• استجابات text/markdown و text/x-markdown
• ملفات .md, .markdown, .mdown, .mkd, .mkdn المحلية والبعيدة المُقدَّمة كـ text/plain
• GitHub-Flavored Markdown: جداول، قوائم مهام، نص مشطوب، كتل كود مسوّرة، روابط تلقائية

الميزات
• نافذة منبثقة في شريط الأدوات مع ثلاث سمات: تلقائي (يتبع نظام التشغيل)، فاتح، داكن
• محدد عرض المحتوى: ضيق (920px) أو واسع (1440px) أو كامل (يملأ النافذة)
• تمييز بناء الجملة لحوالي 30 لغة شائعة (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS وغيرها) — الألوان تتبع السمة النشطة
• واجهة مترجمة إلى 17 لغة: English, Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية
• رابط "عرض الأصلي" في تذييل الصفحة للتبديل إلى Markdown الخام و"عرض المعروض" للعودة
• نفس مفاتيح التبديل متاحة في النافذة المنبثقة
• طباعة بطراز GitHub وتلوين كتل الكود (بما في ذلك لوحة prettylights الفاتحة/الداكنة)
• تخطيط متجاوب وملائم للهواتف
• تفضيلات السمة والعرض تتزامن بين متصفحات Chrome التي قمت بتسجيل الدخول إليها

الخصوصية
• لا جمع للبيانات — على الإطلاق
• لا طلبات شبكة — كل العرض يتم محليًا في متصفحك
• لا تحليلات، لا قياس عن بُعد، لا تتبع
• الشيء الوحيد المحفوظ هو تفضيلات السمة والعرض الخاصة بك، في تخزين Chrome المدمج
• عند إلغاء التثبيت، يفتح Chrome صفحة ملاحظات المشروع حتى تخبرنا بما يجب تحسينه

الأمان
• يتم تنظيف الإخراج باستخدام DOMPurify قبل إدراجه في الصفحة
• Manifest V3، بدون كود بعيد، بدون eval — جميع المكتبات (marked, DOMPurify, highlight.js, github-markdown-css) مُدمجة محليًا
• مفتوح المصدر — تحقق من الكود بنفسك

كيفية الاستخدام
1. ثبّت الإضافة
2. (اختياري) فعّل "السماح بالوصول إلى عناوين URL للملفات" في صفحة تفاصيل الإضافة لكي تعمل مع ملفات .md المحلية
3. افتح أي صفحة Markdown — سيتم عرضها تلقائيًا
4. انقر على رمز شريط الأدوات لتبديل السمة أو تغيير العرض أو رؤية الأصلي

الأذونات
• التخزين — يحفظ تفضيلات السمة والعرض الخاصة بك
• الوصول إلى جميع المواقع — مطلوب لأن Markdown يمكن تقديمه من أي نطاق، و Chrome يكشف عن نوع MIME للاستجابة فقط بعد تحميل الصفحة. الإضافة تخرج فورًا في كل صفحة ليست Markdown.

أسئلة أو أخطاء أو طلبات ميزات؟ افتح issue على صفحة المشروع.
```

---

## Permission justifications

The dashboard asks for a justification per permission. Paste these into the matching fields.

**`storage` permission**
```
Used to persist the user's display preferences — theme (Auto / Light / Dark) and content width (Narrow / Wide / Full) — across sessions and sync them across the user's signed-in Chrome installations via chrome.storage.sync. No other data is stored.
```

**Host permission — `<all_urls>`**
```
The extension must run on any URL because the response Content-Type (text/markdown) is only known after the page loads, not at request time. The content script checks document.contentType on every page and immediately exits unless the response is Markdown — no inspection, no DOM modification, no network activity on non-Markdown pages. The fallback URL-extension check (.md, .markdown, etc.) only activates on text/plain responses for the same reason: many static file hosts serve Markdown files as text/plain.
```

**Remote code use**
```
No. All libraries (marked, DOMPurify, highlight.js, github-markdown-css) are vendored locally in the extension package. No code is fetched at runtime.
```

---

## Privacy practices (Data usage form)

Tick **No** for all data-collection categories. The single-purpose statement and disclosures:

**Single purpose disclosure**
```
Render Markdown content as formatted HTML when a page is served with the text/markdown MIME type or has a Markdown file extension.
```

**Data usage certifications** (tick all three)
- I do not sell or transfer user data to third parties, outside of approved use cases
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- I do not use or transfer user data to determine creditworthiness or for lending purposes

**Data collected**: None of the categories apply. Leave them all unchecked.

If the form requires a privacy policy URL because of the `<all_urls>` host permission, host a one-page policy somewhere (GitHub Pages works). A minimal policy is included below.

---

## Minimal privacy policy (host on GitHub Pages / your site)

```
# Markdown Viewer Ultra — Privacy Policy

Effective: [DATE]

Markdown Viewer Ultra does not collect, store, transmit, or share any personal data.

WHAT THE EXTENSION DOES
The extension reads the content of the page you are currently viewing only when that page's response Content-Type is text/markdown (or the URL ends in a Markdown file extension and is served as text/plain). It renders that content locally in your browser and replaces the page body with formatted HTML.

WHAT IS STORED
The extension stores two preferences — your selected theme (Auto, Light, or Dark) and your selected content width (Narrow, Wide, or Full) — using Chrome's built-in storage API. Chrome may sync these preferences between your signed-in browsers using chrome.storage.sync. The extension does not store or transmit anything else.

WHAT IS NOT DONE
- No analytics, no telemetry, no tracking
- No network requests of any kind
- No reading of pages that are not Markdown
- No sharing of data with third parties

CONTACT
Questions about this policy: [YOUR EMAIL]
```

---

## Assets checklist

Required before submission:

| Asset                 | Spec                  | Status |
| --------------------- | --------------------- | ------ |
| Store icon            | 128×128 PNG           | ✅ `icons/icon-128.png` |
| Screenshots           | 1280×800 or 640×400, 1–5 | ✅ `store-assets/screenshot-*.png` (script: `scripts/take-screenshots.js`) |
| Small promo tile      | 440×280 PNG           | ✅ `store-assets/promo-440x280.png` |
| Marquee promo (optional) | 1400×560 PNG       | ✅ `store-assets/promo-1400x560.png` |
| Privacy policy URL    | public webpage        | ✅ `https://github.com/danarrib/markdown-viewer-ultra/blob/master/PRIVACY.md` |

**Regenerating screenshots** — `scripts/take-screenshots.js` drives a real Chromium with the unpacked extension loaded and saves three 1280×800 PNGs per locale (sample dark/narrow, sample light/wide, raw view light/narrow) under `store-assets/screenshots/<locale>/`. The script iterates all 17 supported locales, using `samples/<locale>.md` as the source. Run with `cd scripts && npm install && npm run screenshots`. Companion scripts: `npm run popup-screenshots` (raw 280px popup PNGs) and `npm run popup-cards` (1280×800 popup cards on a gradient background).

---

## Changelog

Format follows [Keep a Changelog](https://keepachangelog.com/). Versions are git tags on `master`.

### [0.3.0] — 2026-05-26

**Added**
- Localized UI in 17 languages — English (default), Português (BR), Português (PT), Español, Français, Deutsch, Italiano, 日本語, 简体中文, 繁體中文, Русский, हिन्दी, বাংলা, ਪੰਜਾਬੀ, Türkçe, עברית, العربية — via `_locales/` and Chrome's `chrome.i18n` API
- Per-locale `samples/<dir>.md` test fixtures so screenshots can be regenerated in any supported language
- Syntax highlighting on fenced code blocks via highlight.js Common build (~30 languages). Token classes mapped to GitHub's `--color-prettylights-syntax-*` variables so code colors follow the active theme
- Content-width picker in the popup: **Narrow** (920px, default), **Wide** (1440px), **Full** (no max — fills the viewport with 1.5rem side margins)
- Background service worker registers a `chrome.runtime.setUninstallURL` pointing at the feedback issue (`/issues/1`) so Chrome opens it when the user removes the extension

**Changed**
- Popup version label reads from `chrome.runtime.getManifest()` instead of being hardcoded
- Manifest description shortened to fit the 132-char Web Store limit and converted to `__MSG_extDescription__` so each locale ships its own copy

**Tooling**
- `scripts/take-screenshots.js` — Playwright-driven generator for the 1280×800 store screenshots, runnable via `npm run screenshots`
- `store-assets/` now contains promo tile (440×280), marquee (1400×560), and the three generated screenshots

### [0.2.0] — 2026-05-23

**Added**
- Toolbar popup with theme picker (Auto / Light / Dark) persisted in `chrome.storage.sync`
- Per-page raw / rendered toggle accessible from both the popup and the footer "See original" link
- PNG icons at 16, 32, 48, 128
- Forced light/dark theme overrides redeclaring the GitHub prettylights variables under `html.mvu-force-{light,dark}`

**Submitted to the Chrome Web Store and approved.**

### [0.1.0] — 2026-05-23

**Added**
- Initial scaffold: auto-render `text/markdown` and `text/x-markdown` responses, plus `.md` / `.markdown` / `.mdown` / `.mkd` / `.mkdn` files served as `text/plain`
- marked@14 for parsing, DOMPurify@3 for sanitization, github-markdown-css@5 for typography
- Auto-theme via `prefers-color-scheme` media query
