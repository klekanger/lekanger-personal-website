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
    <header className="sticky top-0 z-50 bg-background">
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-background/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav className="relative flex h-16 w-full select-none flex-wrap justify-between py-4 font-heading text-white">
        <div className="px-1 py-0.5 font-semibold text-sm sm:text-lg">
          <Link to="/">{`<KURT LEKANGER />`}</Link>
        </div>

        {/* Large screen navbar */}
        <div className="hidden h-fit gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.title}
              {...item.linkProps}
              className="hover:bg-foreground hover:text-background"
              activeProps={
                item.highlightActive
                  ? { className: `text-background bg-foreground` }
                  : undefined
              }
            >
              {item.title.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Small screens - render hamburger menu */}
        {isOpen ? (
          <button type="button">
            <XMark
              className="z-99 size-6 hover:cursor-pointer sm:size-7 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            />
          </button>
        ) : (
          <button type="button" aria-label="Meny" aria-expanded={isOpen}>
            <Bars
              className="z-99 size-6 hover:cursor-pointer sm:size-7 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            />
          </button>
        )}
        {isOpen && (
          <>
            <div className="top-32 z-99 mt-2 flex w-full flex-col items-center gap-2 bg-foreground pt-16 pb-32 lg:hidden">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  {...item.linkProps}
                  className="px-2 py-2 text-background hover:bg-background hover:text-foreground"
                  activeProps={
                    item.highlightActive
                      ? { className: `text-white bg-background` }
                      : undefined
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.title.toUpperCase()}
                </Link>
              ))}
            </div>
            <div className="h-16 w-full bg-foreground text-center font-heading text-background text-sm">
              © KURT LEKANGER {year}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
