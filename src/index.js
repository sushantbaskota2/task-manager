const express = require('express');
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     }
//     console.log(req.method, req.path);
//     next();
// });

// app.use((req, res, next) => {
//     if (req) {
//         res.status(503).send('Site under maintainence');
//     }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const jwt = require('jsonwebtoken');

app.listen(port, () => {
    console.log('Server is up on port ', port);
});
