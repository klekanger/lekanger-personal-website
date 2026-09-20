export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <hr />
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left h-16 py-16 font-heading">
        <div className="text-white uppercase">Håndkodet av Kurt Lekanger</div>
        <div className="text-white not-prose mt-0! pt-0!">&copy; {year}</div>
      </div>
    </footer>
  );
}
