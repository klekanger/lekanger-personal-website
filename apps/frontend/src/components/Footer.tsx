export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer>
			<div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left h-16 py-4 font-heading">
				<div className="text-white">{`<KURT LEKANGER />`}</div>
				<div className="m-0 text-sm">&copy; {year} Kurt Lekanger</div>
			</div>
		</footer>
	);
}
