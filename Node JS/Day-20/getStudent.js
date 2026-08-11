const { Student, Department } = require("./models/associations");

async function getStudent() {
    try {
        const students = await Student.findAll({
            include: {
                model: Department,
                attributes: ["name"]

            }
        });

        console.log(JSON.stringify(students, null, 2));
    } catch (error) {
        console.log(error.message);
    }
}

getStudent();