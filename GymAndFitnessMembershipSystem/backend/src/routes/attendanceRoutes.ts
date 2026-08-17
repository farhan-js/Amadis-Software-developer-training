import { FastifyInstance } from "fastify";

import {
    checkInMember,
    checkOutMember,
    getTrainerAttendance,
    getMemberAttendance
} from "../services/attendanceService";


export default async function attendanceRoutes(
    fastify: FastifyInstance
) {

    // =========================
    // CHECK-IN MEMBER
    // POST /api/attendance/check-in
    // TRAINER ONLY
    // =========================

    fastify.post(
        "/check-in",

        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("trainer")
            ]
        },

        async (request, reply) => {

            try {

                const trainerId =
                    request.user.id;

                const {
                    memberId,
                    sessionType,
                    notes
                } = request.body as {
                    memberId: number;
                    sessionType: string;
                    notes?: string;
                };


                const attendance =
                    await checkInMember(
                        trainerId,
                        Number(memberId),
                        sessionType,
                        notes
                    );


                return reply.code(201).send({

                    message:
                        "Attendance checked in successfully",

                    attendance
                });

            } catch (error) {

                return reply.code(400).send({

                    message:
                        (error as Error).message
                });
            }
        }
    );


    // =========================
    // CHECK-OUT MEMBER
    // PUT /api/attendance/:id/check-out
    // TRAINER ONLY
    // =========================

    fastify.put(
        "/:id/check-out",

        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("trainer")
            ]
        },

        async (request, reply) => {

            try {

                const trainerId =
                    request.user.id;

                const { id } =
                    request.params as {
                        id: string;
                    };


                const attendance =
                    await checkOutMember(
                        Number(id),
                        trainerId
                    );


                return reply.send({

                    message:
                        "Member checked out successfully",

                    attendance
                });

            } catch (error) {

                return reply.code(400).send({

                    message:
                        (error as Error).message
                });
            }
        }
    );


    // =========================
    // TRAINER ATTENDANCE
    // GET /api/attendance/trainer
    // TRAINER ONLY
    // =========================

    fastify.get(
        "/trainer",

        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("trainer")
            ]
        },

        async (request, reply) => {

            try {

                const trainerId =
                    request.user.id;

                const attendance =
                    await getTrainerAttendance(
                        trainerId
                    );

                return reply.send({
                    attendance
                });

            } catch (error) {

                return reply.code(500).send({

                    message:
                        "Failed to fetch attendance"
                });
            }
        }
    );


    // =========================
    // MEMBER ATTENDANCE
    // GET /api/attendance/member
    // MEMBER ONLY
    // =========================

    fastify.get(
        "/member",

        {
            preHandler: [
                fastify.authenticate,
                fastify.authorize("member")
            ]
        },

        async (request, reply) => {

            try {

                const memberId =
                    request.user.id;

                const attendance =
                    await getMemberAttendance(
                        memberId
                    );

                return reply.send({
                    attendance
                });

            } catch (error) {

                return reply.code(500).send({

                    message:
                        "Failed to fetch attendance"
                });
            }
        }
    );
}