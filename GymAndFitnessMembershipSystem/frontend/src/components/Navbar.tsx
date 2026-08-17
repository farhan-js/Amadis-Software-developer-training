import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type UserRole = "member" | "trainer" | "admin";

export default function Navbar() {
    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState<UserRole | null>(
        localStorage.getItem("role") as UserRole | null
    );

    // Listen for login/logout changes
    useEffect(() => {
        function handleAuthChange() {
            const newToken = localStorage.getItem("token");
            const newRole = localStorage.getItem(
                "role"
            ) as UserRole | null;

            setToken(newToken);
            setRole(newRole);
        }

        window.addEventListener(
            "authChange",
            handleAuthChange
        );

        return () => {
            window.removeEventListener(
                "authChange",
                handleAuthChange
            );
        };
    }, []);

    // Logout
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        // Immediately update Navbar
        window.dispatchEvent(
            new Event("authChange")
        );

        navigate({
            to: "/login",
            replace: true
        });
    }

    // ==========================================
    // LOGGED OUT
    // ==========================================

    if (!token) {
        return (
            <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    <Link
                        to="/login"
                        className="text-2xl font-bold text-blue-600"
                    >
                        FitZone
                    </Link>

                    <div className="flex items-center gap-2">

                        <Link
                            to="/login"
                            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-600"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
                        >
                            Register
                        </Link>

                    </div>
                </div>
            </nav>
        );
    }

    // ==========================================
    // MEMBER
    // ==========================================

    if (role === "member") {
        return (
            <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    <Link
                        to="/member/dashboard"
                        className="text-2xl font-bold text-blue-600"
                    >
                        FitZone
                    </Link>

                    <div className="flex items-center gap-2">

                        <Link
                            to="/member/dashboard"
                            activeProps={{
                                className:
                                    "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all"
                            }}
                            inactiveProps={{
                                className:
                                    "rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-600"
                            }}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/plans"
                            activeProps={{
                                className:
                                    "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all"
                            }}
                            inactiveProps={{
                                className:
                                    "rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-600"
                            }}
                        >
                            Plans
                        </Link>

                        <Link
                            to="/subscription"
                            activeProps={{
                                className:
                                    "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all"
                            }}
                            inactiveProps={{
                                className:
                                    "rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-600"
                            }}
                        >
                            My Subscription
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="ml-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-600"
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </nav>
        );
    }

    // ==========================================
    // TRAINER
    // ==========================================

    if (role === "trainer") {
        return (
            <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    <Link
                        to="/trainer/dashboard"
                        className="text-2xl font-bold text-blue-600"
                    >
                        FitZone
                    </Link>

                    <div className="flex items-center gap-2">

                        <Link
                            to="/trainer/dashboard"
                            activeProps={{
                                className:
                                    "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all"
                            }}
                            inactiveProps={{
                                className:
                                    "rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-600"
                            }}
                        >
                            Dashboard
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="ml-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-600"
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </nav>
        );
    }

    // ==========================================
    // ADMIN
    // ==========================================

    if (role === "admin") {
        return (
            <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    <Link
                        to="/admin/dashboard"
                        className="text-2xl font-bold text-blue-600"
                    >
                        FitZone
                    </Link>

                    <div className="flex items-center gap-2">

                        <Link
                            to="/admin/dashboard"
                            activeProps={{
                                className:
                                    "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all"
                            }}
                            inactiveProps={{
                                className:
                                    "rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-600"
                            }}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/admin/plans"
                            activeProps={{
                                className:
                                    "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all"
                            }}
                            inactiveProps={{
                                className:
                                    "rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-600"
                            }}
                        >
                            Manage Plans
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="ml-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-600"
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </nav>
        );
    }

    // ==========================================
    // INVALID / UNKNOWN ROLE
    // ==========================================

    return (
        <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                <Link
                    to="/login"
                    className="text-2xl font-bold text-blue-600"
                >
                    FitZone
                </Link>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-600"
                >
                    Logout
                </button>

            </div>
        </nav>
    );
}