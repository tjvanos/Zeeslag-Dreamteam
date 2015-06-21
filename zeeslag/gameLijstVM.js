var getGames= new XMLHttpRequest();
getGames.open("GET","https://zeeslagavans.herokuapp.com/users/me/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InRqb3NAYXZhbnMubmwi.bYe_bj2RBgp4F71ZHxz4wWJ7R4DRmvPiYq8HdBGGzmg",false);
getGames.send();
var games=JSON.parse(getGames.responseText);
//https://zeeslagavans.herokuapp.com/games?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InRqb3NAYXZhbnMubmwi.bYe_bj2RBgp4F71ZHxz4wWJ7R4DRmvPiYq8HdBGGzmg

console.log(games);
console.log(getGames.responseText);

for (var i = 0; i < games.length; i++) {
    var col = $('<div>');
    col.addClass("col-lg-3 col-sm-6 text-center");
    col.attr('id', "twee");
    col.css({
        border: '1px solid black',
        margin: '5px'
    });
    if(games[i].status!="que"){
        col.html("<h3> VS. "+games[i].enemyName+"</h3>" +
        "<p>Status: "+games[i].status+"</p>" +
        "<a href='zeeslag.html'>Open spel ></a>");
        $('#een').append(col);
    }else{
        col.html("<h3>Wachten op tegenstander... </h3>");
        $('#een').append(col);
    }

}


