import mongoose from "mongoose";

const connect = () => {
    
    mongoose.connect(process.env.DATABASE!).then(() => {
        console.log("Database Connected.")
    }).catch(err => {
        console.log("Error connecting to database: ", err);
    })
}


export default connect