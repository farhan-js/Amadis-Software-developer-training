import { Op } from "sequelize";

import Subscription from "../models/Subscription";
import MembershipPlan from "../models/MembershipPlan";
import Member from "../models/Member";


// Helper function
function addDays(date: Date, days: number) {

    const result = new Date(date);

    result.setDate(
        result.getDate() + days
    );

    return result;
}


// SUBSCRIBE
export async function subscribe(
    memberId: number,
    planId: number
) {

    // Find plan
    const plan = await MembershipPlan.findByPk(planId);

    if (!plan) {
        throw new Error("Membership plan not found");
    }


    // Check if member already has active subscription
    const existingSubscription =
        await Subscription.findOne({
            where: {
                memberId,
                status: "active",
                endDate: {
                    [Op.gt]: new Date()
                }
            }
        });


    if (existingSubscription) {
        throw new Error(
            "You already have an active membership"
        );
    }


    // Start date
    const startDate = new Date();


    // Calculate expiry date
    const endDate = addDays(
        startDate,
        plan.duration
    );


    // Create subscription
    const subscription =
        await Subscription.create({

            memberId,

            planId,

            startDate,

            endDate,

            status: "active",

            reminderSent: false
        });


    return subscription;
}


// RENEW
export async function renewMembership(
    memberId: number,
    planId?: number
) {

    // Find existing subscription
    const existingSubscription =
        await Subscription.findOne({

            where: {
                memberId
            },

            order: [
                ["endDate", "DESC"]
            ]
        });


    let plan;


    // If user selected another plan
    if (planId) {

        plan =
            await MembershipPlan.findByPk(
                planId
            );

    }

    // Otherwise use existing plan
    else if (existingSubscription) {

        plan =
            await MembershipPlan.findByPk(
                existingSubscription.planId
            );
    }


    if (!plan) {
        throw new Error(
            "Membership plan not found"
        );
    }


    const now = new Date();


    let startDate: Date;


    // If current membership hasn't expired,
    // renewal starts after current expiry.
    if (
        existingSubscription &&
        existingSubscription.endDate > now
    ) {

        startDate =
            existingSubscription.endDate;

    }

    // If expired, start from today
    else {

        startDate = now;

    }


    const endDate = addDays(
        startDate,
        plan.duration
    );


    // Update existing subscription
    if (existingSubscription) {

        await existingSubscription.update({

            planId: plan.id,

            startDate:
                existingSubscription.startDate,

            endDate,

            status: "active",

            reminderSent: false
        });


        return existingSubscription;
    }


    // No previous subscription
    return Subscription.create({

        memberId,

        planId: plan.id,

        startDate,

        endDate,

        status: "active",

        reminderSent: false
    });
}


// GET MEMBER SUBSCRIPTION
export async function getMySubscription(
    memberId: number
) {

    const subscription =
        await Subscription.findOne({

            where: {
                memberId
            },

            include: [
                {
                    model: MembershipPlan,

                    attributes: [
                        "id",
                        "name",
                        "description",
                        "price",
                        "duration"
                    ]
                }
            ],

            order: [
                ["endDate", "DESC"]
            ]
        });


    return subscription;
}


// GET ALL SUBSCRIPTIONS
// Mainly for admin
export async function getAllSubscriptions() {

    const subscriptions =
        await Subscription.findAll({

            include: [
                {
                    model: Member,

                    attributes: [
                        "id",
                        "name",
                        "email",
                        "role"
                    ]
                },

                {
                    model: MembershipPlan,

                    attributes: [
                        "id",
                        "name",
                        "price",
                        "duration"
                    ]
                }
            ],

            order: [
                ["endDate", "DESC"]
            ]
        });


    return subscriptions;
}