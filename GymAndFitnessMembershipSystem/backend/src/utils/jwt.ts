export type UserRole =
    | "member"
    | "trainer"
    | "admin";


export interface JwtPayload {

    id: number;

    email: string;

    role: UserRole;
}