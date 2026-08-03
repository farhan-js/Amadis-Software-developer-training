import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import Header from "./components/Header";

import WardrobePage from "./pages/WardrobePage";
import OutfitPage from "./pages/OutfitPage";

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-5">
        <Outlet />
      </div>
    </div>
  ),
});

const wardrobeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: WardrobePage,
});

const outfitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/outfit",
  component: OutfitPage,
});

const routeTree = rootRoute.addChildren([
  wardrobeRoute,
  outfitRoute,
]);

export const router = createRouter({
  routeTree,
});