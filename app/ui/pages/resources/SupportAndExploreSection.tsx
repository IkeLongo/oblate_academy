import Link from "next/link";

export function SupportAndExploreSection() {
  return (
    <section className="w-full bg-[#edf2f1] py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Top support card */}
        <div className="w-full px-6 py-10 text-center sm:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Need Additional Support?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              We&apos;re here to help you succeed in sharing the Catholic faith
              with children.
              <br className="hidden sm:block" />
              Contact our support team for personalized assistance.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
                href="#"
                className="inline-flex min-w-[150px] items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Contact Support
              </Link>

              <Link
                href="#"
                className="inline-flex min-w-[170px] items-center justify-center rounded-full border border-blue-500 bg-white px-6 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Join Community Forum
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom explore section */}
        <div className="mt-14 text-center">
          <h3 className="text-xl font-bold text-slate-800 sm:text-2xl">
            Explore More Content
          </h3>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              K-2 Activities
            </Link>

            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-green-500 px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              3-5 Challenges
            </Link>

            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-purple-500 px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Catholic Faith
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}