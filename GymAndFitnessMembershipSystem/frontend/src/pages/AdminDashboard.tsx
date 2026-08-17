import { useEffect, useRef, useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

interface Plan {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
}

export default function AdminDashboard() {

    const [plans, setPlans] =
        useState<Plan[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const plansSectionRef =
        useRef<HTMLDivElement | null>(null);

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );


    // ==========================================
    // LOAD MEMBERSHIP PLANS
    // ==========================================

    useEffect(() => {

        async function loadPlans() {

            try {

                const response = await fetch(
                    `${API_URL}/api/plans`
                );

                const data = await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to load plans"
                    );
                }

                setPlans(
                    data.plans || data
                );

            } catch (error) {

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load plans"
                );

            } finally {

                setLoading(false);
            }
        }

        loadPlans();

    }, []);


    // ==========================================
    // SCROLL TO PLANS
    // ==========================================

    function handlePreviewPlans() {

        plansSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    return (

        <div className="mx-auto max-w-7xl space-y-8">


            {/* ==========================================
                HERO
            ========================================== */}

            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 p-8 text-white shadow-xl md:p-10">

                <div className="max-w-3xl">

                    <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20">
                        Administration
                    </Badge>

                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">

                        Welcome, {user.name || "Admin"}

                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-300">

                        Manage your gym membership operations,
                        membership plans and system settings
                        from one place.

                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">

                        <Button
                            onClick={handlePreviewPlans}
                            className="bg-white text-slate-900 hover:bg-slate-100"
                        >
                            Preview Membership Plans
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() =>
                                window.location.href =
                                    "/admin/plans"
                            }
                            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                        >
                            Manage Plans
                        </Button>

                    </div>

                </div>

            </div>


            {/* ==========================================
                STATS
            ========================================== */}

            <div className="grid gap-4 md:grid-cols-3">


                {/* Plans */}

                <Card className="border-0 shadow-sm">

                    <CardContent className="p-6">

                        <p className="text-sm font-medium text-gray-500">
                            Membership Plans
                        </p>

                        <div className="mt-3 flex items-end justify-between">

                            <p className="text-3xl font-bold">
                                {loading
                                    ? "..."
                                    : plans.length}
                            </p>

                            <div className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600">
                                Plans
                            </div>

                        </div>

                    </CardContent>

                </Card>


                {/* System Status */}

                <Card className="border-0 shadow-sm">

                    <CardContent className="p-6">

                        <p className="text-sm font-medium text-gray-500">
                            System Status
                        </p>

                        <div className="mt-4">

                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                ● Operational
                            </Badge>

                        </div>

                    </CardContent>

                </Card>


                {/* Role */}

                <Card className="border-0 shadow-sm">

                    <CardContent className="p-6">

                        <p className="text-sm font-medium text-gray-500">
                            Your Role
                        </p>

                        <p className="mt-3 text-2xl font-bold capitalize">
                            {user.role || "admin"}
                        </p>

                    </CardContent>

                </Card>

            </div>


            {/* ==========================================
                QUICK ACTIONS
            ========================================== */}

            <Card className="border-0 shadow-sm">

                <CardHeader>

                    <CardTitle>
                        Quick Actions
                    </CardTitle>

                    <CardDescription>
                        Quickly access the most important
                        administration features.
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <div className="grid gap-4 md:grid-cols-2">


                        {/* Manage Plans */}

                        <button
                            type="button"
                            onClick={() =>
                                window.location.href =
                                    "/admin/plans"
                            }
                            className="group rounded-2xl border bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
                        >

                            <div className="flex items-start justify-between">

                                <div className="rounded-xl bg-indigo-100 p-3 text-xl">
                                    ⚙️
                                </div>

                                <span className="text-gray-400 transition group-hover:translate-x-1">
                                    →
                                </span>

                            </div>

                            <h3 className="mt-5 font-semibold">
                                Manage Membership Plans
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Create, update and delete
                                membership plans.
                            </p>

                        </button>


                        {/* Preview Plans */}

                        <button
                            type="button"
                            onClick={handlePreviewPlans}
                            className="group rounded-2xl border bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                        >

                            <div className="flex items-start justify-between">

                                <div className="rounded-xl bg-blue-100 p-3 text-xl">
                                    👁️
                                </div>

                                <span className="text-gray-400 transition group-hover:translate-x-1">
                                    ↓
                                </span>

                            </div>

                            <h3 className="mt-5 font-semibold">
                                Preview Membership Plans
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Preview the membership plans
                                currently available to members.
                            </p>

                        </button>

                    </div>

                </CardContent>

            </Card>


            {/* ==========================================
                MEMBERSHIP PLANS PREVIEW
            ========================================== */}

            <div
                ref={plansSectionRef}
                className="scroll-mt-24"
            >

                <Card className="border-0 shadow-sm">

                    <CardHeader className="border-b bg-gray-50/70">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <CardTitle className="text-xl">
                                    Membership Plans Preview
                                </CardTitle>

                                <CardDescription className="mt-1">
                                    These are the plans currently
                                    configured in the system.
                                </CardDescription>

                            </div>

                            <Badge variant="secondary">
                                {loading
                                    ? "Loading..."
                                    : `${plans.length} Plans`}
                            </Badge>

                        </div>

                    </CardHeader>


                    <CardContent className="p-6">


                        {/* Error */}

                        {error && (

                            <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                                <p className="font-medium text-red-700">
                                    Failed to load membership plans
                                </p>

                                <p className="mt-1 text-sm text-red-600">
                                    {error}
                                </p>

                            </div>

                        )}


                        {/* Loading */}

                        {loading && (

                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                                {[1, 2, 3].map((item) => (

                                    <div
                                        key={item}
                                        className="h-52 animate-pulse rounded-2xl bg-gray-100"
                                    />

                                ))}

                            </div>

                        )}


                        {/* Empty */}

                        {!loading &&
                            !error &&
                            plans.length === 0 && (

                                <div className="rounded-2xl border border-dashed p-10 text-center">

                                    <p className="font-medium">
                                        No membership plans found
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Create your first membership
                                        plan from Manage Plans.
                                    </p>

                                    <Button
                                        className="mt-5"
                                        onClick={() =>
                                            window.location.href =
                                                "/admin/plans"
                                        }
                                    >
                                        Create Plan
                                    </Button>

                                </div>
                            )}


                        {/* Plans */}

                        {!loading &&
                            !error &&
                            plans.length > 0 && (

                                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                                    {plans.map((plan) => (

                                        <div
                                            key={plan.id}
                                            className="group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
                                        >

                                            {/* Top accent */}

                                            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />


                                            <div className="flex items-start justify-between">

                                                <div>

                                                    <h3 className="text-lg font-bold">
                                                        {plan.name}
                                                    </h3>

                                                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                                                        {plan.description}
                                                    </p>

                                                </div>

                                                <Badge variant="secondary">
                                                    #{plan.id}
                                                </Badge>

                                            </div>


                                            <div className="my-5 border-t" />


                                            <div className="flex items-end justify-between">

                                                <div>

                                                    <p className="text-xs uppercase tracking-wide text-gray-400">
                                                        Price
                                                    </p>

                                                    <p className="mt-1 text-3xl font-bold text-indigo-600">
                                                        ₹{plan.price}
                                                    </p>

                                                </div>


                                                <div className="text-right">

                                                    <p className="text-xs uppercase tracking-wide text-gray-400">
                                                        Duration
                                                    </p>

                                                    <p className="mt-1 font-semibold">
                                                        {plan.duration} days
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="mt-5">

                                                <div className="flex items-center gap-2 text-sm text-green-600">

                                                    <span>
                                                        ●
                                                    </span>

                                                    <span>
                                                        Available
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}


                        {/* Manage button */}

                        {!loading &&
                            plans.length > 0 && (

                                <div className="mt-8 flex justify-center">

                                    <Button
                                        onClick={() =>
                                            window.location.href =
                                                "/admin/plans"
                                        }
                                    >
                                        Manage All Plans
                                    </Button>

                                </div>

                            )}

                    </CardContent>

                </Card>

            </div>

        </div>
    );
}