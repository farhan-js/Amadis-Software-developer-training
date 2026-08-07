import Fastify from "fastify";
import jwt from "@fastify/jwt";

const fastify = Fastify({
  logger: true,
});

// ------------------------------
// Register JWT
// ------------------------------

await fastify.register(jwt, {
  secret: "mySecretKey",
});

// ------------------------------
// Sample Data
// ------------------------------

let students = [
  {
    id: 1,
    name: "Farhan",
    department: "IT",
  },
];

// ------------------------------
// Hooks
// ------------------------------

// Runs first
fastify.addHook("onRequest", async (request, reply) => {
  console.log("========== onRequest ==========");
  console.log("Method :", request.method);
  console.log("URL    :", request.url);
});

// Runs before validation
fastify.addHook("preValidation", async (request, reply) => {
  console.log("========== preValidation ==========");

  if (request.body && !request.body.department) {
    request.body.department = "Unknown";
  }
});

// Runs before route handler
fastify.addHook("preHandler", async (request, reply) => {
  console.log("========== preHandler ==========");
});

// ------------------------------
// JWT Authentication Function
// ------------------------------

async function authenticate(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
}

// ------------------------------
// Login Route
// ------------------------------

fastify.post("/login", async (request, reply) => {
  const { username, password } = request.body;

  if (username === "admin" && password === "1234") {
    const token = fastify.jwt.sign({
      username,
    });

    return {
      success: true,
      token,
    };
  }

  reply.code(401).send({
    success: false,
    message: "Invalid Credentials",
  });
});

// ------------------------------
// Home
// ------------------------------

fastify.get("/", async () => {
  return {
    message: "Welcome to Fastify CRUD API",
  };
});

// ------------------------------
// GET All Students
// ------------------------------

fastify.get("/students", async () => {
  return students;
});

// ------------------------------
// GET Student By ID
// ------------------------------

fastify.get("/students/:id", async (request, reply) => {
  const { id } = request.params;

  const student = students.find((s) => s.id == id);

  if (!student) {
    return reply.code(404).send({
      message: "Student Not Found",
    });
  }

  return student;
});

// ------------------------------
// Query Example
// ------------------------------

fastify.get("/search", async (request) => {
  const { name } = request.query;

  return {
    searching: name,
  };
});

// ------------------------------
// Schema
// ------------------------------

const studentSchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
      },
      department: {
        type: "string",
      },
    },
  },
};

// ------------------------------
// POST Student
// ------------------------------

fastify.post(
  "/students",
  {
    schema: studentSchema,
  },
  async (request, reply) => {
    const student = {
      id: students.length + 1,
      ...request.body,
    };

    students.push(student);

    reply.code(201);

    return {
      message: "Student Added",
      data: student,
    };
  }
);

// ------------------------------
// PUT Student
// ------------------------------

fastify.put("/students/:id", async (request, reply) => {
  const { id } = request.params;

  const index = students.findIndex((s) => s.id == id);

  if (index === -1) {
    return reply.code(404).send({
      message: "Student Not Found",
    });
  }

  students[index] = {
    id: Number(id),
    ...request.body,
  };

  return {
    message: "Student Replaced",
    data: students[index],
  };
});

// ------------------------------
// PATCH Student
// ------------------------------

fastify.patch("/students/:id", async (request, reply) => {
  const { id } = request.params;

  const student = students.find((s) => s.id == id);

  if (!student) {
    return reply.code(404).send({
      message: "Student Not Found",
    });
  }

  Object.assign(student, request.body);

  return {
    message: "Student Updated",
    data: student,
  };
});

// ------------------------------
// DELETE Student
// ------------------------------

fastify.delete("/students/:id", async (request, reply) => {
  const { id } = request.params;

  const index = students.findIndex((s) => s.id == id);

  if (index === -1) {
    return reply.code(404).send({
      message: "Student Not Found",
    });
  }

  students.splice(index, 1);

  return {
    message: "Student Deleted",
  };
});

// ------------------------------
// Protected Route
// ------------------------------

fastify.get(
  "/profile",
  {
    preHandler: authenticate,
  },
  async () => {
    return {
      message: "Protected Route Accessed Successfully",
    };
  }
);

// ------------------------------
// Global Error Handler
// ------------------------------

fastify.setErrorHandler((error, request, reply) => {
  reply.code(400).send({
    success: false,
    message: error.message,
  });
});

// ------------------------------
// Start Server
// ------------------------------

fastify.listen(
  {
    port: 3000,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server Running at ${address}`);
  }
);