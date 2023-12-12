// room.js
const game = require('./game')

let room = [];
const maxParticipants = 12; // 최대 참여자 수
let gameStarted = false; // 게임 시작 여부를 저장하는 변수
let mode = '일반';

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
  const user = { id: chatId, name: name, mode: "이미지" };
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
  const startPhoto = __dirname + '/img/start.jpg'
  const roomPart = room.map((participant) => participant.name);
  if(gameStarted===false){
    gameStarted = true;
    game.startGame(room, mode, bot, function(callback_mapping){
      //일반 또는 사신모드
      if(mode=='일반' || mode=='사신'){
        const participantRole = Object.values(callback_mapping).map(callback_mapping => callback_mapping.role);
        const startMsg = `
        **데스노트 게임을 시작합니다!!**
  [게임 유형]
  ${mode} 모드
  
  [참여 플레이어의 이름]
  ${roomPart}
  
  [게임 역할${roomPart.length}인]
  ${participantRole}`;
          for(const key in callback_mapping){
            const participant = callback_mapping[key];
            const roleImg = __dirname + participant.img
            const roleMsg = `당신의 역할은 ${participant.role} 입니다.\n
  [**보유 스킬**]
  ${participant.explain}`;
            if(participant.mode==='이미지'){
              bot.sendPhoto(participant.id, startPhoto, { caption: startMsg })
              .then(() => {
                //console.log('사진 전송 완료');
              })
              .catch((error) => {
                console.error('사진 전송 실패:', error);
                bot.sendMessage(participant.id, startMsg)
              });
              setTimeout(()=>{
                bot.sendPhoto(participant.id, roleImg, { caption: roleMsg })
                .then(() => {
                  //console.log('사진 전송 완료');
                })
                .catch((error) => {
                  console.error('사진 전송 실패:', error);
                  bot.sendMessage(participant.id, roleMsg)
                });
              }, 2000)
            }
            else if(participant.mode==='텍스트'){
              bot.sendMessage(participant.id, startMsg)
              setTimeout(()=>{
                bot.sendMessage(participant.id, roleMsg)
              }, 2000)
            }
          }
      }
      //바보 모드
      else{
        //const participantRole = Object.values(callback_mapping).map(callback_mapping => callback_mapping.role);
        const startMsg = `
        **데스노트 게임을 시작합니다!!**
  [게임 유형]
  ${mode} 모드
  
  [참여 플레이어의 이름]
  ${roomPart}
  
  [게임 역할${roomPart.length}인]
  바보모드에서는 공개되지 않습니다`;
          for(const key in callback_mapping){
            const participant = callback_mapping[key];
            const roleMsg = `바보모드에서는 당신의 역할을 알려주지 않습니다`;
            if(participant.mode==='이미지'){
              bot.sendPhoto(participant.id, startPhoto, { caption: startMsg })
              .then(() => {
                //console.log('사진 전송 완료');
              })
              .catch((error) => {
                console.error('사진 전송 실패:', error);
                bot.sendMessage(participant.id, startMsg)
              });
              setTimeout(()=>{
                bot.sendMessage(participant.id, roleMsg)
              }, 2000)
            }
            else if(participant.mode==='텍스트'){
              bot.sendMessage(participant.id, startMsg)
              setTimeout(()=>{
                bot.sendMessage(participant.id, roleMsg)
              }, 2000)
            }
          }
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
    if(mode=='사신'){
      return `게임 유형: 사신\n현재 참여자: ${participantNames}\n참여자 수: ${participantCount}/${maxParticipants}`;
    }
    else if(mode=='바보'){
      return `게임 유형: 바보\n현재 참여자: ${participantNames}\n참여자 수: ${participantCount}/${maxParticipants}`;
    }
    else{
      return `게임 유형: 일반\n현재 참여자: ${participantNames}\n참여자 수: ${participantCount}/${maxParticipants}`;
    }
    
  }
  else{
    return '게임이 진행중입니다. 게임 명령어만 사용이 가능합니다.'
  }
}

function getGameStatus(){
  return gameStarted;
}

function changeTextMode(chatId, bot){
  if(gameStarted === false){
    const user = room.find(user => user.id === chatId);

    if (user) {
      user.mode = (user.mode === '이미지') ? '텍스트' : '이미지';
      bot.sendMessage(chatId, `${user.name}님의 모드가 변경되었습니다. 현재 모드: ${user.mode}`);
    } else {
      bot.sendMeesage('모드 변경에 실패했습니다');
    }
  }
  else{
    return '게임이 진행중입니다. 게임 명령어만 사용이 가능합니다.'
  }
  
}

function changeGameMode(chatId, bot){
  if(gameStarted === false){
    if(mode === '일반'){
      mode = '사신';
      bot.sendMessage(chatId, `게임 유형이 사신 유형으로 변경되었습니다.`);
    }
    else if(mode === '사신'){
      mode = '바보';
      bot.sendMessage(chatId, `게임 유형이 바보 유형으로 변경되었습니다.`);
    }
    else {
      mode = '일반';
      bot.sendMessage(chatId, `게임 유형이 일반 유형으로 변경되었습니다.`);
    }
  }
  else{
    return '게임이 진행중입니다. 게임 명령어만 사용이 가능합니다.'
  }
}

function resetRoom() {
  room = [];
  gameStarted = false;
  mode='일반';
}

function expelUserFromRoom(chatId, name, bot) {
  const userIndex = room.findIndex(user => user.name === name);
  if (userIndex !== -1) {
    const expelledUser = room.splice(userIndex, 1)[0];
    //console.log(`${expelledUser.name}님이 방에서 추방되었습니다.`);
    bot.sendMessage(chatId, `${expelledUser.name}님이 방에서 추방되었습니다.`);

    // 강퇴당한 사용자에게도 메시지를 전송
    bot.sendMessage(expelledUser.id, '방에서 추방되었습니다.');
  }
  else{
    bot.sendMessage(chatId, `${name}은(는) 방에 존재하지 않습니다.`);
  }
}
    
module.exports = {
  getRoom,
  isRoomFull,
  isUserAlreadyInRoom,
  addUserInfoToRoom,
  removeUserFromRoom,
  startGame,
  getRoomStatus,
  changeGameMode,
  changeTextMode,
  resetRoom: resetRoom,
  getGameStatus,
  expelUserFromRoom,
};