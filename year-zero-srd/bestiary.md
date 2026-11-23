<!DOCTYPE html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bestiary — Root &amp; Claw</title>
<meta name="description" content="Bestiary of the Overgrowth — scavengers, predators, root and sap things, the rot-touched, and great beasts.">

<link rel="stylesheet" href="assets/book.css">
<link rel="stylesheet" href="assets/bestiary.css">

<script defer src="assets/i18n.js"></script>
<script type="module" src="assets/bestiary.js"></script>
</head>
<body>

<div class="rail">
  <div class="rail-inner">
    <a href="index.html" class="rail__brand" data-enbrand="index" data-rubrand="">
      <span class="rail__brand-mark">ROOT &amp; CLAW</span>
      <span class="rail__brand-name">The Bestiary</span>
      <span class="rail__brand-sub">Bestiary</span>
    </a>
    <form class="rail-search" role="search" aria-label="Search">
      <input type="search" data-page-search placeholder="Search" aria-label="Search the bestiary" value="">
      <span class="rail-search__kbd">⌕</span>
    </form>
    <nav class="rail-toc" data-toc></nav>
    <div class="rail-foot">
      <div class="rail-lang">
        <button data-alt-lang="lore.html" class="lang">EN</button>
        <button data-alt-lang="bestiary.html" class="lang">EN</button>
        <button data-alt-lang="bestiary.ru.html" class="lang">RU</button>
      </div>
      <span class="rail-foot-links">
        <a href="index.html" data-en="All books" data-ru="Все книги">All books</a>
      </span>
    </div>
  </div>
</div>

<main>
  <header class="pg-head">
    <div class="pg-kicker">Root &amp; Claw · Bestiary</div>
    <h1>Bestiary</h1>
    <p>
      A page of bestiary — the things people meet in the Overgrowth, what they are,
      what they want, and what the Tree has made of them.
    </p>
  </header>

  <div class="best-filters">
    <div class="chips">
      <button type="button" data-threat-filter="0" class="chip" aria-pressed="true">All</button>
      <button type="button" data-threat-filter="1" class="chip">● Low</button>
      <button type="button" data-threat-filter="2" class="chip">●● Medium</button>
      <button type="button" data-threat-filter="3" class="chip">●●● High</button>
    </div>
    <label class="best-search">
      <span class="visually-hidden">Filter by keyword</span>
      <input type="search" data-best-search placeholder="Filter by keyword…">
    </label>
    <p class="best-count" data-best-count role="status"></p>
  </div>

  <div class="container bestiary">
    <section class="chapter" id="scavengers">
      <div class="chapter__head">
        <span class="chapter__num">01</span>
        <h2>Scavengers and pests</h2>
      </div>
      <p class="chapter__lead" id="lead-scavengers"></p>
      <div class="beasts" id="beasts-scavengers"></div>
    </section>

    <section class="chapter" id="predators">
      <div class="chapter__head">
        <span class="chapter__num">02</span>
        <h2>Predators</h2>
      </div>
      <p class="chapter__lead" id="lead-predators"></p>
      <div class="beasts" id="beasts-predators"></div>
    </section>

    <section class="chapter" id="roots">
      <div class="chapter__head">
        <span class="chapter__num">03</span>
        <h2>Root and sap things</h2>
      </div>
      <p class="chapter__lead" id="lead-roots"></p>
      <div class="beasts" id="beasts-roots"></div>
    </section>

    <section class="chapter" id="rot">
      <div class="chapter__head">
        <span class="chapter__num">04</span>
        <h2>The rot-touched</h2>
      </div>
      <p class="chapter__lead" id="lead-rot"></p>
      <div class="beasts" id="beasts-rot"></div>
    </section>

    <section class="chapter" id="great">
      <div class="chapter__head">
        <span class="chapter__num">05</span>
        <h2>Great things</h2>
      </div>
      <p class="chapter__lead" id="lead-great"></p>
      <div class="beasts" id="beasts-great"></div>
    </section>
  </div>

  <footer class="pg-foot">
    <p><strong>How to read a beast.</strong> One card per monster. A stat line gives the
      classic numbers — the modern game uses the same order, with ranks instead of numbers.
      Threat tells roughly what it does to a careless party. “What it wants” is the first thing to
      decide about it at a table.</p>
    <p data-name="edition">Bestiary — Root &amp; Claw by SandPit</p>
  </footer>
</main>

<script>
  var __page = { langPage: "bestiary" };
</script>
</body>
</html>
