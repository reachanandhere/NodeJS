

const socket = io();

const $messageForm = document.getElementById("form");
const $formInput = document.getElementById("form-input");
const $locationButton = document.getElementById("location");
const $msgButton = $messageForm?.querySelector("button");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template")?.innerHTML;
const urlTemplate = document.querySelector("#url-template")?.innerHTML;
const sidebarTemplate=document.querySelector('#sidebarTemplate')?.innerHTML
//Options

const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

socket.on("message", (message) => {
  

  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt:  moment(message.createdAt).format('h:mm:ss a')
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (url) => {
  const html = Mustache.render(urlTemplate, {
    username:url.username,
    url: url.text,
    createdAt:  moment(url.createdAt).format('h:mm:ss a')
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on('roomData', ({room,users})=>{
  const html = Mustache.render(sidebarTemplate, {
    room, users
  })

  document.querySelector('#sidebar-template').innerHTML=html
})

$messageForm?.addEventListener("submit", (e) => {
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

$locationButton?.addEventListener("click", (e) => {
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

socket.emit('join', { username, room }, (error)=>{
    if(error) {
      alert(error)
      location.href='/'
    }
})
