import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

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

app.get("/test", async (req, res) => {
  const { rows } = await pool.query("SELECT * from a_data WHERE name='jk'");
  res.send(`${rows[parseInt(req.params.row)].url}`);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
