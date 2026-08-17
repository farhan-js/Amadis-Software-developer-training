import { FastifyInstance } from "fastify";
import {
    registerUser,
    loginUser
} from "../services/authService";

export default async function authRoutes(
    fastify: FastifyInstance
) {

    // =========================
    // REGISTER
    // POST /api/auth/register
    // =========================

    fastify.post("/register", async (request, reply) => {

        try {

            const {
                name,
                email,
                password
            } = request.body as {
                name: string;
                email: string;
                password: string;
            };

            const user = await registerUser({
                name,
                email,
                password
            });

            return reply.code(201).send({
                message: "Registration successful",
                user
            });

        } catch (error) {

            return reply.code(400).send({
                message: (error as Error).message
            });
        }
    });


    // =========================
    // LOGIN
    // POST /api/auth/login
    // =========================

    fastify.post("/login", async (request, reply) => {

        try {

            const {
                email,
                password
            } = request.body as {
                email: string;
                password: string;
            };

            const user = await loginUser(
                email,
                password
            );

            // Create JWT token
            const token = fastify.jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role
            });

            return reply.send({
                message: "Login successful",

                token,

                user
            });

        } catch (error) {

            return reply.code(401).send({
                message: (error as Error).message
            });
        }
    });


    // =========================
    // CURRENT USER
    // GET /api/auth/me
    // =========================

    fastify.get(
        "/me",
        {
            preHandler: [
                fastify.authenticate
            ]
        },

        async (request, reply) => {

            return reply.send({
                user: request.user
            });
        }
    );
}