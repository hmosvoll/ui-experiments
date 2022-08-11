import canvasModule from "./ui/canvas.ts";
import api from "./api.ts";
import favicon from "./ui/favicon.ts";
import registrationModal from "./ui/registrationModal.ts";
import userList from "./ui/userList.ts";

const canvas = canvasModule.getCanvas();
const registrationForm = registrationModal.getFrom();

let socket : WebSocket;
let isDrawing = false;

registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    registrationModal.hideModal();
    const drawerName = registrationModal.getDrawerName(); 
    
    socket = api.connect();
    
    // Connection opened
    socket.addEventListener('open', function () {
        api.registerDrawer(drawerName);
        favicon.setConnectedFavicon();
    });
    
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log(event.data);
        const message = JSON.parse(event.data);
        
        if(message.type === "drawerNames"){
            const drawerNames = message.drawerNames as string[];
            userList.setDrawers(drawerNames);
        }
        
        if(message.type === "drawLines"){
            canvasModule.animateLines(message.lines);
        }
        
        if(message.type === "drawingState"){
            message.lines.forEach((line: number[]) => {
                canvasModule.drawLine(line[0], line[1], line[2], line[3]);
            });
        }
    });
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    canvasModule.setStartingPosition(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing === true) {
        const line = canvasModule.draw(e.offsetX, e.offsetY);
        api.sendLine(line);
    }
});

self.addEventListener('mouseup', () => {
    isDrawing = false;
});