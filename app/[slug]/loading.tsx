"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

export default function SeriesLoading() {
  return (
    <main className="min-h-screen bg-[#07070F] text-[#E8E8F0]">
      {/* ── Hero Header Skeleton ── */}
      <section className="pt-32 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        {/* Accent glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "18%",
            right: "8%",
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle, rgba(184,255,53,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            {/* Left: text content */}
            <div>
              {/* Tag chip */}
              <div className="flex flex-wrap items-center gap-3">
                <SkeletonBar className="h-[26px] w-[62px] rounded-sm" />
              </div>

              {/* Title – two lines mimicking clamp(2.4rem, 6vw, 4.8rem) */}
              <SkeletonBar className="mt-5 h-12 w-full max-w-xl" />
              <SkeletonBar className="mt-3 h-12 w-3/5 max-w-sm" />

              {/* Description */}
              <SkeletonBar className="mt-5 h-4 w-full max-w-2xl" />
              <SkeletonBar className="mt-2 h-4 w-5/6 max-w-lg" />

              {/* Article count label */}
              <SkeletonBar className="mt-4 h-3 w-44" />
            </div>

            {/* Right: 4:3 hero image */}
            <div className="overflow-hidden rounded-lg border border-[#1E1E30] aspect-[4/3] bg-[#0C0C16] animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── Article List Skeleton ── */}
      <section className="pb-24 pt-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border border-[#1E1E30]">
            {Array.from({ length: 6 }).map((_, index) => {
              // Alternate: some rows have thumbnails, some don't
              const hasThumbnail = index % 2 === 0;
              // Vary widths for organic look
              const titleWidth = ["w-4/5", "w-3/5", "w-11/12", "w-3/4", "w-2/3", "w-5/6"][index];
              const excerptWidth1 = ["w-full", "w-11/12", "w-full", "w-5/6", "w-full", "w-11/12"][index];
              const excerptWidth2 = ["w-4/5", "w-3/4", "w-2/3", "w-5/6", "w-3/5", "w-4/5"][index];
              const chipCount = [3, 2, 3, 2, 3, 2][index];

              return (
                <div
                  key={index}
                  className={`grid grid-cols-[52px_minmax(0,1fr)] border-b border-[#1E1E30] last:border-b-0`}
                >
                  {/* Row number column */}
                  <div
                    className="flex justify-center border-r border-[#1E1E30] pt-4 text-[11px]"
                    style={{ fontFamily: "var(--font-dm-mono)" }}
                  >
                    <SkeletonBar className="h-3 w-5" />
                  </div>

                  {/* Content column */}
                  <div
                    className={`grid gap-4 px-4 py-4 sm:px-5 ${
                      hasThumbnail
                        ? "sm:grid-cols-[104px_minmax(0,1fr)]"
                        : ""
                    }`}
                  >
                    {/* Thumbnail */}
                    {hasThumbnail && (
                      <div className="aspect-[4/3] overflow-hidden rounded-md border border-[#1E1E30] bg-[#0C0C16] animate-pulse" />
                    )}

                    {/* Text block – mirrors ArticlePeekCard */}
                    <div className="min-w-0">
                      <div className="min-h-[104px]">
                        {/* Title */}
                        <SkeletonBar
                          className={`h-5 ${titleWidth}`}
                        />

                        {/* Excerpt (2–3 lines) */}
                        <SkeletonBar
                          className={`mt-3 h-3 ${excerptWidth1}`}
                        />
                        <SkeletonBar
                          className={`mt-2 h-3 ${excerptWidth2}`}
                        />
                      </div>

                      {/* Attribute chips */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {Array.from({ length: chipCount }).map((_, ci) => (
                          <SkeletonBar
                            key={ci}
                            className={`h-6 rounded-sm ${
                              [
                                "w-20",
                                "w-24",
                                "w-16",
                              ][ci % 3]
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Read time & date */}
                    <div
                      className={`${
                        hasThumbnail ? "sm:col-start-2" : ""
                      } mt-0 flex flex-wrap items-center gap-3`}
                    >
                      <SkeletonBar className="h-3 w-16" />
                      <SkeletonBar className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
