const Student = require("./Student");
const Department = require("./Department");

Student.belongsTo(Department, {
    foreignKey: "department_id"
});

Department.hasMany(Student, {  
    foreignKey: "department_id"
});

module.exports = {
    Student,
    Department
};