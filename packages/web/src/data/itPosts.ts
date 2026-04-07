export type ItPost = {
  id: number
  title: string
  summary: string
  category: string
  level: "Oson" | "O'rta" | "Qiyin"
  readMinutes: number
  readTime: string
  tags: string[]
  icon: string
  tone: string
  sections: { title: string; paragraphs: string[] }[]
  takeaways: string[]
}

export const itPosts: ItPost[] = [
  {
    id: 1,
    title: "Git va GitHub: kundalik workflow",
    summary:
      "Branch ochish, commit yozish va PR yuborish bo'yicha amaliy yo'riqnoma.",
    category: "Version control",
    level: "Oson",
    readMinutes: 6,
    readTime: "6 daqiqa",
    tags: ["git", "github", "workflow"],
    icon: "GIT",
    tone: "from-emerald-500 to-teal-500",
    sections: [
      {
        title: "Asosiy tushunchalar",
        paragraphs: [
          "Git tarixni boshqaradi, GitHub esa jamoaviy ishni yengillashtiradi.",
          "Branch - alohida yo'nalish, PR - kodni ko'rib chiqish va birlashtirish jarayoni.",
        ],
      },
      {
        title: "Mini checklist",
        paragraphs: [
          "Yangi branch oching, kichik commitlar yozing, PR tavsifini aniq qiling.",
        ],
      },
    ],
    takeaways: [
      "Har bir vazifa uchun alohida branch.",
      "Commit message aniq va qisqa bo'lsin.",
      "PR'da nima o'zgarganini yozib qo'ying.",
    ],
  },
  {
    id: 2,
    title: "Frontend asoslari: HTML, CSS, JS",
    summary:
      "UI tuzilishi, styling va interaktivlikning minimal asoslari.",
    category: "Frontend",
    level: "Oson",
    readMinutes: 7,
    readTime: "7 daqiqa",
    tags: ["html", "css", "javascript"],
    icon: "UI",
    tone: "from-sky-500 to-indigo-500",
    sections: [
      {
        title: "Struktura va dizayn",
        paragraphs: [
          "HTML - skelet, CSS - ko'rinish, JS - harakat va logika.",
          "Semantik teglar SEO va accessibility uchun muhim.",
        ],
      },
      {
        title: "Kichik amaliyot",
        paragraphs: [
          "Button, input, card kabi UI elementlarni qayta ishlatish odatiga o'ting.",
        ],
      },
    ],
    takeaways: [
      "Semantik HTML ishlating.",
      "CSS'da kichik komponentlardan boshlang.",
      "JS faqat kerak joyda ishlatilsa, UI tezroq bo'ladi.",
    ],
  },
  {
    id: 3,
    title: "REST API: qisqa va aniq",
    summary:
      "Endpoint, method va status code'lar bilan ishlash qoidalari.",
    category: "Backend",
    level: "O'rta",
    readMinutes: 8,
    readTime: "8 daqiqa",
    tags: ["rest", "api", "http"],
    icon: "API",
    tone: "from-blue-500 to-cyan-500",
    sections: [
      {
        title: "HTTP metodlar",
        paragraphs: [
          "GET - o'qish, POST - yaratish, PUT/PATCH - yangilash, DELETE - o'chirish.",
        ],
      },
      {
        title: "Status code",
        paragraphs: [
          "200 - OK, 201 - Created, 400 - Bad Request, 401 - Unauthorized, 404 - Not Found.",
        ],
      },
    ],
    takeaways: [
      "Endpoint nomlari resursga mos bo'lsin.",
      "Status code'larni to'g'ri qaytaring.",
      "JSON formatini izchil saqlang.",
    ],
  },
  {
    id: 4,
    title: "SQL asoslari: SELECT dan boshlaymiz",
    summary:
      "Ma'lumotlarni olish, filtrlash va tartiblash bo'yicha tezkor qo'llanma.",
    category: "Database",
    level: "Oson",
    readMinutes: 7,
    readTime: "7 daqiqa",
    tags: ["sql", "database", "query"],
    icon: "SQL",
    tone: "from-amber-500 to-orange-500",
    sections: [
      {
        title: "SELECT va WHERE",
        paragraphs: [
          "SELECT * FROM users WHERE status = 'active' kabi so'rovlar asosiy ko'nikma.",
        ],
      },
      {
        title: "ORDER BY",
        paragraphs: [
          "Natijani tartiblash uchun ORDER BY created_at DESC ishlatiladi.",
        ],
      },
    ],
    takeaways: [
      "Faqat kerakli ustunlarni tanlang.",
      "WHERE bilan filtrlash server yukini kamaytiradi.",
      "ORDER BY katta jadvalda indeks bilan tezlashadi.",
    ],
  },
  {
    id: 5,
    title: "Tarmoq asoslari: IP, DNS, HTTP",
    summary:
      "Brauzer request yuborganda nimalar bo'ladi? Qisqa va tushunarli.",
    category: "Networking",
    level: "O'rta",
    readMinutes: 9,
    readTime: "9 daqiqa",
    tags: ["ip", "dns", "http"],
    icon: "NET",
    tone: "from-indigo-500 to-purple-500",
    sections: [
      {
        title: "DNS nima qiladi?",
        paragraphs: [
          "DNS domen nomini IP manzilga tarjima qiladi.",
        ],
      },
      {
        title: "HTTP oqimi",
        paragraphs: [
          "Request -> server -> response. Status code va headerlar muhim.",
        ],
      },
    ],
    takeaways: [
      "DNS bo'lmasa domen ishlamaydi.",
      "HTTP header'lar keshlash va xavfsizlikka ta'sir qiladi.",
      "TLS (HTTPS) trafikni shifrlaydi.",
    ],
  },
  {
    id: 6,
    title: "Linux komandalar: 20 ta kerakli buyruq",
    summary:
      "cd, ls, cat, grep, tail kabi amaliy komandalar ro'yxati.",
    category: "Linux",
    level: "Oson",
    readMinutes: 6,
    readTime: "6 daqiqa",
    tags: ["linux", "cli", "tools"],
    icon: "CLI",
    tone: "from-slate-700 to-slate-900",
    sections: [
      {
        title: "Navigatsiya",
        paragraphs: [
          "cd, ls, pwd yordamida papkalar bo'ylab harakat qiling.",
        ],
      },
      {
        title: "Fayl ishlari",
        paragraphs: [
          "cat, head, tail, cp, mv, rm buyruqlari kundalik ishda ishlatiladi.",
        ],
      },
    ],
    takeaways: [
      "rg yoki grep bilan tez qidirish odat bo'lsin.",
      "tail -f log kuzatish uchun qulay.",
      "chmod va chown ruxsatlarni boshqaradi.",
    ],
  },
  {
    id: 7,
    title: "Docker: konteyner bilan ishlash",
    summary:
      "Image, container, volume va port mapping bo'yicha qisqa yo'riqnoma.",
    category: "DevOps",
    level: "O'rta",
    readMinutes: 8,
    readTime: "8 daqiqa",
    tags: ["docker", "devops", "container"],
    icon: "DOC",
    tone: "from-sky-600 to-blue-700",
    sections: [
      {
        title: "Image va container",
        paragraphs: [
          "Image - shablon, container - ishlayotgan instansiya.",
        ],
      },
      {
        title: "Port mapping",
        paragraphs: [
          "-p 3200:3000 kabi mapping tashqi va ichki portni bog'laydi.",
        ],
      },
    ],
    takeaways: [
      "Dockerfile va compose bir-birini to'ldiradi.",
      "Volume ma'lumotni saqlab qoladi.",
      "Image kichik bo'lsa deploy tez bo'ladi.",
    ],
  },
  {
    id: 8,
    title: "Xavfsizlik: parol, 2FA, phishing",
    summary:
      "Oddiy, lekin zarur bo'lgan xavfsizlik qoidalari.",
    category: "Security",
    level: "Oson",
    readMinutes: 5,
    readTime: "5 daqiqa",
    tags: ["security", "2fa", "phishing"],
    icon: "SEC",
    tone: "from-emerald-600 to-green-700",
    sections: [
      {
        title: "Parol siyosati",
        paragraphs: [
          "Uzoq va noyob parol xavfsizlikni oshiradi.",
        ],
      },
      {
        title: "Phishingni aniqlash",
        paragraphs: [
          "Shubhali linklar va email manzilini tekshirish odat bo'lsin.",
        ],
      },
    ],
    takeaways: [
      "2FA ni yoqing.",
      "Parollarni qayta ishlatmang.",
      "Shubhali fayllarni ochmang.",
    ],
  },
  {
    id: 9,
    title: "Deploy asoslari: staging va production",
    summary:
      "Release jarayonini xatolarsiz qilish uchun kerakli bosqichlar.",
    category: "Deployment",
    level: "O'rta",
    readMinutes: 8,
    readTime: "8 daqiqa",
    tags: ["deploy", "staging", "release"],
    icon: "DEP",
    tone: "from-fuchsia-500 to-pink-600",
    sections: [
      {
        title: "Staging nima?",
        paragraphs: [
          "Staging - productionga o'xshash test muhiti.",
        ],
      },
      {
        title: "Rollback",
        paragraphs: [
          "Muammo bo'lsa, tezda oldingi versiyaga qaytish reja bo'lsin.",
        ],
      },
    ],
    takeaways: [
      "Har release uchun checklist tayyorlang.",
      "Monitoring va loglar doim yoqilgan bo'lsin.",
      "Configuration secretsni alohida saqlang.",
    ],
  },
  {
    id: 10,
    title: "Test turlari: unit, integration, e2e",
    summary:
      "Test piramidasi va qaysi holatda qaysi test kerakligi.",
    category: "Testing",
    level: "O'rta",
    readMinutes: 7,
    readTime: "7 daqiqa",
    tags: ["testing", "unit", "e2e"],
    icon: "TEST",
    tone: "from-violet-500 to-indigo-600",
    sections: [
      {
        title: "Test piramidasi",
        paragraphs: [
          "Unit ko'p, integration o'rtacha, e2e kam bo'lishi tavsiya qilinadi.",
        ],
      },
      {
        title: "Amaliy misol",
        paragraphs: [
          "Login funksiyasi uchun unit va integration test yozing.",
        ],
      },
    ],
    takeaways: [
      "Unit test tez va arzon.",
      "Integration test API muammolarini topadi.",
      "E2E kritik user flow uchun kerak.",
    ],
  },
  {
    id: 11,
    title: "Monolit va mikroservislar",
    summary:
      "Arxitektura tanlovi biznes va jamoa hajmiga bog'liq.",
    category: "Architecture",
    level: "Qiyin",
    readMinutes: 9,
    readTime: "9 daqiqa",
    tags: ["architecture", "microservices", "design"],
    icon: "ARCH",
    tone: "from-orange-600 to-amber-600",
    sections: [
      {
        title: "Monolit afzalligi",
        paragraphs: [
          "Sodda deploy, kam xarajat, tez start.",
        ],
      },
      {
        title: "Mikroservis afzalligi",
        paragraphs: [
          "Katta jamoa va mustaqil deploy uchun qulay.",
        ],
      },
    ],
    takeaways: [
      "Vaqtida bo'linish - muhim qaror.",
      "Monitoring va observability mikroservisda shart.",
      "Avval oddiy, keyin murakkab arxitektura.",
    ],
  },
  {
    id: 12,
    title: "Performance: caching va CDN",
    summary:
      "Tez yuklanish uchun cache va CDN ishlatish asoslari.",
    category: "Performance",
    level: "O'rta",
    readMinutes: 6,
    readTime: "6 daqiqa",
    tags: ["performance", "cache", "cdn"],
    icon: "PERF",
    tone: "from-yellow-500 to-amber-500",
    sections: [
      {
        title: "Caching",
        paragraphs: [
          "Cache - takroriy so'rovlarni tezlashtiradi.",
        ],
      },
      {
        title: "CDN",
        paragraphs: [
          "CDN kontentni foydalanuvchiga yaqin serverdan yetkazadi.",
        ],
      },
    ],
    takeaways: [
      "Cache invalidation strategiyasi bo'lsin.",
      "Statik fayllarni CDN orqali tarqating.",
      "Performance metrikslarni kuzating.",
    ],
  },
  {
    id: 13,
    title: "Data structure: massiv, stack, queue",
    summary:
      "Dasturlashdagi eng ko'p ishlatiladigan tuzilmalar.",
    category: "CS Fundamentals",
    level: "Oson",
    readMinutes: 7,
    readTime: "7 daqiqa",
    tags: ["data-structures", "stack", "queue"],
    icon: "DS",
    tone: "from-cyan-500 to-sky-600",
    sections: [
      {
        title: "Massiv",
        paragraphs: [
          "Index orqali tez kirish, lekin o'rtaga qo'shish qiyin.",
        ],
      },
      {
        title: "Stack va queue",
        paragraphs: [
          "Stack - LIFO, queue - FIFO tamoyiliga asoslanadi.",
        ],
      },
    ],
    takeaways: [
      "To'g'ri tuzilma tanlash performance'ni oshiradi.",
      "Stack recursive yechimlarda qulay.",
      "Queue navbatlar uchun ideal.",
    ],
  },
  {
    id: 14,
    title: "IT karyera: portfolio va intervyu",
    summary:
      "Portfolio tayyorlash va texnik intervyu uchun tavsiyalar.",
    category: "Career",
    level: "Oson",
    readMinutes: 6,
    readTime: "6 daqiqa",
    tags: ["career", "portfolio", "interview"],
    icon: "CARE",
    tone: "from-rose-500 to-pink-600",
    sections: [
      {
        title: "Portfolio",
        paragraphs: [
          "3-5 ta sifatli loyiha, demo va kod linkini qo'ying.",
        ],
      },
      {
        title: "Intervyu",
        paragraphs: [
          "Algoritm, loyiha tushuntirish va soft skill savollariga tayyor bo'ling.",
        ],
      },
    ],
    takeaways: [
      "Har loyiha uchun qisqa case-study yozing.",
      "GitHub profilingiz tartibli bo'lsin.",
      "Intervyuda fikrni struktura bilan ayting.",
    ],
  },
]
