export default function Header() {
	return (
		<header>
			<nav className="flex flex-wrap justify-between font-heading h-16 py-4">
				<div className="text-lg text-[#edf171]">{`<KURT LEKANGER />`}</div>
				<div className="flex gap-8 text-white">
					<div>PROSJEKTER</div>

					<div>BLOGG</div>

					<div>OM MEG</div>
				</div>
			</nav>
		</header>
	);
}
