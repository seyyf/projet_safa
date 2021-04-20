const mongoose = require('mongoose');
require('dotenv').config();


// mongoose.connect("mongodb://localhost:27017/e-commerces",
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }, () =>
//     console.log('connected to DB!')
// )


//connect to db
mongoose.connect("mongodb+srv://e-commerces:1234@e-commerce.n66k2.mongodb.net/e-commerces", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("DB connected establised"))
.catch(err => console.log("DB connection error: ", err));