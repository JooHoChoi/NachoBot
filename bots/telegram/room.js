// room.js
const game = require('./game')

let room = [];
const maxParticipants = 5; // 최대 참여자 수
let gameStarted = false; // 게임 시작 여부를 저장하는 변수

//테스트용 변수
// const roomTest = [
//   { id: 5771249800, name: '주호1' },
//   { id: 5771249800, name: '주호2' },
//   { id: 5771249800, name: '주호3' },
//   { id: 5771249800, name: '주호4' },
//   { id: 5771249800, name: '주호5' },
//   { id: 5771249800, name: '주호6' },
//   { id: 5771249800, name: '주호7' },
//   { id: 5771249800, name: '주호8' },
//   { id: 5771249800, name: '주호9' },
//   { id: 5771249800, name: '주호10' },
//   { id: 5771249800, name: '주호11' },
//   { id: 5771249800, name: '주호12' }, 
// ]

// const usertest = [{ id: 5771249800, name: '주호' }, {id: 6100250744, name: '자추'}, {id: 6330829908, name: '신남'}]
// const usertest2 = {id: 5771249800, name: '주호'}

function getRoom(){
  return room;
}

function isRoomFull() {
  return room.length >= maxParticipants;
}

function isUserAlreadyInRoom(chatId) {
  return room.some(user => user.id === chatId);
}

function addUserInfoToRoom(chatId, name, bot) {
  const user = { id: chatId, name: name };
  room.push(user);
  console.log(user.name + "님이 참가했습니다.");
  console.log(room);
  if(room.length === maxParticipants){
    bot.sendMessage(room[0].id, `풀방이 되었습니다. 게임을 시작해주세요`);
  }
}

function removeUserFromRoom(chatId) {
  const userIndex = room.findIndex(user => user.id === chatId);
  room.splice(userIndex, 1);
}

function startGame(bot) {
  if(gameStarted===false){
    gameStarted = true;
    game.startGame(room, function(callback_mapping){
      //console.log(callback_mapping)
      const participantNames = Object.values(callback_mapping).map(callback_mapping => callback_mapping.name);
      const startMsg = `
      **데스노트 게임을 시작합니다!!**
참여 플레이어의 이름: ${participantNames}`;   
        for(const key in callback_mapping){
          const participant = callback_mapping[key];
          const roleMsg = `당신의 역할은 ${participant.role} 입니다.`;
          bot.sendMessage(participant.id, startMsg)
          setTimeout(()=>{ 
            bot.sendMessage(participant.id, roleMsg)
          }, 2000)
        }
    });  
  }
  else{
    const message = `이미 게임이 시작된 상태입니다`
  }
}

function getRoomStatus() {
  if(gameStarted === false){
    if (room.length === 0) {
      return '참여한 사용자가 없습니다.';
    }
  
    const participantNames = room.map(user => user.name).join(', ');
    const participantCount = room.length;
    return `현재 참여자: ${participantNames}\n참여자 수: ${participantCount}/${maxParticipants}`;
  }
  else{
    return '게임이 진행중입니다. 게임 명령어만 사용이 가능합니다.'
  }
}

function getGameStatus(){
  return gameStarted;
}

function resetRoom() {
  room = [];
  gameStarted = false;
}

module.exports = {
  getRoom,
  isRoomFull,
  isUserAlreadyInRoom,
  addUserInfoToRoom,
  removeUserFromRoom,
  startGame,
  getRoomStatus,
  resetRoom,
  getGameStatus
};
