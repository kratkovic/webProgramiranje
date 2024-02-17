function SQLInsert() {
    // Dohvaćanje vrijednosti unesenih u polja
    var tableName = document.getElementById('tableName').value;
    var column1 = document.getElementById('column1').value;
    var column2 = document.getElementById('column2').value;

    // Generiranje SQL INSERT rečenica
    var SQLInserts = '';
    for (var i = 1; i <= 10; i++) {
      var values = "'value" + i + "', 'value" + (i + 1) + "'";
      var SQLInsert = 'INSERT INTO ' + tableName + ' ( ' + column1 + ' , ' + column2 + ' ) VALUES (' + values + '); ';
      SQLInserts += SQLInsert + '<br>';
    }

    // Prikaz rezultata u donjem div elementu
    document.getElementById('outputDiv').innerHTML = SQLInserts;
  }