import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { notFound } from "@tanstack/react-router";
import { ShowCaseCard } from "@/components/ShowCaseCard";

interface ShowCasePromoProps {
  showcases: HOMEPAGE_QUERY_RESULT["showcases"];
}

export function ShowcasePromo({ showcases }: ShowCasePromoProps) {
  if (!showcases) return null;

  return (
    <section className="my-16">
      <p className="uppercase font-heading">Load "prosjekter",8,1</p>
      <h2 className="uppercase font-heading text-white text-2xl pt-4 pb-8">
        Utvalgte prosjekter
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {showcases.map((showcase) => (
          <ShowCaseCard key={showcase._id} showcase={showcase} />
        ))}
      </div>
    </section>
  );
}
