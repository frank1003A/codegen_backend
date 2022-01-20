import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import joi from 'joi'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import customerRoutes from './routes/customerRoutes.js'
import itemRoutes from './routes/itemRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.MONGOOSE_CONNECTION_URL;

//middlewares
app.use(bodyparser.json({limit:'30mb', extended: true }))
app.use(bodyparser.urlencoded({limit:'30mb', extended: true }))
app.use(cors())
app.use(express.static("uploads"))

//database connection => mongoDB 
// Connect MongoDB at default port 27017.
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser:true, 
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to database'))
.catch((err) => console.log('Error in DB connection: ' + err.message));

//routes prefix 
app.use('/codegen', customerRoutes, itemRoutes);

//start server
app.listen(PORT, () => console.log(`Server running at http://localhost: ${PORT}`))

