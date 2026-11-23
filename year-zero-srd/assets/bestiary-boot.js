/* Bestiary-specific: always read the data first, then render. */
(function(){
  "use strict";
  function ready(){
    if (typeof ROOTCLAW_BESTIARY !== "object" || !Array.isArray(ROOTCLAW_BESTIARY)){
      // fallback: poll once
      setTimeout(ready, 80);
      return;
    }
    exportF();
  }
  ready();
})();
