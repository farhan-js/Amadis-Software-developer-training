import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class MembershipPlan extends Model {
    declare id: number;
    declare name: string;
    declare description: string | null;
    declare price: number;
    declare duration: number;
}

MembershipPlan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: sequelize,
        tableName: "membership_plans",
        timestamps: true
    }
);

export default MembershipPlan;