import { setStartingPosition, getCanvas, draw, animateLines, drawLine } from "./ui/canvas.ts";
import { connect, registerDrawer, sendLine } from "./api.ts";
import { setConnectedFavicon } from "./ui/favicon.ts";
import { getDrawerName, getFrom, hideModal } from "./ui/registrationModal.ts";
import { setDrawers } from "./ui/userList.ts";

const canvas = getCanvas();
const registrationForm = getFrom();

let socket : WebSocket;
let isDrawing = false;

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  hideModal();
  const drawerName = getDrawerName(); 

  socket = connect();

  // Connection opened
  socket.addEventListener('open', function () {
    registerDrawer(drawerName);
    setConnectedFavicon();
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log(event.data);
    const message = JSON.parse(event.data);

    if(message.type === "drawerNames"){
        const drawerNames = message.drawerNames as string[];
        setDrawers(drawerNames);
    }

    if(message.type === "drawLines"){
        animateLines(message.lines);
    }

    if(message.type === "drawingState"){
      message.lines.forEach((line: number[]) => {
        drawLine(line[0], line[1], line[2], line[3]);
      });
    }
  });
});

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  setStartingPosition(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing === true) {
    const line = draw(e.offsetX, e.offsetY);
    sendLine(line);
  }
});

self.addEventListener('mouseup', () => {
  isDrawing = false;
});