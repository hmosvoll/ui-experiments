// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const socket = new WebSocket('ws://localhost:8000');
socket.addEventListener('open', function(event) {
    socket.send('Hello Server!');
});
socket.addEventListener('message', function(event) {
    console.log('Message from server ', event.data);
});
