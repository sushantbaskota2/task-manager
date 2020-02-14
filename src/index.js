const express = require('express');
require('./db/mongoose');
const User = require('./db/models/user');
const Tasks = require('./db/models/task');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const apiKey = '85522fd6b4c44f5cbb9eea5122929c6b';
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ', port);
});
