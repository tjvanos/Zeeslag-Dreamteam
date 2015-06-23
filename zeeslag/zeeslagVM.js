$(document).ready(function() {
    $(".pending").hide();
});

var cordsx=["a","b","c","d","e","f","g","h","i","j"];
var server = "https://zeeslagavans.herokuapp.com/"
var apiKey = "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InRqb3NAYXZhbnMubmwi.bYe_bj2RBgp4F71ZHxz4wWJ7R4DRmvPiYq8HdBGGzmg"
var gameID = GetURLParameter("id");

var game = {};
var shipList = {};
$.ajax({
    type: "GET",
    url: server + "games/" + gameID + apiKey,
    async: false,
    dataType: "json",
    success: function(data){
        game = data;
        if(game.status != "started" | "done"){
            $(".board2").hide();

            //Get default shiplist if game has not started or finished yet
            $.ajax({
                type: "GET",
                url: server + "ships/" + apiKey,
                dataType: "json",
                success: function(data){
                    shipList = { "ships": data };
                    console.log(shipList);
                }
            });
        }
        else{
            $(".shipContainer").hide();
            loadShips(game.myGameboard.ships);
        }
        console.log(game);
    }
});

function coordinate(x, y, state) {
    this.x = x;
    this.y = y;
	this.spacing = 2;
	this.fieldSize = 40;
    this.positionX= x * (this.fieldSize + this.spacing);
    this.positionY= y * (this.fieldSize + this.spacing);
    this.state = state;
}

var field = new Array();
var state = "off";
var shipSelected = "none";
var isVertical = false;
var placedShips = 0;
for (var y = 0; y < 10; y++)
{
    for (var x = 0; x < 10; x++)
    {
        field.push(new coordinate(x, y, state));
    }
}

//ophalen gameboard

for (var i = 0; i < 100; i++)
{
    var cell = $('<div>');
    cell.addClass("cell"+" off");
    cell.attr("x",field[i].x);
    cell.attr("y",field[i].y);
    cell.css({
        top :field[i].positionY,
        left:field[i].positionX

    });
    cell.data('cord', {x: field[i].x, y : field[i].y});

    $('.board1').append(cell);

     //console.log(field[i]);
}

for (var i = 0; i < 100; i++)
{
    var cell = $('<div>');
    cell.addClass("cell"+" off");
    cell.css({
        top :field[i].positionY,
        left:field[i].positionX

    });
    cell.data('cord', {x: field[i].x, y : field[i].y});

    $('.board2').append(cell);

    // console.log(field[i]);
}

$('.cell').css({
    'top': 'positionY',
    'left': 'positionX',
    'border-radius': '3px',
    'cursor': 'pointer'
});

$(".cell").hover(

    function(){

        if(shipSelected != "none"){
            var cell = $(this);
            drawShip(cell, "temp");
        }
        else{
            $(this).removeClass("off");
            $(this).addClass("checked");
        }

    }, function(){
        if(shipSelected != "none"){
            var cell = $(this);
            clearTempShip(cell);
        }
        else{
            $(this).removeClass("checked");
            $(this).addClass("off");
        }

});

$(".board1").on('click', '.cell', function(event) {
    if(shipSelected != "none"){
        var cell = $(this);
        if(drawShip(cell, "perm") == true){
            addShipToArray(shipSelected, cell, isVertical);
            $("li[id='"+ shipSelected +"']").remove();
            shipSelected = "none";
            placedShips++;

            if(placedShips > 4){
                $(".rotate").remove();
                $(".harbor").hide();
                $(".pending").show();

                $.ajax({
                    type: "POST",
                    url: server + "games/" + gameID + "/gameboards" + apiKey,
                    data: shipList,
                    success: function(data){
                        console.log(data);
                    }
                });

            }
        }

    }
});

$(".board2").on('click', '.cell', function(event) {
    var cell = $(this);
    var className = cell.attr('class');
    if (className.indexOf("checked") >= 0){
        var coord = cell.data('cord');
        alert("dit mag niet "+  cordsx[coord.x] + " , "+(1+coord.y));
    }
    cell.removeClass("off");
    cell.addClass("checked");
});

function addShipToArray(shipID, cell, direction){
    var coord = cell.data('cord');
    var startPos = { "x": cordsx[coord.x], "y": coord.y };
    shipList.ships[shipID].startCell = startPos;
    shipList.ships[shipID].isVertical = direction;
}

function shipSelector(element){
    deselectShips();
    $("#"+element.id).css('font-weight', 'bold');
    shipSelected = element.id;
}

function deselectShips(){
    $("#0").css('font-weight', 'normal');
    $("#1").css('font-weight', 'normal');
    $("#2").css('font-weight', 'normal');
    $("#3").css('font-weight', 'normal');
    $("#4").css('font-weight', 'normal');
}

function rotateShip(){
    if(isVertical == true){
        isVertical = false;
    }
    else{
        isVertical = true;
    }
}

function clearTempShip(cell){
    var cell = cell;
    var coord = cell.data('cord');
    var ship = shipList.ships[shipSelected];
    var length = ship.length;
    var x=coord.x;
    var y=coord.y;
    if(isVertical){
        for (var i = 0; i < length; i++) {
            var test = $('div[x=' + x + '][y=' + y + ']');
            test.removeClass("tempBoat");
            test.addClass("off");
            y++;
        }
    }else{
        for (var i = 0; i < length; i++) {
            var test = $('div[x=' + x + '][y=' + y + ']');
            test.removeClass("tempBoat");
            test.addClass("off");
            x++;
        }
    }

}

function drawShip(cell, time){
    var ship = shipList.ships[shipSelected];
    var length = ship.length;
    var cell = cell;
    var coord = cell.data('cord');
    var x=coord.x;
    var y=coord.y;
    var draw=true;
    if(isVertical){
        if((coord.y+(length-1))>9){
            draw=false;
        }
        else{
            var tempY = y;
            for (var i = 0; i < length; i++)
            {
                if($('div[x=' + x + '][y=' + tempY + ']').hasClass("boat")){
                    draw=false;
                }
                tempY++;
            }
        }
        var x=coord.x;
        if(draw){

            for (var i = 0; i < length; i++)
            {
                var test= $('div[x='+x+'][y='+y+']');
                if(time === "perm"){test.removeClass("tempBoat");test.addClass("boat")}
                else{test.removeClass("off");test.addClass("tempBoat");}
                y++;
            }
            return true;
        }
    }
    else{
        if((coord.x+(length-1))>9){
            draw=false;
        }
        else{
            var tempX = x;
            for (var i = 0; i < length; i++)
            {
                if($('div[x=' + tempX + '][y=' + y + ']').hasClass("boat")){
                    draw=false;
                }
                tempX++;
            }
        }
        var y=coord.y;
        if(draw){

            for (var i = 0; i < length; i++)
            {
                var test= $('div[x='+x+'][y='+y+']');
                test.removeClass("off");
                if(time === "perm"){test.removeClass("tempBoat");test.addClass("boat")}
                else{test.removeClass("off");test.addClass("tempBoat");}
                x++;
            }
            return true;
        }
    }
}

function loadShips(ships){
    for(var i = 0; i < ships.length; i++){
        var x = cordsx.indexOf(ships[i].startCell.x)+1;
        var y = ships[i].startCell.y;
        var lenght = ships[i].length;

        for(var j = 0; j < lenght; j++){
            //TODO cell hitcheck
            var cell= $('div[x='+x+'][y='+y+']');
            cell.removeClass("off");
            cell.addClass("boat");

            if(ships[i].isVertical == true){
                y++
            }
            else{
                x++
            }
        }

    }
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
