import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header>
      <nav className="flex flex-wrap justify-between font-heading h-16 py-4 text-white">
        <div className="text-lg font-semibold py-0.5 px-1">
          <a href="/">{`<KURT LEKANGER />`}</a>
        </div>
        <div className="flex gap-8 h-fit">
          <Link
            to="/showcase"
            search={{ page: 1 }}
            className="hover:text-background hover:bg-foreground"
            activeProps={{ className: `text-background bg-foreground` }}
          >
            PROSJEKTER
          </Link>

          <Link
            to="/blog-page"
            search={{ page: 1 }}
            className="hover:text-background hover:bg-foreground"
            activeProps={{ className: `text-background bg-foreground` }}
          >
            BLOGG
          </Link>

          <div className="hover:text-background hover:bg-foreground">
            <Link
              to="/"
              hash="ommeg"
              className="hover:text-background hover:bg-foreground"
            >
              OM MEG
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
