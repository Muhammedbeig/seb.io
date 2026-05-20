"use client";

import type { ShareLinks, SharePlatform } from "@/lib/cms";

const platforms: Array<{ id: SharePlatform; label: string }> = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "whatsapp", label: "WhatsApp" },
];

function shareUrl(platform: SharePlatform, shortUrl: string, title: string) {
  const encodedUrl = encodeURIComponent(shortUrl);
  const encodedText = encodeURIComponent(`${title} ${shortUrl}`);

  if (platform === "facebook") return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  if (platform === "whatsapp") return `https://wa.me/?text=${encodedText}`;
  if (platform === "instagram") return `https://www.instagram.com/?url=${encodedUrl}`;
  return `https://www.tiktok.com/share?url=${encodedUrl}`;
}

export default function ShareButtons({ links, title }: { links?: ShareLinks; title: string }) {
  const available = platforms.filter((platform) => links?.[platform.id]?.shortUrl);
  if (!available.length) return null;

  return (
    <section className="mt-12 rounded-lg border border-[#1E1E30] p-5" style={{ background: "var(--card)" }}>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
        Share
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {available.map((platform) => {
          const shortUrl = links?.[platform.id]?.shortUrl || "";
          return (
            <a
              key={platform.id}
              href={shareUrl(platform.id, shortUrl, title)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#1E1E30] px-4 py-2 text-xs font-semibold text-[#E8E8F0] transition-colors hover:border-[#B8FF35]/60 hover:text-[#B8FF35]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {platform.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
