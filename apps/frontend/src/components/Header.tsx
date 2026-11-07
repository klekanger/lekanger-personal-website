import { Link, type LinkProps } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bars } from "./icons/Bars";
import { XMark } from "./icons/XMark";

type NavItems = {
  title: string;
  highlightActive?: boolean;
  linkProps: LinkProps;
}[];

const NAV_ITEMS: NavItems = [
  {
    title: "Prosjekter",
    highlightActive: true,
    linkProps: {
      to: "/showcase",
      search: {
        page: 1,
      },
    },
  },
  {
    title: "Blogg",
    highlightActive: true,
    linkProps: {
      to: "/blog-page",
      search: {
        page: 1,
      },
    },
  },
  {
    title: "Om meg",
    linkProps: {
      to: "/page/$slug",
      params: { slug: "om-meg" },
    },
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <header className="border-foreground border-b bg-background px-4">
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-background/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="relative flex h-16 w-full select-none flex-wrap justify-between py-4 font-heading text-white">
        <div className="px-1 py-0.5 font-semibold text-sm sm:text-lg">
          <Link to="/">{`KURT LEKANGER.`}</Link>
        </div>

        {/* Large screen navbar */}
        <nav aria-label="Hovedmeny" className="hidden h-fit lg:block">
          <ul className="flex gap-8">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.title}>
                <Link
                  {...item.linkProps}
                  className="block p-1 uppercase hover:bg-foreground hover:text-background"
                  activeProps={
                    item.highlightActive
                      ? { className: `text-background bg-foreground` }
                      : undefined
                  }
                >
                  <span>
                    <span
                      className="mr-2 bg-foreground p-1 text-background"
                      aria-hidden="true"
                    >{`${idx + 1}`}</span>
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Small screens - render hamburger menu */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Meny"
          aria-expanded={isOpen}
          className="lg:hidden"
        >
          {isOpen ? (
            <XMark className="z-99 size-6 hover:cursor-pointer sm:size-7" />
          ) : (
            <Bars className="z-99 size-6 hover:cursor-pointer sm:size-7" />
          )}
        </button>

        {isOpen && (
          <>
            <nav aria-label="Hovedmeny" className="w-full lg:hidden">
              <ul className="top-32 z-99 mt-2 flex flex-col items-center gap-2 bg-foreground pt-16 pb-32">
                {NAV_ITEMS.map((item) => (
                  <li key={item.title}>
                    <Link
                      {...item.linkProps}
                      className="px-2 py-2 text-background uppercase hover:bg-background hover:text-foreground"
                      activeProps={
                        item.highlightActive
                          ? { className: `text-white bg-background` }
                          : undefined
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="h-16 w-full bg-foreground text-center font-heading text-background text-sm lg:hidden">
              © KURT LEKANGER {year}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
