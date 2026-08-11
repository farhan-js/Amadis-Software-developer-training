const sequelize = require("./config/database");

require("./models/associations");

async function syncDatabase() {
    try {
        await sequelize.sync();

        console.log("Tables created successfully");
    } catch (error) {
        console.log("Error creating tables");
        console.log(error.message);
    }
}

syncDatabase();