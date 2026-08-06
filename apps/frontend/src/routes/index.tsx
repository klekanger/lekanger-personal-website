import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="w-full">
			<section className="border border-foreground/50 p-4">
				<div className="pb-4 text-center font-heading text-sm leading-8">
					<div>**** LEKANGER 64 BASIC V2 ****</div>
					<div>64K RAM SYSTEM · 38911 BASIC BYTES FREE</div>
				</div>
				<hr />
				<div className="flex flex-col lg:flex-row gap-16 md:gap-4 pt-8">
					<div className="prose flex-1">
						<h1>UTVIKLER MED SKRIVEKLØE</h1>
						<p>
							Senior fullstack-utvikler.Bygger raske, skalerbare og
							brukervennlige løsninger, med fokus på ytelse, tilgjengelighet og
							vedlikeholdbar kode.{" "}
						</p>
						<div className="flex gap-2">
							<Button>RUN "PROSJEKTER"</Button>
							<Button>KONTAKT</Button>
						</div>
					</div>

					<div className="font-heading text-sm mt-0 prose flex-1">
						<p>READY.</p>
						<p className="text-white">LOAD "WHOAMI",8,1</p>
						<p>SEARCHING FOR WHOAMI</p>
						<p>LOADING... OK</p>
						<p>KURT LEKANGER — SENIOR FULLSTACK-UTVIKLER </p>
						<p>READY.</p>
						<p className="text-white">PRINT STACK$</p>
						<p>REACT NEXT.JS ASTRO VUE SANITY TYPESCRIPT</p>
						<p>READY.</p>
						<p className="text-white">PRINT BAKGRUNN$</p>
						<p>TIDLIGERE TEKNOLOGIJOURNALIST OG REDAKTØR</p>
						<p>READY.</p>
					</div>
				</div>
			</section>
		</main>
	);
}
