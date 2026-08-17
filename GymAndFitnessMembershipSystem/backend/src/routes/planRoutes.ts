import { FastifyInstance } from "fastify";

import {
    getAllPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
} from "../services/planService";


export default async function planRoutes(
    fastify: FastifyInstance
) {

    // =========================
    // GET ALL PLANS
    // GET /api/plans
    // =========================

    fastify.get("/", async (request, reply) => {

        try {

            const plans = await getAllPlans();

            return reply.send(plans);

        } catch (error) {

            return reply.code(500).send({
                message: "Failed to fetch plans"
            });
        }
    });


    // =========================
    // GET ONE PLAN
    // GET /api/plans/:id
    // =========================

    fastify.get("/:id", async (request, reply) => {

        try {

            const { id } =
                request.params as {
                    id: string;
                };

            const plan =
                await getPlanById(Number(id));

            return reply.send(plan);

        } catch (error) {

            return reply.code(404).send({
                message: (error as Error).message
            });
        }
    });


    // =========================
    // CREATE PLAN
    // POST /api/plans
    // ADMIN ONLY
    // =========================

    fastify.post(
        "/",
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("admin")
            ]
        },

        async (request, reply) => {

            try {

                const {
                    name,
                    description,
                    price,
                    duration
                } = request.body as {
                    name: string;
                    description?: string;
                    price: number;
                    duration: number;
                };

                const plan =
                    await createPlan({
                        name,
                        description,
                        price,
                        duration
                    });

                return reply.code(201).send({
                    message: "Membership plan created successfully",
                    plan
                });

            } catch (error) {

                return reply.code(400).send({
                    message: (error as Error).message
                });
            }
        }
    );


    // =========================
    // UPDATE PLAN
    // PUT /api/plans/:id
    // ADMIN ONLY
    // =========================

    fastify.put(
        "/:id",
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("admin")
            ]
        },

        async (request, reply) => {

            try {

                const { id } =
                    request.params as {
                        id: string;
                    };

                const plan =
                    await updatePlan(
                        Number(id),
                        request.body as {
                            name?: string;
                            description?: string;
                            price?: number;
                            duration?: number;
                        }
                    );

                return reply.send({
                    message: "Membership plan updated successfully",
                    plan
                });

            } catch (error) {

                return reply.code(400).send({
                    message: (error as Error).message
                });
            }
        }
    );


    // =========================
    // DELETE PLAN
    // DELETE /api/plans/:id
    // ADMIN ONLY
    // =========================

    fastify.delete(
        "/:id",
        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("admin")
            ]
        },

        async (request, reply) => {

            try {

                const { id } =
                    request.params as {
                        id: string;
                    };

                const result =
                    await deletePlan(
                        Number(id)
                    );

                return reply.send(result);

            } catch (error) {

                return reply.code(400).send({
                    message: (error as Error).message
                });
            }
        }
    );
}