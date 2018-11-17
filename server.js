
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models")
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// const routes = require("./controllers/theory_controller.js");

// app.use(routes);
require("./routes/html-routes.js")(app);
// require("./routes/author-routes.js")(app);



// Start our server so that it can begin listening to client requests.
db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function(){
        console.log("Sequelize sucks and we all know it; listening at: " + PORT)
    })
})
