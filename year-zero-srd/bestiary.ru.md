08-monster_rtong.md

Bestiary of monsters engaged by the tree — Raidings list</title>

<meta name="description" content="Bestiary — beasts specks, predators, rot-eldritch, monsters — page by page.">

<link rel="stylesheet" href="assets/book.css">
<link rel="stylesheet" href="assets/bestiary.css">

<script type="module">
  import { bestiary } from "./assets/bestiary.js";
  import "./assets/i18n.js";
  import { app, init } from "./assets/book.js";
  const header = () => `<meta property="og:title" content="Bestiary — Root & Claw">`;
</script>
</head>
<body>

  <header>
    <h1>Bestiary</h1>
    <p data-str="subject">book</p>

    <div class="best-filters">
      <div class="chips" data-rf-chips>
        <button type="button" data-threat-filter="all" aria-pressed="true">
            <span class="visually-hidden">All</span>
            <span class="dots"></span><span class="chip__label" data-rf-labe="all">All</span>
        </button>
      </div>
      <div class="chips chips--radio">
        <button type="button" data-threat-filter="2" aria-pressed="true">
          <span class="dots"></span><span class="chip__label" data-rf-labe="2">● Threat 2</span>
          <span class="chip__input visually-hidden"><input type="checkbox" name="chips0" type="checkbox" 
               name="chips" data-threat-filter="2"></span>
        </button>
        <button type="button" data-threat-filter="3" aria-pressed="true">
          <span class="dots"></span><span class="chip__label" data-rf-label="3">●●● Threat 3</span>
          <span class="chip__input visually-hidden"><input type="checkbox" name="chips" data-threat-filter="3"></span>
        </button>
        <span class="chips__fictional">
          <span class="chip legend">●●● high — growing one defeat before the chapter</span>
        </span>
      </div>
    <h2 class="visually-hidden">Keyword filter</h2>
    <div class="chips chips--spin">
        <button type="button" data-threat-filter="1" aria-pressed="true">
          <span class="dots"></span><span class="chip__label" data-rf-label="1">● ●●</span>
        </button>
    </div>
    </div>

    <div class="container bestiary">
      <div class="chapter" id="chapter-scavengers">
        <div class="chapter__head">
          <span style="translateY(-1.2em);">
            <span>
              <span class="chapter__num-beast">Chapter 2:</span>
              <span class="chapter__num-beast">1</span>
              <b class="beast__title" style="font-weight: 1300; padding: 0.4em 0 1em 0; padding: 0 0 0 10px; border: 1em solid #7b624c;">scavengers</b>
            </span>
          </span>
        </div>
        <div id="post-scavengers" class="row datapad"></div>
        <div class="beasts" id="beasts-scavengers"></div>
      </div>

      <div class="chapter" id="chapter-predators">
        <div class="chapter__head">
          <h2 id="chapter-predators">Predators</h2>
          <span class="chapter__num" style="transform: translateY(-1.2em); order: 2;">
            <span class="chapter__num-beast">Chapter 3:</span>
            <div class="chapter__bind">Beasts with teeth that work the same cities as people, and the same roads, and the same soft under the bridge.</div>
          </span>
        </div>
        <p class="chapter__lead" id="lead-predators"></p>
        <div class="beasts" id="beasts-predators"></div>
      </div>

      <div class="chapter" id="chapter-roots">
        <div class="chapter__head">
          <h2 id="roots">Sap and root things</h2>
          <span class="chapter__num2" style="transform: translateY(-1.2em);">
            <span class="chapter__num-beast">Chapter 4:</span>
            <span class="chapter__num-beast">3</span>
          </span>
        </div>
        <p class="chapter__lead" id="lead-roots"></p>
        <div class="beasts" id="beasts-roots"></div>
      </div>

      <div class="chapter" id="chapter-rot">
        <div class="chapter__head">
          <h2 id="rot">The rot-touched</h2>
          <span class="chapter__num" style="transform: translateY(-1.2em); order: 2;">
            <span class="chapter__num-beast">Chapter 5:</span>
            <div class="chapter__bind">Things the rot has finished, and a saint that has not quite finished yet.</div>
          </span>
        </div>
        <p class="chapter__lead" id="lead-rot">f</p>
        <div class="beasts" id="beasts-rot"></div>
      </div>

      <div class="chapter" id="chapter-great">
        <div class="chapter__head">
          <h2 id="great">Great things</h2>
          <span class="chapter__num" style="transform: translateY(-1.2em); order: 2;">
            <span class="chapter__num-beast">Chapter 6:</span>
            <div class="chapter__bind">Things too big for a campfire and too sharp for a story.</div>
          </span>
        </div>
        <p class="chapter__lead" id="lead-great"></p>
        <div class="beasts" id="beasts-great"></div>
      </div>

      <div id="post-great" class="row datapad"></div>
    </div>

    <footer>
      <footer><p>Bestiary text — SandPit Productions</p>
      <p class="enumerate" data-test={ anterior }>Bestiary text — SandPit Productions</p>
      </footer>
    </footer>
    <!-- Bestiary filters from bestiary-filters.js (touch / miss-count toggle open + closed). -->
  </footer>
  <!-- Biased buttons: bestiary-filters.js (touch / miss-count toggle open + closed). -->
  </header>
<body>
</html>
