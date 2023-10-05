const mongoose = require("mongoose");
// require("dotenv").config();
const mongoURL = "mongodb+srv://yashmita:yashmita_123@clusteriac.ji28ozk.mongodb.net/?retryWrites=true&w=majority";

// const mongoURL = process.env.mongo_URL

// const connectToMongo = async()=>{
//     mongoose.connect(mongoURL, {
//         useNewUrlParser: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     },() => {
//         console.log('connection with mongoDb established');
//     })
// } 

const connectToMongo = async () => {
    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })

        .then(() => console.log('Connected Successfully'))

        .catch((err) => { console.error({err}); });

}

module.exports = connectToMongo;