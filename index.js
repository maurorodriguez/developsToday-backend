require("dotenv").config();
const server = require("./server/server");

const port = process.env.PORT || "3001";

server.listen(port, async () => {
    console.log(`Listening on ${port}`);
});