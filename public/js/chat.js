import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
const socket = io();
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const chatContent = e.target.elements.content.value;
    if (chatContent) {
      socket.emit("CLIENT_SEND_MESSAGE", chatContent);
      e.target.elements.content.value = " ";
    }
  });
}

socket.on("SEVER_RETURN_MESSAGE", (data) => {
  const chatWrap = document.querySelector(".chat__wrap");
  const div = document.createElement("div");
  const User = document.querySelector("form").getAttribute("id");
  if (data.user == User) {
    div.innerHTML = `
    <div class="me_wrap"> 
        <div class="me" chatContent>
            <span> ${data.content} </span>
            </div>
            </div>
`;
  } else {
    div.innerHTML = `
    <div class="you_wrap"> 
        <a>${data.name}</a>
        <div class="you" chatContent>
            <span> ${data.content} </span>
            </div>
            </div>
`;
  }
  chatWrap.appendChild(div);
  chatWrap.scrollTop = chatWrap.scrollHeight;
});
const Scroll = document.querySelector("div .chat__wrap");
Scroll.scrollTop = Scroll.scrollHeight;

const button = document.querySelector('button')
const tooltip = document.querySelector('.tooltip')
Popper.createPopper(button, tooltip)
document.querySelector(" span[emojiClick] ").onclick = () => {
  tooltip.classList.toggle('shown')
}

const emoji = document.querySelector('emoji-picker')
emoji.addEventListener('emoji-click', (e)=>{
 const icon = e.detail.unicode;
 chatContent = chatContent + icon
}); 
