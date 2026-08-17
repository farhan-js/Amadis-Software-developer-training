import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function ManagePlans() {

    const [plans, setPlans] =
        useState<Plan[]>([]);

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [duration, setDuration] =
        useState("");

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

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
        }
    }

    useEffect(() => {
        loadPlans();
    }, []);

    function clearForm() {

        setName("");
        setDescription("");
        setPrice("");
        setDuration("");
        setEditingId(null);
        setError("");
    }

    function startEdit(plan: Plan) {

        setEditingId(plan.id);
        setName(plan.name);
        setDescription(plan.description);
        setPrice(String(plan.price));
        setDuration(String(plan.duration));

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const token =
                localStorage.getItem("token");

            const body = {
                name,
                description,
                price: Number(price),
                duration: Number(duration)
            };

            const url = editingId
                ? `${API_URL}/api/plans/${editingId}`
                : `${API_URL}/api/plans`;

            const method =
                editingId
                    ? "PUT"
                    : "POST";

            const response = await fetch(
                url,
                {
                    method,

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(body)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Operation failed"
                );
            }

            clearForm();

            await loadPlans();

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Operation failed"
            );

        } finally {

            setLoading(false);
        }
    }

    async function handleDelete(
        planId: number
    ) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this plan?"
            );

        if (!confirmed) {
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/plans/${planId}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete plan"
                );
            }

            await loadPlans();

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete plan"
            );
        }
    }

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* Header */}

            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">

                <p className="text-sm text-indigo-100">
                    Administration
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                    Manage Membership Plans
                </h1>

                <p className="mt-2 text-indigo-100">
                    Create and manage the plans available to members.
                </p>

            </div>


            {/* Create / Edit */}

            <Card>

                <CardHeader>

                    <div className="flex items-center justify-between">

                        <div>

                            <CardTitle>
                                {editingId
                                    ? "Edit Membership Plan"
                                    : "Create Membership Plan"}
                            </CardTitle>

                            <CardDescription>
                                {editingId
                                    ? "Update the selected membership plan."
                                    : "Add a new membership plan for your gym."}
                            </CardDescription>

                        </div>

                        {editingId && (
                            <Badge>
                                Editing
                            </Badge>
                        )}

                    </div>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-5 md:grid-cols-2"
                    >

                        <div className="space-y-2">

                            <Label>
                                Plan Name
                            </Label>

                            <Input
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Premium Monthly"
                                required
                            />

                        </div>


                        <div className="space-y-2">

                            <Label>
                                Price
                            </Label>

                            <Input
                                type="number"
                                min="0"
                                value={price}
                                onChange={(e) =>
                                    setPrice(
                                        e.target.value
                                    )
                                }
                                placeholder="999"
                                required
                            />

                        </div>


                        <div className="space-y-2">

                            <Label>
                                Duration
                            </Label>

                            <Input
                                type="number"
                                min="1"
                                value={duration}
                                onChange={(e) =>
                                    setDuration(
                                        e.target.value
                                    )
                                }
                                placeholder="30"
                                required
                            />

                        </div>


                        <div className="space-y-2">

                            <Label>
                                Description
                            </Label>

                            <Input
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="30 day gym membership"
                                required
                            />

                        </div>


                        {error && (
                            <p className="md:col-span-2 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                                {error}
                            </p>
                        )}


                        <div className="flex gap-3 md:col-span-2">

                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                {loading
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Plan"
                                        : "Create Plan"}
                            </Button>


                            {editingId && (

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={clearForm}
                                    className="border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </Button>

                            )}

                        </div>

                    </form>

                </CardContent>

            </Card>


            {/* Plans */}

            <Card>

                <CardHeader>

                    <div className="flex items-center justify-between">

                        <div>

                            <CardTitle>
                                Existing Plans
                            </CardTitle>

                            <CardDescription>
                                Membership plans currently available.
                            </CardDescription>

                        </div>

                        <Badge variant="secondary">
                            {plans.length} plans
                        </Badge>

                    </div>

                </CardHeader>

                <CardContent>

                    {plans.length === 0 ? (

                        <div className="rounded-xl border border-dashed p-10 text-center">

                            <p className="font-medium">
                                No plans found
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Create your first membership plan above.
                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {plans.map(plan => (

                                <Card
                                    key={plan.id}
                                    className="overflow-hidden"
                                >

                                    <CardHeader>

                                        <CardTitle>
                                            {plan.name}
                                        </CardTitle>

                                        <CardDescription>
                                            {plan.description}
                                        </CardDescription>

                                    </CardHeader>


                                    <CardContent>

                                        <div className="mb-5">

                                            <span className="text-3xl font-bold">
                                                ₹{plan.price}
                                            </span>

                                            <span className="ml-2 text-sm text-gray-500">
                                                / {plan.duration} days
                                            </span>

                                        </div>


                                        <div className="flex gap-3">

                                            <Button
                                                type="button"
                                                className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700"
                                                onClick={() =>
                                                    startEdit(plan)
                                                }
                                            >
                                                Edit
                                            </Button>


                                            <Button
                                                type="button"
                                                className="flex-1 bg-red-600 text-white hover:bg-red-700"
                                                onClick={() =>
                                                    handleDelete(plan.id)
                                                }
                                            >
                                                Delete
                                            </Button>

                                        </div>

                                    </CardContent>

                                </Card>

                            ))}

                        </div>
                    )}

                </CardContent>

            </Card>

        </div>
    );
}