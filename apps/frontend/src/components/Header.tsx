import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header>
			<nav className="flex flex-wrap justify-between font-heading h-16 py-4">
				<div className="text-lg text-background bg-foreground font-semibold py-0.5 px-1">
					<a href="/">{`<KURT LEKANGER />`}</a>
				</div>
				<div className="flex gap-8 text-white">
					<Link to="/showcase" className="hover:text-yellow">
						PROSJEKTER
					</Link>

					<Link to="/blog-page" className="hover:text-yellow">
						BLOGG
					</Link>

					<div className="hover:text-yellow">OM MEG</div>
				</div>
			</nav>
		</header>
	);
}
