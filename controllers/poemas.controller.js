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

function getFormattedDateTime() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const store = (req, res) => {
  const { nombrePoema, textoPoema, favorita } = req.body;

  const sql =
    "INSERT INTO poemas (nombre, poema, fecha, favorita) VALUES (?,?,?,?)";
  db.query(
    sql,
    [nombrePoema, textoPoema, getFormattedDateTime(), favorita],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Intente mas tarde" });
      }

      const poema = { ...req.body, id: result.insertId };

      res.status(201).json(poema);
    }
  );
};

const update = (req, res) => {
  const { id } = req.params;
  const { nombrePoema, textoPoema, favorita } = req.body;
  const fav = parseInt(favorita);

  const sql =
    "UPDATE poemas SET nombre =?, poema = ?, favorita = ?, fecha = ? WHERE id_poema = ?";
  db.query(
    sql,
    [nombrePoema, textoPoema, fav, getFormattedDateTime(), id],
    (error, result) => {
      console.log(error);
      if (error) {
        return res.status(500).json({ error: "Intente mas tarde" });
      }

      if (result.affectedRows == 0) {
        return res.status(404).send({ error: "No existe el poema" });
      }

      const poema = { ...req.body, ...req.params };

      res.json(poema);
    }
  );
};

module.exports = {
  index,
  show,
  update,
  store,
  destroy,
};
