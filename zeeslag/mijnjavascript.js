$(document).ready(function() {
    
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
var shipSelected = "";
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
    cell.css({
        top :field[i].positionY,
        left:field[i].positionX

    });
    cell.data('cord', {x: field[i].x, y : field[i].y});

    $('.board1').append(cell);

    // console.log(field[i]);
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
    'border-radius': '3px'
});

$(".board1").on('click', '.cell', function(event) {
        var cell = $(this);
        var className = cell.attr('class');
        if (className.indexOf("checked") >= 0){
            var coord = cell.data('cord');
            alert("dit mag niet "+ coord.x + " , "+coord.y);
        }
        cell.removeClass("off");
        cell.addClass("checked");
});

$(".board2").on('click', '.cell', function(event) {
    var cell = $(this);
    var className = cell.attr('class');
    if (className.indexOf("checked") >= 0){
        var coord = cell.data('cord');
        alert("dit mag niet "+ coord.x + " , "+coord.y);
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
