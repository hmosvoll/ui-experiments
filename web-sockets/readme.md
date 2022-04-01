# Web sockets

deno run --allow-net=0.0.0.0:8000 --allow-read=./ ./server/server.ts

deno bundle --config ./client/tsconfig.json --watch ./client/client.ts ./static/app.js