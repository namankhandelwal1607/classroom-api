import mongoose from "mongoose";

async function main(){
    try{
        await mongoose.connect(`${process.env.DATABASE_URL}`);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("Connected to DB");
        })

        connection.off('error', (error)=>{
            console.log("Connection Failed", error);
        })
    }catch(err){
        console.log("Database connection failed", err);
    }
}

export {main};