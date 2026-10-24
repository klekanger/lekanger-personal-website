import type { HOMEPAGE_QUERY_RESULT } from "@repo/shared";
import { ShowCaseCard } from "@/components/ShowCaseCard";

interface ShowCasePromoProps {
  showcases: HOMEPAGE_QUERY_RESULT["showcases"];
}

export function ShowcasePromo({ showcases }: ShowCasePromoProps) {
  if (!showcases) return null;

  return (
    <section className="my-10 md:my-16">
      <p className="font-heading uppercase">Load "prosjekter",8,1</p>
      <h2 className="pt-4 pb-8 text-base text-white uppercase md:text-2xl">
        Utvalgte prosjekter
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {showcases.map((showcase) => (
          <ShowCaseCard key={showcase._id} showcase={showcase} />
        ))}
      </div>
    </section>
  );
}
