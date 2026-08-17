import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Member extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: "member" | "trainer" | "admin";
}

Member.init(
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

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        role: {
            type: DataTypes.ENUM("member", "trainer", "admin"),
            allowNull: false,
            defaultValue: "member"
        }
    },
    {
        sequelize: sequelize,
        tableName: "members",
        timestamps: true
    }
);

export default Member;