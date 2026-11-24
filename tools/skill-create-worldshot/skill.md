---
name: root-and-claw-create-worldshot
description: >
  Create a world module (worldshot or company) as a separate folder in the
  project: main locations, factions, key creatures, a text world map and the
  folder's own README and notes. Asks what should be in it, references the
  Root & Claw module, the player's book and the lore by real file names, writes
  in Russian and leaves instructions for the model that continues the world.
  For "напиши ваншот", "создай компанию", "построй мир", "локации, фракции,
  существа, карта".
---

# root-and-claw-create-worldshot

Use this skill when the user asks for a company, a world module, a worldshot, a
location pack or a faction pack — anything that results in a new folder of world
content. It creates the folder and fills it with the world, not with a
ready-to-run chapter; chapters belong to `skill-write-chapter-for-world`.

Two shared documents are binding here:

- `tools/root-and-claw/reference/rules-map.md` — all system facts (nine
  lineages, twelve skills, XP, mutations, aura, load, magic, panic);
- `tools/root-and-claw/reference/world-contract.md` — folder layout, file names,
  language, reference discipline, question order, encounter ranking, 4–5 hour
  sizing, AI notes block, continue-or-new.

Read both before writing. Do not repeat their content in this file, and do not
invent rules that are not there.

## What this skill produces

A folder built to the layout in `world-contract.md` § «Папка мира»:
`README.md`, `world.md`, `карта.md`, `локации/`, `фракции/`, `существа/`,
`заметки.md`, and `сцены.md` / `house-rules.md` only if the user wants them.
`главы/` is created when the first chapter is written, not before.

The folder is self-contained: nothing is scattered in the project root, and one
world is always one folder.

## How to work

1. Ask the questions from `world-contract.md` § «Вопросы», in that order, one or
   two at a time. Skip what the user already answered.
2. Write `world.md` first — the world in one paragraph, the main question, the
   central place, the conflict, the mood — so the rest has a spine.
3. Then `карта.md`: regions or zones, what is where, how far, what the players
   can reach. If the user wants a drawn map, note it as a to-do instead of
   pretending it exists.
4. Then locations, factions and creatures, one file each when they are big and
   one list file when they are short. Creatures are taken from the module and
   the lore with a pointer, or written as new and marked as new.
5. `заметки.md` last, with the AI notes block from `world-contract.md`
   § «Блок заметок для модели», including what is written, what is missing,
   which questions are open, and what must not be invented without asking.
6. If the user also wants ranked fights, puzzles, social scenes and exploration
   beats, produce them as `сцены.md` using the ranking in `world-contract.md`
   § «Ранжирование сцен».

## Referencing

Every document points at the source it leans on with a real file name, as in
`world-contract.md` § «Ссылки на источники». Typical inline pointers:
«характеристики и опыт — `02-player-characters.ru.md`», «навыки и
специализации — `03-skills-specializations.ru.md`», «бой — `04-combat-damage.ru.md`»,
«магия — `05-magic.ru.md`, паника — `05-magic-psychosis.md`», «путешествия —
`06-travel.ru.md`», «Древо, Гниль, линии и места — `07-lore.ru.md`», «линии,
мутации и звериные черты — `module.ru.html`».

A house rule is written as a house rule and names what it changes. There is no
bestiary file in the project, so never link to one.

## Example

«Создай ваншот про посольство в затопленном дворе» → ask what it is, which
lineage holds it, who runs it, what they want, which creatures matter, what map
level is wanted, how many hours, then write the folder: `world.md`, `карта.md`,
`локации/`, `фракции/`, `существа/`, `заметки.md`.
