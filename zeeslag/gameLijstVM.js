var server = "https://zeeslagavans3.herokuapp.com/";
var apiKey = "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InRqb3NAYXZhbnMubmwi.bYe_bj2RBgp4F71ZHxz4wWJ7R4DRmvPiYq8HdBGGzmg";
var games = {};

$.ajax({
    type: "GET",
    url: server + "users/me/games" + apiKey,
    dataType: "json",
    async: false,
    success: function(data){
        games = data;
    }
});

var que=false;
var comp=false;



for (var i = 0; i < games.length; i++) {

    var col = $('<tr>');
    var link="zeeslag.html?id="+games[i]._id+"";
    if(games[i].status!="que"){
        col.html("<td>"+games[i]._id+"</td><td>"+games[i].enemyName+"</td><td>"+games[i].enemyId+"</td><td>"+games[i].status+"</td><td><a href="+link+" class='btn btn-block btn-primary btn-primary'>open spel</a></td>");
        $('#een').append(col);
    }else{
        que=true;
        col.html("<td>0</td><td>Wachten</td><td>Op</td><td>Tegenstander</td><td><a class='btn btn-block btn-primary btn-warning'>wachten</a></td>");
        $('#een').append(col);
    }

}

var knop1=$('<button>');
knop1.addClass("btn btn-success");
knop1.text("Nieuw Spel(vs. speler)");

knop1.on("click", function(){
    if(que){
        alert("U heeft al een verzoek open staan!");
    }else{
        $.ajax({
            type: "GET",
            url: server + "games" + apiKey,
            dataType: "json",
            async: false,
            success: function(data){
                alert("Nieuw spel VS. Persoon aangevraagd!");
                var newGame = $('<tr>');
                newGame.html("<td>0</td><td>Wachten</td><td>Op</td><td>Tegenstander</td><td><a class='btn btn-block btn-primary btn-warning'>wachten</a></td>");
                que=true;
                $('#een').append(newGame);
            }
        });

    }

});
$('#knoppen').append(knop1);

var knop2=$('<button>');
knop2.addClass("btn btn-warning");
knop2.text("Nieuw Spel(vs. computer)");

knop2.on("click", function(){
    $.ajax({
        type: "GET",
        url: server + "games/AI" + apiKey,
        dataType: "json",
        async: false,
        success: function(data){
            alert("Nieuw spel VS. Computer aangevraagd!");
            var game = data;
            var newGame = $('<tr>');
            var link="zeeslag.html?id="+game._id+"";
            newGame.html("<td>"+game._id+"</td><td>computer</td><td>"+game.player2+"</td><td>setup</td><td><a href="+link+" class='btn btn-block btn-primary btn-primary'>open spel</a></td>");

            $('#een').append(newGame);
        }
    });

});
$('#knoppen').append(knop2);

var knop3=$('<button>');
knop3.addClass("btn btn-primary");
knop3.text("Refresh");

knop3.on("click", function(){
    window.location.reload();
});
$('#knoppen').append(knop3);


