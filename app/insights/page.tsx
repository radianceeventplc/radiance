import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Insights | Radiance",
  description: "Expert perspectives on event design, trends, and industry insights.",
};

const insights = [
  {
    title: "The Art of Intentional Event Design",
    category: "Design",
    date: "March 2026",
    excerpt:
      "How thoughtful curation transforms gatherings from ordinary occasions into extraordinary experiences that resonate long after the final guest departs.",
  },
  {
    title: "Sustainability in Luxury Events",
    category: "Trends",
    date: "February 2026",
    excerpt:
      "Exploring how premium events can embrace environmental responsibility without compromising on elegance or experience quality.",
  },
  {
    title: "Building Emotional Architecture",
    category: "Strategy",
    date: "January 2026",
    excerpt:
      "The science and art of designing spaces and moments that create genuine emotional connections between brands and their audiences.",
  },
];

export default function InsightsPage() {
  return (
    <>
      <Header topVariant="light" />
      <main>
        <Section className="pt-32">
          <Container>
            <div className="max-w-3xl mb-16">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-radiance-navy/60 mb-3">
                Journal
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-radiance-navy tracking-tight mb-6">
                Insights
              </h1>
              <p className="text-radiance-navy/70 text-lg leading-relaxed">
                Expert perspectives on event design, emerging trends, and the craft of creating memorable experiences.
              </p>
            </div>

            <div className="space-y-12">
              {insights.map((insight) => (
                <article
                  key={insight.title}
                  className="group border-b border-radiance-navy/10 pb-12"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-medium tracking-[0.15em] uppercase text-radiance-navy/50">
                      {insight.category}
                    </span>
                    <span className="text-xs text-radiance-navy/40">
                      {insight.date}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-radiance-navy mb-4 group-hover:opacity-70 transition-opacity">
                    {insight.title}
                  </h2>
                  <p className="text-radiance-navy/60 leading-relaxed max-w-2xl">
                    {insight.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
