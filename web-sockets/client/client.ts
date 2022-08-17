import apiService from "./api.ts";
import canvasService from "./ui-services/canvas.ts";
import faviconService from "./ui-services/favicon.ts";
import registrationModalService from "./ui-services/registration-modal.ts";
import userListService from "./ui-services/user-list.ts";

const canvas = canvasService.getCanvas();
const registrationForm = registrationModalService.getFrom();

let socket : WebSocket;
let isDrawing = false;

registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    registrationModalService.hideModal();
    const drawerName = registrationModalService.getDrawerName(); 
    
    socket = apiService.connect();
    
    // Connection opened
    socket.addEventListener('open', function () {
        apiService.registerDrawer(drawerName);
        faviconService.setConnectedFavicon();
    });
    
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log(event.data);
        const message = JSON.parse(event.data);
        
        if(message.type === "drawerNames"){
            const drawerNames = message.drawerNames as string[];
            userListService.setDrawers(drawerNames);
        }
        
        if(message.type === "drawLines"){
            canvasService.animateLines(message.lines);
        }
        
        if(message.type === "drawingState"){
            message.lines.forEach((line: number[]) => {
                canvasService.drawLine(line[0], line[1], line[2], line[3]);
            });
        }
    });
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    canvasService.setStartingPosition(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing === true) {
        const line = canvasService.draw(e.offsetX, e.offsetY);
        apiService.sendLine(line);
    }
});

self.addEventListener('mouseup', () => {
    isDrawing = false;
});