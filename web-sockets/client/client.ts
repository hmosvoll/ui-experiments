const submitNameButton = document.querySelector("#submit-name");
const modalWrapper = document.querySelector("#modal-wrapper");
const nameInput = document.querySelector("#name-input") as HTMLInputElement;

let drawerName : string;

submitNameButton?.addEventListener("click", () => {
   console.log("clicked!");
   drawerName = nameInput.value; 
   modalWrapper?.classList.add("hide");

   console.log("Drawer's name is ", drawerName);

   // Create WebSocket connection.
   const socket = new WebSocket('ws://localhost:8000');

   // Connection opened
   socket.addEventListener('open', function (event) {
      const message = {
        type: "join",
        name: drawerName
      };
      socket.send(JSON.stringify(message));
   });

   // Listen for messages
   socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
   });
});

// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const canvasContainer = document.querySelector("#canvas-container") as HTMLDivElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
canvas.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
