// Kalorien pro Minute (Durchschnitt ~70 kg Person)
export const sportarten = [
  { id: "gehen",          de: "Spazierengehen",       fa: "پیاده‌روی آرام",     kcalPerMin: 3 },
  { id: "schnell-gehen",  de: "Schnell gehen",        fa: "پیاده‌روی تند",      kcalPerMin: 5 },
  { id: "joggen",         de: "Joggen",                fa: "آهسته دویدن",        kcalPerMin: 8 },
  { id: "laufen",         de: "Laufen",                fa: "دویدن",              kcalPerMin: 12 },
  { id: "radfahren",      de: "Radfahren",             fa: "دوچرخه‌سواری",       kcalPerMin: 7 },
  { id: "schwimmen",      de: "Schwimmen",             fa: "شنا",                kcalPerMin: 9 },
  { id: "krafttraining",  de: "Krafttraining",         fa: "تمرین با وزنه",      kcalPerMin: 6 },
  { id: "calisthenics",   de: "Calisthenics",          fa: "تمرین بدون ابزار",   kcalPerMin: 8 },
  { id: "yoga",           de: "Yoga",                  fa: "یوگا",               kcalPerMin: 3 },
  { id: "hiit",           de: "HIIT",                  fa: "تمرین تناوبی",       kcalPerMin: 12 },
  { id: "fussball",       de: "Fußball",               fa: "فوتبال",             kcalPerMin: 9 },
  { id: "basketball",     de: "Basketball",            fa: "بسکتبال",            kcalPerMin: 8 },
  { id: "tanzen",         de: "Tanzen",                fa: "رقص",                kcalPerMin: 5 },
  { id: "treppensteigen", de: "Treppensteigen",        fa: "بالا رفتن از پله",   kcalPerMin: 9 },
  { id: "pilates",        de: "Pilates",               fa: "پیلاتس",             kcalPerMin: 4 },
  { id: "hausarbeit",     de: "Hausarbeit",            fa: "کارهای خانگی",       kcalPerMin: 3 },
];

// category: Gruppierung für UI
// kcalPer100g: Kalorien pro 100g
// portionG: typische Portion in Gramm
export const lebensmittel = [

  // ── Iranische Hauptgerichte ───────────────────────────────────────
  { id: "ghormeh-sabzi",  cat: "irani-haupt", de: "Ghormeh Sabzi",          fa: "قورمه سبزی",      kcalPer100g: 110, portionG: 250 },
  { id: "fesenjan",       cat: "irani-haupt", de: "Fesenjan",               fa: "فسنجان",          kcalPer100g: 160, portionG: 250 },
  { id: "abgoosht",       cat: "irani-haupt", de: "Abgoosht / Dizi",        fa: "آبگوشت / دیزی",   kcalPer100g: 100, portionG: 400 },
  { id: "mirza-ghasemi",  cat: "irani-haupt", de: "Mirza Ghasemi",          fa: "میرزا قاسمی",     kcalPer100g: 90,  portionG: 200 },
  { id: "kashk-bademjan", cat: "irani-haupt", de: "Kashk Bademjan",         fa: "کشک بادمجان",     kcalPer100g: 120, portionG: 200 },
  { id: "ash-reshteh",    cat: "irani-haupt", de: "Ash Reshteh",            fa: "آش رشته",         kcalPer100g: 75,  portionG: 350 },
  { id: "adasi",          cat: "irani-haupt", de: "Adasi (Linsensuppe)",    fa: "عدسی",            kcalPer100g: 70,  portionG: 300 },
  { id: "dolmeh",         cat: "irani-haupt", de: "Dolmeh",                 fa: "دلمه",            kcalPer100g: 130, portionG: 200 },

  // ── Kebab & Grill ────────────────────────────────────────────────
  { id: "koobideh",       cat: "kebab", de: "Kebab Koobideh",              fa: "کباب کوبیده",     kcalPer100g: 230, portionG: 150 },
  { id: "kebab-barg",     cat: "kebab", de: "Kebab Barg",                  fa: "کباب برگ",        kcalPer100g: 200, portionG: 150 },
  { id: "joojeh-kebab",   cat: "kebab", de: "Jujeh Kebab",                 fa: "جوجه کباب",       kcalPer100g: 170, portionG: 200 },

  // ── Iranischer Reis & Brot ───────────────────────────────────────
  { id: "chelo",          cat: "reis-brot", de: "Gedämpfter Reis (Chelo)", fa: "چلو",             kcalPer100g: 130, portionG: 200 },
  { id: "tahdig",         cat: "reis-brot", de: "Reiskruste (Tahdig)",     fa: "ته‌دیگ",          kcalPer100g: 190, portionG: 80  },
  { id: "zereshk-polo",   cat: "reis-brot", de: "Zereshk Polo",            fa: "زرشک‌پلو",        kcalPer100g: 140, portionG: 250 },
  { id: "naan",           cat: "reis-brot", de: "Nan (Fladenbrot)",        fa: "نان",             kcalPer100g: 260, portionG: 100 },
  { id: "lavash",         cat: "reis-brot", de: "Lavash",                  fa: "لواش",            kcalPer100g: 275, portionG: 60  },
  { id: "sangak",         cat: "reis-brot", de: "Sangak",                  fa: "سنگک",            kcalPer100g: 220, portionG: 100 },

  // ── Deutsches Brot & Frühstück ───────────────────────────────────
  { id: "brot-kuerbis",   cat: "brot-frueh", de: "Deutsches Brot mit Kürbiskernen", fa: "نان آلمانی با تخم کدو", kcalPer100g: 270, portionG: 60 },
  { id: "brot-walnuss",   cat: "brot-frueh", de: "Deutsches Brot mit Walnüssen",    fa: "نان آلمانی با گردو",    kcalPer100g: 290, portionG: 60 },
  { id: "marmelade",      cat: "brot-frueh", de: "Marmelade",                       fa: "مربا",                  kcalPer100g: 250, portionG: 20 },
  { id: "honig",          cat: "brot-frueh", de: "Honig",                           fa: "عسل",                   kcalPer100g: 300, portionG: 20 },

  // ── Fleisch, Fisch & Geflügel ────────────────────────────────────
  { id: "huehnchen",      cat: "fleisch", de: "Hühnchenbrust",            fa: "سینه مرغ",        kcalPer100g: 165, portionG: 150 },
  { id: "nugget-huhn",    cat: "fleisch", de: "Chicken Nuggets",          fa: "ناگت مرغ",        kcalPer100g: 250, portionG: 100 },
  { id: "nugget-fisch",   cat: "fleisch", de: "Fisch Nuggets",            fa: "ناگت ماهی",       kcalPer100g: 220, portionG: 100 },
  { id: "lachs",          cat: "fleisch", de: "Lachs Filet",              fa: "فیله ماهی سالمون", kcalPer100g: 200, portionG: 150 },
  { id: "cordon-bleu",    cat: "fleisch", de: "Cordon Bleu",              fa: "کوردون بلو",      kcalPer100g: 240, portionG: 180 },
  { id: "burger",         cat: "fleisch", de: "Rindfleisch Burger",       fa: "همبرگر گوساله",   kcalPer100g: 290, portionG: 150 },
  { id: "kalbsalas",      cat: "fleisch", de: "Hähnchen-Aufschnitt",      fa: "کالباس مرغ",      kcalPer100g: 150, portionG: 30  },

  // ── Eier-Gerichte ───────────────────────────────────────────────
  { id: "ei",             cat: "eier", de: "Ei (gekocht)",                fa: "تخم‌مرغ",         kcalPer100g: 155, portionG: 60  },
  { id: "ei-tomate",      cat: "eier", de: "Rührei mit Tomate",          fa: "تخم مرغ با گوجه", kcalPer100g: 120, portionG: 150 },

  // ── Milch & Käse ────────────────────────────────────────────────
  { id: "kaese",          cat: "milch", de: "Käse",                       fa: "پنیر",            kcalPer100g: 350, portionG: 30  },
  { id: "mast",           cat: "milch", de: "Joghurt (Mast)",             fa: "ماست",            kcalPer100g: 60,  portionG: 150 },
  { id: "doogh",          cat: "milch", de: "Doogh (Joghurtgetränk)",     fa: "دوغ",             kcalPer100g: 30,  portionG: 250 },

  // ── Salate & Beilagen ───────────────────────────────────────────
  { id: "salad-shirazi",  cat: "salat", de: "Salat Shirazi",              fa: "سالاد شیرازی",    kcalPer100g: 35,  portionG: 150 },
  { id: "salad-mayo",     cat: "salat", de: "Salat mit Mayonnaise",       fa: "سالاد با سس مایونز", kcalPer100g: 150, portionG: 200 },
  { id: "torshi",         cat: "salat", de: "Torshi (Eingelegtes)",       fa: "ترشی",            kcalPer100g: 20,  portionG: 50  },

  // ── Gemüse & Obst ───────────────────────────────────────────────
  { id: "tomate",         cat: "gemuese", de: "Tomate",                   fa: "گوجه فرنگی",      kcalPer100g: 18,  portionG: 120 },
  { id: "gurke",          cat: "gemuese", de: "Gurke",                    fa: "خیار",            kcalPer100g: 15,  portionG: 100 },
  { id: "apfel",          cat: "gemuese", de: "Apfel",                    fa: "سیب",             kcalPer100g: 52,  portionG: 150 },
  { id: "banane",         cat: "gemuese", de: "Banane",                   fa: "موز",             kcalPer100g: 89,  portionG: 120 },

  // ── Öle & Fette ─────────────────────────────────────────────────
  { id: "olivenoel",      cat: "fette", de: "Olivenöl",                   fa: "روغن زیتون",      kcalPer100g: 884, portionG: 10  },
];

export const kategorien = [
  { id: "irani-haupt", de: "Iranische Hauptgerichte", fa: "غذای ایرانی"          },
  { id: "kebab",       de: "Kebab & Grill",           fa: "کباب و گریل"          },
  { id: "reis-brot",   de: "Iranischer Reis & Brot",  fa: "برنج و نان ایرانی"    },
  { id: "brot-frueh",  de: "Deutsches Brot & Frühstück", fa: "نان آلمانی و صبحانه" },
  { id: "fleisch",     de: "Fleisch, Fisch & Geflügel", fa: "گوشت، ماهی و مرغ"  },
  { id: "eier",        de: "Eier-Gerichte",           fa: "تخم مرغ"              },
  { id: "milch",       de: "Milch & Käse",            fa: "لبنیات"               },
  { id: "salat",       de: "Salate & Beilagen",       fa: "سالاد و پیش‌غذا"      },
  { id: "gemuese",     de: "Gemüse & Obst",           fa: "سبزیجات و میوه"       },
  { id: "fette",       de: "Öle & Fette",             fa: "روغن و چربی"          },
];

export function berechneKcalSport(sportId, minuten) {
  const sport = sportarten.find((s) => s.id === sportId);
  if (!sport) return 0;
  return Math.round(sport.kcalPerMin * minuten);
}

export function berechneKcalEssen(lebensmittelId, gramm) {
  const essen = lebensmittel.find((l) => l.id === lebensmittelId);
  if (!essen) return 0;
  return Math.round((essen.kcalPer100g / 100) * gramm);
}
