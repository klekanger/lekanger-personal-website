export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer>
			<div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
				<p>FOOTER</p>
				<p className="m-0 text-sm">&copy; {year} Kurt Lekanger</p>
			</div>
		</footer>
	);
}
