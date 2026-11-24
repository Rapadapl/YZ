---
name: root-and-claw-write-chapter-for-world
description: >
  Write one chapter for a Root & Claw world module, or fill an existing
  worldshot folder with playable content. Asks what the chapter should contain,
  ranks fights, puzzles, social scenes and exploration beats, sizes the chapter
  to 4-5 game hours, and knows whether it is continuing an existing chapter or
  starting a new one. References the module, the player's book and the lore by
  real file names, writes in Russian and leaves AI notes.
---

# root-and-claw-write-chapter-for-world

Use this skill when the user asks for a chapter, a filled worldshot, a
"напиши главу", "наполни ваншот", "добавь сцены", "введём сюжет", or any
request that takes a world folder and writes its playable content.

The structure, language, references, question order, ranking and sizing are not
defined here: they live in `tools/root-and-claw/reference/world-contract.md`.
System facts live in `tools/root-and-claw/reference/rules-map.md`. Read both,
then write the chapter.

## Before writing

1. Read the world folder, starting with `заметки.md`: it says what is decided
   and what is open.
2. Read the existing chapter files in `главы/` so you continue them instead of
   rewriting them.
3. Read the module material the world references, so names and rules stay
   consistent.
4. If the world does not exist yet, use `skill-create-worldshot` first and stop
   there. This skill writes content, not a world from scratch, unless the user
   asks for both.

## Asking

Ask the questions in `world-contract.md` § «Вопросы» that are still open for this
chapter, one or two at a time, in Russian. Chapter-specific ones:

- what the chapter is about in one sentence;
- the goal: what should happen, what the players get, what carries forward;
- how many encounters of each kind, and how many game hours (often 4–5);
- what already exists in the chapter and what is missing;
- which locations, factions and creatures appear;
- tone and difficulty;
- personal stakes from the characters or the world;
- variant and house rules in play (classic or modern, panic table, custom
  skills or mutations).

Do not invent the user's answer. If they say "там должна быть загадка про сап",
ask what the puzzle is and what it leads to, then write it.

## Writing the chapter

Order of sections, unless the user wants otherwise:

1. A one-paragraph summary of what the chapter is and what it is for.
2. Time and place: where and when it starts.
3. The opening situation: what the players meet first.
4. The beats, ranked by kind and difficulty with a one-sentence purpose each.
5. The encounters: fights, puzzles, social scenes, exploration, described
   enough to run.
6. Key creatures: from the module and lore with a pointer, or new ones marked
   as new and written against the module's rules.
7. Factions and NPCs: who is where and what they want.
8. Rewards and consequences: what the players gain, what changes.
9. Carry-forward: what leads into the next chapter.
10. GM notes: what can stretch, what can collapse, what to watch.
11. AI notes block, consistent with the world's `заметки.md`.

Ranked lists follow `world-contract.md` § «Ранжирование сцен» (лёгкая, средняя,
сложная), and the 4–5 hour shape follows § «Объём на 4–5 игровых часов»: one main
location, one or two side beats, a small cast, notes on what to cut or expand,
with approximate time per beat.

## Continuing or starting

Follow `world-contract.md` § «Продолжение или новая глава»: continuing means
keeping every written name, place, faction, creature and thread; starting means
a new file in `главы/` numbered after the last one. When in doubt, ask: «Это
продолжение той главы или новая?»

## Referencing and refusals

- Point at real files only, as in `world-contract.md` § «Ссылки на источники».
  Creatures come from `08-bestiary.ru.md` / `bestiary.ru.html`, or are new and
  marked as new in the same card format.
- A panic or psychosis variant that is not in `05-magic-psychosis.md` is a house
  rule and is labelled as one.
- Do not invent new lineages, mutations, gods or beasts without asking; if the
  user wants them, ask and write them as local additions.

## Example

«Напиши главу про провинциальное поселение, 4–5 часов, одна загадка про сап,
два боя, один разговор с фракцией» → ask which settlement, which faction, which
creatures, what the puzzle leads to, what the players should walk away with,
then write the chapter ranked and sized, into `главы/`.
