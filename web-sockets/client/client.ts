const submitNameButton = document.querySelector("#submit-name");
const modalWrapper = document.querySelector("#modal-wrapper");
const nameInput = document.querySelector("#name-input") as HTMLInputElement;

let drawerName;

submitNameButton?.addEventListener("click", () => {
   console.log("clicked!");
   drawerName = nameInput.value; 
   modalWrapper?.classList.add("hide");

   console.log("Drawer's name is ", drawerName);

   // Create WebSocket connection.
   const socket = new WebSocket('ws://localhost:8000');

   // Connection opened
   socket.addEventListener('open', function (event) {
      socket.send('Hello Server!');
   });

   // Listen for messages
   socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
   });
});