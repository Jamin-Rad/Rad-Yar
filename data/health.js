export const sportKategorien = [
  { id: "ausdauer",    de: "Ausdauer & Cardio"     },
  { id: "kraft",       de: "Kraft & Fitness"        },
  { id: "entspannung", de: "Entspannung & Mobility" },
  { id: "mannschaft",  de: "Mannschaftssport"       },
  { id: "alltag",      de: "Alltagsbewegung"        },
];

// kcalPerMin: Durchschnitt ~70 kg Person
export const sportarten = [
  { id: "joggen",         cat: "ausdauer",    de: "Joggen",         kcalPerMin: 8  },
  { id: "laufen",         cat: "ausdauer",    de: "Laufen",         kcalPerMin: 12 },
  { id: "radfahren",      cat: "ausdauer",    de: "Radfahren",      kcalPerMin: 7  },
  { id: "schwimmen",      cat: "ausdauer",    de: "Schwimmen",      kcalPerMin: 9  },
  { id: "schnell-gehen",  cat: "ausdauer",    de: "Schnell gehen",  kcalPerMin: 5  },
  { id: "krafttraining",  cat: "kraft",       de: "Krafttraining",  kcalPerMin: 6  },
  { id: "calisthenics",   cat: "kraft",       de: "Calisthenics",   kcalPerMin: 8  },
  { id: "hiit",           cat: "kraft",       de: "HIIT",           kcalPerMin: 12 },
  { id: "yoga",           cat: "entspannung", de: "Yoga",           kcalPerMin: 3  },
  { id: "pilates",        cat: "entspannung", de: "Pilates",        kcalPerMin: 4  },
  { id: "tanzen",         cat: "entspannung", de: "Tanzen",         kcalPerMin: 5  },
  { id: "fussball",       cat: "mannschaft",  de: "Fußball",        kcalPerMin: 9  },
  { id: "basketball",     cat: "mannschaft",  de: "Basketball",     kcalPerMin: 8  },
  { id: "gehen",          cat: "alltag",      de: "Spazierengehen", kcalPerMin: 3  },
  { id: "treppensteigen", cat: "alltag",      de: "Treppensteigen", kcalPerMin: 9  },
  { id: "hausarbeit",     cat: "alltag",      de: "Hausarbeit",     kcalPerMin: 3  },
];

// unit: Einheit für die Mengenangabe im UI (z.B. "Portion", "Glas", "Stück")
// portionG: Gramm pro 1 Einheit — für kcal-Berechnung
// unitDesc: Hinweis für den Nutzer, wie viel eine Einheit ist
export const lebensmittel = [

  // ── Iranische Hauptgerichte ──────────────────────────────────────────
  { id: "ghormeh-sabzi",  cat: "haupt", de: "Ghormeh Sabzi",       fa: "قورمه سبزی",    kcalPer100g: 110, portionG: 250, unit: "Portion",    unitDesc: "1 Portion ≈ 250g / große Schüssel" },
  { id: "fesenjan",       cat: "haupt", de: "Fesenjan",             fa: "فسنجان",        kcalPer100g: 160, portionG: 250, unit: "Portion",    unitDesc: "1 Portion ≈ 250g" },
  { id: "mirza-ghasemi",  cat: "haupt", de: "Mirza Ghasemi",        fa: "میرزا قاسمی",   kcalPer100g: 90,  portionG: 200, unit: "Portion",    unitDesc: "1 Portion ≈ 200g" },
  { id: "kashk-bademjan", cat: "haupt", de: "Kashk Bademjan",       fa: "کشک بادمجان",   kcalPer100g: 120, portionG: 200, unit: "Portion",    unitDesc: "1 Portion ≈ 200g" },
  { id: "dolmeh",         cat: "haupt", de: "Dolmeh",               fa: "دلمه",          kcalPer100g: 130, portionG: 60,  unit: "Stück",      unitDesc: "1 Stück ≈ 60g" },
  { id: "ash-reshteh",    cat: "haupt", de: "Ash Reshteh",          fa: "آش رشته",       kcalPer100g: 75,  portionG: 350, unit: "Tasse",      unitDesc: "1 Tasse ≈ 350ml (große Suppentasse)" },
  { id: "adasi",          cat: "haupt", de: "Adasi (Linsensuppe)",  fa: "عدسی",          kcalPer100g: 70,  portionG: 300, unit: "Tasse",      unitDesc: "1 Tasse ≈ 300ml" },
  { id: "abgoosht",       cat: "haupt", de: "Abgoosht / Dizi",      fa: "آبگوشت / دیزی", kcalPer100g: 100, portionG: 400, unit: "Portion",    unitDesc: "1 Dizi ≈ 400g (1 ganzer Topf)" },
  { id: "makaroni-irani", cat: "haupt", de: "Iranische Makaroni",    fa: "ماکارونی",      kcalPer100g: 155, portionG: 300, unit: "Portion",    unitDesc: "1 Teller ≈ 300g" },
  { id: "kotlet",         cat: "haupt", de: "Kotlet",                fa: "کتلت",          kcalPer100g: 230, portionG: 80,  unit: "Stück",      unitDesc: "1 Stück ≈ 80g" },
  { id: "kuku-sabzi",     cat: "haupt", de: "Kuku Sabzi",            fa: "کوکو سبزی",     kcalPer100g: 160, portionG: 120, unit: "Stück",      unitDesc: "1 Stück ≈ 120g" },
  { id: "pizza",          cat: "haupt", de: "Pizza",                 fa: "پیتزا",         kcalPer100g: 260, portionG: 125, unit: "Stück",      unitDesc: "1 Stück ≈ 125g" },
  { id: "pasta-tomate",   cat: "haupt", de: "Pasta mit Tomatensoße", fa: "",              kcalPer100g: 140, portionG: 300, unit: "Portion",    unitDesc: "1 Teller ≈ 300g" },
  { id: "pommes",         cat: "haupt", de: "Pommes",                fa: "سیب زمینی سرخ کرده", kcalPer100g: 310, portionG: 150, unit: "Portion", unitDesc: "1 Portion ≈ 150g" },

  // ── Kebab & Grill ────────────────────────────────────────────────────
  { id: "koobideh",       cat: "kebab", de: "Kebab Koobideh",       fa: "کباب کوبیده",   kcalPer100g: 230, portionG: 150, unit: "Spieß",      unitDesc: "1 Spieß ≈ 150g" },
  { id: "kebab-barg",     cat: "kebab", de: "Kebab Barg",           fa: "کباب برگ",      kcalPer100g: 200, portionG: 150, unit: "Spieß",      unitDesc: "1 Spieß ≈ 150g" },
  { id: "joojeh-kebab",   cat: "kebab", de: "Jujeh Kebab",          fa: "جوجه کباب",     kcalPer100g: 170, portionG: 200, unit: "Portion",    unitDesc: "1 Portion ≈ 200g / 4–5 Stücke" },
  { id: "doner",          cat: "kebab", de: "Döner",                 fa: "دونر",          kcalPer100g: 215, portionG: 350, unit: "Stück",      unitDesc: "1 Döner ≈ 350g" },
  { id: "falafel-wrap",   cat: "kebab", de: "Falafel Wrap",          fa: "فلافل",         kcalPer100g: 210, portionG: 300, unit: "Stück",      unitDesc: "1 Wrap ≈ 300g" },

  // ── Reis ─────────────────────────────────────────────────────────────
  { id: "chelo",          cat: "reis", de: "Gedämpfter Reis (Chelo)", fa: "چلو",         kcalPer100g: 130, portionG: 200, unit: "Portion",    unitDesc: "1 Portion ≈ 200g / 6–8 Esslöffel" },
  { id: "tahdig",         cat: "reis", de: "Reiskruste (Tahdig)",     fa: "ته‌دیگ",      kcalPer100g: 190, portionG: 60,  unit: "Stück",      unitDesc: "1 Stück ≈ 60g (eine handgroße Scheibe)" },
  { id: "zereshk-polo",   cat: "reis", de: "Zereshk Polo",            fa: "زرشک‌پلو",    kcalPer100g: 140, portionG: 250, unit: "Portion",    unitDesc: "1 Portion ≈ 250g" },
  { id: "baghali-polo",   cat: "reis", de: "Baghali Polo",            fa: "باقالی پلو",  kcalPer100g: 150, portionG: 250, unit: "Portion",    unitDesc: "1 Portion ≈ 250g" },
  { id: "adas-polo",      cat: "reis", de: "Adas Polo",               fa: "عدس پلو",     kcalPer100g: 155, portionG: 250, unit: "Portion",    unitDesc: "1 Portion ≈ 250g" },
  { id: "kateh",          cat: "reis", de: "Kateh",                   fa: "کته",         kcalPer100g: 135, portionG: 200, unit: "Portion",    unitDesc: "1 Portion ≈ 200g" },

  // ── Brot & Backwaren ─────────────────────────────────────────────────
  { id: "naan",           cat: "brot", de: "Nan (Fladenbrot)",         fa: "نان",         kcalPer100g: 260, portionG: 100, unit: "Stück",      unitDesc: "1 Stück ≈ 100g (halbes Fladenbrot)" },
  { id: "lavash",         cat: "brot", de: "Lavash",                   fa: "لواش",        kcalPer100g: 275, portionG: 60,  unit: "Blatt",      unitDesc: "1 Blatt ≈ 60g (halbes Blatt)" },
  { id: "sangak",         cat: "brot", de: "Sangak",                   fa: "سنگک",        kcalPer100g: 220, portionG: 100, unit: "Stück",      unitDesc: "1 Stück ≈ 100g (ein Viertel Sangak)" },
  { id: "brot-kuerbis",   cat: "brot", de: "Deutsches Kürbiskernbrot", fa: "",            kcalPer100g: 270, portionG: 60,  unit: "Scheibe",    unitDesc: "1 Scheibe ≈ 60g (1 dicke Scheibe)" },
  { id: "brot-walnuss",   cat: "brot", de: "Deutsches Walnussbrot",    fa: "",            kcalPer100g: 290, portionG: 60,  unit: "Scheibe",    unitDesc: "1 Scheibe ≈ 60g (1 dicke Scheibe)" },
  { id: "toast",          cat: "brot", de: "Toastbrot",                 fa: "",            kcalPer100g: 265, portionG: 30,  unit: "Scheibe",    unitDesc: "1 Scheibe ≈ 30g" },
  { id: "broetchen",      cat: "brot", de: "Brötchen",                  fa: "",            kcalPer100g: 270, portionG: 60,  unit: "Stück",      unitDesc: "1 Brötchen ≈ 60g" },
  { id: "croissant",      cat: "brot", de: "Croissant",                 fa: "",            kcalPer100g: 405, portionG: 70,  unit: "Stück",      unitDesc: "1 Croissant ≈ 70g" },

  // ── Frühstück & Beilagen ─────────────────────────────────────────────
  { id: "ei",             cat: "fruehstueck", de: "Ei (gekocht)",          fa: "تخم‌مرغ",       kcalPer100g: 155, portionG: 60,  unit: "Stück",      unitDesc: "1 Ei ≈ 60g" },
  { id: "ei-tomate",      cat: "fruehstueck", de: "Rührei mit Tomate",     fa: "تخم مرغ با گوجه", kcalPer100g: 120, portionG: 150, unit: "Portion",    unitDesc: "1 Portion ≈ 150g / 2 Eier + Tomate" },
  { id: "kaese",          cat: "fruehstueck", de: "Käse",                  fa: "پنیر",          kcalPer100g: 350, portionG: 30,  unit: "Scheibe",    unitDesc: "1 Scheibe ≈ 30g" },
  { id: "mast",           cat: "fruehstueck", de: "Joghurt (Mast)",        fa: "ماست",          kcalPer100g: 60,  portionG: 150, unit: "Tasse",      unitDesc: "1 Tasse ≈ 150g (kleine Schüssel)" },
  { id: "marmelade",      cat: "fruehstueck", de: "Marmelade",             fa: "مربا",          kcalPer100g: 250, portionG: 20,  unit: "Esslöffel",  unitDesc: "1 EL ≈ 20g (1 gestrichener Esslöffel)" },
  { id: "honig",          cat: "fruehstueck", de: "Honig",                 fa: "عسل",           kcalPer100g: 300, portionG: 10,  unit: "Teelöffel",  unitDesc: "1 TL ≈ 10g (1 Teelöffel)" },
  { id: "haferflocken",   cat: "fruehstueck", de: "Haferflocken",          fa: "",              kcalPer100g: 370, portionG: 50,  unit: "Portion",    unitDesc: "1 Portion ≈ 50g" },
  { id: "muesli",         cat: "fruehstueck", de: "Müsli",                 fa: "",              kcalPer100g: 380, portionG: 60,  unit: "Portion",    unitDesc: "1 Schüssel ≈ 60g" },
  { id: "milch",          cat: "fruehstueck", de: "Milch",                 fa: "شیر",           kcalPer100g: 64,  portionG: 250, unit: "Glas",       unitDesc: "1 Glas ≈ 250ml" },
  { id: "quark",          cat: "fruehstueck", de: "Quark",                 fa: "",              kcalPer100g: 70,  portionG: 150, unit: "Schüssel",   unitDesc: "1 Schüssel ≈ 150g" },
  { id: "butter",         cat: "fruehstueck", de: "Butter",                fa: "کره",           kcalPer100g: 717, portionG: 10,  unit: "Teelöffel",  unitDesc: "1 TL ≈ 10g" },

  // ── Fleisch & Fisch ──────────────────────────────────────────────────
  { id: "huehnchen",      cat: "fleisch", de: "Hühnchenbrust",       fa: "سینه مرغ",         kcalPer100g: 165, portionG: 150, unit: "Stück",      unitDesc: "1 Stück ≈ 150g (1 Brustfilet)" },
  { id: "nugget-huhn",    cat: "fleisch", de: "Chicken Nuggets",     fa: "ناگت مرغ",         kcalPer100g: 250, portionG: 20,  unit: "Stück",      unitDesc: "1 Stück ≈ 20g (1 Nugget)" },
  { id: "nugget-fisch",   cat: "fleisch", de: "Fisch Nuggets",       fa: "ناگت ماهی",        kcalPer100g: 220, portionG: 20,  unit: "Stück",      unitDesc: "1 Stück ≈ 20g (1 Nugget)" },
  { id: "lachs",          cat: "fleisch", de: "Lachs Filet",         fa: "فیله ماهی سالمون", kcalPer100g: 200, portionG: 150, unit: "Stück",      unitDesc: "1 Filet ≈ 150g" },
  { id: "cordon-bleu",    cat: "fleisch", de: "Cordon Bleu",         fa: "کوردون بلو",       kcalPer100g: 240, portionG: 180, unit: "Stück",      unitDesc: "1 Stück ≈ 180g" },
  { id: "burger",         cat: "fleisch", de: "Rindfleisch Burger",  fa: "همبرگر گوساله",    kcalPer100g: 290, portionG: 150, unit: "Patty",      unitDesc: "1 Patty ≈ 150g" },
  { id: "kalbsalas",      cat: "fleisch", de: "Hähnchen-Aufschnitt", fa: "کالباس مرغ",       kcalPer100g: 150, portionG: 30,  unit: "Scheibe",    unitDesc: "1 Scheibe ≈ 30g (2–3 dünne Scheiben)" },
  { id: "hackfleisch",    cat: "fleisch", de: "Hackfleisch gebraten", fa: "گوشت چرخ کرده",   kcalPer100g: 250, portionG: 150, unit: "Portion",    unitDesc: "1 Portion ≈ 150g" },
  { id: "putenbrust",     cat: "fleisch", de: "Putenbrust",           fa: "",                kcalPer100g: 135, portionG: 150, unit: "Stück",      unitDesc: "1 Stück ≈ 150g" },
  { id: "thunfisch",      cat: "fleisch", de: "Thunfisch",            fa: "تن ماهی",         kcalPer100g: 130, portionG: 150, unit: "Dose",       unitDesc: "1 Dose abgetropft ≈ 150g" },
  { id: "wurst",          cat: "fleisch", de: "Wurst",                fa: "سوسیس",           kcalPer100g: 300, portionG: 80,  unit: "Stück",      unitDesc: "1 Stück ≈ 80g" },

  // ── Gemüse & Salat ───────────────────────────────────────────────────
  { id: "salad-shirazi",  cat: "gemuese", de: "Salat Shirazi",        fa: "سالاد شیرازی",      kcalPer100g: 35,  portionG: 150, unit: "Schüssel",   unitDesc: "1 Schüssel ≈ 150g (kleine Beilagenschüssel)" },
  { id: "salad-mayo",     cat: "gemuese", de: "Salat mit Mayo",       fa: "سالاد با سس مایونز", kcalPer100g: 150, portionG: 200, unit: "Schüssel",   unitDesc: "1 Schüssel ≈ 200g" },
  { id: "torshi",         cat: "gemuese", de: "Torshi (Eingelegtes)", fa: "ترشی",              kcalPer100g: 20,  portionG: 50,  unit: "Esslöffel",  unitDesc: "1 EL ≈ 50g (1 großer Esslöffel)" },
  { id: "tomate",         cat: "gemuese", de: "Tomate",               fa: "گوجه فرنگی",        kcalPer100g: 18,  portionG: 120, unit: "Stück",      unitDesc: "1 Stück ≈ 120g (1 mittelgroße Tomate)" },
  { id: "gurke",          cat: "gemuese", de: "Gurke",                fa: "خیار",              kcalPer100g: 15,  portionG: 100, unit: "Stück",      unitDesc: "½ Gurke ≈ 100g" },
  { id: "olivenoel",      cat: "gemuese", de: "Olivenöl",             fa: "روغن زیتون",        kcalPer100g: 884, portionG: 10,  unit: "Esslöffel",  unitDesc: "1 EL ≈ 10ml (1 Esslöffel)" },
  { id: "kartoffel",      cat: "gemuese", de: "Kartoffel gekocht",    fa: "سیب زمینی",         kcalPer100g: 77,  portionG: 150, unit: "Stück",      unitDesc: "1 mittelgroße Kartoffel ≈ 150g" },
  { id: "brokkoli",       cat: "gemuese", de: "Brokkoli",             fa: "کلم بروکلی",        kcalPer100g: 35,  portionG: 150, unit: "Portion",    unitDesc: "1 Portion ≈ 150g" },
  { id: "avocado",        cat: "gemuese", de: "Avocado",              fa: "آووکادو",           kcalPer100g: 160, portionG: 100, unit: "Stück",      unitDesc: "½ Avocado ≈ 100g" },
  { id: "linsen",         cat: "gemuese", de: "Linsen gekocht",       fa: "عدس",               kcalPer100g: 116, portionG: 200, unit: "Portion",    unitDesc: "1 Portion ≈ 200g" },

  // ── Obst ─────────────────────────────────────────────────────────────
  { id: "apfel",          cat: "obst", de: "Apfel",  fa: "سیب", kcalPer100g: 52, portionG: 150, unit: "Stück", unitDesc: "1 mittelgroßer Apfel ≈ 150g" },
  { id: "banane",         cat: "obst", de: "Banane", fa: "موز", kcalPer100g: 89, portionG: 120, unit: "Stück", unitDesc: "1 Banane ≈ 120g" },
  { id: "orange",         cat: "obst", de: "Orange", fa: "پرتقال", kcalPer100g: 47, portionG: 160, unit: "Stück", unitDesc: "1 Orange ≈ 160g" },
  { id: "trauben",        cat: "obst", de: "Trauben", fa: "انگور", kcalPer100g: 69, portionG: 150, unit: "Schüssel", unitDesc: "1 Schüssel ≈ 150g" },
  { id: "erdbeeren",      cat: "obst", de: "Erdbeeren", fa: "توت فرنگی", kcalPer100g: 32, portionG: 150, unit: "Schüssel", unitDesc: "1 Schüssel ≈ 150g" },
  { id: "datteln",        cat: "obst", de: "Datteln", fa: "خرما", kcalPer100g: 282, portionG: 10, unit: "Stück", unitDesc: "1 Dattel ≈ 10g" },

  // ── Getränke ─────────────────────────────────────────────────────────
  { id: "doogh",          cat: "getraenke", de: "Doogh", fa: "دوغ", kcalPer100g: 30, portionG: 250, unit: "Glas", unitDesc: "1 Glas ≈ 250ml" },
  { id: "wasser",         cat: "getraenke", de: "Wasser", fa: "آب", kcalPer100g: 0, portionG: 250, unit: "Glas", unitDesc: "1 Glas ≈ 250ml" },
  { id: "tee",            cat: "getraenke", de: "Tee ohne Zucker", fa: "چای", kcalPer100g: 1, portionG: 250, unit: "Tasse", unitDesc: "1 Tasse ≈ 250ml" },
  { id: "kaffee",         cat: "getraenke", de: "Kaffee schwarz", fa: "قهوه", kcalPer100g: 2, portionG: 200, unit: "Tasse", unitDesc: "1 Tasse ≈ 200ml" },
  { id: "cola",           cat: "getraenke", de: "Cola", fa: "", kcalPer100g: 42, portionG: 250, unit: "Glas", unitDesc: "1 Glas ≈ 250ml" },
  { id: "orangensaft",    cat: "getraenke", de: "Orangensaft", fa: "آب پرتقال", kcalPer100g: 45, portionG: 250, unit: "Glas", unitDesc: "1 Glas ≈ 250ml" },
  { id: "ayran",          cat: "getraenke", de: "Ayran", fa: "آیران", kcalPer100g: 35, portionG: 250, unit: "Glas", unitDesc: "1 Glas ≈ 250ml" },

  // ── Snacks & Süßes ───────────────────────────────────────────────────
  { id: "schokolade",     cat: "sonstiges", de: "Schokolade", fa: "شکلات", kcalPer100g: 540, portionG: 25, unit: "Stück", unitDesc: "1 Stück/Riegelteil ≈ 25g" },
  { id: "kuchen",         cat: "sonstiges", de: "Kuchen", fa: "کیک", kcalPer100g: 360, portionG: 100, unit: "Stück", unitDesc: "1 Stück ≈ 100g" },
  { id: "chips",          cat: "sonstiges", de: "Chips", fa: "چیپس", kcalPer100g: 535, portionG: 30, unit: "Portion", unitDesc: "1 kleine Portion ≈ 30g" },
  { id: "nuesse",         cat: "sonstiges", de: "Nüsse", fa: "آجیل", kcalPer100g: 600, portionG: 30, unit: "Portion", unitDesc: "1 Handvoll ≈ 30g" },
  { id: "eis",            cat: "sonstiges", de: "Eis", fa: "بستنی", kcalPer100g: 200, portionG: 100, unit: "Kugel", unitDesc: "2 Kugeln ≈ 100g" },
];

export const kategorien = [
  { id: "haupt",       de: "Iranische Hauptgerichte", fa: "غذای اصلی ایرانی" },
  { id: "kebab",       de: "Kebab & Grill",           fa: "کباب و گریل"      },
  { id: "reis",        de: "Reis",                    fa: "برنج"              },
  { id: "brot",        de: "Brot & Backwaren",        fa: "نان"               },
  { id: "fruehstueck", de: "Frühstück",               fa: "صبحانه"            },
  { id: "fleisch",     de: "Fleisch & Fisch",         fa: "گوشت و ماهی"      },
  { id: "gemuese",     de: "Gemüse & Salat",          fa: "سبزیجات و سالاد"  },
  { id: "obst",        de: "Obst",                    fa: "میوه"              },
  { id: "getraenke",   de: "Getränke",                fa: "نوشیدنی"           },
];

export function berechneKcalSport(sportId, minuten) {
  const sport = sportarten.find((s) => s.id === sportId);
  if (!sport) return 0;
  return Math.round(sport.kcalPerMin * minuten);
}

// count: Anzahl der Einheiten (Portionen, Stücke, Gläser …)
export function berechneKcalEssen(lebensmittelId, count) {
  const essen = lebensmittel.find((l) => l.id === lebensmittelId);
  if (!essen) return 0;
  return Math.round((essen.kcalPer100g / 100) * count * essen.portionG);
}
