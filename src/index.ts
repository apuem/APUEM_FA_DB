import bodyParser from "body-parser";
import express from "express";
var cors = require('cors');
import pg from "pg";

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  preflightContinue: true
}

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(cors());

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * from a_data");
  res.send(`Please provide additional data to access the database.`);
});

app.get("/:row/name", async (req, res) => {
  const { rows } = await pool.query("SELECT * from a_data");
  res.send(`${rows[parseInt(req.params.row)].name}`);
  });

app.get("/:row/url", async (req, res) => {
  const { rows } = await pool.query("SELECT * from a_data");
  res.send(`${rows[parseInt(req.params.row)].url}`);
  });

app.get("/ubn/:name", cors(corsOptions), async (req, res) => { // UBN = Url By Name
  const { rows } = await pool.query("SELECT * from a_data WHERE name=$1", [req.params.name]);
  res.json(`${rows[0].url}`);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
