---
name: root-and-claw-create-character-json
description: >
  Create a ready-to-import JSON character for the Root & Claw mutant-animal
  module. Reads the module and player's book, knows the skill/skill-creation
  rules (clones, writing a clone), lineage, mutations, aura, characteristics
  (classic 1-5 / modern A-D), twelve skills, specializations, personality
  edges, equipment, load, aura marks, printing to A4. If asked to produce a
  character file, outputs a JSON file that can be imported on the site. If
  asked to build a character step by step, asks the minimal set of questions
  needed to fill the JSON and nothing extra. Never invents a name, lineage or
  mutation the user did not choose. Writes any notes as Markdown.
---

# root-and-claw-create-character-json

Use this skill when the user asks for a Root & Claw character as a JSON file,
an importable character, a character built from the module, a "generate a
character", "create a JSON character", "save a character for the site", or
"build me a mutant character" request. This skill ends with a JSON file on
disk that matches the module's character structure and the player's book.

## What this skill knows about the system

It reads and follows:

- the module: lineage, twelve skills, mutations, aura, beast traits, creating
  a mutant in seven steps, load and backpack, printing to A4;
- the player's book: how a roll works, characteristics (classic 1-5 and modern
  A-D), skills, specializations, experience, personality edges, equipment,
  encumbrance, mount and vehicle, conditions, injuries, stress;
- the skill-creation rule: a skill can be created from scratch or adapted from
  another skill; the skill's name, description, ranks, prerequisites and
  specialisation cost follow the specialization table in the player's book.

It does not invent setting material; if the user wants setting details, they
refer to the lore page and the bestiary page.

## Character JSON shape

The JSON file must represent one character and be usable on the site. Use a
flat structure the site can import. Suggested top-level keys:

- `system`: `"root-and-claw"`
- `variant`: `"classic"` | `"modern"`
- `name`: string (only if the user gave one; otherwise omit or use a prompt
  placeholder the user can fill)
- `lineage`: string from the module's six lineages, plus the lineage's self-name
- `characteristics`: object with the four characteristics (Body, Dexterity, Wits,
  Empathy) as either numbers 1-5 (classic) or ranks A-D (modern), matching the
  chosen variant
- `skills`: array of skill objects, each with `name`, `rank` (classic level 0-5
  or modern A-D), and `linked` characteristic; include the twelve base skills
  and any specializations chosen
- `mutations`: array of mutation objects from the module, with name and rank or
  level as the module specifies
- `aura`: object with aura marks (dark to light) and any aura-related trait the
  module gives
- `traits`: array of beast traits the character has
- `personality`: array of personality edges/edges the user chose
- `equipment`: array of equipment items, with `name`, `weight` category
  (small/light/heavy/very heavy) and any noted special property
- `load`: object with current load category and notes (backpack, mount, vehicle
  if used)
- `notes`: string for any freeform notes
- `meta`: `{ "created_by_skill": true, "locale": "ru" | "en" }`

If the site has a stricter import schema, follow it; this skill writes the
file in the shape above when no stricter schema is known.

## Step-by-step build flow

When the user asks to build a character, do the following, asking only the
questions needed to fill the JSON:

1. Ask variant: classic (1-5, 14 points) or modern (A-D, 3 steps, can lower to
   gain a step).
2. Ask lineage: one of the six lineages from the module, and the character's
   self-name within that lineage.
3. Ask characteristics: how to distribute the points/steps, respecting the module's
   limits (classic min 2, max 5, one characteristic can be 5, others max 4;
   modern all C, 3 steps, optional lower-to-gain).
4. Ask skills: which of the twelve base skills get the starting levels/ranks
   the module or player's book says, plus any specializations the user wants.
   If the user wants a custom skill, this is the moment to use the
   skill-creation rule: name, description, ranks, prerequisite, cost.
5. Ask mutations: how many bio-mutations and psi-powers to start with, and which
   ones, from the module.
6. Ask aura: the aura marks the character starts with and any aura-related
   trait.
7. Ask traits: which beast traits the character has from the module.
8. Ask personality edges: which edges the character has (pride, weakness, dark
   secret, dream, relationships, best friend).
9. Ask equipment: archetypal starting equipment if the user wants the module's
   archetype defaults, or a custom list.
10. Ask name (optional): only if the user wants one. Never invent one silently.
11. Write the JSON to disk and tell the user the file path.

Do not ask for anything that is not needed to fill the JSON. If the user says
"just make a ronin-type raccoon", ask only for the variant, the raccoon
lineage, the self-name, and any extra mutations/traits they want; fill the rest
from the module defaults and the player's book distributions, and tell the user
what you filled in.

## Custom skill creation

The user may ask to "create a skill" within the module. When they do:

- Ask what the skill does, when you use it, what characteristic or skill it is
  linked to, and what ranks or levels it has.
- Ask whether it is a specialization of an existing skill or a new skill.
- Ask about prerequisites and cost, using the specialization cost table from the
  player's book (new skill 5 XP to reach level 1 / rank D; specializations cost
  10 XP to reach rank D, then scale up).
- Write the skill into the character's skills array with a `created: true` flag
  and a short note that it was created with the skill-creation rule.
- If the user wants the skill to be part of the world, remind them it is a
  personal skill for this character unless it is a setting skill from the lore
  or bestiary.

## File output

- Write the JSON to a file in the workspace, e.g. `characters/<name-snake>.json`
  or a path the user asks for. If the user does not name a path, put it in
  `characters/` and tell them the path.
- Use UTF-8. Keep the JSON tidy: 2-space indent, no extra notes outside the
  JSON in the file.
- After writing, show the path and a short summary: variant, lineage, number of
  skills, number of mutations, aura, load state, and any custom skill created.
- If the user asked to import it on the site, tell them the file path and that
  it is ready to import; do not pretend the site has been updated unless you
  actually deployed or the user did.

## Language

- Speak to the user in Russian unless they ask otherwise.
- The JSON keys and any machine-facing strings can stay in English; the human
  fields (name, notes, and any text fields) should be in the language the user
  is using.
- Do not translate the module's fixed terms into something made up; keep the
  module's own names (lineages, skills, mutations, aura terms) as they are in
  the module, and translate only the user-facing free text.

## Errors and refusals

- If the user asks for a character but does not give enough to fill the JSON,
  ask the minimal questions; do not invent.
- If the user asks for a specialist or archetype not in the module, say so and
  offer to build one from the module's pieces, but do not pretend the module
  contains it.
- If the user asks to import on the site and the site import path is unknown,
  tell them where the file is and that they can import it; do not fabricate a
  live import.

## Examples

- "Создай JSON-персонажа для Корня и Когтя" → ask variant, lineage, points,
  skills, mutations, aura, traits, edges, equipment, name; write JSON.
- "Должен быть енот-род, два био-мутации, аура светлая, груз в рюкзаке" →
  fill those, ask the rest.
- "Создай кастомный навык — уход от пыли" → ask what it does, what it is
  linked to, ranks, cost, prerequisite; write it into skills with `created: true`.
