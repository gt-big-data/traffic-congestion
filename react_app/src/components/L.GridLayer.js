import * as L from "leaflet";
var CanvasLayer = L.GridLayer.extend({
    createTile: function(coords, done){
        var error;

        // create a <canvas> element for drawing
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');
        var ctx = tile.getContext("2d");

        const a = 2 * Math.PI / 6;
        const r = 50;

        function init() {
            drawHexagon(r, r);
          }
        init();

        function drawHexagon(x, y) {
            ctx.beginPath();
            for (var i = 0; i < 6; i++) {
              ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
            }
            ctx.closePath();
            ctx.stroke();
        }
        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;

        

        // draw something asynchronously and pass the tile to the done() callback
        setTimeout(function() {
            done(error, tile);
        }, 1000);

        return tile;
    }
});
