export type ItPostStatus = "read" | "available" | "locked"

export interface ItPostSection {
  title: string
  points: string[]
}

export interface ItPostCodeSample {
  title: string
  language: string
  code: string
}

export interface ItPostExercise {
  title: string
  tasks: string[]
}

export interface ItPostLink {
  title: string
  href: string
  note?: string
}

export interface ItPostRepo {
  name: string
  href: string
  why: string
}

export interface ItPost {
  id: number
  title: string
  summary: string
  category: string
  track:
    | "Programming"
    | "Frontend"
    | "Backend"
    | "Database"
    | "Tools"
    | "DevOps"
    | "Cloud"
    | "Security"
    | "Architecture"
    | "Quality"
    | "Performance"
    | "Product"
    | "Career"
  level: "Boshlang'ich" | "O'rta" | "Yuqori"
  readTime: string
  tags: string[]
  status: ItPostStatus
  progress: number
  score: number | null

  prerequisites: string[]
  objectives: string[]
  takeaways: string[]

  sections: ItPostSection[]
  codeSamples: ItPostCodeSample[]
  exercises: ItPostExercise[]
  references: ItPostLink[]
  githubRepos: ItPostRepo[]

  teacherNotes?: string[]
}

export const itPosts: ItPost[] = [
  {
    id: 1,
    title: "Dasturlashga kirish: algoritm va fikrlash",
    summary:
      "Algoritmik fikrlash, muammo tahlili va psevdokod yozish bo'yicha bazaviy qo'llanma.",
    category: "Algoritm va fikrlash",
    track: "Programming",
    level: "Boshlang'ich",
    readTime: "18 daqiqa",
    tags: ["algoritm", "psevdokod", "mantiq", "flow"],
    status: "read",
    progress: 100,
    score: 95,
    prerequisites: ["Kompyuter savodxonligi", "Oddiy matematik mantiq"],
    objectives: [
      "Muammoni kichik bo'laklarga ajratish",
      "Psevdokod va blok-sxema yozish",
      "Shart (if) va takrorlash (loop) tanlash",
      "Edge case larni oldindan ko'rish",
    ],
    takeaways: [
      "Algoritm yozish - kod yozishdan oldingi eng muhim bosqich",
      "Psevdokod sintaksis emas, aniqlik",
      "Har algoritm uchun test misollar kerak",
    ],
    sections: [
      {
        title: "Algoritm deganda nima tushuniladi?",
        points: [
          "Kirish (input) va chiqish (output) ni aniq yozing",
          "Chegaralar: minimal/maksimal qiymatlar",
          "Qadamlar: tartib (sequence), shart (selection), takrorlash (iteration)",
        ],
      },
      {
        title: "Amaliy metod",
        points: [
          "Avval 2-3 ta misolni qo'lda yeching",
          "Qoidani umumlashtiring",
          "Xatolar uchun (0, bo'sh qiymat, noto'g'ri format) rejani yozing",
        ],
      },
    ],
    codeSamples: [
      {
        title: "Psevdokod: juft/toq tekshirish",
        language: "text",
        code: "READ n\nIF n % 2 == 0 THEN\n  PRINT 'juft'\nELSE\n  PRINT 'toq'\nEND",
      },
      {
        title: "Test misollar jadvali",
        language: "text",
        code: "n=0  -> juft\nn=1  -> toq\nn=2  -> juft\nn=-3 -> toq",
      },
    ],
    exercises: [
      {
        title: "Mashq: kalkulyator",
        tasks: [
          "Amallar: +, -, *, /",
          "0 ga bo'lish holatini alohida tekshiring",
          "2 ta test misol yozing",
        ],
      },
    ],
    references: [
      {
        title: "Roadmap: CS fundamentals",
        href: "https://roadmap.sh/computer-science",
      },
      {
        title: "Big-O tushunchasi (qisqacha)",
        href: "https://www.bigocheatsheet.com/",
        note: "Keyinchalik optimizatsiya uchun",
      },
    ],
    githubRepos: [
      {
        name: "TheAlgorithms",
        href: "https://github.com/TheAlgorithms",
        why: "Algoritmlar turli tillarda - misollar ko'p",
      },
    ],
    teacherNotes: [
      "Talabadan bitta muammo uchun kamida 3 ta test misol talab qiling.",
      "Psevdokodda 'aniq' so'zlar: qaysi qiymat qaytadi, qachon to'xtaydi.",
    ],
  },
  {
    id: 2,
    title: "Git va GitHub: kundalik ish oqimi",
    summary:
      "Repo yaratish, branch, commit, pull request va code review amaliyoti.",
    category: "Version control",
    track: "Tools",
    level: "Boshlang'ich",
    readTime: "16 daqiqa",
    tags: ["git", "github", "workflow", "pr"],
    status: "read",
    progress: 100,
    score: 92,
    prerequisites: ["Terminalda fayl ochish", "Loyiha papkasi tushunchasi"],
    objectives: [
      "Branch bilan ishlash odatini shakllantirish",
      "Commit message standartini bilish",
      "PR ochish va review olish",
      "Conflict ni xavfsiz hal qilish",
    ],
    takeaways: [
      "Kichik PR - tez review",
      "Commit - tarix, PR - muhokama",
      "Conflict - tabiiy holat, qo'rqmaslik kerak",
    ],
    sections: [
      {
        title: "Minimal flow",
        points: [
          "Branch: feature uchun alohida",
          "Commit: mantiqiy kichik bo'laklar",
          "PR: tavsif + screenshot + tekshiruv",
        ],
      },
      {
        title: "Commit message",
        points: [
          "Fe'l bilan boshlang: Add/Fix/Refactor",
          "Nimani o'zgartirdi? Nega?",
          "Keraksiz: 'update', 'changes'",
        ],
      },
    ],
    codeSamples: [
      {
        title: "Branch va PR uchun minimal buyruqlar",
        language: "bash",
        code: "git checkout -b feature/it-posts\ngit add .\ngit commit -m \"Add IT posts filters\"\ngit push -u origin feature/it-posts",
      },
      {
        title: "Conflict paytida",
        language: "bash",
        code: "git fetch origin\ngit rebase origin/main\n# conflictlarni hal qiling\ngit add .\ngit rebase --continue",
      },
    ],
    exercises: [
      {
        title: "Mashq: PR odati",
        tasks: [
          "1 ta kichik feature qiling (UI matn)",
          "2 ta commit bilan bo'ling",
          "PR description ga 'What/Why/How to test' yozing",
        ],
      },
    ],
    references: [
      { title: "Git docs", href: "https://git-scm.com/doc" },
      { title: "GitHub Pull Requests", href: "https://docs.github.com/en/pull-requests" },
    ],
    githubRepos: [
      {
        name: "conventional-changelog/commitlint",
        href: "https://github.com/conventional-changelog/commitlint",
        why: "Commit standartini avtomatlashtirish",
      },
    ],
    teacherNotes: [
      "Har darsda 1 ta mini PR: odat tez shakllanadi.",
      "Reviewda faqat xato emas, yaxshi narsani ham nomlab bering.",
    ],
  },
  {
    id: 3,
    title: "HTML va CSS: tartibli layoutlar",
    summary:
      "Semantik HTML, Flexbox/Grid va responsive dizayn asoslari.",
    category: "Layout",
    track: "Frontend",
    level: "Boshlang'ich",
    readTime: "20 daqiqa",
    tags: ["html", "css", "flexbox", "grid"],
    status: "read",
    progress: 100,
    score: 88,
    prerequisites: ["Brauzer devtools"],
    objectives: [
      "Semantik strukturani to'g'ri tanlash",
      "Flexbox/Grid bilan layout qurish",
      "Responsive breakpoints",
      "Accessibility uchun minimal amallar",
    ],
    takeaways: [
      "Semantik HTML - SEO va a11y ga yordam beradi",
      "Grid - layout, Flex - elementlar oqimi",
      "Mobile-first odatda tezroq",
    ],
    sections: [
      {
        title: "Semantika",
        points: [
          "header/main/footer dan foydalaning",
          "button vs a: vazifaga mos tanlang",
          "Form elementlarida label unutmang",
        ],
      },
      {
        title: "Layout",
        points: [
          "Flex: align-items/justify-content",
          "Grid: template-columns/gap",
          "Container width: max-width + padding",
        ],
      },
    ],
    codeSamples: [
      {
        title: "Grid: 2 ustunli layout",
        language: "css",
        code: ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n@media (max-width: 768px) {\n  .grid { grid-template-columns: 1fr; }\n}",
      },
      {
        title: "Semantik skeleton",
        language: "html",
        code: "<header>... </header>\n<main>\n  <section>... </section>\n</main>\n<footer>... </footer>",
      },
    ],
    exercises: [
      {
        title: "Mashq: profil kartalar",
        tasks: [
          "3 ta karta grid qiling (desktop), mobil 1 ustun",
          "Buttonlar uchun :hover va :focus qo'shing",
          "Image uchun alt yozing",
        ],
      },
    ],
    references: [
      { title: "MDN: Flexbox", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout" },
      { title: "MDN: Grid", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout" },
    ],
    githubRepos: [
      {
        name: "tailwindlabs/tailwindcss",
        href: "https://github.com/tailwindlabs/tailwindcss",
        why: "Utility-first yondashuvni ko'rish",
      },
    ],
  },
  {
    id: 4,
    title: "JavaScript asoslari: massiv va obyektlar",
    summary:
      "Array methods, object destructuring va immutability amaliyoti.",
    category: "JavaScript",
    track: "Frontend",
    level: "Boshlang'ich",
    readTime: "22 daqiqa",
    tags: ["javascript", "array", "object", "immutability"],
    status: "available",
    progress: 45,
    score: null,
    prerequisites: ["If/else", "Function basics"],
    objectives: [
      "map/filter/reduce ni farqlash",
      "Destructuring va default values",
      "Immutability odatini shakllantirish",
      "Oddiy transformatsiyalarni yozish",
    ],
    takeaways: [
      "reduce - agregatsiya uchun",
      "filter - tanlash",
      "map - formatlash",
    ],
    sections: [
      {
        title: "Array metodlar",
        points: [
          "map: har elementni o'zgartirish",
          "filter: shartga mos elementlar",
          "reduce: bitta natijaga yig'ish",
        ],
      },
      {
        title: "Object",
        points: [
          "Destructuring: { a, b }",
          "Spread: { ...obj, x: 1 }",
          "Reference vs value",
        ],
      },
    ],
    codeSamples: [
      {
        title: "Group by category (reduce)",
        language: "js",
        code: "const grouped = items.reduce((acc, item) => {\n  const key = item.category;\n  acc[key] ??= [];\n  acc[key].push(item);\n  return acc;\n}, {});",
      },
      {
        title: "Immutability: update",
        language: "js",
        code: "const next = { ...user, profile: { ...user.profile, age: 21 } };",
      },
    ],
    exercises: [
      {
        title: "Mashq: mahsulotlar",
        tasks: [
          "price > 100 bo'lganlarni filter qiling",
          "title larni uppercase qiling",
          "jami narxni reduce bilan hisoblang",
        ],
      },
    ],
    references: [
      { title: "MDN: Array", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
      { title: "MDN: Destructuring", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" },
    ],
    githubRepos: [
      {
        name: "getify/You-Dont-Know-JS",
        href: "https://github.com/getify/You-Dont-Know-JS",
        why: "JS chuqurroq tushuncha",
      },
    ],
  },
  {
    id: 5,
    title: "React: komponentlar va state",
    summary:
      "Functional componentlar, props, state va event handling.",
    category: "React fundamentals",
    track: "Frontend",
    level: "O'rta",
    readTime: "24 daqiqa",
    tags: ["react", "state", "props", "events"],
    status: "available",
    progress: 0,
    score: null,
    prerequisites: ["JS array/object", "DOM basics"],
    objectives: [
      "Komponentni kichik bo'laklarga bo'lish",
      "Props va state farqini bilish",
      "Event handler yozish",
      "List render + key",
    ],
    takeaways: [
      "State - UI holati",
      "Props - tashqaridan keladigan data",
      "Komponent - qayta ishlatiladigan blok",
    ],
    sections: [
      {
        title: "Patternlar",
        points: [
          "Controlled input",
          "Derived state dan qochish",
          "Key: stable va unique",
        ],
      },
      {
        title: "Mini loyiha",
        points: [
          "Todo list",
          "Filtrlash: all/active/done",
          "Empty state",
        ],
      },
    ],
    codeSamples: [
      {
        title: "Controlled input",
        language: "tsx",
        code: "const [value, setValue] = useState(\"\");\nreturn <input value={value} onChange={(e) => setValue(e.target.value)} />;",
      },
      {
        title: "List render",
        language: "tsx",
        code: "{items.map((item) => (\n  <li key={item.id}>{item.title}</li>\n))}",
      },
    ],
    exercises: [
      {
        title: "Mashq: Todo",
        tasks: [
          "Add/remove",
          "Toggle done",
          "Filter qo'shing",
        ],
      },
    ],
    references: [
      { title: "React docs: State", href: "https://react.dev/learn/state-a-components-memory" },
      { title: "React docs: Lists", href: "https://react.dev/learn/rendering-lists" },
    ],
    githubRepos: [
      {
        name: "reactjs/react.dev",
        href: "https://github.com/reactjs/react.dev",
        why: "React rasmiy docs repo",
      },
    ],
  },
  {
    id: 6,
    title: "Node.js va Express: REST API",
    summary:
      "Controller, router, middleware va error handling bo'yicha tezkor yo'riqnoma.",
    category: "REST API",
    track: "Backend",
    level: "O'rta",
    readTime: "26 daqiqa",
    tags: ["nodejs", "express", "api", "middleware"],
    status: "available",
    progress: 0,
    score: null,
    prerequisites: ["HTTP basics", "JS async/await"],
    objectives: [
      "Router va controller ajratish",
      "Validation qo'shish",
      "Yagona error handler",
      "Status code standart",
    ],
    takeaways: [
      "Middleware - pipeline",
      "Controller - business logic",
      "Error handling - bir joyda",
    ],
    sections: [
      {
        title: "Struktura",
        points: [
          "routes/ controllers/ services/",
          "DTO/validation qatlam",
          "Error middleware",
        ],
      },
      {
        title: "Amaliy",
        points: [
          "CRUD endpoint",
          "Pagination",
          "Logging",
        ],
      },
    ],
    codeSamples: [
      {
        title: "Error middleware",
        language: "js",
        code: "app.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({ message: 'Internal error' });\n});",
      },
      {
        title: "Async handler pattern",
        language: "js",
        code: "const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);",
      },
    ],
    exercises: [
      {
        title: "Mashq: mini API",
        tasks: [
          "GET /items pagination bilan",
          "POST /items validation bilan",
          "Global error handler yozing",
        ],
      },
    ],
    references: [
      { title: "Express docs", href: "https://expressjs.com/" },
      { title: "HTTP status codes", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" },
    ],
    githubRepos: [
      {
        name: "expressjs/express",
        href: "https://github.com/expressjs/express",
        why: "Express core - best practicesni ko'rish",
      },
    ],
  },
  {
    id: 7,
    title: "PostgreSQL: schema va indeks",
    summary:
      "Normalizatsiya, indeks turlari va sekin so'rovlarni optimallashtirish.",
    category: "SQL performance",
    track: "Database",
    level: "O'rta",
    readTime: "24 daqiqa",
    tags: ["postgresql", "sql", "index", "explain"],
    status: "available",
    progress: 0,
    score: null,
    prerequisites: ["SQL SELECT/WHERE", "Primary key"],
    objectives: [
      "Normalizatsiya g'oyasi",
      "Indeks qachon kerakligini bilish",
      "EXPLAIN ni o'qish",
      "Pagination strategiyasi",
    ],
    takeaways: [
      "Indeks hamma narsani tez qilmaydi",
      "EXPLAIN - diagnostika",
      "Pagination: cursor ko'pincha yaxshiroq",
    ],
    sections: [
      {
        title: "Indeks",
        points: [
          "B-tree default",
          "Composite indeks",
          "Write cost: insert/update sekinlashadi",
        ],
      },
      {
        title: "EXPLAIN",
        points: [
          "Seq scan vs index scan",
          "Rows estimate",
          "Analyze bilan real ko'rsatkich",
        ],
      },
    ],
    codeSamples: [
      {
        title: "Indeks qo'shish",
        language: "sql",
        code: "CREATE INDEX idx_users_email ON users(email);",
      },
      {
        title: "EXPLAIN ANALYZE",
        language: "sql",
        code: "EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';",
      },
    ],
    exercises: [
      {
        title: "Mashq: sekin query",
        tasks: [
          "1 ta sekin query o'ylab toping",
          "EXPLAIN bilan tekshiring",
          "Indeks qo'shib taqqoslang",
        ],
      },
    ],
    references: [
      { title: "PostgreSQL docs", href: "https://www.postgresql.org/docs/" },
      { title: "Use the Index, Luke!", href: "https://use-the-index-luke.com/" },
    ],
    githubRepos: [
      {
        name: "postgres/postgres",
        href: "https://github.com/postgres/postgres",
        why: "Postgres source - advanced uchun",
      },
    ],
  },
  {
    id: 8,
    title: "REST vs GraphQL: qachon qaysi?",
    summary:
      "API dizayni, overfetching/underfetching muammolari va yechimlari.",
    category: "API design",
    track: "Architecture",
    level: "O'rta",
    readTime: "18 daqiqa",
    tags: ["rest", "graphql", "api", "design"],
    status: "available",
    progress: 0,
    score: null,
    prerequisites: ["HTTP basics", "JSON"],
    objectives: [
      "REST va GraphQL farqlarini tushunish",
      "Qachon qaysi yondashuv",
      "Caching va monitoring masalalari",
      "Schema-first fikrlash",
    ],
    takeaways: [
      "GraphQL - client flexibiligi",
      "REST - infra va cache oddiyroq",
      "Hamma joyga GraphQL shart emas",
    ],
    sections: [
      {
        title: "Muammolar",
        points: [
          "Overfetching/underfetching",
          "N+1 query",
          "Observability murakkablashishi",
        ],
      },
      {
        title: "Tavsiya",
        points: [
          "Dashboard ko'p data bo'lsa GraphQL",
          "Oddiy CRUD bo'lsa REST",
          "Har ikkisida versioning strategiyasi",
        ],
      },
    ],
    codeSamples: [
      {
        title: "GraphQL query misol",
        language: "graphql",
        code: "query { user(id: 1) { id name posts { id title } } }",
      },
      {
        title: "REST endpoint misol",
        language: "text",
        code: "GET /users/1\nGET /users/1/posts",
      },
    ],
    exercises: [
      {
        title: "Mashq: tanlash",
        tasks: [
          "2 ta use-case yozing (CRUD vs dashboard)",
          "Har biri uchun REST/GraphQL tanlang va sabab yozing",
        ],
      },
    ],
    references: [
      { title: "GraphQL docs", href: "https://graphql.org/learn/" },
      { title: "REST API design", href: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design" },
    ],
    githubRepos: [
      {
        name: "graphql/graphql-js",
        href: "https://github.com/graphql/graphql-js",
        why: "GraphQL reference implementation",
      },
    ],
  },
  {
    id: 9,
    title: "Autentifikatsiya va xavfsizlik",
    summary:
      "JWT, refresh token, rate limit va OWASP Top 10 qisqacha ko'rinishi.",
    category: "Auth & Security",
    track: "Security",
    level: "O'rta",
    readTime: "28 daqiqa",
    tags: ["security", "auth", "jwt", "owasp"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["HTTP cookies", "API basics"],
    objectives: [
      "JWT va session farqini bilish",
      "Refresh token flow",
      "Rate limit va brute force himoyasi",
      "OWASP Top 10 bilan tanishish",
    ],
    takeaways: [
      "Auth - faqat token emas, butun flow",
      "Refresh tokenni ehtiyot saqlash kerak",
      "Loggingda sensitive data yo'q",
    ],
    sections: [
      {
        title: "JWT",
        points: [
          "Exp qisqa bo'lsin",
          "Rotate refresh token",
          "Tokenni localStorage ga qo'ymaslik (ko'pincha)",
        ],
      },
      {
        title: "OWASP",
        points: [
          "Injection",
          "Broken access control",
          "Security misconfiguration",
        ],
      },
    ],
    codeSamples: [
      {
        title: "HTTP-only cookie ideyasi",
        language: "text",
        code: "Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Lax",
      },
      {
        title: "Rate limit pseudo",
        language: "text",
        code: "If requests_per_minute > limit -> 429 Too Many Requests",
      },
    ],
    exercises: [
      {
        title: "Mashq: threat modeling",
        tasks: [
          "Login endpoint uchun 5 ta tahdid yozing",
          "Har biri uchun 1 ta himoya yozing",
        ],
      },
    ],
    references: [
      { title: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
      { title: "JWT (RFC 7519)", href: "https://www.rfc-editor.org/rfc/rfc7519" },
    ],
    githubRepos: [
      {
        name: "OWASP/CheatSheetSeries",
        href: "https://github.com/OWASP/CheatSheetSeries",
        why: "Security cheat sheetlar",
      },
    ],
  },
  {
    id: 10,
    title: "DevOps asoslari: CI/CD va Docker",
    summary:
      "Build, test, deploy pipeline va container image strukturasini tushunish.",
    category: "CI/CD",
    track: "DevOps",
    level: "O'rta",
    readTime: "22 daqiqa",
    tags: ["devops", "docker", "ci", "cd"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["Git basics", "Terminal"],
    objectives: [
      "Pipeline bosqichlari: lint/test/build",
      "Docker image nima va qanday quriladi",
      "Secrets ni xavfsiz saqlash",
      "Rollback tushunchasi",
    ],
    takeaways: [
      "CI - sifat, CD - yetkazish",
      "Multi-stage image kichikroq bo'ladi",
      "Secrets repoda turmaydi",
    ],
    sections: [
      {
        title: "Pipeline",
        points: ["Lint", "Unit tests", "Build artifact", "Deploy"],
      },
      {
        title: "Docker",
        points: [
          "Dockerfile: base image",
          "Layer cache",
          "Multi-stage build",
        ],
      },
    ],
    codeSamples: [
      {
        title: "Multi-stage konsept",
        language: "docker",
        code: "FROM node:20 AS build\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\nFROM node:20-slim\nWORKDIR /app\nCOPY --from=build /app/dist ./dist",
      },
      {
        title: "CI pseudo",
        language: "text",
        code: "on: pull_request\nsteps: lint -> test -> build",
      },
    ],
    exercises: [
      {
        title: "Mashq: pipeline",
        tasks: [
          "Lokalda lint/test/build ketma-ketligini yozing",
          "Dockerfileda multi-stage skeleton tuzing",
        ],
      },
    ],
    references: [
      { title: "Docker docs", href: "https://docs.docker.com/" },
      { title: "GitHub Actions", href: "https://docs.github.com/en/actions" },
    ],
    githubRepos: [
      {
        name: "docker/awesome-compose",
        href: "https://github.com/docker/awesome-compose",
        why: "Compose misollar",
      },
    ],
  },
  {
    id: 11,
    title: "Bulut xizmatlari: AWS, GCP, Azure",
    summary:
      "Compute, storage, network va monitoring xizmatlarining bazaviy ko'rinishi.",
    category: "Cloud basics",
    track: "Cloud",
    level: "Yuqori",
    readTime: "20 daqiqa",
    tags: ["cloud", "aws", "gcp", "azure"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["Networking basics", "Linux"],
    objectives: [
      "Compute/Storage/Networkni farqlash",
      "Monitoring va alert",
      "Cost awareness",
      "Deployment variantlar",
    ],
    takeaways: [
      "Bulut - service'lar to'plami",
      "Monitoring - productionning asosi",
      "Cost - arxitektura qarori",
    ],
    sections: [
      {
        title: "Asosiy servislar",
        points: [
          "Compute: VM, container, serverless",
          "Storage: object/block",
          "Network: VPC, LB",
        ],
      },
      {
        title: "Monitoring",
        points: ["Logs", "Metrics", "Tracing"],
      },
    ],
    codeSamples: [
      {
        title: "Deployment variant",
        language: "text",
        code: "Static site -> CDN\nAPI -> container/service\nDB -> managed database",
      },
    ],
    exercises: [
      {
        title: "Mashq: arxitektura",
        tasks: [
          "Oddiy blog uchun 5 ta cloud komponent yozing",
          "Har birining risk va costini 1 jumlada yozing",
        ],
      },
    ],
    references: [
      { title: "AWS Well-Architected", href: "https://aws.amazon.com/architecture/well-architected/" },
      { title: "GCP Architecture Center", href: "https://cloud.google.com/architecture" },
    ],
    githubRepos: [
      {
        name: "terraform-aws-modules",
        href: "https://github.com/terraform-aws-modules",
        why: "IaC modullar",
      },
    ],
  },
  {
    id: 12,
    title: "Testing: unit, integration, e2e",
    summary:
      "Test piramidasi, mocklar, va CI'da testlarni avtomatlashtirish.",
    category: "Testing",
    track: "Quality",
    level: "O'rta",
    readTime: "18 daqiqa",
    tags: ["testing", "unit", "e2e", "ci"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["Git/CI basics"],
    objectives: [
      "Test piramidasini tushunish",
      "Mock va fixture farqi",
      "Flaky testni kamaytirish",
      "CI da testlarni ishlatish",
    ],
    takeaways: [
      "Unit tez, e2e sekin",
      "Flaky test - ishonchni yo'qotadi",
      "Test - design feedback",
    ],
    sections: [
      {
        title: "Piramida",
        points: ["Unit: ko'p", "Integration: o'rtacha", "E2E: kam"],
      },
      {
        title: "Amaliy",
        points: ["Critical path e2e", "Mock external", "Deterministic data"],
      },
    ],
    codeSamples: [
      {
        title: "Test naming",
        language: "text",
        code: "should_create_user_when_payload_is_valid",
      },
    ],
    exercises: [
      {
        title: "Mashq: test plan",
        tasks: [
          "Login flow uchun 5 ta unit test g'oya",
          "2 ta integration test",
          "1 ta e2e scenariy",
        ],
      },
    ],
    references: [
      { title: "Testing Library", href: "https://testing-library.com/" },
      { title: "Playwright", href: "https://playwright.dev/" },
    ],
    githubRepos: [
      {
        name: "microsoft/playwright",
        href: "https://github.com/microsoft/playwright",
        why: "E2E testing",
      },
    ],
  },
  {
    id: 13,
    title: "Performance va optimizatsiya",
    summary:
      "Lighthouse, bundle size, caching va lazy loading bo'yicha tavsiyalar.",
    category: "Performance",
    track: "Performance",
    level: "Yuqori",
    readTime: "16 daqiqa",
    tags: ["performance", "cache", "bundles"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["Frontend basics", "Network basics"],
    objectives: [
      "Core Web Vitals tushunchasi",
      "Bundle size kamaytirish",
      "Caching strategiyalari",
      "Slow query bilan ishlash",
    ],
    takeaways: [
      "O'lchamasdan optimizatsiya qilmang",
      "Cache - tezlik, lekin invalidation qiyin",
      "Performance - UX",
    ],
    sections: [
      {
        title: "Frontend",
        points: ["Code splitting", "Image optimization", "Lazy loading"],
      },
      {
        title: "Backend",
        points: ["Index", "Caching", "Connection pool"],
      },
    ],
    codeSamples: [
      {
        title: "Cache header",
        language: "text",
        code: "Cache-Control: public, max-age=3600",
      },
    ],
    exercises: [
      {
        title: "Mashq: audit",
        tasks: [
          "Lighthouse audit qiling",
          "3 ta quick win yozing",
          "1 ta o'lchov (metric) tanlang",
        ],
      },
    ],
    references: [
      { title: "web.dev", href: "https://web.dev/" },
      { title: "Lighthouse", href: "https://developer.chrome.com/docs/lighthouse/" },
    ],
    githubRepos: [
      {
        name: "GoogleChrome/lighthouse",
        href: "https://github.com/GoogleChrome/lighthouse",
        why: "Audit tool",
      },
    ],
  },
  {
    id: 14,
    title: "Portfolio va ishga tayyorlanish",
    summary:
      "Resume, GitHub profil va real loyiha ko'rsatkichlarini tayyorlash.",
    category: "Career",
    track: "Career",
    level: "Boshlang'ich",
    readTime: "14 daqiqa",
    tags: ["portfolio", "resume", "career", "github"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["1-2 ta kichik loyiha"],
    objectives: [
      "GitHub profilni tartibga keltirish",
      "Resume qisqa va aniq",
      "Demo va dokumentatsiya",
      "Interview tayyorgarligi",
    ],
    takeaways: [
      "Portfolio - natija ko'rsatish",
      "Raqamlar muhim: +20% tez",
      "README - sizning pitch'ingiz",
    ],
    sections: [
      {
        title: "GitHub",
        points: [
          "Pinned repos",
          "README: run + features",
          "Issue/PR activity",
        ],
      },
      {
        title: "Resume",
        points: ["1 bet", "Impact raqamlar", "Tech stack aniq"],
      },
    ],
    codeSamples: [
      {
        title: "README skeleton",
        language: "md",
        code: "# Project\n\n## Features\n- ...\n\n## Tech\n- ...\n\n## Run\n- ...\n",
      },
    ],
    exercises: [
      {
        title: "Mashq: portfolio",
        tasks: [
          "2 ta repo README ni yaxshilang",
          "1 ta demo link qo'shing",
          "CV ga 3 ta impact bullet yozing",
        ],
      },
    ],
    references: [
      { title: "GitHub Profile README", href: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/about-your-profile" },
      { title: "Keep a Changelog", href: "https://keepachangelog.com/" },
    ],
    githubRepos: [
      {
        name: "resume/resume.github.com",
        href: "https://github.com/resume/resume.github.com",
        why: "Open-source resume builder",
      },
    ],
  },
  {
    id: 15,
    title: "TypeScript: tiplar bilan barqaror kod",
    summary:
      "Type inference, union/tuple, generics va type narrowing amaliyoti.",
    category: "TypeScript",
    track: "Frontend",
    level: "O'rta",
    readTime: "22 daqiqa",
    tags: ["typescript", "types", "generics"],
    status: "available",
    progress: 20,
    score: null,
    prerequisites: ["JavaScript basics"],
    objectives: [
      "Union va narrowing",
      "Generics bilan qayta ishlatiladigan kod",
      "Type-safe API response",
      "any dan qochish",
    ],
    takeaways: [
      "Type - documentation",
      "Narrowing - runtime check",
      "Generics - reusable",
    ],
    sections: [
      {
        title: "Union + narrowing",
        points: [
          "typeof",
          "in operator",
          "discriminated unions",
        ],
      },
      {
        title: "Generics",
        points: ["T extends ...", "Return type", "Utility types"],
      },
    ],
    codeSamples: [
      {
        title: "Discriminated union",
        language: "ts",
        code: "type Result = { ok: true; data: string } | { ok: false; error: string };\n\nfunction unwrap(r: Result) {\n  if (r.ok) return r.data;\n  return r.error;\n}",
      },
      {
        title: "Generic function",
        language: "ts",
        code: "function first<T>(items: T[]): T | undefined {\n  return items[0];\n}",
      },
    ],
    exercises: [
      {
        title: "Mashq: API types",
        tasks: [
          "UserResponse type yozing",
          "nullable fieldlarni belgilang",
          "type guard yozing",
        ],
      },
    ],
    references: [
      { title: "TypeScript Handbook", href: "https://www.typescriptlang.org/docs/handbook/intro.html" },
      { title: "Effective TypeScript (g'oyalar)", href: "https://effectivetypescript.com/" },
    ],
    githubRepos: [
      {
        name: "microsoft/TypeScript",
        href: "https://github.com/microsoft/TypeScript",
        why: "TypeScript compiler repo",
      },
    ],
  },
  {
    id: 16,
    title: "Next.js: routing va server komponentlar",
    summary:
      "App Router, server actions va data fetching strategiyalari.",
    category: "Next.js",
    track: "Frontend",
    level: "O'rta",
    readTime: "24 daqiqa",
    tags: ["nextjs", "routing", "server"],
    status: "available",
    progress: 0,
    score: null,
    prerequisites: ["React basics"],
    objectives: [
      "App Router struktura",
      "Server vs client komponent",
      "Loading/error boundary",
      "Caching/revalidate",
    ],
    takeaways: [
      "Server komponent - default",
      "Client komponent - interaktiv",
      "Data fetching - serverda",
    ],
    sections: [
      {
        title: "Routing",
        points: ["layout.tsx", "page.tsx", "dynamic route"],
      },
      {
        title: "Data",
        points: ["fetch", "cache", "revalidate"],
      },
    ],
    codeSamples: [
      {
        title: "Dynamic route misol",
        language: "text",
        code: "app/posts/[id]/page.tsx",
      },
    ],
    exercises: [
      {
        title: "Mashq: post detail",
        tasks: [
          "[id] route qo'shing",
          "loading.tsx qo'shing",
          "notFound holatini qiling",
        ],
      },
    ],
    references: [
      { title: "Next.js docs", href: "https://nextjs.org/docs" },
      { title: "Routing", href: "https://nextjs.org/docs/app/building-your-application/routing" },
    ],
    githubRepos: [
      {
        name: "vercel/next.js",
        href: "https://github.com/vercel/next.js",
        why: "Next.js core repo",
      },
    ],
  },
  {
    id: 17,
    title: "API dizayn: naming va versiyalash",
    summary:
      "Endpoint naming, versioning va backward compatibility yondashuvi.",
    category: "API design",
    track: "Backend",
    level: "O'rta",
    readTime: "18 daqiqa",
    tags: ["api", "design", "versioning"],
    status: "available",
    progress: 0,
    score: null,
    prerequisites: ["REST basics"],
    objectives: [
      "Naming conventions",
      "Idempotent operations",
      "Versioning strategiya",
      "Deprecation siyosati",
    ],
    takeaways: [
      "API - product",
      "Breaking change - reja bilan",
      "Docs - shart",
    ],
    sections: [
      {
        title: "Naming",
        points: ["/users", "/users/{id}", "verbs emas, resurs"],
      },
      {
        title: "Versioning",
        points: ["/v1", "header", "deprecation"],
      },
    ],
    codeSamples: [
      {
        title: "Idempotent misol",
        language: "text",
        code: "PUT /users/1 -> qayta yuborilsa ham bir xil natija",
      },
    ],
    exercises: [
      {
        title: "Mashq: endpoint design",
        tasks: [
          "Blog uchun 6 endpoint yozing",
          "Har biri uchun method tanlang",
          "Status code belgilab chiqing",
        ],
      },
    ],
    references: [
      { title: "API design best practices", href: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design" },
      { title: "RFC: HTTP semantics", href: "https://www.rfc-editor.org/rfc/rfc9110" },
    ],
    githubRepos: [
      {
        name: "zalando/restful-api-guidelines",
        href: "https://github.com/zalando/restful-api-guidelines",
        why: "REST guideline",
      },
    ],
  },
  {
    id: 18,
    title: "Python backend: FastAPI starter",
    summary:
      "FastAPI router, Pydantic model va async endpointlar bo'yicha starter.",
    category: "FastAPI",
    track: "Backend",
    level: "Boshlang'ich",
    readTime: "22 daqiqa",
    tags: ["python", "fastapi", "pydantic"],
    status: "available",
    progress: 0,
    score: null,
    prerequisites: ["Python basics", "HTTP basics"],
    objectives: [
      "Router va schema",
      "Validation",
      "Async endpoint",
      "OpenAPI docs",
    ],
    takeaways: [
      "FastAPI - typed docs",
      "Pydantic - validation",
      "Async - IO uchun",
    ],
    sections: [
      {
        title: "Struct",
        points: ["routers", "schemas", "services"],
      },
      {
        title: "Docs",
        points: ["/docs", "OpenAPI", "examples"],
      },
    ],
    codeSamples: [
      {
        title: "Minimal endpoint",
        language: "py",
        code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/health')\ndef health():\n  return { 'ok': True }",
      },
    ],
    exercises: [
      {
        title: "Mashq: CRUD",
        tasks: [
          "GET/POST endpointlar",
          "Pydantic model",
          "Error handling",
        ],
      },
    ],
    references: [
      { title: "FastAPI docs", href: "https://fastapi.tiangolo.com/" },
      { title: "Pydantic docs", href: "https://docs.pydantic.dev/" },
    ],
    githubRepos: [
      {
        name: "fastapi/fastapi",
        href: "https://github.com/fastapi/fastapi",
        why: "FastAPI core",
      },
    ],
  },
  {
    id: 19,
    title: "Linux asoslari: fayl tizimi va CLI",
    summary:
      "Terminal buyruqlari, ruxsatlar va process boshqaruvi bo'yicha minimal qo'llanma.",
    category: "Linux",
    track: "Tools",
    level: "Boshlang'ich",
    readTime: "18 daqiqa",
    tags: ["linux", "cli", "permissions"],
    status: "available",
    progress: 0,
    score: null,
    prerequisites: ["Terminal ochish"],
    objectives: [
      "Fayl tizimi tushunchasi",
      "chmod/chown",
      "grep/find",
      "Process: ps/kill",
    ],
    takeaways: [
      "Permission xatosi - eng ko'p uchraydi",
      "grep - log qidirish",
      "Processni boshqarish muhim",
    ],
    sections: [
      {
        title: "Buyruqlar",
        points: ["ls", "cd", "cat", "rg/grep"],
      },
      {
        title: "Ruxsat",
        points: ["rwx", "chmod 644", "ownership"],
      },
    ],
    codeSamples: [
      {
        title: "Logdan xato qidirish",
        language: "bash",
        code: "rg -n \"ERROR\" ./logs",
      },
      {
        title: "Ruxsat berish",
        language: "bash",
        code: "chmod 644 file.txt\nchmod -R 755 ./scripts",
      },
    ],
    exercises: [
      {
        title: "Mashq: CLI",
        tasks: [
          "5 ta fayl yaratib tartiblang",
          "grep/rg bilan qidiruv qiling",
          "1 ta processni topib kill qiling (demo)",
        ],
      },
    ],
    references: [
      { title: "Linux Journey", href: "https://linuxjourney.com/" },
      { title: "ExplainShell", href: "https://explainshell.com/" },
    ],
    githubRepos: [
      {
        name: "BurntSushi/ripgrep",
        href: "https://github.com/BurntSushi/ripgrep",
        why: "Tez qidiruv tool",
      },
    ],
  },
  {
    id: 20,
    title: "System design: oddiy chat arxitekturasi",
    summary:
      "Real-time chat uchun arxitektura, WebSocket va scaling g'oyalari.",
    category: "System design",
    track: "Architecture",
    level: "Yuqori",
    readTime: "26 daqiqa",
    tags: ["system-design", "websocket", "scaling"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["HTTP", "Basic backend"],
    objectives: [
      "Chat komponentlari",
      "WebSocket flow",
      "Message broker g'oyasi",
      "Scaling va partition",
    ],
    takeaways: [
      "Real-time - state masalasi",
      "Broker - loose coupling",
      "Observability - shart",
    ],
    sections: [
      {
        title: "Komponentlar",
        points: ["Gateway", "Broker", "Storage", "Presence"],
      },
      {
        title: "Scaling",
        points: ["Shard", "Redis pub/sub", "Backpressure"],
      },
    ],
    codeSamples: [
      {
        title: "Eventlar ro'yxati",
        language: "text",
        code: "join\nleave\nmessage\ntyping\nread-receipt",
      },
    ],
    exercises: [
      {
        title: "Mashq: diagram",
        tasks: [
          "1 ta sequence diagram chizing",
          "1 ta scaling bottleneck toping",
          "1 ta monitoring metric yozing",
        ],
      },
    ],
    references: [
      { title: "System Design Primer", href: "https://github.com/donnemartin/system-design-primer" },
      { title: "WebSocket RFC", href: "https://www.rfc-editor.org/rfc/rfc6455" },
    ],
    githubRepos: [
      {
        name: "socketio/socket.io",
        href: "https://github.com/socketio/socket.io",
        why: "Real-time library",
      },
    ],
  },
  {
    id: 21,
    title: "Docker Compose: local development",
    summary:
      "Bir nechta service bilan lokal muhiti tez ko'tarish bo'yicha qo'llanma.",
    category: "Docker Compose",
    track: "DevOps",
    level: "Boshlang'ich",
    readTime: "18 daqiqa",
    tags: ["docker", "compose", "local-dev"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["Docker basics"],
    objectives: [
      "Service va network",
      "Volumes",
      "Environment variables",
      "Healthcheck",
    ],
    takeaways: [
      "Compose - local dev uchun ideal",
      "Volumes - data saqlash",
      "Healthcheck - readiness",
    ],
    sections: [
      {
        title: "Asosiy",
        points: ["services", "depends_on", "ports"],
      },
      {
        title: "Praktika",
        points: ["db+api+web", "env", "volumes"],
      },
    ],
    codeSamples: [
      {
        title: "Compose skeleton",
        language: "yaml",
        code: "services:\n  db:\n    image: postgres:16\n  web:\n    build: .\n    depends_on: [db]",
      },
    ],
    exercises: [
      {
        title: "Mashq: stack",
        tasks: [
          "Postgres service qo'shing",
          "API service depends_on qiling",
          "Volume bilan data saqlang",
        ],
      },
    ],
    references: [
      { title: "Compose docs", href: "https://docs.docker.com/compose/" },
      { title: "Awesome Compose", href: "https://github.com/docker/awesome-compose" },
    ],
    githubRepos: [
      {
        name: "docker/awesome-compose",
        href: "https://github.com/docker/awesome-compose",
        why: "Compose misollar",
      },
    ],
  },
  {
    id: 22,
    title: "Monitoring: logs, metrics, tracing",
    summary:
      "Observability 3 ustuni, alertlar va incident response asoslari.",
    category: "Observability",
    track: "DevOps",
    level: "O'rta",
    readTime: "20 daqiqa",
    tags: ["observability", "monitoring", "sre"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["Production tushunchasi"],
    objectives: [
      "Logs/metrics/tracing farqi",
      "SLO/SLI",
      "Alert triage",
      "Runbook",
    ],
    takeaways: [
      "Metric - trend",
      "Log - context",
      "Tracing - distributed",
    ],
    sections: [
      {
        title: "Ustunlar",
        points: ["Logs", "Metrics", "Tracing"],
      },
      {
        title: "Incident",
        points: ["Alert", "Triage", "Postmortem"],
      },
    ],
    codeSamples: [
      {
        title: "Log format",
        language: "json",
        code: "{ \"level\": \"info\", \"msg\": \"request\", \"requestId\": \"...\" }",
      },
    ],
    exercises: [
      {
        title: "Mashq: SLO",
        tasks: [
          "API latency uchun SLO yozing",
          "1 ta alert threshold tanlang",
          "Runbook 5 qadam yozing",
        ],
      },
    ],
    references: [
      { title: "SRE book", href: "https://sre.google/books/" },
      { title: "OpenTelemetry", href: "https://opentelemetry.io/" },
    ],
    githubRepos: [
      {
        name: "open-telemetry/opentelemetry-js",
        href: "https://github.com/open-telemetry/opentelemetry-js",
        why: "Tracing instrumentation",
      },
    ],
  },
  {
    id: 23,
    title: "Product mindset: MVP va iteratsiya",
    summary:
      "MVP, user feedback va roadmap tuzish bo'yicha IT mahsulot yondashuvi.",
    category: "Product",
    track: "Product",
    level: "Boshlang'ich",
    readTime: "16 daqiqa",
    tags: ["product", "mvp", "roadmap"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["Oddiy loyiha g'oyasi"],
    objectives: [
      "MVP nima ekanini tushunish",
      "Feedback loop",
      "Prioritetlash",
      "Outcome vs output",
    ],
    takeaways: [
      "MVP - tez tekshiruv",
      "Roadmap - moslashuvchan",
      "Feedback - yo'l ko'rsatadi",
    ],
    sections: [
      {
        title: "MVP",
        points: ["Muammo", "Segment", "Minimal features"],
      },
      {
        title: "Iteratsiya",
        points: ["Measure", "Learn", "Build"],
      },
    ],
    codeSamples: [
      {
        title: "User story misol",
        language: "text",
        code: "As a student, I want to bookmark posts so that I can return later.",
      },
    ],
    exercises: [
      {
        title: "Mashq: MVP",
        tasks: [
          "EduArena uchun 1 MVP feature tanlang",
          "Success metric yozing",
          "1 haftalik iteratsiya plan tuzing",
        ],
      },
    ],
    references: [
      { title: "Lean Startup", href: "https://theleanstartup.com/" },
      { title: "Shape Up (g'oyalar)", href: "https://basecamp.com/shapeup" },
    ],
    githubRepos: [
      {
        name: "github/roadmap",
        href: "https://github.com/github/roadmap",
        why: "Public roadmap namunasi",
      },
    ],
  },
  {
    id: 24,
    title: "Code review: sifat va tezlik balansi",
    summary:
      "Review checklist, commentlar etiketi va avtomatlashtirish tavsiyalari.",
    category: "Workflow",
    track: "Quality",
    level: "Boshlang'ich",
    readTime: "14 daqiqa",
    tags: ["code-review", "quality", "workflow"],
    status: "locked",
    progress: 0,
    score: null,
    prerequisites: ["Git/GitHub basics"],
    objectives: [
      "Review checklist yaratish",
      "Comment yozish madaniyati",
      "PR size va scope",
      "Auto-lint/test",
    ],
    takeaways: [
      "Review - jamoa sifati",
      "Kichik PR - tezroq",
      "Avtomatlashtirish - vaqt tejaydi",
    ],
    sections: [
      {
        title: "Checklist",
        points: ["Readability", "Tests", "Edge cases", "Security"],
      },
      {
        title: "Praktika",
        points: ["Small PR", "Clear description", "Follow-up issues"],
      },
    ],
    codeSamples: [
      {
        title: "PR description skeleton",
        language: "md",
        code: "## What\n- ...\n\n## Why\n- ...\n\n## How to test\n- ...\n",
      },
    ],
    exercises: [
      {
        title: "Mashq: review",
        tasks: [
          "1 ta PR toping",
          "5 ta review comment yozing (constructive)",
          "2 ta 'nit' va 1 ta 'blocking' ajrating",
        ],
      },
    ],
    references: [
      { title: "Google Engineering Practices", href: "https://google.github.io/eng-practices/" },
      { title: "Conventional Commits", href: "https://www.conventionalcommits.org/" },
    ],
    githubRepos: [
      {
        name: "reviewdog/reviewdog",
        href: "https://github.com/reviewdog/reviewdog",
        why: "PRda avtomatik lint commentlar",
      },
    ],
  },
]
