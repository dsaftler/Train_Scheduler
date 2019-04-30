
  $('tr').click(function () {
    var tableData = $(this).children('td').map(function () {
      return $(this).text();
    }).get();
    var props = $('thead > tr th');
    var array = [];
    props.each(function () { array.push($(this).text()) });
    //keys
    console.log(array);
    //values
    console.log(tableData);

    var obj = {};
    for (var i = 0; i < tableData.length; i++) {
      obj[array[i]] = tableData[i];
    }
    console.log(obj);
  });

