import { Link } from "@tanstack/react-router";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";

export const NotFound = () => {
  return (
    <div className="mt-24 text-center font-heading md:mt-72">
      <h1 className="text-7xl md:text-9xl">404</h1>
      <p className="pb-6">Siden ble ikke funnet</p>

      <div className="pb-8">
        <Link to="/">
          <span className="bg-white px-1 py-2 text-background hover:bg-yellow">
            {`< Tilbake til forsiden`}
          </span>
        </Link>
      </div>
      <BlinkingCursor />
    </div>
  );
};
