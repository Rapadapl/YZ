/* Interface strings for both languages. Page content lives in the pages
   themselves; only chrome (navigation, controls, system messages) is here.
   The language of a page is declared by <html lang="...">. */

window.YZE_STRINGS = {
  en: {
    contents: "Contents",
    searchLabel: "Search this book",
    searchPlaceholder: "Search chapters",
    searchEmpty: "Nothing matches “{q}”. Try a skill, a weapon or a rule name.",
    print: "Print or save PDF",
    library: "All books",
    openMenu: "Contents",
    closeMenu: "Close contents",
    skip: "Skip to the text",
    onThisPage: "Reading position",
    progressLabel: "Reading progress",
    prev: "Previous chapter",
    next: "Next chapter",
    language: "Language",
    playerBook: "Player's book",
    masterBook: "Master's book",
    edition: "System reference",
    note: "Rules reference compiled from the Year Zero Engine SRD. Covers the classic dice-pool variant and the modern ranked-die variant side by side.",
    contentsNote: "Chapter list",
    backToStart: "Back to the beginning",
    sheet: "Character sheet",
    sheetSaved: "Saved in this browser",
    sheetSaveFailed: "Not saved — this browser blocks local storage",
    sheetExported: "Copy saved as a file",
    sheetImported: "Sheet opened",
    sheetImportFailed: "That file is not a character sheet",
    sheetConfirmBlank: "Clear this sheet and start a new character?",
    sheetBlank: "Blank sheet",
    sheetLoad: "Load"
  },
  ru: {
    contents: "Содержание",
    searchLabel: "Поиск по книге",
    searchPlaceholder: "Поиск по главам",
    searchEmpty: "По запросу «{q}» ничего нет. Попробуйте название навыка, оружия или правила.",
    print: "Печать или PDF",
    library: "Все книги",
    openMenu: "Содержание",
    closeMenu: "Закрыть содержание",
    skip: "Перейти к тексту",
    onThisPage: "Позиция чтения",
    progressLabel: "Прогресс чтения",
    prev: "Предыдущая глава",
    next: "Следующая глава",
    language: "Язык",
    playerBook: "Книга игрока",
    masterBook: "Книга мастера",
    edition: "Система правил",
    note: "Справочник по правилам, собранный из Year Zero Engine SRD. Классический вариант с пулом d6 и современный вариант с ранговыми кубиками разобраны параллельно.",
    contentsNote: "Список глав",
    backToStart: "В начало",
    sheet: "Лист персонажа",
    sheetSaved: "Сохранено в этом браузере",
    sheetSaveFailed: "Не сохранено — браузер блокирует локальное хранилище",
    sheetExported: "Копия сохранена в файл",
    sheetImported: "Лист открыт",
    sheetImportFailed: "Этот файл не похож на лист персонажа",
    sheetConfirmBlank: "Очистить лист и начать нового персонажа?",
    sheetBlank: "Чистый лист",
    sheetLoad: "Нагрузка"
  }
};

window.YZE_LANG = document.documentElement.lang === "ru" ? "ru" : "en";

window.YZE_STR = (key, vars) => {
  const table = window.YZE_STRINGS[window.YZE_LANG] || window.YZE_STRINGS.en;
  let value = table[key] || window.YZE_STRINGS.en[key] || key;
  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replace(`{${name}}`, replacement);
    }
  }
  return value;
};
