const express = require("express");
const config = require("./configs/config.json");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(flash());
app.use(cookieParser());
app.use(session({secret: config.app.secret}));
app.use(express.static(__dirname + "/public"));
app.use(morgan("combined"));
app.use(passport.initialize());
app.use(passport.session());

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

require("./helpers/passport")

const routes = require("./routes");
app.use("/", routes);

const adminRoutes = require("./routes/admin")
app.use("/admin", adminRoutes)

app.listen(config.app.port, () => {
  console.log(`Server is running on ${config.app.port}`);
});