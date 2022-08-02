let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let gradient = context.createLinearGradient(0, 0, 0, 150);

gradient.addColorStop(0, "greenyellow");
gradient.addColorStop(1, "white");
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);

