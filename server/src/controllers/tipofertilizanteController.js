const connection = require("../models/db");

module.exports.getFerti= (req, res) => {
    
    const consult = `SELECT * FROM FERTILIZANTE`
  
    try {
      connection.query(consult, (err, results) => {
        if(err){
            res.status(500).json(err)
        }
        
        res.status(200).json(results);
      });
    } catch (e) {
      console.log(e);
    }
  };