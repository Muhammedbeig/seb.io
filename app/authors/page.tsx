import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { getAuthors } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Authors | Search Engine Basics",
  description: "Meet the Search Engine Basics authors, reviewers, educators, and technical contributors.",
};

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <main>
      <PageShell>
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
            <span className="tag">Authors</span>
            <h1
              className="mt-5 text-[#E8E8F0] leading-tight"
              style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2.6rem, 6vw, 5rem)", fontWeight: 800 }}
            >
              People behind<br />
              <span className="text-stroke">the library.</span>
            </h1>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-2">
              {authors.map((author) => {
                const avatarRaw = author.avatar_url || author.avatar;
                const avatar = avatarRaw && !avatarRaw.startsWith("http") && !avatarRaw.startsWith("/") ? `/${avatarRaw}` : avatarRaw;
                return (
                  <Link
                    key={author.slug}
                    href={`/authors/${author.slug}`}
                    className="group rounded-lg border border-[#1E1E30] p-5 transition-colors hover:border-[#B8FF35]/45 hover:bg-[#0F0F1A]"
                    style={{ background: "var(--card)" }}
                  >
                    <div className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-[#B8FF35]/25 bg-[#0F0F1A]">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt={author.name}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xl font-bold text-[#B8FF35]">
                            {author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg font-bold text-[#E8E8F0] group-hover:text-[#B8FF35]" style={{ fontFamily: "var(--font-syne)" }}>
                          {author.name}
                        </h2>
                        {author.role && <p className="mt-1 text-xs text-[#B8B8C8]">{author.role}</p>}
                        {author.bio && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#6B6B80]">{author.bio}</p>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </PageShell>
    </main>
  );
}
