import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleRegister(
        e: FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setError("");
        setMessage("");
        setLoading(true);

        try {

            const response = await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role: "member"
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Registration failed"
                );
            }

            setMessage(
                "Account created successfully!"
            );

            setTimeout(() => {

                navigate({
                    to: "/login"
                });

            }, 1200);

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Registration failed"
            );

        } finally {

            setLoading(false);
        }
    }


    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">

            <Card className="w-full max-w-md border-0 shadow-xl">

                <CardHeader className="space-y-3 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
                        F
                    </div>

                    <CardTitle className="text-3xl font-bold">
                        Create Account
                    </CardTitle>

                    <CardDescription>
                        Join FitZone and start your fitness journey
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleRegister}
                        className="space-y-5"
                    >

                        <div className="space-y-2">

                            <Label htmlFor="name">
                                Full Name
                            </Label>

                            <Input
                                id="name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your name"
                                className="h-11"
                                required
                            />

                        </div>


                        <div className="space-y-2">

                            <Label htmlFor="email">
                                Email
                            </Label>

                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="you@example.com"
                                className="h-11"
                                required
                            />

                        </div>


                        <div className="space-y-2">

                            <Label htmlFor="password">
                                Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Create a password"
                                className="h-11"
                                minLength={6}
                                required
                            />

                        </div>


                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}


                        {message && (
                            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
                                {message}
                            </div>
                        )}


                        <Button
                            type="submit"
                            className="h-11 w-full bg-blue-600 text-base hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </Button>

                    </form>


                    <div className="mt-6 text-center text-sm text-slate-500">

                        Already have an account?{" "}

                        <button
                            type="button"
                            onClick={() =>
                                navigate({
                                    to: "/login"
                                })
                            }
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Sign in
                        </button>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
}