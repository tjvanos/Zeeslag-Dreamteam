
function coordinate(x, y,state) {
    this.x = x;
    this.y = y;
    this.positionX=x*42;
    this.positionY=y*42;
    this.state = state;
}

var field = new Array();
var state = "off";
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

    $('#gameboard').append(cell);

   // console.log(field[i]);
}

$('.cell').css({
    'top': 'positionY',
    'left': 'positionX'
});

$(document).ready(function() {
    $("#gameboard").on('click', '.cell', function(event) {
        var cell = $(this);
        cell.removeClass("off");
        cell.addClass("checked");
        console.log(cell.data('cord').x,cell.data('cord').y);
    });
});



























