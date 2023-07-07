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
    <대기실 명령어>
    /대기실: 대기실 명령어 전체를 보여줍니다
    /참가: 게임에 참가합니다.
    /나가기: 참여한 게임에서 나갑니다.
    /현황: 참가신청 현황을 확인합니다.
    /시작: 방장(/현황 맨 앞 플레이어)이 게임을 시작합니다(9~12인)
  
<게임 명령어 - 대괄호는 생략>
    <엘/니아 스킬>
    /체포 [역할]: 키라로 의심되는 플레이어 이름을 입력
      (성공 시, L측 승리 / 실패 시, L의 정체가 전 플레이어에게 공개됨)
    /방송: L의 이름으로 모든 플레이어에게 메세지를 보냅니다
      (쿨타임 1분(테스트 10초) / 니아는 L이 사망상태일 경우에만 사용가능)
    
    <니아 스킬>
    /감시 [이름]: 입력한 이름이 키요미일 경우, 정보 수집 스킬을 사용불가상태로 만든다.(쿨타임 1분(테스트 10초)) 
    
    <멜로 스킬>
    /납치 [이름]: 입력한 이름이 키요미일 경우, 키요미를 납치(=살인) / 틀릴경우, 멜로의 정체가 모두에게 공개된다
    
    <키라 스킬>
    /데스노트 [역할] [이름]: 죽이고 싶은 역할을 입력한 뒤, 해당 역할로 의심되는 플레이어 이름을 입력(쿨타임 60초(테스트 30초))
      (성공 시, 해당 플레이어는 40초뒤 사망(테스트 5초))
    
    <키요미 스킬> 
    /정보수집 [역할] [이름]:  역할과 이름을 유추하여 맞으면 알 수 있다. (단, 엘,니아,멜로의 정보는 알 수 없다) - 쿨타임 1분(테스트 10초))
    /방송: L의 이름으로 방송을 할 수 있다.(2회 한정, 쿨타임 없음)

<기타 명령어>
    /자추 A B: A가 B에게 자추를 시전합니다`;

    
    bot.sendMessage(chatId, response);
  });

  // '/게임참가' 명령어가 오면, 참가, 나가기, 현황, 시작 명령어를 선택할 수 있는 회신을 보냄
  bot.onText(/\/대기실/, (msg) => {
    const chatId = msg.chat.id;
    const keyboard = {
      keyboard: [
        [{ text: '/참가' }, { text: '/나가기' }],
        [{ text: '/현황' }, { text: '/시작' }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    };
    const response = '게임에 참가하시려면 아래 명령어를 선택하세요.';
    bot.sendMessage(chatId, response, { reply_markup: keyboard });
  });
  
   // '/참가' 라는 명령어가 오면, 게임 참가를 받는다
   bot.onText(/\/참가/, (msg, match) => {
      // 'msg' : 텔레그램으로 부터 수신한 메세지
      // 'match' : 정규식을 실행한 결과
      const chatId = msg.chat.id;
      const name = msg.from.first_name;
      if (room.getGameStatus() === true){
        bot.sendMessage(chatId, '이미 게임이 진행중입니다.');
        return;
      }
      if (room.isRoomFull()) {
        bot.sendMessage(chatId, '이미 최대 참여자 수에 도달했습니다.');
        return;
      }
    
      if (room.isUserAlreadyInRoom(chatId)) {
        bot.sendMessage(chatId, '이미 참여하셨습니다.');
        return;
      }
    
      room.addUserInfoToRoom(chatId, name, bot); // 사용자 정보를 room 배열에 추가하는 함수 호출
    
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

      if (room.getRoom().length >= 3 && chatId === room.getRoom()[0].id) {
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




    //게임 명령어

    //키라 체포
    bot.onText(/\/체포 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const capturedPerson = match[1];
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.arrest_Kira2(chatId, capturedPerson, bot, function(arrest){
          if(arrest === true){
            room.resetRoom();
          }
        })  
      }
    });

    //방송
    bot.onText(/\/방송 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const broadMsg = match[1];
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.broadcast(chatId, broadMsg, bot)  
      }
    });


    //키요미 감시
    bot.onText(/\/감시 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const role = '키요미'
      const watchingPerson = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.watching_Kiyomi(chatId, role, watchingPerson, bot);  
      }
    });
    
    //키요미 납치
    bot.onText(/\/납치 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const role = '키요미'
      const kidnapPerson = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        //game.js 데스노트 함수에서 스킬사용 가능자인지 체크
        game.kidnap_Kiyomi(chatId, role, kidnapPerson, bot);  
      }
    });

    //데스노트 + 역할
    bot.onText(/\/데스노트 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        if (values.length >= 2) {
          const role = values[0];
          const capturedPerson = values[1];
          game.deathNote(chatId, role, capturedPerson, bot, function(deathNotes){
            if(deathNotes === true){
              room.resetRoom();
            }
          });
        } else {
          bot.sendMessage(chatId, '역할과 이름을 잘 구분해주세요');
        }
      }
    });

    //정보수집
    bot.onText(/\/정보수집 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        if (values.length >= 2) {
          const role = values[0];
          const infoPerson = values[1];
          game.gatheringInfo(chatId, role, infoPerson, bot)
        } else {
          bot.sendMessage(chatId, '역할과 이름을 잘 구분해주세요');
        }
      }
    });

    //기타 명령어
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
}

module.exports = { 
   start: start
};

function reset(){
  room.resetRoom();
}