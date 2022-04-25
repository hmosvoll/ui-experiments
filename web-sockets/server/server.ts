import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { serveFile, serveDir } from "https://deno.land/std@0.131.0/http/file_server.ts";

import Drawer from "./Drawer.ts";

console.log("Listening on http://localhost:8000");

const drawers :  Drawer[] = [];
const sockets : WebSocket[] = [];

serve(async (req) => {
    const pathname = new URL(req.url).pathname;

    if (req.headers.get("upgrade") === "websocket") {
        const { socket: ws, response } = Deno.upgradeWebSocket(req);

        ws.onopen = () => {
            sockets.push(ws);
            drawers.push({ socket: ws });
        }

        ws.onmessage = (message) => {
            console.log(`Client says: ${message.data}`);

            const messageData = JSON.parse(message.data);
            const drawer = drawers.find((d) => d.socket === ws);
            
            if(messageData.type === "join"){
                drawer.name = messageData.name;

                const drawerJoinedMessage = JSON.stringify({
                    type: "joined",
                    name: drawer.name
                });
    
                drawers.forEach((d) => {
                    d.socket.send(drawerJoinedMessage);
                });
            }
        };

        ws.onclose = () => {
            const drawerIndex = drawers.findIndex((d) => d.socket === ws);
            drawers.splice(drawerIndex, 1);
        }

        return response;
    }

    if(pathname === "/"){
        return await serveFile(req, `${Deno.cwd()}/static/index.html`)
    }

    if (pathname) {
        return await serveDir(req, {
            fsRoot: `${Deno.cwd()}/static`,
            urlRoot: ""
        });
    }

    return new Response();
});