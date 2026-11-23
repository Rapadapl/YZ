---
name: root-and-claw-write-chapter-for-world
description: >
  Write one chapter for a Root & Claw world module, or fill an existing
  worldshot folder with content, using the same structure as the worldshot
  skill. Asks what the chapter or worldshot should contain, can rank fights,
  puzzles, social scenes and exploration beats, writes a chapter for 4–5
  игровых часов, and understands whether it is continuing an existing chapter
  or starting a new one. Fully references the Root & Claw module and the
  player's book, asks questions, writes in Russian, and leaves AI instructions.
---

# root-and-claw-write-chapter-for-world

Use this skill when the user asks for a chapter for the world, a write-up of a
company, a filled worldshot, a "напиши главу", "наполни ваншот",
"добавь сцены", "введём сюжет", "бой, загадка, исследование", or any request
that takes a world folder and writes its playable content. It builds on the
worldshot skill and uses the same referencing discipline.

## Before writing

1. Read the world folder first. If there is a `notes.md`, read it; it tells you
   what is already decided and what is still open.
2. Read the existing chapter or files in the folder, if any, so you can continue
   them instead of rewriting them.
3. Read the module material the world references (the module, the player's book,
   the lore, the bestiary, the psychosis table if used) so you can stay
   consistent.
4. If the world does not exist yet, use the worldshot skill first and stop there
   until the structure is there. This skill writes content, not the whole world
   from scratch unless the user asks for both.

## Asking questions

Ask only what you need. In Russian, one or two at a time. Typical questions:

1. What is this chapter or worldshot about in one sentence?
2. What is the goal for the players: what should happen, what should they get,
   what should carry forward?
3. How many encounters of each kind do they want, and how many game hours (часто
   4–5 часов)?
4. What already exists in this chapter and what is still missing?
5. Which locations, factions and creatures from the world should appear?
6. What tone and difficulty?
7. Any personal stakes from the player characters or the world that should land?
8. Any house rules or variants to use (psychosis table, custom skills, custom
   mutations, modern vs classic)?

Do not invent the world's answer for them. If the user gives a cue like "там
должна быть загадка про сап", ask what it is and what it leads to, then write
it.

## Writing the chapter

A chapter or filled worldshot should contain, in this order unless the user wants
otherwise:

- a one-paragraph summary of what this chapter is and what it is for,
- the time and place: where and when it starts,
- the opening situation: what the players meet first,
- the main beats: ranked by kind and difficulty, with a one-sentence purpose for
  each,
- the encounters: fights, puzzles, social scenes, exploration beats, described
  enough to run,
- the key creatures: from the bestiary with references, or new ones written
  against the module's creature rules,
- the factions and NPCs: who is where and what they want,
- the rewards and consequences: what the players gain, what changes,
- the carry-forward: what leads into the next chapter,
- the GM notes: what can stretch, what can collapse, what to watch for,
- the AI notes: what to keep consistent and what to ask next,
- the house rules used, if any.

If the chapter is big, split it into sections with clear headings so the user and
the AI can read it in pieces.

## Ranking encounters

When the user names a number of fights, puzzles, social scenes, or exploration
beats, produce a ranked list. Use three levels unless they name more:

- лёгкая,
- средняя,
- сложная.

For each: the kind, what it is about, what the players need to do, what they get
if they succeed, what fails mean, and how long it may take. Keep fights tied to
the creatures and factions already in the world; if the user wants a new creature,
write it as a new creature with the module's rules and a note that it is new.

## Sizing to 4–5 игровых часов

When the user says 4–5 часов, shape the chapter so it can run in that time:

- one main location,
- one or two side beats,
- a small cast of NPCs and creatures,
- a set of encounters that fits the time,
- notes on what can be cut or expanded.

Write how long each beat may take and what the GM can drop if time runs short.
If the user wants more time, ask and adjust.

## Continuing or starting

The skill must understand whether it is:

- continuing an existing chapter: read what is there, keep the names, places,
  factions, creatures and story threads already written, and add what is missing,
- or starting a new chapter: ask what it is, where it fits, what leads into it,
  and what it leads into, then write it as a new file.

When in doubt, ask: "Это продолжение той главы или новая?"

## Referencing

In the chapter text, reference the source of any rule or creature or tone cue:

- the module for lineage, mutations, aura, beast traits, skills, specializations,
  load and backpack,
- the player's book for checks, special effort, conditions, injuries, stress,
  equipment, encumbrance,
- the lore for the Tree, the rot, the Overgrowth, the lands, the seasons,
  money, greetings, taboos,
- the bestiary for creatures,
- the psychosis table for any psychosis-use, with a note that it is a house rule
  unless the module already uses it,
- any custom skill or mutation created with the skill-creation rule, with a note
  that it is local to this world or character.

Write the reference inline, in Russian, as a short pointer like "см. модуль /
книгу игрока / лор / бестиарий / правила психоза / house-rule".

## AI instructions

At the end of the chapter, add an AI notes block:

- what the chapter is,
- what it references,
- what is already fixed and must not change,
- what is still open and what to ask next,
- what the next chapter or next missing piece is,
- what not to invent without asking.

If the world folder has its own `notes.md`, keep the chapter AI notes consistent
with it.

## Language

- Write in Russian.
- Keep module terms as they are in the module; only translate free text.
- Do not invent new lineages, new mutations, or new beasts without asking; if the
  user wants them, ask and write them as local additions.

## Example

- "Напиши главу про провинциальное поселение, 4–5 часов, одна загадка про сап,
  два боя, один разговор с фракцией" → ask what settlement, which faction, which
  creatures, what the puzzle leads to, what the players should walk away with,
  then write the chapter ranked and sized.
