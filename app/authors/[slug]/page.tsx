import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import PageShell from "@/components/PageShell";
import { getAuthor } from "@/lib/cms";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const author = await getAuthor(params.slug);
  if (!author) return {};

  return {
    title: `${author.name} | Search Engine Basics`,
    description: author.bio || author.role || `Read articles by ${author.name} on Search Engine Basics.`,
    openGraph: {
      title: `${author.name} | Search Engine Basics`,
      description: author.bio || author.role || `Read articles by ${author.name}.`,
      images: [{ url: author.avatar_url || author.avatar || "/Thumbnail.png" }],
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const author = await getAuthor(params.slug);
  if (!author) notFound();

  const avatarRaw = author.avatar_url || author.avatar;
  const avatar = avatarRaw && !avatarRaw.startsWith("http") && !avatarRaw.startsWith("/") ? `/${avatarRaw}` : avatarRaw;

  return (
    <main>
      <PageShell>
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
            <Link href="/authors" className="text-xs text-[#6B6B80] hover:text-[#B8FF35]" style={{ fontFamily: "var(--font-dm-mono)" }}>
              {"<-"} Authors
            </Link>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div
                className="flex-shrink-0 rounded-full flex items-center justify-center"
                style={{
                  width: 112,
                  height: 112,
                  background: avatar ? "#0F0F1A" : "linear-gradient(135deg, #B8FF3520, #B8FF3560)",
                  border: "1px solid #B8FF3540",
                  overflow: "hidden",
                }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={author.name}
                    fetchPriority="high"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ color: "#B8FF35", fontFamily: "var(--font-syne)", fontSize: "1.875rem", fontWeight: 700 }}>
                    {author.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <span className="tag">Contributor</span>
                <h1 className="mt-4 text-[#E8E8F0] leading-tight" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800 }}>
                  {author.name}
                </h1>
                {author.role && <p className="mt-2 text-sm text-[#B8B8C8]">{author.role}</p>}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            {author.bio && (
              <div className="prose-custom rounded-lg border border-[#1E1E30] p-6" style={{ background: "var(--card)" }}>
                <p>{author.bio}</p>
                {author.website_url && (
                  <p>
                    <a href={author.website_url} target="_blank" rel="noopener noreferrer">Profile link</a>
                  </p>
                )}
              </div>
            )}

            {author.articles && author.articles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)" }}>
                  Articles
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {author.articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={article.href}
                      className="group rounded-lg border border-[#1E1E30] p-5 transition-colors hover:border-[#B8FF35]/45 hover:bg-[#0F0F1A]"
                      style={{ background: "var(--card)" }}
                    >
                        {article.image && (
                          <div className="relative mb-4 aspect-[16/8] overflow-hidden rounded-md border border-[#1E1E30] bg-[#0F0F1A]">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="h-full w-full object-cover"
                          />
                          </div>
                        )}
                      <ArticlePeekCard
                        title={article.title}
                        excerpt={article.excerpt}
                        attributes={article.attributes}
                        previewHeadings={article.previewHeadings}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </PageShell>
    </main>
  );
}
