import type { MetadataRoute } from "next";
import { absoluteSiteUrl, SITE_URL } from "@/lib/site";

const explicitlyAllowedUserAgents = [
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-News",
  "Googlebot-Video",
  "Google-InspectionTool",
  "GoogleOther",
  "GoogleOther-Image",
  "GoogleOther-Video",
  "Google-CloudVertexBot",
  "Google-Extended",
  "Storebot-Google",
  "Bingbot",
  "MSNBot",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "OAI-AdsBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "MistralAI-User",
  "MistralAI-Index",
  "CCBot",
  "FacebookBot",
  "facebookexternalhit",
  "Facebot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "meta-externalagent",
  "meta-externalfetcher",
  "GrokBot",
  "xAI-Grok",
  "Grok-DeepSearch",
  "xAI-Bot",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "cohere-training-data-crawler",
  "DeepSeekBot",
  "DuckAssistBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...explicitlyAllowedUserAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: absoluteSiteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
