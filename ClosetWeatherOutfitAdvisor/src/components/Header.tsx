import { Link, useRouterState } from "@tanstack/react-router";

export default function Header() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-5">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">Closet Weather Outfit Advisor</h1>
        </div>

        {/* Navigation */}
        <nav className="flex gap-4 mt-4 md:mt-0">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md transition ${
              pathname === "/"
                ? "bg-white text-slate-900 font-semibold"
                : "hover:bg-slate-700"
            }`}
          >
            Wardrobe
          </Link>

          <Link
            to="/outfit"
            className={`px-4 py-2 rounded-md transition ${
              pathname === "/outfit"
                ? "bg-white text-slate-900 font-semibold"
                : "hover:bg-slate-700"
            }`}
          >
            Outfit Suggestion
          </Link>
        </nav>
      </div>
    </header>
  );
}
