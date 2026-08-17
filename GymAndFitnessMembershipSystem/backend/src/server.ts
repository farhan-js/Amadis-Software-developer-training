import dotenv from "dotenv";

dotenv.config();

import app from "./app";

import sequelize from "./database";

import Member from "./models/Member";
import MembershipPlan from "./models/MembershipPlan";
import Subscription from "./models/Subscription";
import AttendanceLog from "./models/AttendanceLog";

import {
    startSubscriptionJob
} from "./jobs/subscriptionJob";


// ==========================================
// MEMBER - SUBSCRIPTION
// ==========================================

Member.hasMany(
    Subscription,
    {
        foreignKey: "memberId"
    }
);


Subscription.belongsTo(
    Member,
    {
        foreignKey: "memberId"
    }
);


// ==========================================
// MEMBERSHIP PLAN - SUBSCRIPTION
// ==========================================

MembershipPlan.hasMany(
    Subscription,
    {
        foreignKey: "planId"
    }
);


Subscription.belongsTo(
    MembershipPlan,
    {
        foreignKey: "planId"
    }
);


// ==========================================
// MEMBER - ATTENDANCE
// ==========================================

Member.hasMany(
    AttendanceLog,
    {
        foreignKey: "memberId",
        as: "attendance"
    }
);


AttendanceLog.belongsTo(
    Member,
    {
        foreignKey: "memberId",
        as: "member"
    }
);


// ==========================================
// TRAINER - ATTENDANCE
// ==========================================

Member.hasMany(
    AttendanceLog,
    {
        foreignKey: "trainerId",
        as: "trainerSessions"
    }
);


AttendanceLog.belongsTo(
    Member,
    {
        foreignKey: "trainerId",
        as: "trainer"
    }
);


// ==========================================
// START SERVER
// ==========================================

async function startServer() {

    try {

        await sequelize.authenticate();

        console.log(
            "PostgreSQL connected successfully"
        );


        await sequelize.sync({
            alter: true
        });

        console.log(
            "All tables created successfully"
        );


        startSubscriptionJob();


        await app.listen({

            port: Number(
                process.env.PORT || 3000
            ),

            host: "0.0.0.0"

        });


        console.log(
            "Server running on http://localhost:3000"
        );

    } catch (error) {

        console.error(
            "Unable to start server:",
            error
        );

        process.exit(1);
    }
}


startServer();