import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlanCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    onSubscribe?: (planId: number) => void;
}

export default function PlanCard({
    id,
    name,
    description,
    price,
    duration,
    onSubscribe
}: PlanCardProps) {

    return (
        <Card className="w-full max-w-sm">

            <CardHeader>

                <CardTitle className="text-xl">
                    {name}
                </CardTitle>

                <CardDescription>
                    {description}
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="mb-4">
                    <span className="text-3xl font-bold">
                        ₹{price}
                    </span>
                </div>

                <p className="text-sm text-gray-600">
                    Duration: {duration} days
                </p>

            </CardContent>

            <CardFooter>

                <Button
                    className="w-full"
                    onClick={() => onSubscribe?.(id)}
                >
                    Subscribe
                </Button>

            </CardFooter>

        </Card>
    );
}