const http = require('http');

const app = require('./app');

const cors = require('cors');

const PORT = process.env.PORT || 3000

app.use(cors())
const server = http.createServer(app)

const initialFunctions = require("./src/config/initialFunctions");

server.listen(PORT, () => {
    console.log('Server is running: 3000');
    initialFunctions

})