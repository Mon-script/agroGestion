const connection = require("../models/db");

module.exports.getRiego= (req, res) => {
    
    const consult = `SELECT * FROM RIEGO`
  
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