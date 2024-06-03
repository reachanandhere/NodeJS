const socket = io();

const $messageForm = document.getElementById("form");
const $formInput = document.getElementById("form-input");
const $locationButton = document.getElementById("location");
const $msgButton = $messageForm.querySelector("button");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const urlTemplate = document.querySelector("#url-template").innerHTML;

socket.on("message", (message) => {
  console.log(message);

  const html = Mustache.render(messageTemplate, {
    message,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (url) => {
  const html = Mustache.render(urlTemplate, {
    url,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = $formInput.value;
  if (message == "") {
    return;
  }
  $msgButton.setAttribute("disabled", "disabled");

  socket.emit("sendMessage", message, (message) => {
    console.log(message);
    $msgButton.removeAttribute("disabled");
    $formInput.value = "";
    $formInput.focus();
  });
});

$locationButton.addEventListener("click", (e) => {
  if (!navigator.geolocation) return alert("Geolocation is not supported");
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "location",
      {
        longitude: position.coords.longitude,
        latitute: position.coords.latitude,
      },
      () => {
        console.log("Location shared");
      }
    );
  });
});
