// const Fastify = require("fastify");

// const app = Fastify({
//   logger: true // Fixed: used colon instead of equals
// });

// // Register routes before starting the server
// app.get("/", async () => {
//   return { message: "Hello world" };
// });

// // Start the server using async/await
// const start = async () => {
//   try {
//     await app.listen({ port: 3000 });
//   } catch (err) {
//     app.log.error(err);
//     process.exit(1);
//   }
// };

// start();


// const fastify = require("fastify")();

// fastify.get("/", async (request, reply) => {
//     reply.type("text/plain");
//     return "Hello World";
// });

// fastify.listen({ port: 3000 });


// const fastify = require("fastify")();

// fastify.get("/", async (request, reply) => {
//     return { message: "Hello World" };
// });

// fastify.listen({ port: 3000 }, (err) => {
//     if (err) {
//         console.error(err);
//         process.exit(1);
//     }
//     console.log("Server is running on http://localhost:3000");
// });



const fastify =require("fastify")();

fastify.get("/",async(request,reply)=>{
    return {message: "Hello World"};
});

fastify.get("/hello",async(req,res)=>{
    return{
        message="Hello Fastify"
    };
});
fastify.post("/student", async (request, reply) => {

    const body = request.body;

    return {
        message: "Student Created",
        data: body
    };
});

fastify.get("/student", async (request, reply) => {

    const id = request.query.id;
    const name = request.query.name;

    return {
        id: id,
        name: name
    };

});
fastify.listen({port:3000},(err)=>{
    if(err){
        console.log(err);
        process.exit(1);
    }
});