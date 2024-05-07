// const myVideo = document.createElement('video')
// myVideo.muted = true
// const peers = {}




// navigator.mediaDevices.getUserMedia({
//   video: true,
//   audio: true
// }).then(stream => {
//   addVideoStream(myVideo, stream) // tạo video 


//   myPeer.on('call', call => {
//     call.answer(stream)
//     const video = document.createElement('video')
//     call.on('stream', userVideoStream => {
//       addVideoStream(video, userVideoStream)
//     })
//   }) // lắng nghe sự kiện gọi video


//   socket.on('user-connected', userId => {
//     connectToNewUser(userId, stream)
//   })


// })





// socket.on('user-disconnected', userId => {
//   if (peers[userId]) peers[userId].close()
// })

// myPeer.on('open', id => {
//   socket.emit('join-room', ROOM_ID, id)
// })




// function connectToNewUser(userId, stream) {
//   const call = myPeer.call(userId, stream)
//   const video = document.createElement('video')
//   call.on('stream', userVideoStream => {
//     addVideoStream(video, userVideoStream)
//   })
//   call.on('close', () => {
//     video.remove()
//   })

//   peers[userId] = call
// }




// function addVideoStream(video, stream) {
//   video.srcObject = stream
//   video.addEventListener('loadedmetadata', () => {
//     video.play()
//   })
//   videoGrid.append(video)
// }




const PRE = "DELTA"
const SUF = "MEET"
var room_id;
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;
var screenStream;
var peer = null;
var currentPeer = null
var screenSharing = false

function createRoom() {
    console.log("Creating Room")
    let room = document.getElementById("room-input").value;
    if (room == " " || room == "") {
        alert("Please enter room number")
        return;
    }
    room_id = PRE + room + SUF;
    peer = new Peer(room_id)
    peer.on('open', (id) => {
        console.log("Peer Connected with ID: ", id)
        hideModal()
        getUserMedia({ video: true, audio: true }, (stream) => {
            local_stream = stream;
            setLocalStream(local_stream)
        }, (err) => {
            console.log(err)
        })
        notify("Waiting for peer to join.")
    })
    peer.on('call', (call) => {
        call.answer(local_stream);
        call.on('stream', (stream) => {
            setRemoteStream(stream)
        })
        currentPeer = call;
    })
}

function setLocalStream(stream) {

    let video = document.getElementById("local-video");
    video.srcObject = stream;
    video.muted = true;
    video.play();
}
function setRemoteStream(stream) {

    let video = document.getElementById("remote-video");
    video.srcObject = stream;
    video.play();
}

function hideModal() {
    document.getElementById("entry-modal").hidden = true
}

function notify(msg) {
    let notification = document.getElementById("notification")
    notification.innerHTML = msg
    notification.hidden = false
    setTimeout(() => {
        notification.hidden = true;
    }, 3000)
}

function joinRoom() {
    console.log("Joining Room")
    let room = document.getElementById("room-input").value;
    if (room == " " || room == "") {
        alert("Please enter room number")
        return;
    }
    room_id = PRE + room + SUF;
    hideModal()
    peer = new Peer()
    peer.on('open', (id) => {
        console.log("Connected with Id: " + id)
        getUserMedia({ video: true, audio: true }, (stream) => {
            local_stream = stream;
            setLocalStream(local_stream)
            notify("Joining peer")
            let call = peer.call(room_id, stream)
            call.on('stream', (stream) => {
                setRemoteStream(stream);
            })
            currentPeer = call;
        }, (err) => {
            console.log(err)
        })

    })
}

function startScreenShare() {
    if (screenSharing) {
        stopScreenSharing()
    }
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
        screenStream = stream;
        let videoTrack = screenStream.getVideoTracks()[0];
        videoTrack.onended = () => {
            stopScreenSharing()
        }
        if (peer) {
            let sender = currentPeer.peerConnection.getSenders().find(function (s) {
                return s.track.kind == videoTrack.kind;
            })
            sender.replaceTrack(videoTrack)
            screenSharing = true
        }
        console.log(screenStream)
    })
}

function stopScreenSharing() {
    if (!screenSharing) return;
    let videoTrack = local_stream.getVideoTracks()[0];
    if (peer) {
        let sender = currentPeer.peerConnection.getSenders().find(function (s) {
            return s.track.kind == videoTrack.kind;
        })
        sender.replaceTrack(videoTrack)
    }
    screenStream.getTracks().forEach(function (track) {
        track.stop();
    });
    screenSharing = false
}