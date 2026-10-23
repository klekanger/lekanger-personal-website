import { Link } from "@tanstack/react-router";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";

export const NotFound = () => {
  return (
    <section className="mt-24 md:mt-72 font-heading text-center">
      <h1 className="text-7xl md:text-9xl">404</h1>
      <p className="pb-6">Siden ble ikke funnet</p>

      <div className="pb-8">
        <Link to="/">
          <span className="bg-white text-background hover:bg-yellow py-2 px-1">
            {`< Tilbake til forsiden`}
          </span>
        </Link>
      </div>
      <BlinkingCursor />
    </section>
  );
};
