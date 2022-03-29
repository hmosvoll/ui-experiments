import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { serveFile, serveDir } from "https://deno.land/std@0.131.0/http/file_server.ts";

console.log("Listening on http://localhost:8000");

const sockets : WebSocket[] = [];

serve(async (req) => {
    const pathname = new URL(req.url).pathname;

    if (req.headers.get("upgrade") === "websocket") {
        const { socket: ws, response } = Deno.upgradeWebSocket(req);

        ws.onopen = () => {
            sockets.push(ws);
            console.log("Connected to client ...");
        }
        
        ws.onmessage = (message) => {
            console.log(`Client says: ${message.data}`);

            sockets.forEach((socket) => {
                if(socket !== ws){
                    socket.send("Other client says Hello");
                }
            });

            ws.send("Hey Client");
        };

        ws.onclose = () => {
            const index = sockets.indexOf(ws);
            sockets.splice(index, 1);
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