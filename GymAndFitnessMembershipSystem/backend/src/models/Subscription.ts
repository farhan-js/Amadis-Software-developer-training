import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Subscription extends Model {
    declare id: number;
    declare memberId: number;
    declare planId: number;
    declare startDate: Date;
    declare endDate: Date;
    declare status: "active" | "expired" | "cancelled";
    declare reminderSent: boolean;
}

Subscription.init(
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

        planId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                "active",
                "expired",
                "cancelled"
            ),
            allowNull: false,
            defaultValue: "active"
        },

        // Used by the expiry reminder job
        reminderSent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },

    {
        sequelize: sequelize,

        tableName: "subscriptions",

        timestamps: true
    }
);

export default Subscription;