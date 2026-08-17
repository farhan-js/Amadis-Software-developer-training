import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Countdown from "@/components/Countdown";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";


interface Subscription {

    id: number;
    memberId: number;
    planId: number;

    startDate: string;
    endDate: string;

    status: string;

    MembershipPlan?: {

        id: number;
        name: string;
        price: number;
        duration: number;

    };
}


export default function MemberDashboard() {

    const [subscription, setSubscription] =
        useState<Subscription | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    let user = {
        name: "Member"
    };

    try {

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {
            user = JSON.parse(storedUser);
        }

    } catch {
        // Keep default user
    }


    useEffect(() => {

        async function loadSubscription() {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {

                    throw new Error(
                        "You are not logged in."
                    );
                }

                const response = await fetch(
                    `${API_URL}/api/subscriptions/my`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to load subscription"
                    );
                }

                setSubscription(
                    data.subscription || null
                );

            } catch (error) {

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load subscription"
                );

            } finally {

                setLoading(false);
            }
        }


        loadSubscription();

    }, []);


    return (
        <div className="space-y-8">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg sm:p-8">

                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                    <div>

                        <p className="mb-2 text-sm font-medium text-blue-100">
                            Member Dashboard
                        </p>

                        <h1 className="text-3xl font-bold sm:text-4xl">
                            Welcome back, {user.name}! 👋
                        </h1>

                        <p className="mt-3 max-w-xl text-blue-100">
                            Keep track of your membership,
                            manage your subscription and stay
                            committed to your fitness goals.
                        </p>

                    </div>

                    <div className="hidden rounded-2xl bg-white/10 px-6 py-5 text-center backdrop-blur-sm md:block">

                        <p className="text-sm text-blue-100">
                            Your Role
                        </p>

                        <p className="mt-1 text-xl font-bold">
                            Member
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================================
                LOADING
            ====================================================== */}

            {loading && (

                <Card>

                    <CardContent className="p-8 text-center">

                        <p className="text-slate-500">
                            Loading your membership...
                        </p>

                    </CardContent>

                </Card>

            )}


            {/* =====================================================
                ERROR
            ====================================================== */}

            {error && (

                <Card className="border-red-200">

                    <CardContent className="p-6">

                        <div className="rounded-lg bg-red-50 p-4">

                            <p className="font-medium text-red-700">
                                Unable to load membership
                            </p>

                            <p className="mt-1 text-sm text-red-600">
                                {error}
                            </p>

                        </div>

                    </CardContent>

                </Card>

            )}


            {/* =====================================================
                NO MEMBERSHIP
            ====================================================== */}

            {!loading &&
                !subscription &&
                !error && (

                    <Card className="border-dashed">

                        <CardContent className="p-10 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl">
                                💪
                            </div>

                            <h2 className="mt-5 text-2xl font-bold">
                                No Active Membership
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-slate-500">
                                You don't have an active membership
                                yet. Choose a plan and start your
                                fitness journey today.
                            </p>

                            <Link
                                to="/plans"
                                className="mt-6 inline-block"
                            >
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    Explore Membership Plans
                                </Button>
                            </Link>

                        </CardContent>

                    </Card>
                )}


            {/* =====================================================
                ACTIVE MEMBERSHIP
            ====================================================== */}

            {subscription && (

                <>

                    {/* Statistics */}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <Card>

                            <CardContent className="p-5">

                                <p className="text-sm text-slate-500">
                                    Current Plan
                                </p>

                                <p className="mt-2 text-xl font-bold">
                                    {subscription.MembershipPlan?.name ||
                                        `Plan #${subscription.planId}`}
                                </p>

                            </CardContent>

                        </Card>


                        <Card>

                            <CardContent className="p-5">

                                <p className="text-sm text-slate-500">
                                    Membership Status
                                </p>

                                <div className="mt-3">

<Badge className="px-4 py-2 text-base font-semibold text-black ">
    {subscription.status}
</Badge>

                                </div>

                            </CardContent>

                        </Card>


                        <Card>

                            <CardContent className="p-5">

                                <p className="text-sm text-slate-500">
                                    Start Date
                                </p>

                                <p className="mt-2 text-lg font-semibold">
                                    {new Date(
                                        subscription.startDate
                                    ).toLocaleDateString()}
                                </p>

                            </CardContent>

                        </Card>


                        <Card>

                            <CardContent className="p-5">

                                <p className="text-sm text-slate-500">
                                    Expiry Date
                                </p>

                                <p className="mt-2 text-lg font-semibold">
                                    {new Date(
                                        subscription.endDate
                                    ).toLocaleDateString()}
                                </p>

                            </CardContent>

                        </Card>

                    </div>


                    {/* Membership Details + Countdown */}

                    <div className="grid gap-6 lg:grid-cols-2">

                        <Card>

                            <CardHeader>

                                <CardTitle>
                                    Current Membership
                                </CardTitle>

                                <CardDescription>
                                    Your active membership details
                                </CardDescription>

                            </CardHeader>

                            <CardContent className="space-y-6">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Membership Plan
                                    </p>

                                    <p className="mt-1 text-2xl font-bold">
                                        {subscription.MembershipPlan?.name ||
                                            `Plan #${subscription.planId}`}
                                    </p>

                                </div>


                                <div className="grid grid-cols-2 gap-4">

                                    <div className="rounded-lg bg-slate-50 p-4">

                                        <p className="text-sm text-slate-500">
                                            Price
                                        </p>

                                        <p className="mt-1 text-lg font-bold">
                                            ₹
                                            {subscription.MembershipPlan?.price ??
                                                "-"}
                                        </p>

                                    </div>


                                    <div className="rounded-lg bg-slate-50 p-4">

                                        <p className="text-sm text-slate-500">
                                            Duration
                                        </p>

                                        <p className="mt-1 text-lg font-bold">
                                            {subscription.MembershipPlan?.duration ??
                                                "-"}{" "}
                                            days
                                        </p>

                                    </div>

                                </div>


<div className="flex flex-wrap gap-3">

    <Link to="/subscription">

        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            View Subscription
        </Button>

    </Link>

    <Link to="/plans">

        <Button className="bg-slate-600 text-white hover:bg-slate-700">
            View Plans
        </Button>

    </Link>

</div>

                            </CardContent>

                        </Card>


                        <Card>

                            <CardHeader>

                                <CardTitle>
                                    Membership Countdown
                                </CardTitle>

                                <CardDescription>
                                    Time remaining until your membership expires
                                </CardDescription>

                            </CardHeader>

                            <CardContent>

                                <Countdown
                                    endDate={
                                        subscription.endDate
                                    }
                                />

                            </CardContent>

                        </Card>

                    </div>

                </>
            )}

        </div>
    );
}