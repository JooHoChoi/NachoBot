// API KEY 값 import
const { token, chatId } = require('../../config/telegram.json');
// telegram Bot 선언
const TelegramBot = require('node-telegram-bot-api');

// 텔레그램 봇을 생성하고, polling 방식으로 메세지를 가져옴
const bot = new TelegramBot(token, { polling: true });

function start() {
   // '/echo' 라는 명령어가 오면, 로직 수행 후 => 따라 말한다.
   bot.onText(/\/start/, (msg, match) => {
      // 'msg' : 텔레그램으로 부터 수신한 메세지
      // 'match' : 정규식을 실행한 결과 
     
       const chatId = msg.chat.id;
       const resp = '게임을 시작합니다...당신의 ID는' + chatId +'입니다.';
       //const resp = '따라하기 : ' + match[1];
       console.log(chatId);
       bot.sendMessage(chatId, resp);
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