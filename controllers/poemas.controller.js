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

module.exports = {
  index,
  //   show,
  //   update,
  //   store,
  //   destroy,
};
