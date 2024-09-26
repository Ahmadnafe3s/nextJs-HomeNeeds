import mongoose from "mongoose";

const connect = async () => {

    try {

        if (mongoose.connection.readyState === 1) {
            console.log("Database already connected");
            return
        }

        await mongoose.connect(process.env.DATABASE!)

        console.log("Connected to database");


    } catch (error) {

        console.log("Connection failed to database!");

    }

}


export default connect