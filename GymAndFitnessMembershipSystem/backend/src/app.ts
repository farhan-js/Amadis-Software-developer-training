import Fastify, {
    FastifyReply,
    FastifyRequest
} from "fastify";

import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import authRoutes from "./routes/authRoutes";
import planRoutes from "./routes/planRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";


const app = Fastify({
    logger: true
});


// ==========================================
// CORS
// ==========================================

app.register(cors, {

    origin: "http://localhost:5173",

    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
});


// ==========================================
// JWT
// ==========================================

app.register(jwt, {
    secret:
        process.env.JWT_SECRET ||
        "default_secret_key"
});


// ==========================================
// AUTHENTICATE
// ==========================================

app.decorate(
    "authenticate",

    async function (
        request: FastifyRequest,
        reply: FastifyReply
    ) {

        try {

            await request.jwtVerify();

        } catch (error) {

            return reply.code(401).send({
                message:
                    "Unauthorized. Invalid or missing token."
            });
        }
    }
);


// ==========================================
// AUTHORIZE
// ==========================================

app.decorate(
    "authorize",

    function (
        requiredRole:
            "member" |
            "trainer" |
            "admin"
    ) {

        return async function (
            request: FastifyRequest,
            reply: FastifyReply
        ) {

            const user =
                request.user as {
                    id: number;
                    email: string;
                    role:
                        "member" |
                        "trainer" |
                        "admin";
                };


            // No authenticated user
            if (!user) {

                return reply.code(401).send({
                    message:
                        "Unauthorized"
                });
            }


            // Wrong role
            if (user.role !== requiredRole) {

                return reply.code(403).send({
                    message:
                        "Access denied"
                });
            }
        };
    }
);


// ==========================================
// AUTH ROUTES
// ==========================================

app.register(
    authRoutes,
    {
        prefix: "/api/auth"
    }
);


// ==========================================
// PLAN ROUTES
// ==========================================

app.register(
    planRoutes,
    {
        prefix: "/api/plans"
    }
);


// ==========================================
// SUBSCRIPTION ROUTES
// ==========================================

app.register(
    subscriptionRoutes,
    {
        prefix: "/api/subscriptions"
    }
);


// ==========================================
// ATTENDANCE ROUTES
// ==========================================

app.register(
    attendanceRoutes,
    {
        prefix: "/api/attendance"
    }
);


// ==========================================
// TEST ROUTE
// ==========================================

app.get(
    "/",
    async () => {

        return {
            message:
                "Gym & Fitness Membership API is running"
        };
    }
);


export default app;