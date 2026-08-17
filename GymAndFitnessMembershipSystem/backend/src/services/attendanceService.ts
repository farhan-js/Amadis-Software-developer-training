import { Op } from "sequelize";

import AttendanceLog from "../models/AttendanceLog";
import Member from "../models/Member";
import Subscription from "../models/Subscription";


// CHECK-IN
export async function checkInMember(
    trainerId: number,
    memberId: number,
    sessionType: string,
    notes?: string
) {

    // Check member exists
    const member =
        await Member.findByPk(memberId);

    if (!member) {
        throw new Error(
            "Member not found"
        );
    }


    // Check active membership
    const activeSubscription =
        await Subscription.findOne({

            where: {

                memberId,

                status: "active",

                endDate: {
                    [Op.gt]: new Date()
                }
            }
        });


    if (!activeSubscription) {

        throw new Error(
            "Member does not have an active membership"
        );
    }


    const now = new Date();


    // Start of today
    const startOfDay = new Date(now);

    startOfDay.setHours(
        0,
        0,
        0,
        0
    );


    // End of today
    const endOfDay = new Date(now);

    endOfDay.setHours(
        23,
        59,
        59,
        999
    );


    // Check duplicate attendance
    const existingAttendance =
        await AttendanceLog.findOne({

            where: {

                memberId,

                checkIn: {
                    [Op.between]: [
                        startOfDay,
                        endOfDay
                    ]
                }
            }
        });


    if (existingAttendance) {

        throw new Error(
            "Attendance already marked today"
        );
    }


    // Create attendance
    const attendance =
        await AttendanceLog.create({

            memberId,

            trainerId,

            checkIn: now,

            checkOut: null,

            sessionType,

            notes: notes || null
        });


    return attendance;
}


// CHECK-OUT
export async function checkOutMember(
    attendanceId: number,
    trainerId: number
) {

    const attendance =
        await AttendanceLog.findOne({

            where: {

                id: attendanceId,

                trainerId
            }
        });


    if (!attendance) {

        throw new Error(
            "Attendance record not found"
        );
    }


    if (attendance.checkOut) {

        throw new Error(
            "Member already checked out"
        );
    }


    await attendance.update({

        checkOut: new Date()
    });


    return attendance;
}


// GET TRAINER ATTENDANCE
export async function getTrainerAttendance(
    trainerId: number
) {

    const attendance =
        await AttendanceLog.findAll({

            where: {
                trainerId
            },

            include: [
                {
                    model: Member,

                    as: "member",

                    attributes: [
                        "id",
                        "name",
                        "email"
                    ]
                }
            ],

            order: [
                ["checkIn", "DESC"]
            ]
        });


    return attendance;
}


// GET MEMBER ATTENDANCE
export async function getMemberAttendance(
    memberId: number
) {

    const attendance =
        await AttendanceLog.findAll({

            where: {
                memberId
            },

            include: [
                {
                    model: Member,

                    as: "trainer",

                    attributes: [
                        "id",
                        "name"
                    ]
                }
            ],

            order: [
                ["checkIn", "DESC"]
            ]
        });


    return attendance;
}