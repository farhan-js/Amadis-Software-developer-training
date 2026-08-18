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
import AttendanceTable from "@/components/AttendanceTable";
import { Badge } from "@/components/ui/badge";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

interface Attendance {
    id: number;
    memberId: number;
    trainerId: number;
    checkIn: string;
    checkOut?: string | null;
    sessionType: string;
    notes?: string | null;
}

export default function TrainerDashboard() {

    const [attendance, setAttendance] =
        useState<Attendance[]>([]);

    const [memberId, setMemberId] =
        useState("");

    const [sessionType, setSessionType] =
        useState("Gym Training");

    const [notes, setNotes] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    async function loadAttendance() {

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/attendance/trainer`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load attendance"
                );
            }

            setAttendance(
                data.attendance || []
            );

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load attendance"
            );
        }
    }

    useEffect(() => {
        loadAttendance();
    }, []);

    async function handleCheckIn(
        e: FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/attendance/check-in`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        memberId: Number(memberId),
                        sessionType,
                        notes
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Check-in failed"
                );
            }

            setMemberId("");
            setNotes("");

            await loadAttendance();

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Check-in failed"
            );

        } finally {

            setLoading(false);
        }
    }

    async function handleCheckOut(
        attendanceId: number
    ) {

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/attendance/${attendanceId}/check-out`,
                {
                    method: "PUT",

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
                    "Check-out failed"
                );
            }

            await loadAttendance();

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Check-out failed"
            );
        }
    }

    const activeSessions =
        attendance.filter(
            item => !item.checkOut
        ).length;

    const completedSessions =
        attendance.filter(
            item => item.checkOut
        ).length;

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* Header */}

            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-lg">

                <p className="text-sm font-medium text-blue-100">
                    Trainer Portal
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                    Trainer Dashboard
                </h1>

                <p className="mt-2 text-blue-100">
                    Manage member check-ins and attendance.
                </p>

            </div>


            {/* Statistics */}

            <div className="grid gap-4 sm:grid-cols-3">

                <Card>
                    <CardContent className="p-6">

                        <p className="text-sm text-gray-500">
                            Total Sessions
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {attendance.length}
                        </p>

                    </CardContent>
                </Card>


                <Card>
                    <CardContent className="p-6">

                        <p className="text-sm text-gray-500">
                            Active Sessions
                        </p>

                        <p className="mt-2 text-3xl font-bold text-green-600">
                            {activeSessions}
                        </p>

                    </CardContent>
                </Card>


                <Card>
                    <CardContent className="p-6">

                        <p className="text-sm text-gray-500">
                            Completed
                        </p>

                        <p className="mt-2 text-3xl font-bold text-blue-600">
                            {completedSessions}
                        </p>

                    </CardContent>
                </Card>

            </div>


            {/* Check In */}

            <Card>

                <CardHeader>

                    <CardTitle>
                        Check In Member
                    </CardTitle>

                    <CardDescription>
                        Record a member's gym session.
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleCheckIn}
                        className="grid gap-5 md:grid-cols-4"
                    >

                        <div className="space-y-2">

                            <Label>
                                Member ID
                            </Label>

                            <Input
                                type="number"
                                value={memberId}
                                onChange={(e) =>
                                    setMemberId(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter member ID"
                                required
                            />

                        </div>


                        <div className="space-y-2">

                            <Label>
                                Session Type
                            </Label>

                            <Input
                                value={sessionType}
                                onChange={(e) =>
                                    setSessionType(
                                        e.target.value
                                    )
                                }
                                placeholder="Gym Training"
                                required
                            />

                        </div>


                        <div className="space-y-2">

                            <Label>
                                Notes
                            </Label>

                            <Input
                                value={notes}
                                onChange={(e) =>
                                    setNotes(
                                        e.target.value
                                    )
                                }
                                placeholder="Optional notes"
                            />

                        </div>


                        <div className="flex items-end">

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                disabled={loading}
                            >
                                {loading
                                    ? "Checking in..."
                                    : "Check In"}
                            </Button>

                        </div>

                    </form>


                    {error && (
                        <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                </CardContent>

            </Card>


            {/* Attendance */}

            <Card>

                <CardHeader>

                    <div className="flex items-center justify-between">

                        <div>
                            <CardTitle>
                                Attendance Records
                            </CardTitle>

                            <CardDescription>
                                View and manage member sessions.
                            </CardDescription>
                        </div>

                        <Badge variant="secondary">
                            {attendance.length} records
                        </Badge>

                    </div>

                </CardHeader>

                <CardContent>

                    <AttendanceTable
                        attendance={attendance}
                        showMember={true}
                    />


                    {attendance.some(
                        item => !item.checkOut
                    ) && (

                        <div className="mt-6 border-t pt-6">

                            <p className="mb-3 text-sm font-medium">
                                Active Sessions
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {attendance
                                    .filter(
                                        item =>
                                            !item.checkOut
                                    )
                                    .map(item => (

                                        <Button
                                            key={item.id}
                                            variant="outline"
                                            onClick={() =>
                                                handleCheckOut(
                                                    item.id
                                                )
                                            }
                                        >
                                            Check Out #
                                            {item.id}
                                        </Button>

                                    ))}

                            </div>

                        </div>
                    )}

                </CardContent>

            </Card>

        </div>
    );
}