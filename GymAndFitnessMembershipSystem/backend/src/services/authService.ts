import bcrypt from "bcrypt";
import Member from "../models/Member";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    role?: "member" | "trainer" | "admin";
}


// REGISTER
export async function registerUser(data: RegisterData) {

    const { name, email, password, role } = data;

    // Check if email already exists
    const existingMember = await Member.findOne({
        where: {
            email
        }
    });

    if (existingMember) {
        throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create member
    const member = await Member.create({
        name,
        email,
        password: hashedPassword,
        role: role || "member"
    });

    return {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role
    };
}


// LOGIN
export async function loginUser(
    email: string,
    password: string
) {

    // Find user
    const member = await Member.findOne({
        where: {
            email
        }
    });

    if (!member) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
        password,
        member.password
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    return {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role
    };
}