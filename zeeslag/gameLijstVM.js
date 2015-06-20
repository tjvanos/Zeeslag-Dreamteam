var xmlhttp= new XMLHttpRequest();
xmlhttp.open("GET","https://zeeslagavans.herokuapp.com/users/me/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InRqb3NAYXZhbnMubmwi.bYe_bj2RBgp4F71ZHxz4wWJ7R4DRmvPiYq8HdBGGzmg",false);
xmlhttp.send();
var test=JSON.parse(xmlhttp.responseText);

console.log(test);
console.log(xmlhttp.responseText);

for (var i = 0; i < test.length; i++) {
    var col = $('<div>');
    col.addClass("col-lg-3 col-sm-6 text-center");
    col.attr('id', "twee");
    col.css({
        border: '1px solid black',
        margin: '5px'
    });
    col.html("<h3>VS. Naam</h3><p>Test extra tekst</p>");
    $('#een').append(col);
}