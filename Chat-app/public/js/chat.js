const socket = io();
socket.on("message", (message) => {
  console.log(message);
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("form-input").value;
  socket.emit("sendMessage", message);
});

document.getElementById("location").addEventListener("click", (e) => {
  if (!navigator.geolocation) return alert("Geolocation is not supported");
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('location', {
        longitude: position.coords.longitude,
        latitute: position.coords.latitude
    })
  });
});
