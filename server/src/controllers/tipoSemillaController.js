const connection = require("../models/db");

module.exports.getTipoSemilla= (req, res) => {
    
    const consult = `SELECT * FROM TIPO_SEMILLA`
  
    try {
      connection.query(consult, (err, results) => {
        if(err){
            res.status(500).json(err)
        }
        console.log(results);
        res.status(200).json(results);
      });
    } catch (e) {
      console.log(e);
    }
  };