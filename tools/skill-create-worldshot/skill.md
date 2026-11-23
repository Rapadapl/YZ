---
name: root-and-claw-create-worldshot
description: >
  Create a world module (company or worldshot) as a separate folder inside the
  project. Asks what should be in it, writes the main locations, factions,
  key creatures, world map in text, and the local structure. Fully references
  the Root & Claw module and the player's book, asks questions, writes the
  documents in Russian, and leaves instructions for the AI model that will
  continue working with the world. Useful for any "напиши ваншот",
  "создай компанию", "сделай_world", "построить мир", "локи,
  фракции, существа, карта" request.
---

# root-and-claw-create-worldshot

Use this skill when the user asks for a company, a world module, a worldshot,
a location pack, a faction pack, a "run a world", or anything that results in a
new folder of world content under the project. The world content must be
self-contained inside a folder in the project, written in Russian, and
cross-referenced with the Root & Claw module and the player's book.

## Where the world lives

- All new world content goes into a folder under the project root, e.g.
  `worlds/<world-name>/` or `companies/<company-name>/` or any folder the user
  names. If the user does not name a path, create `worlds/<world-name>/` and
  tell them the path.
- The folder should be a self-contained world module: its own `README.md` (in
  Russian), its own `index.md` or `world.md` that describes the world in one
  place, and subfolders as needed: `loki/` (locations), `fraktsii/` (factions),
  `suщества/` (key creatures), `karta.md` or `karta.txt` (world map in text),
  `glossary.md` if the world has its own terms, `notes.md` for AI instructions
  and GM notes, `src/` for any source bits.

## Asking questions

Ask only the questions needed to shape the world. Do not dump a 20-question
survey. Ask in Russian, one or two questions at a time, and keep the user's
answers as the source of truth. Ask in this order unless the user already gave
some of it:

1. What kind of world is this: a company, a worldshot, a location pack, a
   faction pack, or a full world? What is the one-sentence description the user
   wants on the cover.
2. Which Root & Claw setting pieces does it touch: the Tree, the rot, the
   Overgrowth lands, the lineages, the beast traits, the magic traditions, the
   seasons? Name them.
3. What are the main locations? Ask for the scope: how many locations, what kind
   (urban, wild, ruin, inhabited), and what the user wants to do there.
4. What are the factions? Ask for each faction's role, who runs it, what it
   wants, and how it treats the Tree and the rot.
5. What are the key creatures? Ask which creatures from the bestiary or new
   creatures are important, and why.
6. What is the tone and difficulty: one long game, a short run, a sandbox, a
   set of encounters? How many encounters of each type if the user names them
   (fights, puzzles, social, exploration).
7. What is the world map: does the user want a paragraph map, a list of regions,
   a hex description, or a named map with a few places? Write whatever they ask.
8. Any extra rules or house rules? If the user wants to use the module's
   psychosis table, custom skills, custom mutations, or any local variant, ask
   what they want and write it down.
9. Who is the audience: GM only, players too, both? What should the AI model
   know when continuing the work?

Never invent the user's setting. If they say "like Biomutant but darker", that is
a tone cue, not a content dump; ask what that means here.

## Referencing the module and player's book

Every document in the world module must reference the source it leans on, so a
reader or an AI can find the rules. In the text, say, for example:

- "По правилам Корня и Когтя, характеристики 1–5 (классика) или A–D (современный вариант). Смотри 02-player-characters.md."
- "Линейка навыков по модулю: 12 навыков и мутации. Смотри модуль."
- "Для магии используем традиции из 05-magic.md и таблицу психоза из 05-magic-psychosis.md, если включено."
- "Звери — по бестиарию модуля, а если свой — опиши по правилам сущности из модуля: угроза, атаки, особенность, что хочет, что можно забрать."
- "Если включён современный вариант, используем ранги A–D и проверки на 6+; если классика — d6 и успехи по 6."

If the world uses a house rule, write it as a house rule and say what it changes.

## World structure

A good world module folder looks like this:

- `README.md` (Russian): what this world is, what it uses, links into the module.
- `world.md` or `index.md`: one-page summary — the world in a paragraph, the main
  question, the central place, the main conflict, the mood.
- `karta.md` or `karta.txt`: a world map in text. Enough to play: regions or
  zones, what is where, how far things are, and what the players can reach. If
  the user wants a proper map image, say so and keep it as a note for later.
- `loki/` : one file per location or one file with a list, depending on size.
- `fraktsii/` : one file per faction or one file with a list.
- `suщества/` : key creatures, either from the bestiary with references or new
  creatures written against the module's creature rules.
- `glossary.md` (optional): local terms with short definitions.
- `notes.md` : GM notes, AI instructions, questions still open, what to ask next,
  and what the world is not yet.
- `encounters.md` or `bitva.md` etc. if the user wants a ranked list of fights,
  puzzles, social scenes, exploration beats.
- `house-rules.md` if there are local rule changes.

Write names in Russian, keep the module's own names in the form the module uses
(like the Tree, the rot, the Overgrowth, the lineages, the beast lineages, the
skills, the mutations, the aura marks), and do not invent your own fake names for
them.

## AI instructions for the world

In `notes.md`, write instructions for the AI model that will continue the world.
Include:

- What the world is, in one paragraph.
- What it references (the module, the player's book, the bestiary, the lore, the
  psychosis table if used, any house rules).
- What is already written and what is still missing.
- What questions are still open and what to ask next.
- How to keep consistency: which names belong to which faction, which locations
  are connected, which creatures belong to which place, what the local tone is.
- What not to invent: e.g. "не придумывать новые линии, новые мутации или новые
  звери без спроса; если нужно — спрашивать и писать как house-rule".
- If the world is a company, who runs it, what it sells or protects, what its
  money source is (например, кольца, взятки, сап, перемещение, охрана), and what
  its weak point is.

## Ranked lists

If the user wants a ranked list of fights, puzzles, social scenes, or
exploration beats, ask for:

- the total number of each type they want in the worldshot or chapter,
- the approximate number of game hours they want the worldshot or chapter to
  cover (they often say 4–5 часов),
- how hard each should be,
- and what the players should come away with (information, a prize, a contact, a
  problem to carry forward).

Then produce a list ranked by difficulty or by game time, with a one-sentence
purpose for each. Keep the list tied to the locations and factions already
written.

## Game-hours sizing

When the user wants a worldshot or chapter for 4–5 игровых часов, size it like
this in notes and in the chapter:

- 一场 4–5 часов usually has one main location, one or two side locations, a few
  factions or faction representatives, a small number of key creatures, and a
  small set of encounters that fit the time.
- Делите время по сценам: вход, исследование, противостояние, развязка.
- Пишите, сколько часов примерно отходит на каждую сцену, и что может растянуться
  или сжаться.
- Если пользователь хочет больше или меньше, спросить и пересчитать.

## Chapter or worldshot content

If the request is to fill a chapter or worldshot with content (not just the
structure), the skill should:

1. Read what already exists in the target folder. If a chapter or file already
   exists there, read it and continue it, asking what to add.
2. If nothing exists yet, ask whether to create a new one and what it should
   contain.
3. Use the same referencing discipline as above.
4. Keep the chapter or worldshot in Russian.
5. Leave the AI instructions in the folder so later edits stay consistent.

## One world, one folder

Even if the world grows, keep it in one folder with one `notes.md` and one
`README.md`. Do not scatter world files across the project root. If the user
asks for a new world later, create a new folder.

## Language

- Write the world in Russian.
- Keep module terms as they are in the module; only translate free text.
- Do not translate the module into something it is not.

## Example

- "Создай ваншот посольства в Пустой лестнии" → ask what it is, which lineage
  holds it, who runs it, what they want, what creatures matter, what map level
  the user wants, how many часов, then write the folder.
