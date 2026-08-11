const { Student } = require("./models/associations");

async function insertStudent() {
    try {
        const student = await Student.create({
            name: "Farhan",
            department_id: 1
        });

        console.log(student.toJSON());
    } catch (error) {
        console.log(error.message);
    }
}

insertStudent();