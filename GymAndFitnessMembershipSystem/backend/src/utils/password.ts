import bcrypt from "bcrypt";


// Hash password before saving to database
export async function hashPassword(
    password: string
): Promise<string> {

    return await bcrypt.hash(password, 10);
}


// Compare login password with hashed password
export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {

    return await bcrypt.compare(
        password,
        hashedPassword
    );
}