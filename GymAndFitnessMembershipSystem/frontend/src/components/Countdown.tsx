import { useEffect, useState } from "react";

interface CountdownProps {
    endDate: string;
}

export default function Countdown({
    endDate
}: CountdownProps) {

    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {

        function calculateTimeLeft() {

            const now = new Date().getTime();

            const end = new Date(endDate).getTime();

            const difference = end - now;

            if (difference <= 0) {
                setTimeLeft("Membership expired");
                return;
            }

            const days = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );

            const hours = Math.floor(
                (difference / (1000 * 60 * 60)) % 24
            );

            const minutes = Math.floor(
                (difference / (1000 * 60)) % 60
            );

            const seconds = Math.floor(
                (difference / 1000) % 60
            );

            setTimeLeft(
                `${days}d ${hours}h ${minutes}m ${seconds}s`
            );
        }

        calculateTimeLeft();

        const timer = setInterval(
            calculateTimeLeft,
            1000
        );

        return () => clearInterval(timer);

    }, [endDate]);

    return (
        <div className="rounded-lg border bg-gray-50 p-4">

            <p className="text-sm text-gray-500">
                Membership expires in
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-600">
                {timeLeft}
            </p>

        </div>
    );
}