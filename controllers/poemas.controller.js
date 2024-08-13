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

const destroy = (req, res) => {
  const { id } = req.params;
  console.log(id);
  sql = "DELETE FROM `poemas` WHERE poemas.id_poema = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        error:
          "Posiblemente este intentando borrar un poema que esta siendo utilizado por un registro, intente más tarde",
      });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: "No existe el poema" });
    }

    res.json({ mensaje: "Poema eliminado" });
  });
};

module.exports = {
  index,
  show,
  //   update,
  //   store,
  destroy,
};
