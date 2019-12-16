import express from "express";
import bodyParser from "body-parser";

import path from "path";
import cors from "cors";
import * as jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
//mysql
import mysql from "mysql";
import { ShredderTokenData, TokenNames, tokenSecret } from "./projections";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "shrederdb"
});

connection.connect();
connection.query("select iduser from user", (error: mysql.MysqlError, results, fields) => {});

// Controllers (route handlers)
import * as LoginController from "./controllers/loginController";

// Create Express server
const app = express();

//cors
app.use(cors());
app.use(cookieParser());

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.use(bodyParser.json());

app.use(express.static("public/build/", { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.post("/login", LoginController.login);

app.get("/authenticated", (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'application/json');

  const cookie:ShredderTokenData = req.cookies;
  console.log('blaaaaa', req.cookies);
  if (cookie) {
    jwt.verify(cookie[TokenNames.name], tokenSecret, (error, debug) => {
      console.log('debug', debug);
      if(error){
          res.send(401).send("Not authorized");
      }
      res.status(200).send('some');
    }
    )

    res.status(200).send({
      message: "Authorized"
    });
  } else {
    res.status(401).send("Not authorized");
  }
});

export default app;
