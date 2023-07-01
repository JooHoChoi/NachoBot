// API KEY 값 import
const { token, chatId } = require('../../config/telegram.json');
// telegram Bot 선언
const TelegramBot = require('node-telegram-bot-api');

// 텔레그램 봇을 생성하고, polling 방식으로 메세지를 가져옴
const bot = new TelegramBot(token, { polling: true });

const masterId = 5771249800;
function start() {

   let room = [];
   const maxParticipants = 12;  
   
   //'/cmd' 라는 명령어가 오면, 명령어 리스트를 전달한다.
   bot.onText(/\/cmd/, (msg, match) => {
    const chatId = msg.chat.id;  
    const response =
    `/참가: 게임에 참가합니다.
    /나가기: 참여한 게임에서 나갑니다.
    /현황: 참가신청 현황을 확인합니다`;
  
    bot.sendMessage(chatId, response);
  });

   // '/참가' 라는 명령어가 오면, 게임 참가를 받는다
   bot.onText(/\/참가/, (msg, match) => {
      // 'msg' : 텔레그램으로 부터 수신한 메세지
      // 'match' : 정규식을 실행한 결과
      const chatId = msg.chat.id;
      const name = msg.from.first_name;
    
      if (isRoomFull()) {
        bot.sendMessage(chatId, '이미 최대 참여자 수에 도달했습니다.');
        return;
      }
    
      if (isUserAlreadyInRoom(chatId)) {
        bot.sendMessage(chatId, '이미 참여하셨습니다.');
        return;
      }
    
      addUserInfoToRoom(chatId, name); // 사용자 정보를 room 배열에 추가하는 함수 호출
    
      const response = `안녕하세요, ${name}님! \n당신의 ID는 ${chatId}입니다.`;
    
      bot.sendMessage(chatId, response);
    });

    bot.onText(/\/나가기/, (msg) => {
      const chatId = msg.chat.id;
    
      if (!isUserAlreadyInRoom(chatId)) {
        bot.sendMessage(chatId, '참여한 사용자가 아닙니다.');
        return;
      }
    
      removeUserFromRoom(chatId); // 사용자를 room 배열에서 제거하는 함수 호출
    
      bot.sendMessage(chatId, '게임에서 나갔습니다.');
    });
    
    function isRoomFull() {
      return room.length >= maxParticipants;
    }
    
    function isUserAlreadyInRoom(chatId) {
      return room.some(user => user.id === chatId);
    }
    
    function addUserInfoToRoom(chatId, name) {
      const user = { id: chatId, name: name };
      room.push(user);
    }

    function removeUserFromRoom(chatId) {
      const userIndex = room.findIndex(user => user.id === chatId);
      room.splice(userIndex, 1);
    }

    //참여중인 사람 확인
    bot.onText(/\/현황/, (msg) => {
      const chatId = msg.chat.id;
    
      if (room.length === 0) {
        bot.sendMessage(chatId, '참여한 사용자가 없습니다.');
        return;
      }
    
      const participantNames = room.map(user => user.name).join(', ');
      const participantCount = room.length;
      const response = `현재 참여자: ${participantNames}\n참여자 수: ${participantCount}/${maxParticipants}`;

      bot.sendMessage(chatId, response);
    });
    
    //관리자용 명령어
    //참가인원 초기화
    bot.onText(/\/초기화/, (msg, match) => {
      // 'msg' : 텔레그램으로 부터 수신한 메세지
      // 'match' : 정규식을 실행한 결과
       const chatId = msg.chat.id; 
       if(chatId === masterId){
         room = [];
         const resp = `참가자 명단을 초기화 합니다`;
         console.log(room);
         bot.sendMessage(chatId, resp);
       }else{
         const resp = `관리자만 사용할 수 있는 기능입니다`;
         bot.sendMessage(chatId, resp)
       }
       

   });
   // .on('message')을 통해 bot이 어떤 메세지든 수신하도록 해줌
//    bot.on('message', (msg, ) => {
//       const chatId = msg.chat.id;
//       console.log(msg.chat.id);
//       // send a message to the chat acknowledging receipt of their message
//       bot.sendMessage(chatId, '메세지 수신 완료!');
//    });
}



module.exports = { 
   start: start,
};