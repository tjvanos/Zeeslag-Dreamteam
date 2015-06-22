$(document).ready(function() {
    
});

var cordsx=["A","B","C","D","E","F","G","H","I","J"];

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

var length=0;
var isVertical=false;

$(".cell").hover(

    function(){

        if(shipSelected != "none"){
            if(shipSelected=="patrolboat"){
                length=2;
            }
            if(shipSelected=="submarine"){
                length=3;
            }
            if(shipSelected=="destroyer"){
                length=3;
            }
            if(shipSelected=="battleship"){
                length=4;
            }
            if(shipSelected=="carrier"){
                length=5;
            }
            var cell = $(this);
            var coord = cell.data('cord');
            var x=coord.x;
            var y=coord.y;
            var draw=true;
            if(isVertical){

            }else{
                if((coord.x+(length-1))>9){
                    draw=false;
                }
                var y=coord.y;
                if(draw){

                    for (var i = 0; i < length; i++)
                    {
                        var test= $('div[x='+x+'][y='+y+']');
                        test.removeClass("off");
                        test.addClass("boat");
                        x++;
                    }
                }

            }
        }
        else{
            $(this).removeClass("off");
            $(this).addClass("checked");
        }

    }, function(){
        if(shipSelected != "none"){
            var cell = $(this);
            var coord = cell.data('cord');
            var x=coord.x;
            var y=coord.y;
            if(isVertical){

            }else{
                    for (var i = 0; i < length; i++) {
                        var test = $('div[x=' + x + '][y=' + y + ']');
                        test.removeClass("boat");
                        test.addClass("off");
                        x++;
                    }
            }
        }
        else{
            $(this).removeClass("checked");
            $(this).addClass("off");

        }
});

$(".board1").on('click', '.cell', function(event) {
        var cell = $(this);
        var className = cell.attr('class');
        if (className.indexOf("checked") >= 0){
            var coord = cell.data('cord');
            alert("dit mag niet "+  cordsx[coord.x] + " , "+(1+coord.y));
        }
        cell.removeClass("off");
        cell.addClass("checked");
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

function shipSelector(element){
    deselectShips();
    $("#"+element.id).css('font-weight', 'bold');
    shipSelected = element.id;
}

function deselectShips(){
    $("#patrolboat").css('font-weight', 'normal');
    $("#submarine").css('font-weight', 'normal');
    $("#destroyer").css('font-weight', 'normal');
    $("#battleship").css('font-weight', 'normal');
    $("#carrier").css('font-weight', 'normal');
}
