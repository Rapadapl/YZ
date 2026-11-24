---
name: root-and-claw-create-character-json
description: >
  Create a ready-to-import JSON character for the Root & Claw mutant-animal
  module that the on-site sheet (character.html) actually accepts. Knows the
  exact import shape (version/variant/fields/tracks), the nine lineages and
  their self-names, four characteristics, twelve skills with their sheet ids,
  specializations and their real XP costs, mutations I-III, aura -5..+5 as the world's opinion, beast
  traits, load and backpack, conditions and XP. Asks only the questions needed
  to fill the file, never invents a name, lineage or mutation, and writes the
  JSON to disk ready to import.
---

# root-and-claw-create-character-json

Use this skill when the user asks for a Root & Claw character as a JSON file,
an importable character, "создай JSON-персонажа", "сгенерируй персонажа",
"сохрани персонажа для сайта", or "собери мутанта". The skill ends with a JSON
file on disk that `year-zero-srd/character.html` imports without errors.

Rules, lineages and file names come from `tools/root-and-claw/reference/rules-map.md`.
Read it before writing a character; do not rely on memory for numbers.

## The import contract

The sheet exports and imports exactly this shape (`assets/sheet.js`, `collect()`,
and the import handler that rejects anything without `fields`):

```text
{ "version": 1, "variant": "classic", "fields": { ... }, "tracks": { ... } }
```

- `version` — always `1`.
- `variant` — `"classic"` or `"modern"`.
- `fields` — a flat object whose keys are the form's `data-field` names; values
  are strings (numbers as strings are fine) or booleans for checkboxes.
- `tracks` — `{ "damage": 0-10, "stress": 0-10, "supplies": 0-6, "psychosis": 0-10 }`.

The sheet clears itself, then applies only the keys present in `fields`, so
missing keys are fine and unknown keys are ignored. But a file without `fields`
is rejected with "import failed". There is no nested character object and no
`system`, `lineage` object, `characteristics` object or `skills` array — those
do not import.

### Field names

Header: `name`, `lineage`, `tribe`, `concept`.

Characteristics — for each of `body` (Сила), `agility` (Ловкость), `wits`
(Смекалка), `empathy` (Эмпатия):

- `chars.<id>.value` — number 1–5 (classic);
- `chars.<id>.rank` — `A`|`B`|`C`|`D` (modern; keep it filled in both variants).

Skills — for each of the twelve ids `force`, `brawl`, `endurance`, `shooting`,
`acrobatics`, `stealth`, `crafting`, `observation`, `survival`, `animal-ken`,
`healing`, `persuasion`:

- `skills.<id>.level` — number 0–5 (classic);
- `skills.<id>.rank` — `A`|`B`|`C`|`D`|`""` (modern);
- `skills.<id>.spec` — specialization name, free text;
- `skills.<id>.specRank` — `A`|`B`|`C`|`D`|`""`.

Mutations — six rows `mutations.0` … `mutations.5`:

- `mutations.<n>.name`; `mutations.<n>.type` — `""`|`bio`|`psi`;
  `mutations.<n>.grade` — `""`|`I`|`II`|`III`.

Rest of the sheet:

- `trait.0`, `trait.1` — two beast traits.
- `aura.value` — integer −5…+5 (the world's opinion; it is never spent).
- `edge.pride`, `edge.weakness` — personality edges.
- `gear.0` … `gear.7`: `gear.<n>.item`, `gear.<n>.load` (0–9).
- `weapon.0` … `weapon.2`: `weapon.<n>.name`, `weapon.<n>.damage`,
  `weapon.<n>.range`.
- `armour` — one line.
- `carry.backpack`, `carry.led` — booleans; `carry.mount` — number.
- `cond.physical.1`…`3`, `cond.mental.1`…`3` — conditions.
- `xp.earned`, `xp.spent` — numbers.
- `notes` — free text, Markdown is fine.

### Complete example

```json
{
  "version": 1,
  "variant": "classic",
  "fields": {
    "name": "Сойка",
    "lineage": "Енот-род (Защёлка)",
    "tribe": "Верхний склад",
    "concept": "Взломщик и курьер",
    "chars.body.value": "3",
    "chars.body.rank": "C",
    "chars.agility.value": "4",
    "chars.agility.rank": "B",
    "chars.wits.value": "4",
    "chars.wits.rank": "B",
    "chars.empathy.value": "3",
    "chars.empathy.rank": "C",
    "skills.force.level": "2",
    "skills.force.rank": "D",
    "skills.force.spec": "",
    "skills.force.specRank": "",
    "skills.acrobatics.level": "3",
    "skills.acrobatics.rank": "C",
    "skills.acrobatics.spec": "Лазать по руинам",
    "skills.acrobatics.specRank": "D",
    "mutations.0.name": "Хваткие пальцы",
    "mutations.0.type": "bio",
    "mutations.0.grade": "II",
    "mutations.1.name": "Чужой глаз",
    "mutations.1.type": "psi",
    "mutations.1.grade": "I",
    "trait.0": "Ночное зрение",
    "trait.1": "Ловкие пальцы",
    "aura.value": "1",
    "edge.pride": "Не бросаю начатое",
    "edge.weakness": "Не могу пройти мимо запертой двери",
    "gear.0.item": "Отмычки",
    "gear.0.load": "1",
    "weapon.0.name": "Короткий нож",
    "weapon.0.damage": "2",
    "weapon.0.range": "Вплотную",
    "armour": "Кожаный жилет",
    "carry.backpack": true,
    "carry.mount": "0",
    "carry.led": false,
    "xp.earned": "0",
    "xp.spent": "0",
    "notes": ""
  },
  "tracks": { "damage": 0, "stress": 0, "supplies": 6, "psychosis": 0 }
}
```

## Build flow

Ask only what is needed to fill the file, in Russian, one or two questions at a
time:

1. Variant: classic (14 points, 2–5 each) or modern (all C, three steps, may
   lower one to gain a step).
2. Lineage: one of the nine, plus the character's self-name inside it.
3. Characteristics: how to spend the points or steps.
4. Skills: starting levels/ranks for the twelve, and any specialization.
5. Mutations: two bio, or one bio and one psi, with grades I–III.
6. Aura: the starting value from −5 to +5. Psychosis starts at 0 and needs no question.
7. Beast traits: which two.
8. Edges: pride and weakness.
9. Equipment, weapons, armour; whether the backpack is worn.
10. Name and concept — only if the user gives them; never invent a name silently.

If the user says "просто енот-разбойник, две био-мутации, светлая аура", fill
those, take the rest from the module's defaults, and say what you filled in.

## Skill creation

The sheet has no slot for a brand-new skill: it only has the twelve base rows and
a specialization column next to each. So:

- A specialization of an existing skill goes into `skills.<id>.spec` and
  `skills.<id>.specRank`.
- A truly new skill goes into `skills.<id>.spec` of the closest base skill and
  is described in `notes` with its own name, rank and rules — or, if the user
  prefers, only in `notes`. Say plainly that the site cannot show it as a
  separate row.
- Costs, when the user asks: a new skill is level 1 / rank D for **5 XP**; a
  specialization is **5 XP** for rank D, then 10 / 15 / 20 for C / B / A, and it
  needs a mentor, a full shift of training from both, and a Persuasion check at
  the end.
- Never inflate a specialization to "10 XP for D". That 10 is the price of C.

## Facts to get right

- **Nine lineages**, not six: Енот-род (Защёлка), Грызун-род (Нора), Заяц-род
  (Долгий бег), Кунье-род (Узел), Птице-род (Гребневой дозор), Чешуйчатый род
  (Медленный двор), Кошачий род (Девять шагов), Псовый род (Стая), Кабаний род
  (Клыкастая линия).
- Four characteristics are Сила / Ловкость / Смекалка / Эмпатия with sheet ids
  `body` / `agility` / `wits` / `empathy` — not Body/Dexterity/Wits/Empathy.
- Aura is a single number −5…+5, the world's opinion rather than a pool. Casting costs nothing:
  psychosis is its only price, and it is the only magic counter on the sheet.
  At psychosis 10 the hero falls into instinct and saves with Empathy.
- Creatures live in the bestiary: `08-bestiary.md` / `08-bestiary.ru.md` and the
  `bestiary.html` pages. Point there, not at a page that does not exist.

## Output

- Write UTF-8 JSON with 2-space indent, nothing outside the JSON in the file.
- Default path: `characters/<slug>.json`; otherwise the path the user names.
- Check the file parses before handing it over, e.g.
  `python3 -c "import json;json.load(open('characters/<slug>.json'))"`.
- Tell the user the path, then a short summary: variant, lineage, number of
  skills with levels, mutations, aura, load, and anything you filled in.
- To import: open `character.html`, press «Импорт» and choose the file. Do not
  claim the site was updated unless it actually was.

## Language and refusals

- Speak Russian; keep `fields` keys and machine values in English as above.
- Keep the module's terms as the module has them; translate only free text.
- If the user asks for a lineage, mutation or archetype the module does not
  have, say so and offer to build from what exists, or write it as a local
  addition in `notes`.
