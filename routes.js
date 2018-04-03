var testTable = require('./models/testTable');

module.exports = {
    configure: function(app) {
      app.get('/test', function(req, res) {
        testTable.test(res);
      });
        
      app.get('/gets', function(req, res) {
        testTable.get(res);
      });
   
      app.post('/update', function(req, res) {
        console.log('update');
        console.log(req.query);  
        testTable.update(req.query, res);
      });
    
      app.delete('/delete/:id/', function(req, res) {
        testTable.delete(req.params.id, res);
      });
    }
};