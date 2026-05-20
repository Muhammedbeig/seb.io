import Link from "next/link";
import type { Author } from "@/lib/cms";

function avatarFor(author: Author) {
  const url = author.avatar_url || author.avatar || "";
  if (url && !url.startsWith("http") && !url.startsWith("/")) {
    return `/${url}`;
  }
  return url;
}

export default function AuthorsStrip({ authors = [] }: { authors?: Author[] }) {
  const visibleAuthors = authors.filter((author) => author.status !== false).slice(0, 8);
  if (!visibleAuthors.length) return null;

  return (
    <section className="border-t border-[#1E1E30] py-16" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <span className="tag">Contributors</span>
            <h2
              className="mt-4 text-[#E8E8F0] leading-tight"
              style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800 }}
            >
              Reviewed by people<br />
              <span className="text-stroke-white">who know the system.</span>
            </h2>
          </div>
          <Link href="/authors" className="btn-ghost self-start rounded-full px-5 py-2.5 text-sm sm:self-auto">
            All Authors -&gt;
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {visibleAuthors.map((author) => {
            const avatar = avatarFor(author);
            return (
              <Link
                key={author.slug}
                href={`/authors/${author.slug}`}
                className="group rounded-lg border border-[#1E1E30] p-4 transition-colors hover:border-[#B8FF35]/45 hover:bg-[#0F0F1A]"
                style={{ background: "var(--card)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      width: 44,
                      height: 44,
                      background: avatar ? undefined : "linear-gradient(135deg, #B8FF3520, #B8FF3560)",
                      border: "1px solid #B8FF3530",
                      overflow: "hidden",
                    }}
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={author.name}
                        loading="lazy"
                        decoding="async"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ color: "#B8FF35", fontFamily: "var(--font-syne)" }}>
                        {author.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#E8E8F0] group-hover:text-[#B8FF35]" style={{ fontFamily: "var(--font-syne)" }}>
                      {author.name}
                    </p>
                    {author.role && (
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[#6B6B80]">
                        {author.role}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
