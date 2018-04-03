var connection = require('../connection');
  
function TestTable() {
    this.test = function(res) {
      connection.acquire(function(err, con) {
        res.send("Hello");
      });
    };

    this.get = function(res) {
        connection.acquire(function(err, con) {
          con.query('select * from testTable', function(err, result) {
            con.release();
            res.send(result);
          });
        });
      };


      this.update = function(field_data, res) {
        console.log("field_data");
        console.log(field_data);
        connection.acquire(function(err, con) {
          
            con.query('update testTable set ? where id = ?', [field_data, field_data.id], function(err, result) {
            con.release();
            if (err) {
              console.log("update err"+err);
              
              res.send({status: 1, message: 'TODO update failed'});
            } else {
              res.send({status: 0, message: 'TODO updated successfully'});
            }
          });
        });
      };

      this.delete = function(id, res) {
        connection.acquire(function(err, con) {
          con.query('delete from testTable where id = ?', [id], function(err, result) {
            con.release();
            if (err) {
              res.send({status: 1, message: 'Failed to delete'});
            } else {
              res.send({status: 0, message: 'Deleted successfully'});
            }
          });
        });
      };
}

module.exports = new TestTable();