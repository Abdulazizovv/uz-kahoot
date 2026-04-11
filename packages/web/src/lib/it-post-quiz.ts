export interface MiniQuizQuestion {
  id: string
  question: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export const miniQuizzes: Record<number, MiniQuizQuestion[]> = {
  1: [
    {
      id: "1-1",
      question: "Algoritm yozishda birinchi qadam qaysi?",
      choices: [
        "Kod yozishni boshlash",
        "Kirish/chiqish (input/output) ni aniq belgilash",
        "UI dizayn qilish",
        "Database yaratish",
      ],
      answerIndex: 1,
      explanation:
        "Algoritmni to'g'ri boshlash uchun input/output va chegaralarni aniq belgilash kerak.",
    },
    {
      id: "1-2",
      question: "Psevdokodning asosiy maqsadi nima?",
      choices: [
        "Aniq sintaksis talab qilish",
        "Mantiqni tushunarli qilib ifodalash",
        "Kodni kompilyatsiya qilish",
        "Faqat diagram chizish",
      ],
      answerIndex: 1,
      explanation: "Psevdokod sintaksis emas; u mantiqiy aniqlik uchun ishlatiladi.",
    },
    {
      id: "1-3",
      question: "Edge case deganda nimani tushunasiz?",
      choices: [
        "Faqat tez ishlaydigan holat",
        "Chegara qiymatlar va noodatiy kirishlar",
        "Faqat UI ranglari",
        "Faqat server xatolari",
      ],
      answerIndex: 1,
      explanation:
        "Edge case - 0, bo'sh qiymat, minimal/maksimal va format xatolari kabi holatlar.",
    },
  ],
  2: [
    {
      id: "2-1",
      question: "Nega kichik PR (pull request) yaxshi amaliyot?",
      choices: [
        "Review qilish qiyin bo'ladi",
        "Tezroq review va kamroq risk",
        "Faqat dizayn uchun",
        "Commitlar sonini ko'paytirish uchun",
      ],
      answerIndex: 1,
      explanation:
        "Kichik PR odatda tez ko'rib chiqiladi va regressiya xavfi kamayadi.",
    },
    {
      id: "2-2",
      question: "Commit message uchun yaxshi qoida qaysi?",
      choices: [
        "\"update\" deb yozish",
        "Fe'l bilan boshlash: Add/Fix/Refactor",
        "Emoji bilan to'ldirish",
        "Juda uzun matn yozish",
      ],
      answerIndex: 1,
      explanation:
        "Fe'l bilan boshlash commit tarixini o'qishni osonlashtiradi va niyatni aniq qiladi.",
    },
    {
      id: "2-3",
      question: "Rebase paytida conflict chiqqanda asosiy qadamlar qaysi?",
      choices: [
        "Repo'ni o'chirib qayta klonlash",
        "Conflictlarni hal qilish → git add → git rebase --continue",
        "Hech narsa qilmaslik",
        "Faqat git push qilish",
      ],
      answerIndex: 1,
      explanation:
        "Rebase conflict hal bo'lgach, filelarni stage qilib rebase davom ettiriladi.",
    },
  ],
  3: [
    {
      id: "3-1",
      question: "Semantik HTML nimaga yordam beradi?",
      choices: ["Faqat animatsiya", "SEO va accessibility (a11y)", "Faqat backend", "Faqat CSS"],
      answerIndex: 1,
      explanation: "Semantik teglar brauzer/ekran o'quvchilar uchun ma'noni yaxshilaydi.",
    },
    {
      id: "3-2",
      question: "Qaysi holatda Grid ko'proq mos keladi?",
      choices: ["Bir o'lchamli elementlarni tekislash", "Ikki o'lchamli layout (qator+ustun)", "HTTP so'rov", "DB indeks"],
      answerIndex: 1,
      explanation: "Grid ayniqsa qator va ustunli layoutlarda qulay.",
    },
    {
      id: "3-3",
      question: "Mobile-first yondashuv nimani anglatadi?",
      choices: ["Avval desktop dizayn", "Avval mobil, keyin kengaytirish", "Faqat iOS", "Faqat CSS reset"],
      answerIndex: 1,
      explanation: "Mobile-first: kichik ekranlardan boshlab breakpoints bilan kengaytiriladi.",
    },
  ],
  4: [
    {
      id: "4-1",
      question: "map metodi nima qiladi?",
      choices: ["Tanlaydi (filter)", "Har elementni transform qiladi", "Agregatsiya qiladi (reduce)", "Sort qiladi"],
      answerIndex: 1,
      explanation: "map har element uchun yangi qiymat qaytarib, yangi array beradi.",
    },
    {
      id: "4-2",
      question: "reduce qachon kerak bo'ladi?",
      choices: ["Bitta natijaga yig'ish", "Faqat UI", "Faqat tarmoq", "Faqat validation"],
      answerIndex: 0,
      explanation: "reduce ko'p elementdan bitta qiymat (sum, grouped object, ...) olishda ishlatiladi.",
    },
    {
      id: "4-3",
      question: "Immutability amaliyoti nima?",
      choices: ["Objektni joyida o'zgartirish", "Yangi obyekt yaratib update qilish", "Faqat console.log", "CSS class o'zgartirish"],
      answerIndex: 1,
      explanation:
        "Immutability: mavjud obyektni mutatsiya qilmay, spread bilan yangi obyekt hosil qilish.",
    },
  ],
  5: [
    {
      id: "5-1",
      question: "Props va state farqi qaysi?",
      choices: [
        "Props ichki, state tashqi",
        "Props tashqaridan keladi, state komponent ichida boshqariladi",
        "Ikkalasi bir xil",
        "State faqat CSS",
      ],
      answerIndex: 1,
      explanation: "Props parentdan keladi, state esa komponentning UI holatini boshqaradi.",
    },
    {
      id: "5-2",
      question: "List renderda key nima uchun kerak?",
      choices: ["Rang uchun", "React diff algoritmi uchun", "API token uchun", "Server port uchun"],
      answerIndex: 1,
      explanation: "key React'ga elementlarni barqaror identifikatsiya qilishda yordam beradi.",
    },
    {
      id: "5-3",
      question: "Controlled input deganda nima?",
      choices: ["Inputni CSS bilan boshqarish", "Input value state orqali boshqariladi", "Faqat HTML", "DB trigger"],
      answerIndex: 1,
      explanation: "Controlled input: value state'dan keladi va onChange state'ni yangilaydi.",
    },
  ],
  6: [
    {
      id: "6-1",
      question: "Middleware nima vazifani bajaradi?",
      choices: ["DB indeks yaratadi", "Request/response pipeline'da ishlaydi", "Faqat UI chizadi", "DNS sozlaydi"],
      answerIndex: 1,
      explanation: "Middleware requestni tekshiradi, loglaydi, auth qiladi va keyingi handlerga uzatadi.",
    },
    {
      id: "6-2",
      question: "Nega global error handler foydali?",
      choices: ["Har joyda try/catch yozish uchun", "Xatolarni bir joyda boshqarish uchun", "CSS uchun", "Cache uchun"],
      answerIndex: 1,
      explanation: "Error handling markazlashsa, response formati va logging bir xil bo'ladi.",
    },
    {
      id: "6-3",
      question: "Pagination nima uchun kerak?",
      choices: ["Hammasini birdan olish uchun", "Ko'p data'ni bo'lib yuborish uchun", "Token yaratish uchun", "DNS caching"],
      answerIndex: 1,
      explanation: "Pagination server va client yukini kamaytiradi, UX yaxshilanadi.",
    },
  ],
  7: [
    {
      id: "7-1",
      question: "Indeksning asosiy foydasi nima?",
      choices: ["Insertni tezlashtiradi", "SELECT qidiruvni tezlashtiradi", "RAMni kamaytiradi", "UI ni chiroyli qiladi"],
      answerIndex: 1,
      explanation: "Indeks qidiruvni tezlashtiradi, lekin yozish (insert/update) narxini oshiradi.",
    },
    {
      id: "7-2",
      question: "EXPLAIN ANALYZE nimani beradi?",
      choices: ["Faqat schema", "So'rov reja + real vaqt/row statistikasi", "Only UI", "Only auth"],
      answerIndex: 1,
      explanation: "EXPLAIN ANALYZE query plan va real bajarilish statistikalarini ko'rsatadi.",
    },
    {
      id: "7-3",
      question: "Cursor pagination qachon foydali?",
      choices: ["Kichik ro'yxatlarda", "Katta ro'yxatlarda stable paging uchun", "Faqat CSS", "Faqat Redis"],
      answerIndex: 1,
      explanation: "Cursor pagination offsetga nisbatan katta datada barqarorroq va tezroq bo'lishi mumkin.",
    },
  ],
  8: [
    {
      id: "8-1",
      question: "Overfetching nimani anglatadi?",
      choices: ["Kam data olish", "Keraksiz ortiqcha data olish", "Auth xatosi", "Cache miss"],
      answerIndex: 1,
      explanation: "Overfetching: clientga kerak bo'lmagan data ham kelib qolishi.",
    },
    {
      id: "8-2",
      question: "REST odatda qaysi holatda qulay?",
      choices: ["Oddiy CRUD", "Murakkab dashboard har xil payload", "Faqat mobile", "Faqat tracing"],
      answerIndex: 0,
      explanation: "Oddiy resurslar va CRUD uchun REST ko'pincha sodda va infra bilan mos.",
    },
    {
      id: "8-3",
      question: "GraphQLning kuchli tomoni qaysi?",
      choices: ["Client query flexibiligi", "SQL o'rnini bosadi", "DNS tezlashtiradi", "Docker build qiladi"],
      answerIndex: 0,
      explanation: "GraphQL clientga kerakli fieldlarni aniq so'rash imkonini beradi.",
    },
  ],
  9: [
    {
      id: "9-1",
      question: "Refresh token nima uchun kerak?",
      choices: ["UI rangini yangilash", "Access tokenni yangilash", "DB index", "CSS reset"],
      answerIndex: 1,
      explanation: "Refresh token orqali qisqa umrli access token yangilanadi.",
    },
    {
      id: "9-2",
      question: "Rate limit nima beradi?",
      choices: ["Brute force'ni kuchaytiradi", "So'rovlarni cheklab himoya qiladi", "CSS animation", "CDN"],
      answerIndex: 1,
      explanation: "Rate limiting abuse va brute force hujumlarini kamaytiradi.",
    },
    {
      id: "9-3",
      question: "OWASP Top 10 nima?",
      choices: ["Framework", "Keng tarqalgan web xavfsizlik xatolari ro'yxati", "DB engine", "IDE plugin"],
      answerIndex: 1,
      explanation: "OWASP Top 10 - eng ko'p uchraydigan xavfsizlik risklari ro'yxati.",
    },
  ],
  10: [
    {
      id: "10-1",
      question: "CI ning asosiy vazifasi nima?",
      choices: ["Deploy qilish", "Sifatni avtomatik tekshirish (lint/test)", "DNS", "UI layout"],
      answerIndex: 1,
      explanation: "CI odatda lint/test/build bilan sifatni barqaror qiladi.",
    },
    {
      id: "10-2",
      question: "Multi-stage Docker build nimaga kerak?",
      choices: ["Image'ni kattalashtirish", "Final image'ni kichraytirish", "DB yaratish", "Auth"],
      answerIndex: 1,
      explanation: "Build bosqichini ajratib, final image ichiga faqat keraklilarni nusxalaydi.",
    },
    {
      id: "10-3",
      question: "Secretsni qayerda saqlash yaxshi?",
      choices: [".git ichida", ".env ni commit qilish", "Secret manager/CI secrets", "README ichida"],
      answerIndex: 2,
      explanation: "Secrets repoda turmasligi kerak; CI secrets yoki secret manager ishlatiladi.",
    },
  ],
  11: [
    {
      id: "11-1",
      question: "Compute service deganda nima?",
      choices: ["Storage", "VM/container/serverless kabi ishga tushirish resurslari", "DNS", "UI kit"],
      answerIndex: 1,
      explanation: "Compute - kod ishlaydigan resurslar: VM, container, serverless.",
    },
    {
      id: "11-2",
      question: "Monitoring nima uchun kerak?",
      choices: ["Faqat dizayn", "Production muammolarini ko'rish va tez topish", "DB schema", "Token"],
      answerIndex: 1,
      explanation: "Monitoring incidentlarni tez aniqlash va sababini topishga yordam beradi.",
    },
    {
      id: "11-3",
      question: "Cost awareness nimani anglatadi?",
      choices: ["Bepul bo'lishi shart", "Arxitektura qarorlarida narxni hisobga olish", "CSS", "Lint"],
      answerIndex: 1,
      explanation: "Cloudda har servis narxga ega; arxitektura costni ham hisobga oladi.",
    },
  ],
  12: [
    {
      id: "12-1",
      question: "Test piramidada qaysi ko'p bo'lishi kerak?",
      choices: ["E2E", "Unit", "Manual", "Screenshot"],
      answerIndex: 1,
      explanation: "Unit testlar tez va ko'p bo'lishi tavsiya qilinadi.",
    },
    {
      id: "12-2",
      question: "Flaky test nima?",
      choices: ["Har doim o'tadigan test", "Ba'zan o'tib, ba'zan yiqiladigan test", "Lint", "Build"],
      answerIndex: 1,
      explanation: "Flaky test deterministik emas; CI ishonchini pasaytiradi.",
    },
    {
      id: "12-3",
      question: "E2E test qachon kerak?",
      choices: ["Har fayl uchun", "Critical user flow uchun", "Faqat CSS", "Faqat DB index"],
      answerIndex: 1,
      explanation: "E2E sekin; shuning uchun faqat critical path'larda ishlatiladi.",
    },
  ],
  13: [
    {
      id: "13-1",
      question: "Performance optimizatsiya qilishdan oldin nima qilish kerak?",
      choices: ["Taxmin qilish", "O'lchash (metrics) va audit", "CSS o'zgartirish", "Token rotate"],
      answerIndex: 1,
      explanation: "O'lchamasdan optimizatsiya ko'pincha noto'g'ri yo'nalishga olib boradi.",
    },
    {
      id: "13-2",
      question: "Code splitting nima?",
      choices: ["DBni bo'lish", "Bundle'ni bo'lib yuklash", "DNS", "Auth"],
      answerIndex: 1,
      explanation: "Code splitting foydalanuvchiga kerak bo'lgan qismni alohida yuklaydi.",
    },
    {
      id: "13-3",
      question: "Cachingning qiyin tomoni nima?",
      choices: ["Rang tanlash", "Invalidation (qachon yangilash)", "HTML", "Hook dependency"],
      answerIndex: 1,
      explanation: "Cache invalidation - murakkab; noto'g'ri bo'lsa eski data qoladi.",
    },
  ],
  14: [
    {
      id: "14-1",
      question: "Resume uchun tavsiya qilingan uzunlik?",
      choices: ["10 bet", "1 bet", "5 bet", "Cheksiz"],
      answerIndex: 1,
      explanation: "Ko'pincha 1 betlik, aniq va impactga yo'naltirilgan resume yaxshi ishlaydi.",
    },
    {
      id: "14-2",
      question: "Portfolio'da eng muhim narsa qaysi?",
      choices: ["Faqat dizayn", "Natija va impact (raqamlar)", "Ko'p emoji", "Hech narsa"],
      answerIndex: 1,
      explanation: "Impact: tezlik, konversiya, bug kamayishi kabi raqamlar kuchli.",
    },
    {
      id: "14-3",
      question: "README nimaga kerak?",
      choices: ["Faqat rasm", "Loyihani tushuntirish va run qilish uchun", "DB", "Token"],
      answerIndex: 1,
      explanation: "README - pitch: nima, qanday ishga tushadi, qanday test qilinadi.",
    },
  ],
  15: [
    {
      id: "15-1",
      question: "Discriminated union nimaga yordam beradi?",
      choices: ["CSS", "Type narrowingni aniq qilish", "DB", "Docker"],
      answerIndex: 1,
      explanation: "Discriminated union (ok: true/false) bilan branching type-safe bo'ladi.",
    },
    {
      id: "15-2",
      question: "any ishlatishning asosiy muammosi?",
      choices: ["Kod tezlashadi", "Type safety yo'qoladi", "UI yaxshilanadi", "Lint o'chadi"],
      answerIndex: 1,
      explanation: "any type-checkni o'chirib qo'yadi va runtime xatolar ehtimolini oshiradi.",
    },
    {
      id: "15-3",
      question: "Generic funksiyaning foydasi?",
      choices: ["Faqat string ishlaydi", "Turli type bilan qayta ishlatiladi", "DB index", "Cache"],
      answerIndex: 1,
      explanation: "Generic bilan funksiya turli type'larda type-safe ishlaydi.",
    },
  ],
  16: [
    {
      id: "16-1",
      question: "Next.js App Routerda asosiy fayllar qaysi?",
      choices: ["main.go", "layout.tsx va page.tsx", "index.php", "Dockerfile"],
      answerIndex: 1,
      explanation: "App Router segmentlarida odatda layout.tsx va page.tsx ishlatiladi.",
    },
    {
      id: "16-2",
      question: "Server componentning afzalligi?",
      choices: ["Ko'proq JS clientga", "Data fetching serverda", "DNS", "Only CSS"],
      answerIndex: 1,
      explanation: "Server componentlar data fetchingni serverda qilib, client JSni kamaytiradi.",
    },
    {
      id: "16-3",
      question: "loading.tsx nimaga kerak?",
      choices: ["Auth", "Loading state UI", "DB migration", "Cache invalidation"],
      answerIndex: 1,
      explanation: "loading.tsx route yuklanayotganda skeleton/loading UI ko'rsatadi.",
    },
  ],
  17: [
    {
      id: "17-1",
      question: "REST naming bo'yicha to'g'ri misol qaysi?",
      choices: ["POST /createUser", "GET /users", "GET /doThing", "PUT /run"],
      answerIndex: 1,
      explanation: "RESTda resurslar ko'plikda: /users, /posts.",
    },
    {
      id: "17-2",
      question: "Idempotent method misoli qaysi?",
      choices: ["POST", "PUT", "PATCH har doim", "WebSocket"],
      answerIndex: 1,
      explanation: "PUT odatda idempotent: bir xil request bir xil natija beradi.",
    },
    {
      id: "17-3",
      question: "Deprecation siyosati nima?",
      choices: ["Darhol o'chirish", "Old API ni sekin-asta o'chirish rejasi", "CSS", "DB index"],
      answerIndex: 1,
      explanation: "Deprecation - eskisini ogohlantirib, muddat bilan o'chirish siyosati.",
    },
  ],
  18: [
    {
      id: "18-1",
      question: "FastAPI nimasi bilan qulay?",
      choices: ["Static site", "OpenAPI docs va type/validation", "Only CSS", "Only DB"],
      answerIndex: 1,
      explanation: "FastAPI Pydantic bilan validation va avtomatik docs beradi.",
    },
    {
      id: "18-2",
      question: "Pydantic nimani qiladi?",
      choices: ["UI", "Validation va parsing", "DNS", "Docker build"],
      answerIndex: 1,
      explanation: "Pydantic inputni validatsiya qiladi va type'ga parse qiladi.",
    },
    {
      id: "18-3",
      question: "/docs endpoint nimani ko'rsatadi?",
      choices: ["DB schema", "Swagger UI", "CSS", "Cache"],
      answerIndex: 1,
      explanation: "FastAPI /docs da Swagger UI orqali endpointlarni ko'rish mumkin.",
    },
  ],
  19: [
    {
      id: "19-1",
      question: "grep/rg nimaga kerak?",
      choices: ["Rasm chizish", "Matndan qidirish", "DB indeks", "Auth"],
      answerIndex: 1,
      explanation: "grep/rg log va fayllarda pattern bo'yicha qidiruv uchun.",
    },
    {
      id: "19-2",
      question: "chmod 644 nimani bildiradi?",
      choices: ["Execute hamma uchun", "Owner rw, boshqalar r", "Only root", "Network"],
      answerIndex: 1,
      explanation: "644: owner read/write, group read, others read.",
    },
    {
      id: "19-3",
      question: "ps/top nimaga kerak?",
      choices: ["CSS", "Processlarni ko'rish", "GraphQL", "Dockerfile"],
      answerIndex: 1,
      explanation: "ps/top ishlayotgan processlarni ko'rish va resurs monitoring uchun.",
    },
  ],
  20: [
    {
      id: "20-1",
      question: "Chat arxitekturasida broker nima beradi?",
      choices: ["UI", "Loose coupling va scaling", "DNS", "SQL index"],
      answerIndex: 1,
      explanation: "Broker servislarni ajratib, scale qilishni osonlashtiradi.",
    },
    {
      id: "20-2",
      question: "WebSocket nimasi bilan farq qiladi?",
      choices: ["Faqat request", "Doimiy connection", "Faqat CSS", "Only DB"],
      answerIndex: 1,
      explanation: "WebSocket doimiy connection orqali real-time data almashadi.",
    },
    {
      id: "20-3",
      question: "Presence deganda nima?",
      choices: ["Online/offline holat", "DB table", "Lint rule", "Cache key"],
      answerIndex: 0,
      explanation: "Presence - foydalanuvchi online/offline, last seen kabi holatlar.",
    },
  ],
  21: [
    {
      id: "21-1",
      question: "Compose'da depends_on nimani anglatadi?",
      choices: ["CSS tartibi", "Service start order (basic)", "Auth", "DB index"],
      answerIndex: 1,
      explanation: "depends_on service start ketma-ketligini belgilaydi (healthcheck bilan kuchaytiriladi).",
    },
    {
      id: "21-2",
      question: "Volume nima uchun kerak?",
      choices: ["Data saqlash", "UI theme", "Token", "DNS"],
      answerIndex: 0,
      explanation: "Volume container o'chsa ham data saqlanishi uchun ishlatiladi.",
    },
    {
      id: "21-3",
      question: "Healthcheck nimaga kerak?",
      choices: ["Ready ekanini bilish", "CSS", "GraphQL", "Lint"],
      answerIndex: 0,
      explanation: "Healthcheck servis tayyorligini tekshiradi (readiness).",
    },
  ],
  22: [
    {
      id: "22-1",
      question: "Observability 3 ustuni?",
      choices: ["Docs/PR/Issue", "Logs/Metrics/Tracing", "CSS/HTML/JS", "CPU/RAM/Disk"],
      answerIndex: 1,
      explanation: "Observability odatda logs, metrics va tracing ustunlariga tayanadi.",
    },
    {
      id: "22-2",
      question: "SLO nimani bildiradi?",
      choices: ["Service Level Objective", "Source Level Option", "System Log Output", "Style Lint Override"],
      answerIndex: 0,
      explanation: "SLO - xizmat sifati bo'yicha maqsad ko'rsatkich.",
    },
    {
      id: "22-3",
      question: "Runbook nima?",
      choices: ["Dizayn guide", "Incident paytida qadamlar hujjati", "DB migration", "Cache header"],
      answerIndex: 1,
      explanation: "Runbook - incidentni hal qilish bo'yicha amaliy qadamlar ro'yxati.",
    },
  ],
  23: [
    {
      id: "23-1",
      question: "MVP nimani anglatadi?",
      choices: ["Most Valuable Person", "Minimum Viable Product", "Max Version Package", "Multi-value Protocol"],
      answerIndex: 1,
      explanation: "MVP - g'oyani tez tekshiradigan minimal funksional mahsulot.",
    },
    {
      id: "23-2",
      question: "Outcome vs output farqi?",
      choices: ["Bir xil", "Outcome - natija/ta'sir, output - chiqarilgan ish", "CSS", "DB index"],
      answerIndex: 1,
      explanation: "Outcome: user/metricga ta'sir; output: deliverable soni.",
    },
    {
      id: "23-3",
      question: "Feedback loop nima uchun muhim?",
      choices: ["UI uchun", "Yo'nalishni tez to'g'rilash uchun", "DNS", "Lint"],
      answerIndex: 1,
      explanation: "Feedback loop mahsulotni tez iteratsiya qilishga yordam beradi.",
    },
  ],
  24: [
    {
      id: "24-1",
      question: "Nega kichik PR yaxshi?",
      choices: ["Ko'p conflict bo'ladi", "Review tez va tushunarli", "Faqat emoji", "DB"],
      answerIndex: 1,
      explanation: "Kichik scope reviewni tezlashtiradi va xatolarni topishni osonlashtiradi.",
    },
    {
      id: "24-2",
      question: "Blocking comment deganda nima?",
      choices: ["Mayda 'nit'", "Merge qilinishini to'xtatadigan muammo", "CSS", "Changelog"],
      answerIndex: 1,
      explanation: "Blocking - xavfsizlik, bug yoki talabga zid holat (mergedan oldin tuzatiladi).",
    },
    {
      id: "24-3",
      question: "Auto-lint/test ni PRda ishlatish nimaga yordam beradi?",
      choices: ["Qo'lda ko'proq ish", "Review yukini kamaytiradi", "DB index", "Token rotate"],
      answerIndex: 1,
      explanation: "Avtomatlashtirish reviewda faqat mantiq/arch ga e'tibor qaratishga yordam beradi.",
    },
  ],
}

export const getMiniQuizForPost = (postId: number) => miniQuizzes[postId] ?? []
