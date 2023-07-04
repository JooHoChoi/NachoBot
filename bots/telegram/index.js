// API KEY 값 import
const { token, chatId } = require('../../config/telegram.json');
// telegram Bot 선언
const TelegramBot = require('node-telegram-bot-api');

//외부 JS
const room = require('./room');
const game = require('./game');

// 텔레그램 봇을 생성하고, polling 방식으로 메세지를 가져옴
const bot = new TelegramBot(token, { polling: true });

const masterId = 5771249800;
function start() {  
   
   //'/cmd' 라는 명령어가 오면, 명령어 리스트를 전달한다.
   bot.onText(/\/cmd/, (msg, match) => {
    const chatId = msg.chat.id;  
    const response =`
    <명령어 리스트>
    /참가: 게임에 참가합니다.
    /나가기: 참여한 게임에서 나갑니다.
    /현황: 참가신청 현황을 확인합니다.
    /시작: 방장(/현황 맨 앞 플레이어)이 게임을 시작합니다(9~12인)
  
<게임 명령어>
    /스킬: 사용가능한 스킬을 확인합니다(개발중)
    
<기타 명령어>
    /자추 A B: A가 B에게 자추를 시전합니다`;

    
    bot.sendMessage(chatId, response);
  });

   // '/참가' 라는 명령어가 오면, 게임 참가를 받는다
   bot.onText(/\/참가/, (msg, match) => {
      // 'msg' : 텔레그램으로 부터 수신한 메세지
      // 'match' : 정규식을 실행한 결과
      const chatId = msg.chat.id;
      const name = msg.from.first_name;
    
      if (room.isRoomFull()) {
        bot.sendMessage(chatId, '이미 최대 참여자 수에 도달했습니다.');
        return;
      }
    
      if (room.isUserAlreadyInRoom(chatId)) {
        bot.sendMessage(chatId, '이미 참여하셨습니다.');
        return;
      }
    
      room.addUserInfoToRoom(chatId, name); // 사용자 정보를 room 배열에 추가하는 함수 호출
    
      const response = `안녕하세요, ${name}님! \n당신의 ID는 ${chatId}입니다.`;
    
      bot.sendMessage(chatId, response);
    });

    bot.onText(/\/나가기/, (msg) => {
      const chatId = msg.chat.id;
    
      if (!room.isUserAlreadyInRoom(chatId)) {
        bot.sendMessage(chatId, '참여한 사용자가 아닙니다.');
        return;
      }
    
      room.removeUserFromRoom(chatId); // 사용자를 room 배열에서 제거하는 함수 호출
    
      bot.sendMessage(chatId, '게임에서 나갔습니다.');
    });

    bot.onText(/\/시작/, (msg) => {
      const chatId = msg.chat.id
      if (room.getRoom().length >= 9 && chatId === room.getRoom()[0].id) {
        room.startGame(bot); // 게임 시작 함수 호출
      } else {
        bot.sendMessage(chatId, '게임을 시작할 수 있는 조건이 충족되지 않았습니다.');
      }
    });
    
    //참여중인 사람 확인
    bot.onText(/\/현황/, (msg) => {
      const chatId = msg.chat.id;
      const response = room.getRoomStatus();
      bot.sendMessage(chatId, response);
    });
    
    //관리자용 명령어
    //참가인원 초기화
    bot.onText(/\/초기화/, (msg, match) => {
      // 'msg' : 텔레그램으로 부터 수신한 메세지
      // 'match' : 정규식을 실행한 결과
       const chatId = msg.chat.id; 
       if(chatId === masterId){
         room.resetRoom();
         const resp = `참가자 명단을 초기화 합니다`;
         bot.sendMessage(chatId, resp);
       }else{
         const resp = `관리자만 사용할 수 있는 기능입니다`;
         bot.sendMessage(chatId, resp)
       }
    });

    bot.onText(/\/데스노트 (.+)/, (msg, match) => {
      console.log(match);   
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      
      if (values.length >= 2) {
        const value1 = values[0];
        const value2 = values[1];
    
        bot.sendMessage(chatId, `입력된 값1: ${value1}\n입력된 값2: ${value2}`);
      } else {
        bot.sendMessage(chatId, '2개의 값을 띄어쓰기로 구분하여 입력해주세요.');
      }
    });

    bot.onText(/\/자추 (.+)/, (msg, match) => {
      console.log(match);   
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      
      if (values.length >= 2) {
        const value1 = values[0];
        const value2 = values[1];
    
        bot.sendMessage(chatId, `**어죽자죽 자추 시스템**
        \n${value1}(이)가 ${value2}에게 자추를 시전합니다`);
      } else {
        bot.sendMessage(chatId, '추천인과 자추인을 잘 구분해주세요');
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
   start: start
};