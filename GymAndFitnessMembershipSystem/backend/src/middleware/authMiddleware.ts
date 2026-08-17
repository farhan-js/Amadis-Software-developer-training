import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

interface JwtPayload {
    id: number;
    email: string;
    role: "member" | "trainer" | "admin";
}

export default async function authMiddleware(
    fastify: FastifyInstance
) {

    fastify.decorate(
        "authenticate",
        async function (
            request: FastifyRequest,
            reply: FastifyReply
        ) {

            try {

                await request.jwtVerify();

            } catch (error) {

                return reply.code(401).send({
                    message: "Unauthorized. Invalid or missing token."
                });
            }
        }
    );


    fastify.decorate(
        "authorize",
        function (
            requiredRole: "member" | "trainer" | "admin"
        ) {

            return async function (
                request: FastifyRequest,
                reply: FastifyReply
            ) {

                const user =
                    request.user as JwtPayload;


                if (!user) {

                    return reply.code(401).send({
                        message: "Unauthorized"
                    });
                }


                if (user.role !== requiredRole) {

                    return reply.code(403).send({
                        message: "Access denied"
                    });
                }
            };
        }
    );
}