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
        description: string;
        price: number;
        duration: number;

    };

}


export default function MySubscription() {

    const [subscription, setSubscription] =
        useState<Subscription | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [renewing, setRenewing] =
        useState(false);


    async function loadSubscription() {

        try {

            setError("");

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


    useEffect(() => {

        loadSubscription();

    }, []);


    async function handleRenew() {

        if (!subscription) {
            return;
        }


        setRenewing(true);

        try {

            const token =
                localStorage.getItem("token");


            const response = await fetch(
                `${API_URL}/api/subscriptions/renew`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        planId:
                            subscription.planId
                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Renewal failed"
                );
            }


            alert(
                "Membership renewed successfully!"
            );


            setLoading(true);

            await loadSubscription();

        } catch (error) {

            alert(
                error instanceof Error
                    ? error.message
                    : "Renewal failed"
            );

        } finally {

            setRenewing(false);
        }
    }


    /* =========================================================
       LOADING
    ========================================================== */

    if (loading) {

        return (
            <div className="flex min-h-[400px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading your subscription...
                    </p>

                </div>

            </div>
        );
    }


    /* =========================================================
       ERROR
    ========================================================== */

    if (error) {

        return (
            <div className="mx-auto max-w-3xl">

                <Card className="border-red-200">

                    <CardContent className="p-8 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-xl">
                            !
                        </div>

                        <h2 className="mt-4 text-xl font-semibold">
                            Unable to Load Subscription
                        </h2>

                        <p className="mt-2 text-red-600">
                            {error}
                        </p>

                        <Button
                            className="mt-6"
                            onClick={() => {
                                setLoading(true);
                                loadSubscription();
                            }}
                        >
                            Try Again
                        </Button>

                    </CardContent>

                </Card>

            </div>
        );
    }


    /* =========================================================
       NO SUBSCRIPTION
    ========================================================== */

    if (!subscription) {

        return (
            <div className="mx-auto max-w-3xl">

                <Card className="border-dashed">

                    <CardContent className="p-10 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl">
                            💳
                        </div>

                        <h2 className="mt-5 text-2xl font-bold">
                            No Active Subscription
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-slate-500">
                            You don't have an active membership
                            yet. Choose a plan to get started.
                        </p>

                        <Link
                            to="/plans"
                            className="mt-6 inline-block"
                        >
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Browse Membership Plans
                            </Button>
                        </Link>

                    </CardContent>

                </Card>

            </div>
        );
    }


    /* =========================================================
       SUBSCRIPTION PAGE
    ========================================================== */

    return (
        <div className="space-y-8">

            {/* Header */}

            <div>

                <p className="text-sm font-medium text-blue-600">
                    MEMBERSHIP
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                    My Subscription
                </h1>

                <p className="mt-2 text-slate-500">
                    View and manage your current membership.
                </p>

            </div>


            {/* Main Cards */}

            <div className="grid gap-6 lg:grid-cols-2">

                {/* Membership Details */}

                <Card>

                    <CardHeader>

                        <div className="flex items-start justify-between gap-4">

                            <div>

                                <CardTitle>
                                    Membership Details
                                </CardTitle>

                                <CardDescription className="mt-1">
                                    Your current membership information
                                </CardDescription>

                            </div>

                            <Badge>
                                {subscription.status}
                            </Badge>

                        </div>

                    </CardHeader>


                    <CardContent className="space-y-6">

                        <div className="rounded-xl bg-blue-100 p-5">

                            <p className="text-sm text-blue-600">
                                Current Plan
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-900">
                                {subscription.MembershipPlan?.name ||
                                    `Plan #${subscription.planId}`}
                            </p>

                            {subscription.MembershipPlan?.description && (

                                <p className="mt-2 text-sm text-slate-600">
                                    {
                                        subscription
                                            .MembershipPlan
                                            .description
                                    }
                                </p>
                            )}

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            <div className="rounded-lg border p-4">

                                <p className="text-sm text-slate-500">
                                    Price
                                </p>

                                <p className="mt-1 text-xl font-bold">
                                    ₹
                                    {subscription.MembershipPlan?.price ??
                                        "-"}
                                </p>

                            </div>


                            <div className="rounded-lg border p-4">

                                <p className="text-sm text-slate-500">
                                    Duration
                                </p>

                                <p className="mt-1 text-xl font-bold">
                                    {subscription.MembershipPlan?.duration ??
                                        "-"}{" "}
                                    days
                                </p>

                            </div>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            <div>

                                <p className="text-sm text-slate-500">
                                    Start Date
                                </p>

                                <p className="mt-1 font-semibold">
                                    {new Date(
                                        subscription.startDate
                                    ).toLocaleDateString()}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-slate-500">
                                    Expiry Date
                                </p>

                                <p className="mt-1 font-semibold">
                                    {new Date(
                                        subscription.endDate
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                        </div>

                    </CardContent>

                </Card>


                {/* Countdown */}

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Membership Status
                        </CardTitle>

                        <CardDescription>
                            Time remaining on your current plan
                        </CardDescription>

                    </CardHeader>


                    <CardContent className="space-y-6">

                        <Countdown
                            endDate={
                                subscription.endDate
                            }
                        />


                        <div className="rounded-lg bg-slate-50 p-4">

                            <p className="text-sm text-slate-500">
                                Expiry Date
                            </p>

                            <p className="mt-1 font-semibold">
                                {new Date(
                                    subscription.endDate
                                ).toLocaleDateString(
                                    undefined,
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    }
                                )}
                            </p>

                        </div>


                   <Button
    className="w-full bg-blue-600 text-white hover:bg-blue-700"
    onClick={handleRenew}
    disabled={renewing}
>
                            {renewing
                                ? "Renewing..."
                                : "Renew Membership"}
                        </Button>


                        <Link
                            to="/plans"
                            className="block"
                        >

<Button
    className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
>
    View Other Plans
</Button>

                        </Link>

                    </CardContent>

                </Card>

            </div>

        </div>
    );
}