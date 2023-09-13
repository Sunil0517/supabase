const express = require('express');
const server = express();
server.use(express.json());


server.get('/', (req, res) => {
  res.send('Hello World!');
})




server.listen(3000, () => {
    console.log('server started');
})
