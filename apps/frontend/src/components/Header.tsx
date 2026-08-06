export default function Header() {
	return (
		<header>
			<nav className="flex flex-wrap justify-between font-heading h-16 py-4">
				<div className="text-lg text-[#edf171]">{`<KURT LEKANGER />`}</div>
				<div className="flex gap-4">
					<div>Prosjekter</div>
					{`⋅`}
					<div>Blogg</div>
					{`⋅`}
					<div>Om meg</div>
				</div>
			</nav>
		</header>
	);
}
