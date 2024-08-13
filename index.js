const express = require("express");
const router = express.Router();
const app = express();
require("dotenv").config();
app.use(express.static("public"));

const cors = require("cors");

// Habilitar CORS para todas las rutas
app.use(cors());

app.use(express.json());

app.use("/poemas", require("./routes/poemas.router"));

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = router;
