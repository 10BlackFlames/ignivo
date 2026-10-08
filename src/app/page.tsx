export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">
          IGNIVO
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <a href="#how-it-works" className="hover:text-slate-900">
            How it works
          </a>

          <a href="#features" className="hover:text-slate-900">
            Features
          </a>

          <a href="#pricing" className="hover:text-slate-900">
            Pricing
          </a>
        </div>

        <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-20 pb-24">
        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-block rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 mb-6">
            Adaptive learning, built around you
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Stop wondering
            <br />
            <span className="text-slate-500">
              what to study next.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-lg md:text-xl leading-8 text-slate-600">
            Upload your study materials, tell Ignivo what you want to achieve,
            and get a learning journey that adapts as you learn.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="rounded-xl bg-slate-900 px-7 py-4 font-medium text-white hover:bg-slate-800">
              Create My Learning Plan
            </button>

            <button className="rounded-xl border border-slate-300 px-7 py-4 font-medium text-slate-700 hover:bg-slate-50">
              See How It Works
            </button>
          </div>

        </div>
      </section>

      {/* Product Preview */}
      <section className="px-8 pb-24">
        <div className="max-w-6xl mx-auto">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">

            <div className="rounded-xl border border-slate-200 bg-white p-6">

              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm text-slate-500">
                    Today&apos;s learning
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Physiology Exam Preparation
                  </h2>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">
                    Progress
                  </p>

                  <p className="text-xl font-bold">
                    68%
                  </p>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">

                <div className="rounded-xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">
                    Current topic
                  </p>

                  <p className="mt-2 font-semibold">z
                    Cardiovascular Physiology
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    12 minutes remaining
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">
                    Needs review
                  </p>

                  <p className="mt-2 font-semibold">
                    Cardiac Output
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Mastery: 42%
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">
                    Next session
                  </p>

                  <p className="mt-2 font-semibold">
                    Blood Pressure
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Tomorrow · 7:00 PM
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-8 py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto">

          <div className="max-w-2xl">
            <p className="text-sm font-medium text-slate-500">
              HOW IGNIVO WORKS
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Your learning journey adapts as you learn.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Ignivo doesn't simply give you information. It uses your
              performance to determine what you should learn, practice,
              review, and master next.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <span className="text-sm text-slate-400">01</span>
              <h3 className="mt-4 font-semibold text-lg">
                Set your goal
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tell Ignivo what you want to learn and when you need to be
                ready.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <span className="text-sm text-slate-400">02</span>
              <h3 className="mt-4 font-semibold text-lg">
                Add your materials
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Upload your lecture notes, PDFs, slides, or other learning
                materials.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <span className="text-sm text-slate-400">03</span>
              <h3 className="mt-4 font-semibold text-lg">
                Learn and practice
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Study lessons and answer questions generated around your
                learning goals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <span className="text-sm text-slate-400">04</span>
              <h3 className="mt-4 font-semibold text-lg">
                Master the material
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ignivo identifies weak areas and adjusts your next sessions
                accordingly.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Learn with a plan that
            <br />
            learns about you.
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Your goal. Your materials. Your pace. Your learning journey.
          </p>

          <button className="mt-8 rounded-xl bg-slate-900 px-8 py-4 font-medium text-white hover:bg-slate-800">
            Start Learning with Ignivo
          </button>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-500">

          <p>
            © 2026 Ignivo. All rights reserved.
          </p>

          <p>
            Learn. Practice. Master.
          </p>

        </div>
      </footer>

    </main>
  );
}