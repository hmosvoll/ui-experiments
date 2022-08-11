import Line from "../interfaces/Line.ts";

let startX = 0;
let startY = 0;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const canvasContainer = document.querySelector("#canvas-container") as HTMLDivElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight

export function getCanvas () {
    return canvas;
}

export function setStartingPosition(x : number, y : number){
    startX = x;
    startY = y;
}

export function draw(endX : number, endY : number) : Line{
    const line = { startX, startY, endX, endY };
    drawLine(startX, startY, endX, endY);
    
    startX = endX;
    startY = endY;
    
    return line;
}

export function animateLines (lines : number[][]){
    let index = 0;
    
    function animateLine (){
        drawLine (lines[index][0], lines[index][1], lines[index][2], lines[index][3])
        
        index++;
        
        if(index < lines.length){
            self.requestAnimationFrame(animateLine);
        }
    }
    
    self.requestAnimationFrame(animateLine);
}

export function drawLine(x1 : number, y1 : number, x2 : number, y2 : number) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}