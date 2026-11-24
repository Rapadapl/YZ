# Root & Claw — AI Working Instructions

## Purpose
These instructions guide AI assistance when working with the Root & Claw rules reference split into .md files. Follow these guidelines for consistent, accurate support.

## File Structure Understanding

The Root & Claw reference has been divided into 7 core .md files:

1. **00-overview.md** - General overview and system introduction
2. **01-introduction.md** - Core concepts, character creation basics
3. **02-player-characters.md** - Detailed character creation, advancement
4. **03-skills-specializations.md** - Skills, checks, special efforts
5. **04-combat-damage.md** - Combat, damage, wounds, injuries
6. **05-magic.md** - Magic systems (7 traditions)
7. **06-travel.md** - Travel rules, terrain, random encounters

Additionally there are:
- `00-reference.md` - Links and descriptions of all files
- `AI-INSTRUCTIONS.md` - These instructions

## Common AI Assistance Tasks

### Rule Lookups
- **Ask**: "What are the modifiers for a ranged attack at long range in Root & Claw?"
- **Check**: First look in `04-combat-damage.md` under "Ranged Attack" section for distance modifiers
- **Cross-reference**: If not found there, check `01-introduction.md` for general modifier rules

### Character Creation
- **Ask**: "How do I calculate starting health for a modern-variant character?"
- **Check**: `01-introduction.md` under "Health" for the wound track
- **Check**: `02-player-characters.md` for classic variant (average of Body/Dexterity rounded up + 1)

### Combat Situations
- **Ask**: "Can a prone character parry in combat?"
- **Check**: `04-combat-damage.md` under "Close Combat" → "Positioning"
- **Check**: `03-skills-specializations.md` for special effort rules if attempting risky action

### Magic Systems
- **Ask**: "What happens when I roll a curse during spell creation?"
- **Check**: `05-magic.md` under "Side Effects of Magic" and "Random Side Effects Table"
- **Check**: `00-reference.md` for which tradition file covers specific spell

### Travel Rules
- **Ask**: "How do random encounters work during overland travel?"
- **Check**: `06-travel.md` under "Random Encounters" section
- **Check**: Terrain type modifiers in the "Types of Terrain" table

## Working Pattern

### 1. Identify the Request
Determine which aspect of the rules the user needs help with:
- Character creation
- Combat resolution
- Magic casting
- Travel/survival
- Skill checks
- Equipment management

### 2. Locate Relevant File
Reference the file index above or `00-reference.md` to find the appropriate .md file.

### 3. Search Within File
Use the section headers and tables of contents within each file to locate specific rules.

### 4. Provide Accurate Information
- Quote exact rules when possible
- Distinguish between classic and modern variants when applicable
- Note any conditions or limitations
- Reference the original page/context when relevant

### 5. Offer Follow-up
- Ask if they need clarification on specific rules
- Offer to help with practical application (example scenarios, NPC creation, etc.)
- Suggest relevant sections for further reading

## Variant Distinctions

Always note whether rules apply to:
- **Classic variant** (d6, characteristics 1-5, skill levels 0-5)
- **Modern variant** (dice ranks A-D, different characteristic/skill scaling)

When rules differ between variants, explicitly state which variant applies.

## Example Response Format

When providing rule information:

```
According to the rules (from [filename].md):

[Rule explanation]

Note: This applies to the [classic/modern] variant.

Related sections: 
- [Other relevant section in same file]
- [Relevant section in another file if cross-referenced]
```

## Limitations

- Do not invent rules not present in the documented system
- When uncertain, direct user to consult the original PDF or ask for clarification
- Acknowledge when a rule variant choice is required
- Preserve the distinction between the two main rule variants throughout

## Quick Reference Cheat Sheet

| Topic | Primary File | Key Section |
|-------|-------------|-------------|
| Characteristic generation | 01-introduction.md | Characteristics |
| Skill checks | 03-skills-specializations.md | Skill Checks |
| Combat initiative | 04-combat-damage.md | Initiative |
| Close combat | 04-combat-damage.md | Close Combat |
| Ranged combat | 04-combat-damage.md | Ranged Attack |
| Wound system | 04-combat-damage.md | Wounds & Healing |
| Magic traditions | 05-magic.md | Seven Traditions |
| Spell creation | 05-magic.md | Risky Magic |
| Travel tasks | 06-travel.md | Tasks |
| Random encounters | 06-travel.md | Random Encounters |
| Encumbrance | 02-player-characters.md | Encumbrance |
| Experience advancement | 02-player-characters.md | Experience |