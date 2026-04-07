export type ItPostStatus = "read" | "available" | "locked"

export interface ItPostSection {
  title: string
  points: string[]
}

export interface ItPost {
  id: number
  title: string
  summary: string
  category: string
  level: "Boshlang'ich" | "O'rta" | "Yuqori"
  readTime: string
  tags: string[]
  status: ItPostStatus
  progress: number
  score: number | null
  sections: ItPostSection[]
  teacherNotes?: string[]
}

export const itPosts: ItPost[] = [
  {
    id: 1,
    title: "Dasturlashga kirish: algoritm va fikrlash",
    summary:
      "Algoritmik fikrlash, muammo tahlili va psevdokod yozish bo'yicha bazaviy qo'llanma.",
    category: "Programming",
    level: "Boshlang'ich",
    readTime: "12 daqiqa",
    tags: ["algoritm", "psevdokod", "mantiq"],
    status: "read",
    progress: 100,
    score: 95,
    sections: [
      {
        title: "Nimani o'rganasiz",
        points: [
          "Algoritm tushunchasi va tuzilishi",
          "Muammoni bosqichma-bosqich yechish",
          "Psevdokod va blok-sxema asoslari",
        ],
      },
      {
        title: "Amaliy mashq",
        points: [
          "Oddiy kalkulyator algoritmini yozing",
          "Kirish/chiqish bosqichlarini ajrating",
          "Shart va takrorlashlarni qo'shing",
        ],
      },
    ],
    teacherNotes: [
      "Talabalardan bir muammo uchun 2 xil algoritm yechimi so'rang.",
      "Psevdokod sintaksisi emas, mantiqiy aniqlik muhimligini ta'kidlang.",
    ],
  },
  {
    id: 2,
    title: "Git va GitHub: kundalik ish oqimi",
    summary:
      "Repo yaratish, branch, commit, pull request va code review amaliyoti.",
    category: "Tools",
    level: "Boshlang'ich",
    readTime: "10 daqiqa",
    tags: ["git", "github", "workflow"],
    status: "read",
    progress: 100,
    score: 92,
    sections: [
      {
        title: "Asosiy tushunchalar",
        points: [
          "Repository, branch va commit nima?",
          "Pull request va review jarayoni",
          "Merge conflict va yechimlar",
        ],
      },
      {
        title: "Checklist",
        points: [
          "Har feature uchun alohida branch",
          "Kichik va mantiqli commitlar",
          "PR uchun qisqa tavsif va skrinlar",
        ],
      },
    ],
    teacherNotes: [
      "Talabalarga real PR namunasi bilan code review o'tkazing.",
    ],
  },
  {
    id: 3,
    title: "HTML va CSS: tartibli layoutlar",
    summary:
      "Semantik HTML, Flexbox/Grid va responsive dizayn asoslari.",
    category: "Frontend",
    level: "Boshlang'ich",
    readTime: "14 daqiqa",
    tags: ["html", "css", "layout"],
    status: "read",
    progress: 100,
    score: 88,
    sections: [
      {
        title: "Struktura",
        points: [
          "Semantik teglar: header, main, section",
          "BEM yoki utility yondashuvi",
          "Flexbox vs Grid qachon ishlatiladi",
        ],
      },
      {
        title: "Responsive",
        points: [
          "Mobile-first yondashuv",
          "Breakpoints va containerlar",
          "Tipografiya va spacing tizimi",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "JavaScript asoslari: massiv va obyektlar",
    summary:
      "Array methods, object destructuring va immutability amaliyoti.",
    category: "Frontend",
    level: "Boshlang'ich",
    readTime: "16 daqiqa",
    tags: ["javascript", "array", "object"],
    status: "available",
    progress: 45,
    score: null,
    sections: [
      {
        title: "Ko'p ishlatiladigan metodlar",
        points: [
          "map, filter, reduce",
          "find, some, every",
          "spread operator va rest",
        ],
      },
      {
        title: "Amaliy vazifa",
        points: [
          "Mahsulotlar ro'yxatini filtrlash",
          "Kategoriyalar bo'yicha guruhlash",
          "Top-3 eng ko'p sotilganini ajratish",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "React: komponentlar va state",
    summary:
      "Functional componentlar, props, state va event handling.",
    category: "Frontend",
    level: "O'rta",
    readTime: "18 daqiqa",
    tags: ["react", "state", "components"],
    status: "available",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Asosiy g'oyalar",
        points: [
          "UI ni komponentlarga bo'lish",
          "Props bilan ma'lumot uzatish",
          "State va re-render logikasi",
        ],
      },
      {
        title: "Mini loyiha",
        points: [
          "Todo list komponenti",
          "Filtrlash va qidiruv",
          "Empty state dizayni",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Node.js va Express: REST API",
    summary:
      "Controller, router, middleware va error handling bo'yicha tezkor yo'riqnoma.",
    category: "Backend",
    level: "O'rta",
    readTime: "20 daqiqa",
    tags: ["nodejs", "express", "api"],
    status: "available",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Arxitektura",
        points: [
          "Route va controller ajratish",
          "Validation va sanitization",
          "Yagona error handler",
        ],
      },
      {
        title: "Amaliy",
        points: [
          "CRUD endpointlar yaratish",
          "Postman collection tuzish",
          "HTTP status code standarti",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "PostgreSQL: schema va indeks",
    summary:
      "Normalizatsiya, indeks turlari va sekin so'rovlarni optimallashtirish.",
    category: "Database",
    level: "O'rta",
    readTime: "17 daqiqa",
    tags: ["postgresql", "sql", "index"],
    status: "available",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Model va indeks",
        points: [
          "1NF/2NF/3NF qisqacha",
          "B-tree va composite indekslar",
          "EXPLAIN ANALYZE asoslari",
        ],
      },
      {
        title: "Amaliy topshiriq",
        points: [
          "Jadvalga indeks qo'shib taqqoslash",
          "Slow query ni topish",
          "Pagination uchun cursor yondashuvi",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "REST vs GraphQL: qachon qaysi?",
    summary:
      "API dizayni, overfetching/underfetching muammolari va yechimlari.",
    category: "Architecture",
    level: "O'rta",
    readTime: "12 daqiqa",
    tags: ["rest", "graphql", "api"],
    status: "available",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Taqqoslash",
        points: [
          "RESTda resurs modeli",
          "GraphQLda query flexibiligi",
          "Keshlash strategiyalari",
        ],
      },
      {
        title: "Real holatlar",
        points: [
          "Mobil ilovalar uchun payload",
          "Murakkab dashboardlar",
          "Monitoring va observability",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Autentifikatsiya va xavfsizlik",
    summary:
      "JWT, refresh token, rate limit va OWASP Top 10 qisqacha ko'rinishi.",
    category: "Security",
    level: "O'rta",
    readTime: "19 daqiqa",
    tags: ["security", "auth", "jwt"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Minimum talablar",
        points: [
          "Parolni hash qilish",
          "Token expiry va refresh",
          "Rate limit va logging",
        ],
      },
      {
        title: "Xatolar",
        points: [
          "Sensitive ma'lumotlarni loglamaslik",
          "CORS va CSRF asoslari",
          "API keylarni xavfsiz saqlash",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "DevOps asoslari: CI/CD va Docker",
    summary:
      "Build, test, deploy pipeline va container image strukturasini tushunish.",
    category: "DevOps",
    level: "O'rta",
    readTime: "15 daqiqa",
    tags: ["devops", "docker", "ci/cd"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Pipeline",
        points: [
          "Lint va test bosqichlari",
          "Artifact va image versiyalari",
          "Rollback va release taglar",
        ],
      },
      {
        title: "Docker",
        points: [
          "Multi-stage build",
          "Environment variables",
          "Minimal image va security",
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Bulut xizmatlari: AWS, GCP, Azure",
    summary:
      "Compute, storage, network va monitoring xizmatlarining bazaviy ko'rinishi.",
    category: "Cloud",
    level: "Yuqori",
    readTime: "14 daqiqa",
    tags: ["cloud", "aws", "gcp"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Asosiy xizmatlar",
        points: [
          "Compute (VM, serverless)",
          "Storage (object, block)",
          "Monitoring va alerting",
        ],
      },
      {
        title: "Amaliy scenario",
        points: [
          "Oddiy web app deployment",
          "CDN bilan tezlashtirish",
          "Backup va recovery",
        ],
      },
    ],
  },
  {
    id: 12,
    title: "Testing: unit, integration, e2e",
    summary:
      "Test piramidasi, mocklar, va CI'da testlarni avtomatlashtirish.",
    category: "Quality",
    level: "O'rta",
    readTime: "13 daqiqa",
    tags: ["testing", "jest", "playwright"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Test turlari",
        points: [
          "Unit testlar va mocking",
          "Integration testlar",
          "E2E testlar va CI",
        ],
      },
      {
        title: "Sifat ko'rsatkichlari",
        points: [
          "Coverage va uning talqini",
          "Flaky testlarni aniqlash",
          "Regression testing",
        ],
      },
    ],
  },
  {
    id: 13,
    title: "Performance va optimizatsiya",
    summary:
      "Lighthouse, bundle size, caching va lazy loading bo'yicha tavsiyalar.",
    category: "Performance",
    level: "Yuqori",
    readTime: "12 daqiqa",
    tags: ["performance", "cache", "optimization"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Front-end",
        points: [
          "Bundle splitting",
          "Image optimization",
          "Caching strategiyasi",
        ],
      },
      {
        title: "Back-end",
        points: [
          "Query optimization",
          "Connection pooling",
          "Rate limit va queue",
        ],
      },
    ],
  },
  {
    id: 14,
    title: "Portfolio va ishga tayyorlanish",
    summary:
      "Resume, GitHub profil va real loyiha ko'rsatkichlarini tayyorlash.",
    category: "Career",
    level: "Boshlang'ich",
    readTime: "11 daqiqa",
    tags: ["portfolio", "resume", "career"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Tayyorlanish",
        points: [
          "GitHub profilini tartibga keltirish",
          "Loyiha demo va dokumentatsiya",
          "Interview savollariga tayyorgarlik",
        ],
      },
      {
        title: "Checklist",
        points: [
          "Resume 1 betdan oshmasin",
          "Top-3 loyiha haqida aniq raqamlar",
          "Portfolio saytga link qo'shing",
        ],
      },
    ],
  },
  {
    id: 15,
    title: "TypeScript: tiplar bilan barqaror kod",
    summary:
      "Type inference, union/tuple, generics va type narrowing amaliyoti.",
    category: "Frontend",
    level: "O'rta",
    readTime: "14 daqiqa",
    tags: ["typescript", "types", "frontend"],
    status: "available",
    progress: 20,
    score: null,
    sections: [
      {
        title: "Asosiy tushunchalar",
        points: [
          "Type inference va annotation",
          "Union va literal type",
          "Generic funksiyalar",
        ],
      },
      {
        title: "Amaliy mashq",
        points: [
          "API javobiga type yozing",
          "Nullable qiymatlar bilan ishlash",
          "Custom type guard yarating",
        ],
      },
    ],
  },
  {
    id: 16,
    title: "Next.js: routing va server komponentlar",
    summary:
      "App Router, server actions va data fetching strategiyalari.",
    category: "Frontend",
    level: "O'rta",
    readTime: "18 daqiqa",
    tags: ["nextjs", "routing", "server"],
    status: "available",
    progress: 0,
    score: null,
    sections: [
      {
        title: "App Router",
        points: [
          "Segmentlar va layoutlar",
          "Dynamic routes",
          "Loading va error boundary",
        ],
      },
      {
        title: "Data fetching",
        points: [
          "Server componentda fetch",
          "Caching va revalidate",
          "Client component bilan kombinatsiya",
        ],
      },
    ],
  },
  {
    id: 17,
    title: "API dizayn: naming va versiyalash",
    summary:
      "Endpoint naming, versioning va backward compatibility yondashuvi.",
    category: "Backend",
    level: "O'rta",
    readTime: "11 daqiqa",
    tags: ["api", "design", "versioning"],
    status: "available",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Standartlar",
        points: [
          "Plural resurslar va REST naming",
          "Status code talqini",
          "Idempotent endpointlar",
        ],
      },
      {
        title: "Versioning",
        points: [
          "URL vs header versioning",
          "Deprecation siyosati",
          "Breaking change checklist",
        ],
      },
    ],
  },
  {
    id: 18,
    title: "Python backend: FastAPI starter",
    summary:
      "FastAPI router, Pydantic model va async endpointlar bo'yicha starter.",
    category: "Backend",
    level: "Boshlang'ich",
    readTime: "15 daqiqa",
    tags: ["python", "fastapi", "backend"],
    status: "available",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Boshlash",
        points: [
          "Project struktura",
          "Pydantic validation",
          "Async endpoint yozish",
        ],
      },
      {
        title: "Amaliy",
        points: [
          "CRUD endpointlar",
          "OpenAPI docs",
          "Middleware qo'shish",
        ],
      },
    ],
  },
  {
    id: 19,
    title: "Linux asoslari: fayl tizimi va CLI",
    summary:
      "Terminal buyruqlari, ruxsatlar va process boshqaruvi bo'yicha minimal qo'llanma.",
    category: "Tools",
    level: "Boshlang'ich",
    readTime: "12 daqiqa",
    tags: ["linux", "cli", "tools"],
    status: "available",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Asosiy buyruqlar",
        points: [
          "ls, cd, pwd, cat",
          "chmod va chown",
          "grep va find",
        ],
      },
      {
        title: "Processlar",
        points: [
          "ps, top, kill",
          "Background process",
          "Log fayllar",
        ],
      },
    ],
  },
  {
    id: 20,
    title: "System design: oddiy chat arxitekturasi",
    summary:
      "Real-time chat uchun arxitektura, WebSocket va scaling g'oyalari.",
    category: "Architecture",
    level: "Yuqori",
    readTime: "20 daqiqa",
    tags: ["system-design", "websocket", "scaling"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Komponentlar",
        points: [
          "Gateway va message broker",
          "Presence va typing status",
          "Offline storage",
        ],
      },
      {
        title: "Scaling",
        points: [
          "Shard va partition",
          "Redis pub/sub",
          "Rate limiting",
        ],
      },
    ],
  },
  {
    id: 21,
    title: "Docker Compose: local development",
    summary:
      "Bir nechta service bilan lokal muhiti tez ko'tarish bo'yicha qo'llanma.",
    category: "DevOps",
    level: "Boshlang'ich",
    readTime: "13 daqiqa",
    tags: ["docker", "compose", "devops"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Compose struktura",
        points: [
          "service, build, depends_on",
          "Volumes va networks",
          "Environment variables",
        ],
      },
      {
        title: "Amaliy",
        points: [
          "DB + API + Frontend",
          "Healthcheck qo'shish",
          "Local override fayl",
        ],
      },
    ],
  },
  {
    id: 22,
    title: "Monitoring: logs, metrics, tracing",
    summary:
      "Observability 3 ustuni, alertlar va incident response asoslari.",
    category: "DevOps",
    level: "O'rta",
    readTime: "16 daqiqa",
    tags: ["observability", "monitoring", "sre"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Uch ustun",
        points: [
          "Structured logging",
          "Metrics va SLI/SLO",
          "Distributed tracing",
        ],
      },
      {
        title: "Incident",
        points: [
          "Alert triage",
          "Runbook yozish",
          "Postmortem",
        ],
      },
    ],
  },
  {
    id: 23,
    title: "Product mindset: MVP va iteratsiya",
    summary:
      "MVP, user feedback va roadmap tuzish bo'yicha IT mahsulot yondashuvi.",
    category: "Product",
    level: "Boshlang'ich",
    readTime: "10 daqiqa",
    tags: ["product", "mvp", "roadmap"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "MVP",
        points: [
          "Muammo va segment",
          "Minimal funksiyalar",
          "Feedback loop",
        ],
      },
      {
        title: "Roadmap",
        points: [
          "Prioritetlash",
          "Deadline emas, outcome",
          "Release kanallari",
        ],
      },
    ],
  },
  {
    id: 24,
    title: "Code review: sifat va tezlik balansi",
    summary:
      "Review checklist, commentlar etiketi va avtomatlashtirish tavsiyalari.",
    category: "Quality",
    level: "Boshlang'ich",
    readTime: "9 daqiqa",
    tags: ["code-review", "quality", "workflow"],
    status: "locked",
    progress: 0,
    score: null,
    sections: [
      {
        title: "Checklist",
        points: [
          "Naming va readability",
          "Testlar borligi",
          "Edge case va safety",
        ],
      },
      {
        title: "Praktika",
        points: [
          "Kichik PRlar",
          "Auto-lint va format",
          "Review SLA",
        ],
      },
    ],
  },
]
