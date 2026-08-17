import { FastifyInstance } from "fastify";

import {
    subscribe,
    renewMembership,
    getMySubscription,
    getAllSubscriptions
} from "../services/subscriptionService";


export default async function subscriptionRoutes(
    fastify: FastifyInstance
) {

    // =========================
    // GET MY SUBSCRIPTION
    // GET /api/subscriptions/my
    // MEMBER ONLY
    // =========================

    fastify.get(
        "/my",

        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("member")
            ]
        },

        async (request, reply) => {

            try {

                const user = request.user;

                const subscription =
                    await getMySubscription(
                        user.id
                    );

                return reply.send({
                    subscription
                });

            } catch (error) {

                return reply.code(500).send({
                    message: (error as Error).message
                });
            }
        }
    );


    // =========================
    // SUBSCRIBE
    // POST /api/subscriptions/subscribe
    // MEMBER ONLY
    // =========================

    fastify.post(
        "/subscribe",

        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("member")
            ]
        },

        async (request, reply) => {

            try {

                const user = request.user;

                const {
                    planId
                } = request.body as {
                    planId: number;
                };

                const subscription =
                    await subscribe(
                        user.id,
                        Number(planId)
                    );

                return reply.code(201).send({
                    message:
                        "Membership subscribed successfully",

                    subscription
                });

            } catch (error) {

                return reply.code(400).send({
                    message: (error as Error).message
                });
            }
        }
    );


    // =========================
    // RENEW
    // POST /api/subscriptions/renew
    // MEMBER ONLY
    // =========================

    fastify.post(
        "/renew",

        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("member")
            ]
        },

        async (request, reply) => {

            try {

                const user = request.user;

                const {
                    planId
                } = request.body as {
                    planId?: number;
                };

                const subscription =
                    await renewMembership(
                        user.id,
                        planId
                            ? Number(planId)
                            : undefined
                    );

                return reply.send({
                    message:
                        "Membership renewed successfully",

                    subscription
                });

            } catch (error) {

                return reply.code(400).send({
                    message: (error as Error).message
                });
            }
        }
    );


    // =========================
    // GET ALL SUBSCRIPTIONS
    // GET /api/subscriptions/all
    // ADMIN ONLY
    // =========================

    fastify.get(
        "/all",

        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("admin")
            ]
        },

        async (request, reply) => {

            try {

                const subscriptions =
                    await getAllSubscriptions();

                return reply.send({
                    subscriptions
                });

            } catch (error) {

                return reply.code(500).send({
                    message:
                        "Failed to fetch subscriptions"
                });
            }
        }
    );
}