const express = require("express");
const config = require("./configs/config.json");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");
const User = require("./models/User")
const axios = require("axios")

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

User.findAll().then(result => {
	if(!result || !result[0]){
		axios.post("/new", {
			year : "0",
			month : "0",
			day : "0",
			firstName : "Developer",
			lastName : "lastName",
			userRank : "توسعه دهنده",
			dutyHours : 0,
			dutyMinutes : 0
		}).then(() => {
			console.log(`Defualt admin user added 'As Developer'`)
		})
	}
})

app.listen(config.app.port, () => {
  console.log(`Server is running on ${config.app.port}`);
});
