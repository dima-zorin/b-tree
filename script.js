window.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var w = window.innerWidth;
  var h = window.innerHeight;
  myCanvas.width = w;
  myCanvas.height = h;

  var length = 200;
  var deflection = 27;
  var reduction = 66 / 100;
  var width = 20;
  var startPoint = [];
  var levels = 4;
  var branchCount = 0;
  
  function trunk() {

    var trunkEnd = {
      x: w / 2,
      y: length + 100,
      angle: 90
    };
    startPoint.push(trunkEnd);

    ctx.strokeStyle = '#80ff00';
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(w / 2, h - 50);
    ctx.lineTo(w / 2, h - trunkEnd.y);
    ctx.stroke();

    ctx.font = "bold 40px Georgia";
    ctx.fillText("Trunk", w / 2, (2 * h - trunkEnd.y - 50) / 2);
  }

  function branch() {
    length = length * reduction;
    width = width * reduction;

    var newStartPoint = [];

    for (var i = 0; i < startPoint.length; i++) {
      var sp = startPoint[i];

      var nspl = calculateNewStartPoint(sp.x, sp.y, sp.angle + deflection, length);
      var nspr = calculateNewStartPoint(sp.x, sp.y, sp.angle - deflection, length);

      ctx.lineWidth = width;

      ctx.beginPath();
      ctx.moveTo(sp.x, h - sp.y);
      ctx.lineTo(nspl.x, h - nspl.y);
      ctx.moveTo(sp.x, h - sp.y);
      ctx.lineTo(nspr.x, h - nspr.y);
      ctx.stroke();

      ctx.font = "italic small-caps bold 12px arial";
      ctx.fillText("Branch " + (branchCount + 1), (nspl.x + sp.x) / 2 - 20, (2 * h - nspl.y - sp.y) / 2);
      ctx.fillText("Branch " + (branchCount + 2), (nspr.x + sp.x) / 2 - 20, (2 * h - nspr.y - sp.y) / 2);

      nspl.angle = sp.angle + deflection;
      nspr.angle = sp.angle - deflection;

      newStartPoint.push(nspl);
      newStartPoint.push(nspr);
      branchCount = branchCount + 2;
    }

    startPoint = newStartPoint;
  }

  trunk();
  for (var n = 1; n < levels; n++) {
    branch();
  }
};

function calculateNewStartPoint(x, y, ang, length) {
  var nspx = x + length * Math.cos(ang * Math.PI / 180);
  var nspy = y + length * Math.sin(ang * Math.PI / 180);
  return {
    x: nspx,
    y: nspy
  };
}