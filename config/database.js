const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async (req, res) => {
    try {
        const dbUrl = process.env.DATABASE_URL;

        if (!dbUrl) {
            console.log("unable to find database Url");
            console.error("An error has been occured while obtaning database URL");
            process.exit(1);
        }

        await mongoose.connect(dbUrl, {});
        console.log("database connection successfull");
    } catch (err) {
        console.log("An error has been occured while connecting with database");
        console.error(err.message);
        process.exit(1);

    }

}

module.exports=dbConnect;