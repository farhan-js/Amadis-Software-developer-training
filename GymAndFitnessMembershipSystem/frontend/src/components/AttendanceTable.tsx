import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

interface Attendance {
    id: number;
    memberId: number;
    trainerId: number;
    checkIn: string;
    checkOut?: string | null;
    sessionType: string;
    notes?: string | null;
}

interface AttendanceTableProps {
    attendance: Attendance[];
    showMember?: boolean;
}

export default function AttendanceTable({
    attendance,
    showMember = false
}: AttendanceTableProps) {

    if (attendance.length === 0) {

        return (
            <div className="rounded-lg border p-8 text-center text-gray-500">
                No attendance records found.
            </div>
        );
    }

    return (
        <div className="rounded-lg border">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>
                            Date
                        </TableHead>

                        {showMember && (
                            <TableHead>
                                Member ID
                            </TableHead>
                        )}

                        <TableHead>
                            Session
                        </TableHead>

                        <TableHead>
                            Check In
                        </TableHead>

                        <TableHead>
                            Check Out
                        </TableHead>

                        <TableHead>
                            Status
                        </TableHead>

                        <TableHead>
                            Notes
                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {attendance.map((item) => {

                        const checkInDate =
                            new Date(item.checkIn);

                        const checkOutDate =
                            item.checkOut
                                ? new Date(item.checkOut)
                                : null;

                        return (
                            <TableRow key={item.id}>

                                <TableCell>
                                    {checkInDate.toLocaleDateString()}
                                </TableCell>

                                {showMember && (
                                    <TableCell>
                                        {item.memberId}
                                    </TableCell>
                                )}

                                <TableCell>
                                    {item.sessionType}
                                </TableCell>

                                <TableCell>
                                    {checkInDate.toLocaleTimeString()}
                                </TableCell>

                                <TableCell>
                                    {checkOutDate
                                        ? checkOutDate.toLocaleTimeString()
                                        : "-"}
                                </TableCell>

                                <TableCell>

                                    {item.checkOut ? (
                                        <Badge variant="secondary">
                                            Completed
                                        </Badge>
                                    ) : (
                                        <Badge>
                                            Checked In
                                        </Badge>
                                    )}

                                </TableCell>

                                <TableCell>
                                    {item.notes || "-"}
                                </TableCell>

                            </TableRow>
                        );

                    })}

                </TableBody>

            </Table>

        </div>
    );
}