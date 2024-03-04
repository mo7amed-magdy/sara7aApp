import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect('mongodb+srv://sara7aUser:8mluhqPuicRryJAe@cluster0.55oeadx.mongodb.net/sara7aApp').then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('databases error', err);
    })
}