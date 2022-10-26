//express
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

/* Connecting to the database. */
connectDB();

/* Telling the server to use the routes in the productApi and userApi files. */
app.use(express.json({ extended: false }));
app.use("/api/products", require("./routes/productApi"));
app.use("/api/users", require("./routes/userApi"));

app.get('/', (req, res) => {res.send('Hello World!')});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

