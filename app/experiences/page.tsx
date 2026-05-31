import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Experiences | Radiance",
  description: "Discover our portfolio of extraordinary event experiences.",
};

const experiences = [
  {
    title: "The Grand Gala",
    category: "Corporate",
    year: "2025",
    description:
      "An immersive evening of networking and celebration at an iconic Manhattan venue for 500 distinguished guests.",
  },
  {
    title: "Seaside Soirée",
    category: "Social",
    year: "2025",
    description:
      "An elegant coastal gathering with curated dining, live entertainment, and sunset views along the Amalfi Coast.",
  },
  {
    title: "Urban Renaissance",
    category: "Brand Activation",
    year: "2024",
    description:
      "A bold, experiential launch that transformed a Brooklyn warehouse into a living art installation.",
  },
  {
    title: "The Winter Ball",
    category: "Gala",
    year: "2024",
    description:
      "A black-tie fundraiser that raised over $2M for arts education, featuring performances by world-class artists.",
  },
  {
    title: "Garden of Dreams",
    category: "Wedding",
    year: "2024",
    description:
      "A three-day destination wedding celebration in Tuscany with bespoke floral installations and Michelin-starred dining.",
  },
  {
    title: "Tech Forward Summit",
    category: "Corporate",
    year: "2023",
    description:
      "An innovative conference experience for 2,000 attendees with interactive installations and immersive keynotes.",
  },
];

export default function ExperiencesPage() {
  return (
    <>
      <Header topVariant="light" />
      <main>
        <Section className="pt-32">
          <Container>
            <div className="max-w-3xl mb-16">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-radiance-navy/60 mb-3">
                Portfolio
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-radiance-navy tracking-tight mb-6">
                Featured Experiences
              </h1>
              <p className="text-radiance-navy/70 text-lg leading-relaxed">
                A curated selection of events that showcase our commitment to excellence and creativity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((exp, index) => (
                <div
                  key={exp.title}
                  className="group relative overflow-hidden border border-radiance-navy/10 hover:border-radiance-navy/30 transition-colors duration-300"
                >
                  <div className="aspect-[4/3] bg-radiance-navy/5 flex items-center justify-center">
                    <span className="text-radiance-navy/20 text-6xl font-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-medium tracking-[0.15em] uppercase text-radiance-navy/50">
                        {exp.category}
                      </p>
                      <span className="text-xs text-radiance-navy/40">
                        {exp.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium text-radiance-navy mb-3">
                      {exp.title}
                    </h3>
                    <p className="text-radiance-navy/60 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
