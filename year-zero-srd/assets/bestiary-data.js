/* Creatures of the Overgrowth. One entry, two languages. */

window.ROOTCLAW_BESTIARY = [
  {
    id: "wire-rat", group: "scavengers", threat: 1,
    en: { name: "Wire rat", epithet: "the cable chewer", attrs: [2,4,1,1], health: 2, armour: 0, attacks: "Bite 1 (Engaged).", special: "Chews cable, rope and straps; leaves copper dust where it has been. +1 die to Stealth in ruins.", wants: "Warmth and copper.", loot: "D6 ring-bits in its nest." },
    ru: { name: "Проволочная крыса", epithet: "перегрызает всё, что тянется", attrs: [2,4,1,1], health: 2, armour: 0, attacks: "Укус 1 (вплотную).", special: "Грызёт кабель, верёвки и ремни; оставляет медную пыль. +1 кубик к Скрытности в руинах.", wants: "Тепло и медь.", loot: "D6 обрезков колец в гнезде." }
  },
  {
    id: "sap-tick", group: "scavengers", threat: 1,
    en: { name: "Sap tick", epithet: "a thirst with legs", attrs: [1,3,1,1], health: 1, armour: 1, attacks: "Bite 1 and latch on.", special: "Latched: −1 die to Agility until it is pulled off (Force, fast action); drains 1 damage each round.", wants: "Sap, and anything that has drunk it.", loot: "A vial of thin sap, if the tick is squeezed." },
    ru: { name: "Соковый клещ", epithet: "жажда на лапках", attrs: [1,3,1,1], health: 1, armour: 1, attacks: "Укус 1 и присасывается.", special: "Присосался: −1 кубик к Ловкости, пока его не оторвут (Мощь, быстрое действие); вытягивает 1 урон за раунд.", wants: "Сок и всё, что его пило.", loot: "Флакон жидкого сока, если клеща выдавить." }
  },
  {
    id: "ash-moth", group: "scavengers", threat: 1,
    en: { name: "Ash moth", epithet: "a grey cloud with a purpose", attrs: [1,4,1,1], health: 3, armour: 0, attacks: "Wings 1 (Engaged).", special: "A swarm: single-target attacks inflict half damage, rounded up. In dim light it gives −1 die to Observation.", wants: "Light, and the warmth of a lantern.", loot: "A pinch of grey dust; Crafting makes a smoke bomb from it." },
    ru: { name: "Пепельная моль", epithet: "серое облако с намерением", attrs: [1,4,1,1], health: 3, armour: 0, attacks: "Крылья 1 (вплотную).", special: "Рой: атаки по одной цели наносят половину урона, округляя вверх. В тусклом свете даёт −1 кубик к Наблюдательности.", wants: "Свет и тепло фонаря.", loot: "Щепоть серой пыли; Ремесло делает из неё дымовую шашку." }
  },
  {
    id: "copper-crow", group: "scavengers", threat: 1,
    en: { name: "Copper crow", epithet: "the thief with a memory", attrs: [1,5,2,2], health: 2, armour: 0, attacks: "Peck 1 (Engaged).", special: "Steals small items and mimics voices; +2 dice to Stealth in flight. It remembers a face that cheated it.", wants: "Anything that shines.", loot: "Whatever it stole last — often a courier's token." },
    ru: { name: "Медная ворона", epithet: "вор с памятью", attrs: [1,5,2,2], health: 2, armour: 0, attacks: "Клюв 1 (вплотную).", special: "Крадёт мелкие вещи и передразнивает голоса; +2 кубика к Скрытности в полёте. Помнит лицо, которое её обмануло.", wants: "Всё, что блестит.", loot: "То, что украла последним, — часто жетон гонца." }
  },
  {
    id: "long-jaw", group: "predators", threat: 2,
    en: { name: "Long-jaw", epithet: "the patient hunter", attrs: [4,4,2,1], health: 6, armour: 1, attacks: "Claws 2 (Engaged); bite 3 (Engaged).", special: "Pounce: after moving a zone straight at a target, the first attack deals +2 damage. +1 die to Stealth in tall growth.", wants: "One straggler, separated from the fire.", loot: "Pelt (armour 1 when worked), teeth." },
    ru: { name: "Долгая пасть", epithet: "терпеливый охотник", attrs: [4,4,2,1], health: 6, armour: 1, attacks: "Когти 2 (вплотную); укус 3 (вплотную).", special: "Прыжок: после перехода по прямой на цель первая атака наносит +2 урона. +1 кубик к Скрытности в высокой траве.", wants: "Одного отставшего, отрезанного от костра.", loot: "Шкура (броня 1 после выделки), зубы." }
  },
  {
    id: "wild-tusk-boar", group: "predators", threat: 2,
    en: { name: "Wild tusk boar", epithet: "the argument with legs", attrs: [5,3,1,1], health: 8, armour: 2, attacks: "Gore 3 (Engaged); charge +2.", special: "Charge in a straight line for +2 damage; a struck target falls prone unless it wins an Acrobatics roll.", wants: "To be left alone, and the best roots in the marsh.", loot: "Tusk, hide, a week of meat." },
    ru: { name: "Дикий клыкач", epithet: "довод на ногах", attrs: [5,3,1,1], health: 8, armour: 2, attacks: "Клык 3 (вплотную); разбег +2.", special: "Разбег по прямой даёт +2 урона; сбитая цель падает, если не выиграет бросок Акробатики.", wants: "Чтобы его не трогали, и лучшие корни в топи.", loot: "Клык, шкура, неделя мяса." }
  },
  {
    id: "ridge-hawk", group: "predators", threat: 2,
    en: { name: "Ridge hawk", epithet: "the shadow that falls", attrs: [2,5,2,1], health: 3, armour: 0, attacks: "Talons 2 (Engaged).", special: "Dive: +2 damage when it attacks from above. Animal Ken trains one in a season; Ridgewatch sells the chicks.", wants: "Small prey, and a high perch.", loot: "Feathers for fletching; an aerie holds bones and lost tools." },
    ru: { name: "Гребневой ястреб", epithet: "падающая тень", attrs: [2,5,2,1], health: 3, armour: 0, attacks: "Когти 2 (вплотную).", special: "Пикирование: +2 урона при атаке сверху. Звериный язык выучивает одного за сезон; Дозор продаёт птенцов.", wants: "Мелкую добычу и высокий насест.", loot: "Перья для стрел; в гнезде — кости и утерянные инструменты." }
  },
  {
    id: "grey-packhound", group: "predators", threat: 2,
    en: { name: "Grey packhound", epithet: "the one that is never alone", attrs: [3,4,2,2], health: 4, armour: 1, attacks: "Bite 2 (Engaged).", special: "Pack: +1 die for every other hound attacking the same target this round, up to +3. A howl brings D3 more in a stretch.", wants: "The pack's prey, and to keep the pack fed.", loot: "Pelt; sometimes a courier's collar still around its neck." },
    ru: { name: "Серый стайный пёс", epithet: "тот, кто никогда не один", attrs: [3,4,2,2], health: 4, armour: 1, attacks: "Укус 2 (вплотную).", special: "Стая: +1 кубик за каждого другого пса, атакующего ту же цель в этом раунде, до +3. Вой приводит D3 сородичей за смену.", wants: "Добычу стаи и чтобы стая была сыта.", loot: "Шкура; иногда на шее остаётся ошейник гонца." }
  },
  {
    id: "sap-hound", group: "roots", threat: 2,
    en: { name: "Sap hound", epithet: "grown wrong and fast", attrs: [3,4,1,1], health: 5, armour: 1, attacks: "Claws 2 (Engaged); acid spit 1 (Short).", special: "The spit ignores armour on a second success. It tracks by sap scent and never loses a wounded target.", wants: "Sap, and the warm bodies that carry it.", loot: "A hardened sap gland; Crafting makes a blade coating from it." },
    ru: { name: "Соковый гончий", epithet: "вырос неправильно и быстро", attrs: [3,4,1,1], health: 5, armour: 1, attacks: "Когти 2 (вплотную); кислотный плевок 1 (короткая).", special: "Плевок игнорирует броню при втором успехе. Идёт по запаху сока и не теряет раненую цель.", wants: "Сок и тёплые тела, которые его несут.", loot: "Затвердевшая соковая железа; Ремесло делает из неё покрытие для клинка." }
  },
  {
    id: "root-worm", group: "roots", threat: 2,
    en: { name: "Root worm", epithet: "the ground that moves", attrs: [4,2,1,1], health: 7, armour: 2, attacks: "Bite 3 (Engaged); constrict 2.", special: "Burrows; senses tremors two zones away. Surfaces under a target: Acrobatics or fall prone. Fire drives it back.", wants: "Warmth — a fire, a burrow, a sleeping camp.", loot: "A segment of root-iron; the Latch pays well for it." },
    ru: { name: "Корневой червь", epithet: "земля, которая двигается", attrs: [4,2,1,1], health: 7, armour: 2, attacks: "Укус 3 (вплотную); сжатие 2.", special: "Роет норы; чувствует дрожь за две зоны. Выходит из-под цели: Акробатика или падение. Огонь его отгоняет.", wants: "Тепло — костёр, нору, спящий лагерь.", loot: "Сегмент корневого железа; Защёлка платит за него хорошо." }
  },
  {
    id: "glass-wasp", group: "roots", threat: 2,
    en: { name: "Glass wasp", epithet: "a wing you hear too late", attrs: [1,5,1,1], health: 2, armour: 1, attacks: "Sting 2 (Engaged) and venom.", special: "Venom: Endurance or −2 dice on all rolls for a stretch. Flies; a nest holds D6 wasps.", wants: "Meat for the nest.", loot: "A glass wing, prized by crafters; the nest holds a queen's amber." },
    ru: { name: "Стеклянная оса", epithet: "крыло, которое слышно слишком поздно", attrs: [1,5,1,1], health: 2, armour: 1, attacks: "Жало 2 (вплотную) и яд.", special: "Яд: Выносливость, иначе −2 кубика на все броски на смену. Летает; в гнезде D6 ос.", wants: "Мясо для гнезда.", loot: "Стеклянное крыло, ценится у мастеров; в гнезде — янтарь матки." }
  },
  {
    id: "spore-shepherd", group: "roots", threat: 2,
    en: { name: "Spore shepherd", epithet: "it keeps a flock you cannot see", attrs: [3,2,3,2], health: 5, armour: 1, attacks: "Staff 2 (Engaged).", special: "Exhales spores: everyone at Engaged loses a fast action unless they win an Endurance roll; failure also gives −2 for a round. Herds rot-touched beasts.", wants: "To drive its flock into a village.", loot: "A spore horn; sounding it calls the flock." },
    ru: { name: "Споровый пастух", epithet: "пасёт стадо, которого не видно", attrs: [3,2,3,2], health: 5, armour: 1, attacks: "Посох 2 (вплотную).", special: "Выдыхает споры: все вплотную теряют быстрое действие, если не выиграют бросок Выносливости; при провале ещё −2 на раунд. Гонит тронутых зверей.", wants: "Загнать своё стадо в деревню.", loot: "Споровый рог; если протрубить, стадо придёт." }
  },
  {
    id: "bloom-stag", group: "rot", threat: 2,
    en: { name: "Bloom stag", epithet: "beautiful, and already gone", attrs: [4,4,2,1], health: 6, armour: 1, attacks: "Antlers 3 (Engaged).", special: "In the Bloom stage. On death it releases spores: everyone at Engaged takes −2 for a stretch unless they win an Endurance roll.", wants: "To reach the heartwood before it stops walking.", loot: "Antlers for Crafting; the spores are worth money and are not safe to carry." },
    ru: { name: "Цветущий олень", epithet: "красивый и уже не тот", attrs: [4,4,2,1], health: 6, armour: 1, attacks: "Рога 3 (вплотную).", special: "Стадия Цветение. При смерти выпускает споры: все вплотную получают −2 на смену, если не выиграют бросок Выносливости.", wants: "Дойти до Сердцевины, пока ещё идёт.", loot: "Рога для Ремесла; споры стоят денег и небезопасны в дороге." }
  },
  {
    id: "blush-bear", group: "rot", threat: 3,
    en: { name: "Blush bear", epithet: "the fever that stands up", attrs: [5,3,2,1], health: 10, armour: 2, attacks: "Claws 3 (Engaged); bite 3 (Engaged).", special: "Ignores the first critical injury it suffers. In the Blush stage its blood is contagious: anyone cut by it must save against the rot.", wants: "A den, food, and to be left to the fever.", loot: "Pelt (armour 2 when worked); the meat is tainted." },
    ru: { name: "Румяный медведь", epithet: "жар, который встал на лапы", attrs: [5,3,2,1], health: 10, armour: 2, attacks: "Когти 3 (вплотную); укус 3 (вплотную).", special: "Игнорирует первую полученную критическую травму. Стадия Румянца: кровь заразна — порезанный им должен спасаться от Гнили.", wants: "Берлогу, еду и чтобы его оставили с жаром.", loot: "Шкура (броня 2 после выделки); мясо заражено." }
  },
  {
    id: "garden-saint", group: "rot", threat: 3,
    en: { name: "Garden saint", epithet: "it still speaks, and that is the trap", attrs: [3,2,4,3], health: 7, armour: 1, attacks: "Touch 2 (Engaged) and spores.", special: "In the Garden stage, but still talking. Its touch forces a rot save. It commands rot-touched beasts and cannot be persuaded to stop — only delayed with a good argument.", wants: "A congregation.", loot: "A hymnal of the Ash Choir; a dry-room key." },
    ru: { name: "Садский святой", epithet: "он ещё говорит, и это ловушка", attrs: [3,2,4,3], health: 7, armour: 1, attacks: "Касание 2 (вплотную) и споры.", special: "Стадия Сада, но всё ещё говорит. Касание требует спасение от Гнили. Приказывает тронутым зверям; уговорить его нельзя — можно только задержать хорошим доводом.", wants: "Паству.", loot: "Певческая книга культа; ключ от сухой комнаты." }
  },
  {
    id: "root-eater", group: "great", threat: 3,
    en: { name: "Root-eater", epithet: "the wall that chews back", attrs: [6,2,1,1], health: 14, armour: 3, attacks: "Bite 4 (Engaged); sweep 3 (all at Engaged).", special: "Eats through a wall in a stretch; senses tremors three zones away. Only fire and loud machines turn it aside.", wants: "The oldest root it can smell.", loot: "A plate of root-iron; a cart-load if the body is butchered." },
    ru: { name: "Корнеед", epithet: "стена, которая жуёт в ответ", attrs: [6,2,1,1], health: 14, armour: 3, attacks: "Укус 4 (вплотную); сметание 3 (все вплотную).", special: "Прогрызает стену за смену; чувствует дрожь за три зоны. Отворачивают его только огонь и громкие машины.", wants: "Самый старый корень, который чует.", loot: "Плита корневого железа; если разделать тушу — телега." }
  },
  {
    id: "canopy-drifter", group: "great", threat: 3,
    en: { name: "Canopy drifter", epithet: "a jellyfish with a sky", attrs: [3,5,1,1], health: 8, armour: 1, attacks: "Tentacles 2 twice (Engaged).", special: "Drifts between zones and never takes falling damage. In dim light it is nearly invisible: −2 to Observation to notice it before it is Engaged.", wants: "To drift, and to sting what it touches.", loot: "A gas sac; the glide membrane graft is grown from it." },
    ru: { name: "Пологоплав", epithet: "медуза, у которой есть небо", attrs: [3,5,1,1], health: 8, armour: 1, attacks: "Щупальца 2 дважды (вплотную).", special: "Дрейфует между зонами и не получает урона от падения. В тусклом свете почти невидим: −2 к Наблюдательности, чтобы заметить его до сближения.", wants: "Дрейфовать и жалить то, до чего дотянется.", loot: "Газовый мешок; из него выращивают перепонки." }
  },
  {
    id: "mire-mother", group: "great", threat: 3,
    en: { name: "Mire mother", epithet: "the marsh that keeps its children", attrs: [4,2,3,2], health: 9, armour: 2, attacks: "Grab 2 (Engaged); drown.", special: "Drags a grabbed target into the water; heals 1 damage per round while in the marsh. Her lair holds D6 young, each a threat 1 beast.", wants: "Offerings, and to be left her stretch of water.", loot: "An amber heart, a fine psi focus; the young are worth more alive." },
    ru: { name: "Топяная мать", epithet: "болото, которое держит своих детей", attrs: [4,2,3,2], health: 9, armour: 2, attacks: "Захват 2 (вплотную); утопление.", special: "Утаскивает схваченную цель в воду; в топи восстанавливает 1 урон за раунд. В логове D6 детёнышей, каждый — зверь угрозы 1.", wants: "Подношения и свой участок воды.", loot: "Янтарное сердце — отличный фокус для пси-силы; детёныши дороже живыми." }
  },
  {
    id: "old-tusk", group: "great", threat: 3,
    en: { name: "Old Tusk", epithet: "the one the clans will not fight", attrs: [6,4,3,3], health: 12, armour: 3, attacks: "Tusks 4 (Engaged); trample 3.", special: "Speaks a broken trade tongue. The Tusk Line will not raise a hand against it. +1 die against anyone who has harmed a boar-kin.", wants: "The old paths kept open and the marsh-holds unburned.", loot: "Nothing. Killing it is a curse, and every boar-kin will know." },
    ru: { name: "Старый клык", epithet: "тот, с кем роды не воюют", attrs: [6,4,3,3], health: 12, armour: 3, attacks: "Клыки 4 (вплотную); топот 3.", special: "Говорит на ломаном торговом наречии. Клыкастая линия не поднимет на него руку. +1 кубик против того, кто вредил кабаньему роду.", wants: "Чтобы старые тропы оставались открыты, а солонцы — нетронуты.", loot: "Ничего. Убить его — проклятие, и об этом узнает каждый кабан." }
  }
];
