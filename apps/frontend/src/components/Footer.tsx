export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer>
			<div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left h-16 py-4 font-heading">
				<p>FOOTER</p>
				<p className="m-0 text-sm">&copy; {year} Kurt Lekanger</p>
			</div>
		</footer>
	);
}
