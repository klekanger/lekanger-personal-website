import { Link } from "@tanstack/react-router";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";

export const NotFound = () => {
  return (
    <div className="mt-24 text-center font-heading md:mt-72">
      <h1 className="text-7xl md:text-9xl">404</h1>
      <p className="pb-6">Siden ble ikke funnet</p>

      <div className="pb-8">
        <span className="bg-primary p-2 font-heading text-primary-foreground hover:border hover:border-foreground hover:bg-background hover:text-foreground">
          <Link to="/">{`< Tilbake til forsiden`}</Link>
        </span>
      </div>
      <BlinkingCursor />
    </div>
  );
};
