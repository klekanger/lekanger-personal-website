import plex400 from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2?url";
import plex700 from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff2?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Footer from "../components/Footer";
import Header from "../components/Header";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Kurt Lekanger - senior fullstack-utvikler",
			},
		],
		links: [
			{
				rel: "preload",
				as: "font",
				type: "font/woff2",
				href: plex400,
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				as: "font",
				type: "font/woff2",
				href: plex700,
				crossOrigin: "anonymous",
			},
			{ rel: "stylesheet", href: appCss },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="nb" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="bg-border py-8">
				<div className="bg-background wrap-anywhere selection:bg-foreground selection:text-background max-w-6xl m-auto min-h-dvh flex flex-col px-8">
					<Header />
					<div className="grow">{children}</div>
					<Footer />
				</div>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
