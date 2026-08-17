import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

type UserRole = "member" | "trainer" | "admin";

interface LoginUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

interface LoginResponse {
    message: string;
    token: string;
    user: LoginUser;
}

interface LoginErrorResponse {
    message: string;
}

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleLogin(
        e: FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            // ==========================================
            // LOGIN API
            // ==========================================

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data:
                | LoginResponse
                | LoginErrorResponse =
                await response.json();


            // ==========================================
            // HANDLE API ERROR
            // ==========================================

            if (!response.ok) {

                throw new Error(
                    data.message || "Login failed"
                );
            }


            const loginData =
                data as LoginResponse;


            // ==========================================
            // VALIDATE RESPONSE
            // ==========================================

            if (!loginData.token) {

                throw new Error(
                    "Login failed: token was not received"
                );
            }


            if (!loginData.user) {

                throw new Error(
                    "Login failed: user information was not received"
                );
            }


            // ==========================================
            // GET ROLE
            // ==========================================

            const role =
                loginData.user.role?.toLowerCase();


            if (
                role !== "member" &&
                role !== "trainer" &&
                role !== "admin"
            ) {

                throw new Error(
                    "Invalid user role received from server"
                );
            }


            // ==========================================
            // SAVE LOGIN INFORMATION
            // ==========================================

            localStorage.setItem(
                "token",
                loginData.token
            );

            localStorage.setItem(
                "role",
                role
            );

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...loginData.user,
                    role
                })
            );


            // ==========================================
            // IMPORTANT
            // Tell Navbar that login happened
            // ==========================================

            window.dispatchEvent(
                new Event("authChange")
            );


            // ==========================================
            // ROLE-BASED NAVIGATION
            // ==========================================

            if (role === "member") {

                await navigate({
                    to: "/member/dashboard",
                    replace: true
                });

                return;
            }


            if (role === "trainer") {

                await navigate({
                    to: "/trainer/dashboard",
                    replace: true
                });

                return;
            }


            if (role === "admin") {

                await navigate({
                    to: "/admin/dashboard",
                    replace: true
                });

                return;
            }

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Login failed"
            );

        } finally {

            setLoading(false);
        }
    }


    return (
        <div className="flex min-h-[calc(100vh-65px)] items-center justify-center bg-gray-50 px-4">

            <Card className="w-full max-w-md shadow-lg">

                <CardHeader>

                    <CardTitle className="text-center text-2xl font-bold">
                        Login
                    </CardTitle>

                </CardHeader>


                <CardContent>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        {/* EMAIL */}

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
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                            />

                        </div>


                        {/* PASSWORD */}

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
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                            />

                        </div>


                        {/* ERROR */}

                        {error && (

                            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">

                                {error}

                            </div>

                        )}


                        {/* LOGIN BUTTON */}

{/* LOGIN BUTTON */}

<Button
    type="submit"
    className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
    disabled={loading}
>
    {loading
        ? "Logging in..."
        : "Login"}
</Button>

                    </form>

                </CardContent>

            </Card>

        </div>
    );
}