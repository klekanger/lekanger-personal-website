import { BlinkingCursor } from "./ui/BlinkingCursor";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer>
			<hr />
			<div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left h-16 py-4 font-heading">
				<div className="text-white">{`<KURT LEKANGER />`}</div>
				<div className="text-white not-prose mt-0! pt-0!">
					&copy; {year} READY.
					<span className="inline-block ml-2 w-4 h-4 bg-primary animate-c64blink"></span>
				</div>
			</div>
		</footer>
	);
}
