# Web sockets

deno run --allow-net=0.0.0.0:8000 --allow-read=./ ./server/server.ts

deno bundle --watch ./client/client.ts ./static/app.js

# TODO
- [ ] Restructure client
- [ ] Restructure server
- [ ] Drawing color
- [ ] View drawing on load
- [ ] Drawing datatype
- [ ] Check out BroadcastChannel API
- [ ] Deploy