import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header>
			<nav className="flex flex-wrap justify-between font-heading h-16 py-4">
				<div className="text-lg text-[#edf171]">
					<a href="/">{`<KURT LEKANGER />`}</a>
				</div>
				<div className="flex gap-8 text-white">
					<Link to="/showcase">PROSJEKTER</Link>

					<Link to="/blog-page">BLOGG</Link>

					<div>OM MEG</div>
				</div>
			</nav>
		</header>
	);
}
