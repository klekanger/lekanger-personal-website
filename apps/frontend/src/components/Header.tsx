import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header>
      <nav className="flex flex-wrap justify-between font-heading h-16 py-4 text-white">
        <div className="text-lg font-semibold py-0.5 px-1">
          <a href="/">{`<KURT LEKANGER />`}</a>
        </div>
        <div className="flex gap-8">
          <Link
            to="/showcase"
            className="hover:text-yellow"
            activeProps={{ className: `font-bold` }}
          >
            PROSJEKTER
          </Link>

          <Link
            to="/blog-page"
            search={{ page: 1 }}
            className="hover:text-yellow"
            activeProps={{ className: `font-bold` }}
          >
            BLOGG
          </Link>

          <div className="hover:text-yellow">OM MEG</div>
        </div>
      </nav>
    </header>
  );
}
