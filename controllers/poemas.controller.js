const db = require("../db/db");

const index = (req, res) => {
  const sql = "SELECT * FROM poemas";
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Try later" });
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM poemas WHERE id_poema = ?";
  db.query(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el poema" });
    }

    res.json(rows[0]);
  });
};

module.exports = {
  index,
  show,
  //   update,
  //   store,
  //   destroy,
};
