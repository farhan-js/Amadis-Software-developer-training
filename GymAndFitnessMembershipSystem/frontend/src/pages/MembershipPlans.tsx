import { useEffect, useState } from "react";

import { Link } from "@tanstack/react-router";

import PlanCard from "@/components/PlanCard";

import {
    Card,
    CardContent
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";


interface Plan {

    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;

}


export default function MembershipPlans() {

    const [plans, setPlans] =
        useState<Plan[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        async function loadPlans() {

            try {

                const response = await fetch(
                    `${API_URL}/api/plans`
                );

                const data =
                    await response.json();

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


    async function handleSubscribe(
        planId: number
    ) {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert("Please login first.");

            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/api/subscriptions/subscribe`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        planId
                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Subscription failed"
                );
            }


            alert(
                "Membership subscribed successfully!"
            );


            window.location.href =
                "/member/dashboard";


        } catch (error) {

            alert(
                error instanceof Error
                    ? error.message
                    : "Subscription failed"
            );
        }
    }


    return (
        <div className="space-y-8">

            {/* =====================================================
                HEADER
            ====================================================== */}

            <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white shadow-lg">

                <p className="text-sm font-medium text-blue-100">
                    FITZONE MEMBERSHIP
                </p>

                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                    Choose Your Membership
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-blue-100">
                    Find the membership plan that fits your
                    fitness goals and start your journey today.
                </p>

            </section>


            {/* =====================================================
                BACK BUTTON
            ====================================================== */}

            <div>

                <Link to="/member/dashboard">

<Button className="bg-indigo-600 text-white hover:bg-indigo-700">
    ← Back to Dashboard
</Button>

                </Link>

            </div>


            {/* =====================================================
                LOADING
            ====================================================== */}

            {loading && (

                <Card>

                    <CardContent className="p-10 text-center">

                        <p className="text-slate-500">
                            Loading membership plans...
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

                        <div className="rounded-lg bg-red-50 p-4 text-center">

                            <p className="font-medium text-red-700">
                                Failed to load plans
                            </p>

                            <p className="mt-1 text-sm text-red-600">
                                {error}
                            </p>

                        </div>

                    </CardContent>

                </Card>

            )}


            {/* =====================================================
                EMPTY
            ====================================================== */}

            {!loading &&
                !error &&
                plans.length === 0 && (

                    <Card>

                        <CardContent className="p-10 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                                📋
                            </div>

                            <h2 className="mt-4 text-xl font-semibold">
                                No Membership Plans
                            </h2>

                            <p className="mt-2 text-slate-500">
                                There are currently no membership
                                plans available.
                            </p>

                        </CardContent>

                    </Card>
                )}


            {/* =====================================================
                PLANS
            ====================================================== */}

            {!loading &&
                !error &&
                plans.length > 0 && (

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {plans.map((plan) => (

                            <PlanCard
                                key={plan.id}
                                id={plan.id}
                                name={plan.name}
                                description={plan.description}
                                price={plan.price}
                                duration={plan.duration}
                                onSubscribe={
                                    handleSubscribe
                                }
                            />

                        ))}

                    </div>
                )}

        </div>
    );
}