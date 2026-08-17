import "@fastify/jwt";
import "fastify";

import {
    FastifyReply,
    FastifyRequest
} from "fastify";


declare module "@fastify/jwt" {

    interface FastifyJWT {

        payload: {
            id: number;
            email: string;
            role: "member" | "trainer" | "admin";
        };

        user: {
            id: number;
            email: string;
            role: "member" | "trainer" | "admin";
        };
    }
}


declare module "fastify" {

    interface FastifyInstance {

        authenticate: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>;

        authorize: (
            role: "member" | "trainer" | "admin"
        ) => (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>;
    }
}