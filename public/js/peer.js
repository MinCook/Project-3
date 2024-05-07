import { Peer } from "https://esm.sh/peerjs@1.5.2?bundle-deps";
const User_id = document.querySelector("form").getAttribute("id");
const config = { audio: true, video: true };
const peer = new Peer()
const conn = peer.connect(`${User_id}`);
// navigator.mediaDevices.getUserMedia(config).then((stream) => {
//     const call = peer.call(User_id , stream)
//     call.on("stream",stream => playStream(stream))
//   });
//   peer.on("call",call=>{
//     navigator.mediaDevices.getUserMedia(config).then((stream) => {
//      call.answer(stream);
//      playStream(stream)
//     call.on("stream",stream => playStream(stream))
//     });
//   })
//   function playStream(stream){
//     const video = document.querySelector("video");
//       video.srcObject = stream;
//         video.play();
//   }

conn.on('open', function(){
  conn.send('hi!');
});

 
//  video.addEventListener("loadedmetadata", () => {
//         video.play();
//       });
    
 
