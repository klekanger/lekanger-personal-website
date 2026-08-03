export default function Header() {
	return (
		<header>
			<nav className="flex flex-wrap justify-between">
				<div>{`<lekanger.no />`}</div>
				<div className="flex gap-4">
					<div>Prosjekter</div>
					<div>Blogg</div>
					<div>Om meg</div>
				</div>
			</nav>
		</header>
	);
}
