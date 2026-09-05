import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import CoreSeries from "@/components/CoreSeries";
import Stats from "@/components/Stats";
import FeaturedArticles from "@/components/FeaturedArticles";
import HomeMainArticle from "@/components/HomeMainArticle";
import WhyReadHere from "@/components/WhyReadHere";
import Newsletter from "@/components/Newsletter";
import JsonLd from "@/components/JsonLd";
import { absoluteSiteUrl } from "@/lib/site";

function HomeStructuredData() {
  const pageUrl = absoluteSiteUrl("/");
  const description =
    "Master search engine basics and learn how crawling, indexing, ranking, and search engine algorithms work from first principles.";
  const imageUrl = absoluteSiteUrl("/Thumbnail.png");
  const publisher = {
    "@type": "Organization",
    "@id": `${pageUrl}#organization`,
    name: "Search Engine Basics",
    url: pageUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteSiteUrl("/icon-512.png"),
    },
  };

  return (
    <>
      <JsonLd
        id="homepage-webpage-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": pageUrl,
          url: pageUrl,
          name: "Search Engine Basics",
          description,
          isPartOf: {
            "@type": "WebSite",
            name: "Search Engine Basics",
            url: pageUrl,
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: imageUrl,
          },
        }}
      />
      <JsonLd
        id="homepage-article-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Search Engine Basics",
          description,
          image: [imageUrl],
          datePublished: "2026-05-25",
          dateModified: "2026-06-06",
          author: publisher,
          publisher,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl,
          },
        }}
      />
      <JsonLd
        id="homepage-breadcrumb-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: pageUrl,
            },
          ],
        }}
      />
    </>
  );
}

export default async function Home() {
  return (
    <main>
      <HomeStructuredData />
      <PageShell>
        <Hero />
        <HomeMainArticle />
        <Ticker />
        <CoreSeries />
        <Stats />
        <FeaturedArticles />
        <WhyReadHere />
        <Newsletter />
      </PageShell>
    </main>
  );
}
