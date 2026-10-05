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

      <nav className="relative flex flex-wrap justify-between font-heading h-16 py-4 text-white select-none w-full ">
        <div className="text-sm sm:text-lg font-semibold py-0.5 px-1">
          <Link to="/">{`<KURT LEKANGER />`}</Link>
        </div>

        {/* Large screen navbar */}
        <div className="lg:flex gap-8 h-fit hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.title}
              {...item.linkProps}
              className="hover:text-background hover:bg-foreground"
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
              className="size-6 sm:size-7 hover:cursor-pointer lg:hidden z-99 "
              onClick={() => setIsOpen(!isOpen)}
            />
          </button>
        ) : (
          <button type="button" aria-label="Meny" aria-expanded={isOpen}>
            <Bars
              className="size-6 sm:size-7 hover:cursor-pointer lg:hidden z-99"
              onClick={() => setIsOpen(!isOpen)}
            />
          </button>
        )}
        {isOpen && (
          <>
            <div className="flex flex-col items-center top-32 bg-foreground gap-4 w-full z-99 pt-16 pb-32 mt-2 lg:hidden">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  {...item.linkProps}
                  className="hover:text-foreground hover:bg-background text-background"
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
            <div className="h-16 bg-foreground w-full text-center text-background font-heading text-sm">
              © KURT LEKANGER {year}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
