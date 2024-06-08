const cors = require('@koa/cors');
// const KoaRouter = require('@koa/router');
const KoaRouter = require('koa-router');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { koaBody } = require('koa-body');
const fs = require('fs');
require('dotenv').config(); 


// app
const app = new koa();
const router = KoaRouter();

mongoose.connect(process.env.DATABASE).then(() => console.log('DB connected'));

// middlewares

// app.use(morgan("dev"));
app.use(json())
app.use(bodyParser());
app.use(cors())
app.use(koaBody());


//cors

// app.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError'){
//         res.status(401).json({
//             error: "Unauthorized!"
//         });
//     }
// });


router.get('/', async (ctx, next) => {
    try {
        const data = fs.readFileSync('apiDocs/docs.json');
        let docs = JSON.parse(data);
        ctx.body = docs;
        ctx.response.status = 200;
        ctx.response.message= ctx.body;
    }catch(err){
        console.log(err);
    }
    
})

app.use(router.routes());
app.use(router.allowedMethods());


// handle port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})