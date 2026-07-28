import {createRootRoute, createRoute, createRouter, Outlet} from "@tanstack/react-router";
import Login from "./components/Login";
import Todo from "./components/Todo";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Login,
});

const todoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/todo",
  component: Todo,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  todoRoute,
]);

export const router = createRouter({
  routeTree,
});