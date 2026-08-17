import MembershipPlan from "../models/MembershipPlan";


// GET ALL PLANS
export async function getAllPlans() {

    const plans = await MembershipPlan.findAll({
        order: [["price", "ASC"]]
    });

    return plans;
}


// GET ONE PLAN
export async function getPlanById(id: number) {

    const plan = await MembershipPlan.findByPk(id);

    if (!plan) {
        throw new Error("Membership plan not found");
    }

    return plan;
}


// CREATE PLAN
export async function createPlan(data: {
    name: string;
    description?: string;
    price: number;
    duration: number;
}) {

    const plan = await MembershipPlan.create({
        name: data.name,
        description: data.description || null,
        price: data.price,
        duration: data.duration
    });

    return plan;
}


// UPDATE PLAN
export async function updatePlan(
    id: number,
    data: {
        name?: string;
        description?: string;
        price?: number;
        duration?: number;
    }
) {

    const plan = await MembershipPlan.findByPk(id);

    if (!plan) {
        throw new Error("Membership plan not found");
    }

    await plan.update(data);

    return plan;
}


// DELETE PLAN
export async function deletePlan(id: number) {

    const plan = await MembershipPlan.findByPk(id);

    if (!plan) {
        throw new Error("Membership plan not found");
    }

    await plan.destroy();

    return {
        message: "Membership plan deleted successfully"
    };
}