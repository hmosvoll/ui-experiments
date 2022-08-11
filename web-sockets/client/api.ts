import Line from "./interfaces/Line.ts";

let delayActive = false;
let lines: number[][] = [];

let socket : WebSocket;

export function connect(){
    socket = new WebSocket('ws://localhost:8000');
    return socket;
}

export function sendLine(line : Line) : void {  
    lines.push([line.startX, line.startY, line.endX, line.endY]);
    
    if(!delayActive){
        setTimeout(() => {
            const message = { type: "drawLines", lines};
            socket.send(JSON.stringify(message));
            
            lines = [];
            delayActive = false;
        }, 500);
        
        delayActive = true;
    }
}

export function registerDrawer (drawerName : string){
    const message = {
        type: "join",
        name: drawerName
    };
    
    socket.send(JSON.stringify(message));
}