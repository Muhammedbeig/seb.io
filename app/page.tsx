import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import CoreSeries from "@/components/CoreSeries";
import Stats from "@/components/Stats";
import FeaturedArticles from "@/components/FeaturedArticles";
import WhyReadHere from "@/components/WhyReadHere";
import Newsletter from "@/components/Newsletter";

export default async function Home() {
  return (
    <main>
      <PageShell>
        <Hero />
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
