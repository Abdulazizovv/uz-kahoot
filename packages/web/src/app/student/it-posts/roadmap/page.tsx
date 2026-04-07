const tracks = [
  {
    title: "Frontend",
    steps: [
      "HTML/CSS asoslari",
      "JavaScript va DOM",
      "React + TypeScript",
      "Next.js va performance",
      "Testing va deployment",
    ],
  },
  {
    title: "Backend",
    steps: [
      "HTTP va REST",
      "Node.js yoki Python",
      "SQL va database design",
      "Auth va security",
      "Monitoring va scaling",
    ],
  },
  {
    title: "DevOps",
    steps: [
      "Linux va CLI",
      "Docker va Compose",
      "CI/CD pipeline",
      "Cloud basics",
      "Observability",
    ],
  },
]

export default function RoadmapPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">IT yo'l xarita</h1>
      <p className="mt-2 text-sm text-slate-600">
        Yo'nalish tanlang va bosqichma-bosqich o'qing.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {tracks.map((track) => (
          <div
            key={track.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {track.title}
            </h2>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {track.steps.map((step) => (
                <div key={step} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500"></span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
