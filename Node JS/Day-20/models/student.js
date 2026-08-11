const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "students",
        timestamps: false
    }
);

module.exports = Student;