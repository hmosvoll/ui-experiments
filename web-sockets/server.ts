import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { serveFile, serveDir } from "https://deno.land/std@0.131.0/http/file_server.ts";

console.log("Listening on http://localhost:8000");

serve(async (req) => {
    const pathname = new URL(req.url).pathname;

    console.log(pathname);
    
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