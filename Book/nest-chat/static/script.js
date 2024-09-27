// socket.io 인스턴스 생성
const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
const nickname = prompt('닉네임을 입력해주세요');

// 전송 버튼 클릭 시 입력된 글을 message 이벤트로 보냄
function sendMessage() {
    const message = $('#message').val();
    $('#chat').append(`<div>나: ${message}</div>`);  // 내 메세지는 바로보냄
    socket.emit('message', {message, nickname});     // 다른사람 메세지
}

function createRoom() {
    const room = prompt('생성할 방의 이름을 입력해 주세요');
    roomSocket.emit('createRoom', {room, nickname});
}

roomSocket.on('rooms', (data) => {
    console.log(data);
    const lis = data.map(
        (room) => `<li>${room} <button onclick="joinRoom('${room}')">join</button>`,
    );
    document.querySelector('#rooms').innerHTML = lis;
});

function joinRoom(room) {
    roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
    document.querySelector('#chat').innerHTML = '';
    currentRoom = room;
}


socket.on('connect', () => {    // 서버 접속을 확인하기 위한 이벤트
    console.log('connected');
});

socket.on('message', (message) => { // 서버 message 이벤트 발생시 처리
    $('#chat').append(`<div>${message}</div>`);
});