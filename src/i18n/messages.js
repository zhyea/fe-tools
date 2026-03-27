export const LOCALES = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
  { value: 'ru', label: 'Русский' },
  { value: 'ar', label: 'العربية' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'sv', label: 'Svenska' },
  { value: 'no', label: 'Norsk' },
  { value: 'da', label: 'Dansk' },
  { value: 'fi', label: 'Suomi' },
  { value: 'pl', label: 'Polski' },
  { value: 'cs', label: 'Čeština' },
  { value: 'el', label: 'Ελληνικά' },
  { value: 'he', label: 'עברית' },
  { value: 'id', label: 'Bahasa Indonesia' }
]

export const messages = {
  'zh-CN': {
    appTitle: 'JSON 工具',
    menu: { format: 'JSON 格式化', compress: 'JSON 压缩', compare: 'JSON 对比' },
    tabs: { pretty: '格式化', minify: '压缩', tree: '树形' },
    common: {
      language: '语言',
      inputJson: '输入 JSON',
      outputJson: '输出 JSON',
      autoDecode: '自动解码输入',
      outputEscaped: '输出转义字符串（便于嵌套）',
      indent: '缩进',
      indent2: '2 个空格',
      indent4: '4 个空格',
      copy: '复制',
      reset: '清空'
    },
    action: { format: '格式化', compress: '压缩', compare: '对比' },
    compare: {
      jsonA: 'JSON A',
      jsonB: 'JSON B',
      equal: 'JSON 一致',
      notEqual: 'JSON 不一致',
      diff: '差异详情',
      diffPreview: '差异预览（格式化）',
      copyLeft: '复制 A',
      copyRight: '复制 B'
    },
    errors: { invalidJson: '无法解析为有效 JSON', empty: '输入为空' },
    labels: { result: '结果' }
  },
  'zh-TW': {
    appTitle: 'JSON 工具',
    menu: { format: 'JSON 格式化', compress: 'JSON 壓縮', compare: 'JSON 對比' },
    common: {
      language: '語言',
      inputJson: '輸入 JSON',
      outputJson: '輸出 JSON',
      autoDecode: '自動解碼輸入',
      outputEscaped: '輸出轉義字串（便於嵌套）',
      indent: '縮排',
      indent2: '2 個空格',
      indent4: '4 個空格',
      copy: '複製',
      reset: '清空'
    },
    action: { format: '格式化', compress: '壓縮', compare: '對比' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'JSON 一致', notEqual: 'JSON 不一致', diff: '差異詳情' },
    errors: { invalidJson: '無法解析為有效 JSON', empty: '輸入為空' },
    labels: { result: '結果' }
  },
  en: {
    appTitle: 'JSON Tools',
    menu: { format: 'JSON Formatter', compress: 'JSON Compressor', compare: 'JSON Compare' },
    tabs: { pretty: 'Pretty', minify: 'Minified', tree: 'Tree' },
    common: {
      language: 'Language',
      inputJson: 'Input JSON',
      outputJson: 'Output JSON',
      autoDecode: 'Auto-decode input',
      outputEscaped: 'Output escaped string (for nesting)',
      indent: 'Indent',
      indent2: '2 spaces',
      indent4: '4 spaces',
      copy: 'Copy',
      reset: 'Clear'
    },
    action: { format: 'Format', compress: 'Compress', compare: 'Compare' },
    compare: {
      jsonA: 'JSON A',
      jsonB: 'JSON B',
      equal: 'JSON matches',
      notEqual: 'JSON differs',
      diff: 'Differences',
      diffPreview: 'Diff preview (formatted)',
      copyLeft: 'Copy A',
      copyRight: 'Copy B'
    },
    errors: { invalidJson: 'Unable to parse valid JSON', empty: 'Input is empty' },
    labels: { result: 'Result' }
  },
  ja: {
    appTitle: 'JSON ツール',
    menu: { format: 'JSON フォーマット', compress: 'JSON 圧縮', compare: 'JSON 比較' },
    common: {
      language: '言語',
      inputJson: '入力 JSON',
      outputJson: '出力 JSON',
      autoDecode: '入力を自動デコード',
      outputEscaped: 'エスケープ文字列として出力（埋め込み用）',
      indent: 'インデント',
      indent2: '2 スペース',
      indent4: '4 スペース',
      copy: 'コピー',
      reset: 'クリア'
    },
    action: { format: 'フォーマット', compress: '圧縮', compare: '比較' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: '一致', notEqual: '不一致', diff: '差分' },
    errors: { invalidJson: '有効な JSON として解析できません', empty: '入力が空です' },
    labels: { result: '結果' }
  },
  ko: {
    appTitle: 'JSON 도구',
    menu: { format: 'JSON 포매터', compress: 'JSON 압축', compare: 'JSON 비교' },
    common: {
      language: '언어',
      inputJson: '입력 JSON',
      outputJson: '출력 JSON',
      autoDecode: '입력 자동 디코드',
      outputEscaped: '이스케이프 문자열로 출력(중첩용)',
      indent: '들여쓰기',
      indent2: '공백 2개',
      indent4: '공백 4개',
      copy: '복사',
      reset: '초기화'
    },
    action: { format: '포맷', compress: '압축', compare: '비교' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: '일치', notEqual: '불일치', diff: '차이점' },
    errors: { invalidJson: '유효한 JSON으로 파싱할 수 없습니다', empty: '입력이 비어 있습니다' },
    labels: { result: '결과' }
  },
  fr: {
    appTitle: 'Outils JSON',
    menu: { format: 'Formater JSON', compress: 'Compresser JSON', compare: 'Comparer JSON' },
    common: {
      language: 'Langue',
      inputJson: 'JSON d’entrée',
      outputJson: 'JSON de sortie',
      autoDecode: 'Décoder automatiquement l’entrée',
      outputEscaped: 'Sortir en chaîne échappée (pour l’emboîtement)',
      indent: 'Retrait',
      indent2: '2 espaces',
      indent4: '4 espaces',
      copy: 'Copier',
      reset: 'Effacer'
    },
    action: { format: 'Formatter', compress: 'Compresser', compare: 'Comparer' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Identiques', notEqual: 'Différents', diff: 'Différences' },
    errors: { invalidJson: 'Impossible d’analyser un JSON valide', empty: 'Entrée vide' },
    labels: { result: 'Résultat' }
  },
  de: {
    appTitle: 'JSON Tools',
    menu: { format: 'JSON formatieren', compress: 'JSON komprimieren', compare: 'JSON vergleichen' },
    common: {
      language: 'Sprache',
      inputJson: 'Eingabe JSON',
      outputJson: 'Ausgabe JSON',
      autoDecode: 'Eingabe automatisch dekodieren',
      outputEscaped: 'Als escaped Zeichenkette ausgeben (für Verschachtelung)',
      indent: 'Einrückung',
      indent2: '2 Leerzeichen',
      indent4: '4 Leerzeichen',
      copy: 'Kopieren',
      reset: 'Leeren'
    },
    action: { format: 'Formatieren', compress: 'Komprimieren', compare: 'Vergleichen' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Gleiche', notEqual: 'Unterschiede', diff: 'Abweichungen' },
    errors: { invalidJson: 'Kann kein gültiges JSON parsen', empty: 'Eingabe ist leer' },
    labels: { result: 'Ergebnis' }
  },
  es: {
    appTitle: 'Herramientas JSON',
    menu: { format: 'Formatear JSON', compress: 'Comprimir JSON', compare: 'Comparar JSON' },
    common: {
      language: 'Idioma',
      inputJson: 'JSON de entrada',
      outputJson: 'JSON de salida',
      autoDecode: 'Decodificar automáticamente la entrada',
      outputEscaped: 'Salida como cadena escapada (para anidar)',
      indent: 'Sangría',
      indent2: '2 espacios',
      indent4: '4 espacios',
      copy: 'Copiar',
      reset: 'Borrar'
    },
    action: { format: 'Formatear', compress: 'Comprimir', compare: 'Comparar' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Coinciden', notEqual: 'No coinciden', diff: 'Diferencias' },
    errors: { invalidJson: 'No se puede analizar JSON válido', empty: 'La entrada está vacía' },
    labels: { result: 'Resultado' }
  },
  it: {
    appTitle: 'Strumenti JSON',
    menu: { format: 'Formattare JSON', compress: 'Comprimere JSON', compare: 'Confrontare JSON' },
    common: {
      language: 'Lingua',
      inputJson: 'JSON in ingresso',
      outputJson: 'JSON in uscita',
      autoDecode: 'Decodifica automatica input',
      outputEscaped: 'Output stringa escapata (per nidificare)',
      indent: 'Rientro',
      indent2: '2 spazi',
      indent4: '4 spazi',
      copy: 'Copia',
      reset: 'Pulisci'
    },
    action: { format: 'Formatta', compress: 'Comprimi', compare: 'Confronta' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Uguali', notEqual: 'Diversi', diff: 'Differenze' },
    errors: { invalidJson: 'Impossibile analizzare JSON valido', empty: 'Input vuoto' },
    labels: { result: 'Risultato' }
  },
  pt: {
    appTitle: 'Ferramentas JSON',
    menu: { format: 'Formatar JSON', compress: 'Comprimir JSON', compare: 'Comparar JSON' },
    common: {
      language: 'Idioma',
      inputJson: 'JSON de entrada',
      outputJson: 'JSON de saída',
      autoDecode: 'Decodificar entrada automaticamente',
      outputEscaped: 'Saída como string escapada (para aninhar)',
      indent: 'Recuo',
      indent2: '2 espaços',
      indent4: '4 espaços',
      copy: 'Copiar',
      reset: 'Limpar'
    },
    action: { format: 'Formatar', compress: 'Comprimir', compare: 'Comparar' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Correspondem', notEqual: 'Diferem', diff: 'Diferenças' },
    errors: { invalidJson: 'Não foi possível analisar JSON válido', empty: 'Entrada vazia' },
    labels: { result: 'Resultado' }
  },
  ru: {
    appTitle: 'Инструменты JSON',
    menu: { format: 'Форматировать JSON', compress: 'Сжать JSON', compare: 'Сравнить JSON' },
    common: {
      language: 'Язык',
      inputJson: 'Входной JSON',
      outputJson: 'Выходной JSON',
      autoDecode: 'Автодекодировать вход',
      outputEscaped: 'Вывод как экранированная строка (для вложений)',
      indent: 'Отступ',
      indent2: '2 пробела',
      indent4: '4 пробела',
      copy: 'Копировать',
      reset: 'Очистить'
    },
    action: { format: 'Форматировать', compress: 'Сжать', compare: 'Сравнить' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Совпадают', notEqual: 'Различаются', diff: 'Отличия' },
    errors: { invalidJson: 'Не удалось распознать корректный JSON', empty: 'Ввод пуст' },
    labels: { result: 'Результат' }
  },
  ar: {
    appTitle: 'أدوات JSON',
    menu: { format: 'تنسيق JSON', compress: 'ضغط JSON', compare: 'مقارنة JSON' },
    common: {
      language: 'اللغة',
      inputJson: 'JSON المدخل',
      outputJson: 'JSON المخرج',
      autoDecode: 'فك التشفير تلقائيا للمدخل',
      outputEscaped: 'الإخراج كسلسلة مُهذبة (للتضمين)',
      indent: 'المسافة البادئة',
      indent2: 'مسافتان',
      indent4: '4 مسافات',
      copy: 'نسخ',
      reset: 'مسح'
    },
    action: { format: 'تنسيق', compress: 'ضغط', compare: 'مقارنة' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'متطابق', notEqual: 'غير متطابق', diff: 'التفاصيل' },
    errors: { invalidJson: 'تعذر تحليل JSON صحيح', empty: 'المدخل فارغ' },
    labels: { result: 'النتيجة' }
  },
  hi: {
    appTitle: 'JSON उपकरण',
    menu: { format: 'JSON स्वरूपित', compress: 'JSON संपीड़ित', compare: 'JSON तुलना' },
    common: {
      language: 'भाषा',
      inputJson: 'इनपुट JSON',
      outputJson: 'आउटपुट JSON',
      autoDecode: 'इनपुट स्वतः डिकोड',
      outputEscaped: 'एस्केप्ड स्ट्रिंग के रूप में आउटपुट (नेस्टिंग के लिए)',
      indent: 'इंडेंट',
      indent2: '2 स्पेस',
      indent4: '4 स्पेस',
      copy: 'कॉपी',
      reset: 'साफ़ करें'
    },
    action: { format: 'स्वरूपित', compress: 'संपीड़ित', compare: 'तुलना' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'समान', notEqual: 'असमान', diff: 'अंतर' },
    errors: { invalidJson: 'मान्य JSON का विश्लेषण नहीं हो सका', empty: 'इनपुट खाली है' },
    labels: { result: 'परिणाम' }
  },
  tr: {
    appTitle: 'JSON Araçları',
    menu: { format: 'JSON Biçimlendir', compress: 'JSON Sıkıştır', compare: 'JSON Karşılaştır' },
    common: {
      language: 'Dil',
      inputJson: 'Girdi JSON',
      outputJson: 'Çıktı JSON',
      autoDecode: 'Girdiyi otomatik kod çöz',
      outputEscaped: 'Kaçışlı dize olarak çıktı (iç içe için)',
      indent: 'Girinti',
      indent2: '2 boşluk',
      indent4: '4 boşluk',
      copy: 'Kopyala',
      reset: 'Temizle'
    },
    action: { format: 'Biçimlendir', compress: 'Sıkıştır', compare: 'Karşılaştır' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Eşleşiyor', notEqual: 'Farklı', diff: 'Farklar' },
    errors: { invalidJson: 'Geçerli JSON ayrıştırılamadı', empty: 'Girdi boş' },
    labels: { result: 'Sonuç' }
  },
  nl: {
    appTitle: 'JSON Hulpmiddelen',
    menu: { format: 'JSON formatteren', compress: 'JSON comprimeren', compare: 'JSON vergelijken' },
    common: {
      language: 'Taal',
      inputJson: 'Invoer JSON',
      outputJson: 'Uitvoer JSON',
      autoDecode: 'Invoer automatisch decoderen',
      outputEscaped: 'Uitvoer als escaped string (voor nesten)',
      indent: 'Inspringing',
      indent2: '2 spaties',
      indent4: '4 spaties',
      copy: 'Kopiëren',
      reset: 'Leegmaken'
    },
    action: { format: 'Formatteren', compress: 'Comprimeren', compare: 'Vergelijken' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Gelijk', notEqual: 'Verschillend', diff: 'Verschillen' },
    errors: { invalidJson: 'Kan geen geldige JSON ontleden', empty: 'Invoer is leeg' },
    labels: { result: 'Resultaat' }
  },
  sv: {
    appTitle: 'JSON-verktyg',
    menu: { format: 'Formatera JSON', compress: 'Komprimera JSON', compare: 'Jämför JSON' },
    common: {
      language: 'Språk',
      inputJson: 'Inmatad JSON',
      outputJson: 'Utmatad JSON',
      autoDecode: 'Avkoda inmatningen automatiskt',
      outputEscaped: 'Skriv ut som escaperad sträng (för inbäddning)',
      indent: 'Indrag',
      indent2: '2 mellanslag',
      indent4: '4 mellanslag',
      copy: 'Kopiera',
      reset: 'Rensa'
    },
    action: { format: 'Formatera', compress: 'Komprimera', compare: 'Jämför' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Stämmer', notEqual: 'Skiljer sig', diff: 'Skillnader' },
    errors: { invalidJson: 'Kunde inte tolka giltig JSON', empty: 'Inmatningen är tom' },
    labels: { result: 'Resultat' }
  },
  no: {
    appTitle: 'JSON-verktøy',
    menu: { format: 'Formater JSON', compress: 'Komprimer JSON', compare: 'Sammenlign JSON' },
    common: {
      language: 'Språk',
      inputJson: 'Inndata JSON',
      outputJson: 'Utdata JSON',
      autoDecode: 'Auto-dekoder input',
      outputEscaped: 'Skriv ut som escaped streng (for innstøping)',
      indent: 'Innrykk',
      indent2: '2 mellomrom',
      indent4: '4 mellomrom',
      copy: 'Kopier',
      reset: 'Tøm'
    },
    action: { format: 'Formater', compress: 'Komprimer', compare: 'Sammenlign' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Samsvarer', notEqual: 'Ulik', diff: 'Forskjeller' },
    errors: { invalidJson: 'Kunne ikke tolke gyldig JSON', empty: 'Inndata er tom' },
    labels: { result: 'Resultat' }
  },
  da: {
    appTitle: 'JSON-værktøjer',
    menu: { format: 'Formatér JSON', compress: 'Komprimér JSON', compare: 'Sammenlign JSON' },
    common: {
      language: 'Sprog',
      inputJson: 'Inddata JSON',
      outputJson: 'Uddata JSON',
      autoDecode: 'Auto-dekod inddata',
      outputEscaped: 'Output som escaped streng (til indlejring)',
      indent: 'Indrykning',
      indent2: '2 mellemrum',
      indent4: '4 mellemrum',
      copy: 'Kopiér',
      reset: 'Nulstil'
    },
    action: { format: 'Formatér', compress: 'Komprimér', compare: 'Sammenlign' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Matcher', notEqual: 'Forskellig', diff: 'Forskelle' },
    errors: { invalidJson: 'Kunne ikke analysere gyldig JSON', empty: 'Inddata er tom' },
    labels: { result: 'Resultat' }
  },
  fi: {
    appTitle: 'JSON-työkalut',
    menu: { format: 'Muotoile JSON', compress: 'Pakkaa JSON', compare: 'Vertaa JSON' },
    common: {
      language: 'Kieli',
      inputJson: 'Syöte JSON',
      outputJson: 'Tuloste JSON',
      autoDecode: 'Dekoodaa syöte automaattisesti',
      outputEscaped: 'Tulosta eskapoituna merkkijonona (upotusta varten)',
      indent: 'Sisennys',
      indent2: '2 välilyöntiä',
      indent4: '4 välilyöntiä',
      copy: 'Kopioi',
      reset: 'Tyhjennä'
    },
    action: { format: 'Muotoile', compress: 'Pakkaa', compare: 'Vertaa' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Täsmää', notEqual: 'Eroja', diff: 'Erot' },
    errors: { invalidJson: 'Kelvollista JSONia ei voitu jäsentää', empty: 'Syöte on tyhjä' },
    labels: { result: 'Tulos' }
  },
  pl: {
    appTitle: 'Narzędzia JSON',
    menu: { format: 'Formatuj JSON', compress: 'Kompresuj JSON', compare: 'Porównaj JSON' },
    common: {
      language: 'Język',
      inputJson: 'Wejściowy JSON',
      outputJson: 'Wyjściowy JSON',
      autoDecode: 'Automatycznie dekoduj wejście',
      outputEscaped: 'Wypisz jako łańcuch z ucieczkami (do zagnieżdżania)',
      indent: 'Wcięcie',
      indent2: '2 spacje',
      indent4: '4 spacje',
      copy: 'Kopiuj',
      reset: 'Wyczyść'
    },
    action: { format: 'Formatuj', compress: 'Kompresuj', compare: 'Porównaj' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Zgodne', notEqual: 'Różne', diff: 'Różnice' },
    errors: { invalidJson: 'Nie można przeanalizować poprawnego JSON', empty: 'Wprowadzono pusty tekst' },
    labels: { result: 'Wynik' }
  },
  cs: {
    appTitle: 'Nástroje JSON',
    menu: { format: 'Formátovat JSON', compress: 'Komprimovat JSON', compare: 'Porovnat JSON' },
    common: {
      language: 'Jazyk',
      inputJson: 'Vstupní JSON',
      outputJson: 'Výstupní JSON',
      autoDecode: 'Automaticky dekódovat vstup',
      outputEscaped: 'Výstup jako escapovaný řetězec (pro vnoření)',
      indent: 'Odsazení',
      indent2: '2 mezery',
      indent4: '4 mezery',
      copy: 'Kopírovat',
      reset: 'Vymazat'
    },
    action: { format: 'Formátovat', compress: 'Komprimovat', compare: 'Porovnat' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Shodují se', notEqual: 'Liší se', diff: 'Rozdíly' },
    errors: { invalidJson: 'Nepodařilo se parsovat platné JSON', empty: 'Vstup je prázdný' },
    labels: { result: 'Výsledek' }
  },
  el: {
    appTitle: 'Εργαλεία JSON',
    menu: { format: 'Μορφοποίηση JSON', compress: 'Συμπίεση JSON', compare: 'Σύγκριση JSON' },
    common: {
      language: 'Γλώσσα',
      inputJson: 'Εισαγωγή JSON',
      outputJson: 'Έξοδος JSON',
      autoDecode: 'Αυτόματη αποκωδικοποίηση εισόδου',
      outputEscaped: 'Έξοδος ως escaped συμβολοσειρά (για ένθεση)',
      indent: 'Εσοχή',
      indent2: '2 κενά',
      indent4: '4 κενά',
      copy: 'Αντιγραφή',
      reset: 'Καθαρισμός'
    },
    action: { format: 'Μορφοποίηση', compress: 'Συμπίεση', compare: 'Σύγκριση' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Ταιριάζει', notEqual: 'Διαφέρει', diff: 'Διαφορές' },
    errors: { invalidJson: 'Αδυναμία ανάλυσης έγκυρου JSON', empty: 'Η εισαγωγή είναι κενή' },
    labels: { result: 'Αποτέλεσμα' }
  },
  he: {
    appTitle: 'כלי JSON',
    menu: { format: 'עיצוב JSON', compress: 'דחיסת JSON', compare: 'השוואת JSON' },
    common: {
      language: 'שפה',
      inputJson: 'JSON קלט',
      outputJson: 'JSON פלט',
      autoDecode: 'פענוח אוטומטי של קלט',
      outputEscaped: 'פלט כמחרוזת עם escape (לקינון)',
      indent: 'הזחה',
      indent2: 'שתי רווחים',
      indent4: 'ארבעה רווחים',
      copy: 'העתקה',
      reset: 'ניקוי'
    },
    action: { format: 'עיצוב', compress: 'דחיסה', compare: 'השוואה' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'תואם', notEqual: 'לא תואם', diff: 'הבדלים' },
    errors: { invalidJson: 'לא ניתן לפענח JSON תקין', empty: 'הקלט ריק' },
    labels: { result: 'תוצאה' }
  },
  id: {
    appTitle: 'Alat JSON',
    menu: { format: 'Formatkan JSON', compress: 'Kompres JSON', compare: 'Bandingkan JSON' },
    common: {
      language: 'Bahasa',
      inputJson: 'JSON Masukan',
      outputJson: 'JSON Keluaran',
      autoDecode: 'Dekode otomatis masukan',
      outputEscaped: 'Keluaran string terenkripsi (untuk penyematan)',
      indent: 'Indentasi',
      indent2: '2 spasi',
      indent4: '4 spasi',
      copy: 'Salin',
      reset: 'Bersihkan'
    },
    action: { format: 'Format', compress: 'Kompres', compare: 'Bandingkan' },
    compare: { jsonA: 'JSON A', jsonB: 'JSON B', equal: 'Sama', notEqual: 'Berbeda', diff: 'Perbedaan' },
    errors: { invalidJson: 'Tidak dapat mem-parsing JSON yang valid', empty: 'Masukan kosong' },
    labels: { result: 'Hasil' }
  }
}

