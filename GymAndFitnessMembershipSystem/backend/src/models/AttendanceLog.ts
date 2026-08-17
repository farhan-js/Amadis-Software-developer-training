import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class AttendanceLog extends Model {
    declare id: number;
    declare memberId: number;
    declare trainerId: number;
    declare checkIn: Date;
    declare checkOut: Date | null;
    declare sessionType: string;
    declare notes: string | null;
}

AttendanceLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        memberId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        trainerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        checkIn: {
            type: DataTypes.DATE,
            allowNull: false
        },

        checkOut: {
            type: DataTypes.DATE,
            allowNull: true
        },

        sessionType: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize: sequelize,
        tableName: "attendance_logs",
        timestamps: true
    }
);

export default AttendanceLog;