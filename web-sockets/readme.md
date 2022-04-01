# Web sockets

deno run --allow-net=0.0.0.0:8000 --allow-read=./ server.ts

deno bundle --config ./tsconfig.json --watch ./client.ts ./static/app.js