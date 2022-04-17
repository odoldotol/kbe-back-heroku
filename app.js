require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwtMiddleware = require("./src/lib/jwtMiddleware");
// const checkLoggedIn = require("./src/lib/checkLoggedIn");

const express = require("express");
const app = express();

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("KBE Backend Server");
});

// 인증
app.post("/login", routes.login);
app.post("/walletAddr", routes.walletAddr);
// app.post("/logout", routes.logout);
// app.get("/accesstokenrequest", routes.accTokenReq);
// app.get("/refreshtokenrequest", routes.refTokenReq);

// 아이템
app.get("/items/collections/", routes.collections);
app.get("/items/nfts/:col_id", routes.nfts);
app.get("/items/marketlogs/:account", routes.marketlogs);
// app.post("/items/collections/create", routes.createCollection);
app.post("/items/nfts/mint/", routes.mint);

// 거래
app.patch("/transactions/buy/", routes.buy);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;

//// HTTPS 서버 주석

// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log("https server runnning!!"));

// } else {
server = app.listen(HTTPS_PORT);
console.log("http server runnning!!");
// }
module.exports = server;
