import cron from "node-cron";
import nodemailer from "nodemailer";
import { Op } from "sequelize";

import Subscription from "../models/Subscription";
import Member from "../models/Member";


const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


async function sendExpiryReminder(
    email: string,
    name: string,
    endDate: Date
) {

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Gym Membership Expiring Soon",

        text: `
Hello ${name},

Your gym membership will expire on ${endDate.toDateString()}.

Please renew your membership to continue using the gym.

Thank you.
        `
    });
}


export function startSubscriptionJob() {

    cron.schedule(
        "0 9 * * *",

        async () => {

            console.log(
                "Running subscription job..."
            );

            try {

                const now = new Date();


                // Expire memberships whose end date has passed

                await Subscription.update(

                    {
                        status: "expired"
                    },

                    {
                        where: {

                            status: "active",

                            endDate: {
                                [Op.lt]: now
                            }
                        }
                    }
                );


                console.log(
                    "Expired subscriptions updated."
                );


                // Find memberships expiring within 3 days

                const threeDaysLater =
                    new Date();

                threeDaysLater.setDate(
                    threeDaysLater.getDate() + 3
                );


                const subscriptions =
                    await Subscription.findAll({

                        where: {

                            status: "active",

                            reminderSent: false,

                            endDate: {
                                [Op.between]: [
                                    now,
                                    threeDaysLater
                                ]
                            }
                        },

                        include: [
                            {
                                model: Member,

                                attributes: [
                                    "id",
                                    "name",
                                    "email"
                                ]
                            }
                        ]
                    });


                for (
                    const subscription
                    of subscriptions
                ) {

                    const member =
                        (subscription as any).Member;


                    if (!member) {
                        continue;
                    }


                    try {

                        await sendExpiryReminder(

                            member.email,

                            member.name,

                            subscription.endDate
                        );


                        await subscription.update({

                            reminderSent: true

                        });


                        console.log(
                            `Reminder sent to ${member.email}`
                        );

                    } catch (emailError) {

                        console.error(
                            "Failed to send email:",
                            emailError
                        );
                    }
                }


                console.log(
                    "Subscription job completed."
                );

            } catch (error) {

                console.error(
                    "Subscription job error:",
                    error
                );
            }
        }
    );


    console.log(
        "Subscription job started."
    );
}