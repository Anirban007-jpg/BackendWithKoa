// server.js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const connectDB = require('./config/db.js');
const errorHandler = require('./middleware/errorHandler');

const app = new Koa();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser());
app.use(errorHandler);

// Routes
// app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});