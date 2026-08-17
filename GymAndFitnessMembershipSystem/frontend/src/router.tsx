import {
    createRouter,
    createRootRoute,
    createRoute,
    redirect
} from "@tanstack/react-router";

import App from "./App";

import Login from "./pages/Login";
import Register from "./pages/Register";

import MemberDashboard from "./pages/MemberDashboard";
import MembershipPlans from "./pages/MembershipPlans";
import MySubscription from "./pages/MySubscription";

import TrainerDashboard from "./pages/TrainerDashboard";

import AdminDashboard from "./pages/AdminDashboard";
import ManagePlans from "./pages/ManagePlans";


/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type UserRole = "member" | "trainer" | "admin";


/*
|--------------------------------------------------------------------------
| AUTH HELPERS
|--------------------------------------------------------------------------
*/

function getToken() {
    return localStorage.getItem("token");
}


function getRole(): UserRole | null {

    const role =
        localStorage.getItem("role");

    if (
        role === "member" ||
        role === "trainer" ||
        role === "admin"
    ) {
        return role;
    }

    return null;
}


/*
|--------------------------------------------------------------------------
| REDIRECT LOGGED-IN USER TO CORRECT DASHBOARD
|--------------------------------------------------------------------------
*/

function getDashboardPath() {

    const role = getRole();

    if (role === "member") {
        return "/member/dashboard";
    }

    if (role === "trainer") {
        return "/trainer/dashboard";
    }

    if (role === "admin") {
        return "/admin/dashboard";
    }

    return "/login";
}


/*
|--------------------------------------------------------------------------
| ROOT ROUTE
|--------------------------------------------------------------------------
*/

const rootRoute = createRootRoute({
    component: App
});


/*
|--------------------------------------------------------------------------
| HOME ROUTE
|--------------------------------------------------------------------------
|
| When user visits:
|
| /
|
| We check whether they are logged in.
|
| Logged in member  → /member/dashboard
| Logged in trainer → /trainer/dashboard
| Logged in admin   → /admin/dashboard
| Not logged in     → /login
|
*/

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",

    beforeLoad: () => {

        throw redirect({
            to: getDashboardPath()
        });

    }
});


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",

    beforeLoad: () => {

        if (getToken()) {

            throw redirect({
                to: getDashboardPath()
            });

        }

    },

    component: Login
});


/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/register",

    beforeLoad: () => {

        if (getToken()) {

            throw redirect({
                to: getDashboardPath()
            });

        }

    },

    component: Register
});


/*
|--------------------------------------------------------------------------
| MEMBER DASHBOARD
|--------------------------------------------------------------------------
*/

const memberDashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/member/dashboard",

    beforeLoad: () => {

        const role = getRole();

        if (!getToken()) {

            throw redirect({
                to: "/login"
            });

        }

        if (role !== "member") {

            throw redirect({
                to: getDashboardPath()
            });

        }

    },

    component: MemberDashboard
});


/*
|--------------------------------------------------------------------------
| MEMBERSHIP PLANS
|--------------------------------------------------------------------------
|
| Only members can access this page.
|
*/

const plansRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/plans",

    beforeLoad: () => {

        const role = getRole();

        if (!getToken()) {

            throw redirect({
                to: "/login"
            });

        }

        if (role !== "member") {

            throw redirect({
                to: getDashboardPath()
            });

        }

    },

    component: MembershipPlans
});


/*
|--------------------------------------------------------------------------
| MY SUBSCRIPTION
|--------------------------------------------------------------------------
*/

const subscriptionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/subscription",

    beforeLoad: () => {

        const role = getRole();

        if (!getToken()) {

            throw redirect({
                to: "/login"
            });

        }

        if (role !== "member") {

            throw redirect({
                to: getDashboardPath()
            });

        }

    },

    component: MySubscription
});


/*
|--------------------------------------------------------------------------
| TRAINER DASHBOARD
|--------------------------------------------------------------------------
*/

const trainerDashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/trainer/dashboard",

    beforeLoad: () => {

        const role = getRole();

        if (!getToken()) {

            throw redirect({
                to: "/login"
            });

        }

        if (role !== "trainer") {

            throw redirect({
                to: getDashboardPath()
            });

        }

    },

    component: TrainerDashboard
});


/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
*/

const adminDashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/admin/dashboard",

    beforeLoad: () => {

        const role = getRole();

        if (!getToken()) {

            throw redirect({
                to: "/login"
            });

        }

        if (role !== "admin") {

            throw redirect({
                to: getDashboardPath()
            });

        }

    },

    component: AdminDashboard
});


/*
|--------------------------------------------------------------------------
| ADMIN - MANAGE PLANS
|--------------------------------------------------------------------------
*/

const managePlansRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/admin/plans",

    beforeLoad: () => {

        const role = getRole();

        if (!getToken()) {

            throw redirect({
                to: "/login"
            });

        }

        if (role !== "admin") {

            throw redirect({
                to: getDashboardPath()
            });

        }

    },

    component: ManagePlans
});


/*
|--------------------------------------------------------------------------
| ROUTE TREE
|--------------------------------------------------------------------------
*/

const routeTree = rootRoute.addChildren([

    homeRoute,

    loginRoute,
    registerRoute,

    // MEMBER
    memberDashboardRoute,
    plansRoute,
    subscriptionRoute,

    // TRAINER
    trainerDashboardRoute,

    // ADMIN
    adminDashboardRoute,
    managePlansRoute

]);


/*
|--------------------------------------------------------------------------
| CREATE ROUTER
|--------------------------------------------------------------------------
*/

export const router = createRouter({
    routeTree
});


/*
|--------------------------------------------------------------------------
| TANSTACK ROUTER TYPES
|--------------------------------------------------------------------------
*/

declare module "@tanstack/react-router" {

    interface Register {
        router: typeof router;
    }

}