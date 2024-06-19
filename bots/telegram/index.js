// API KEY 값 import
const { token, chatId } = require('../../config/telegram.json');
// telegram Bot 선언
const TelegramBot = require('node-telegram-bot-api');

const fs = require('fs');
const mysql = require('mysql');
const config = require('./config'); // config.js 파일에서 MySQL 설정 가져오기

//외부 JS
const room = require('./room');
const game = require('./game');
const sasinGame = require('./sasin_game');

// 텔레그램 봇을 생성하고, polling 방식으로 메세지를 가져옴
const bot = new TelegramBot(token, { polling: true });

const masterId = 5771249800;

// MySQL 연결 설정 
const connection = mysql.createConnection(config.mysql);

// MySQL 연결
connection.connect(err => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return; 
  }
  console.log('MySQL에 연결되었습니다.');
  bot.sendMessage(masterId, 'MySQL에 연결되었습니다.');
}); 

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
    /시작 사신 : 방장(/현황 맨 앞 플레이어)이 사신 모드 게임을 시작합니다(9~12인) 
    /민원 [할말]: 방장에게 민원을 넣습니다.
  
<게임 명령어 - 공용스킬>
    /귓 [이름] [할말] : 익명의 발신자로 [이름]에게 할말을 전달(10회 한정)
    /쪽지 [이름] [할말] : 본인을 발신자로 [이름]에게 할말을 전달(2회 한정)
    

<기타 명령어>
    /자추 A B: A가 B에게 자추를 시전합니다`;
    
    bot.sendMessage(chatId, response);
  });

  //룰북 주소 전달 메세지
  bot.onText(/\/룰북/, (msg, match) => {
    const chatId = msg.chat.id;  

    const rulebook = `https://nachomafia.azurewebsites.net/`
    
    bot.sendMessage(chatId, rulebook);
  });

  // '/게임참가' 명령어가 오면, 참가, 나가기, 현황, 시작 명령어를 선택할 수 있는 회신을 보냄
  bot.onText(/\/대기실/, (msg) => {
    const chatId = msg.chat.id;
    const keyboard = {
      keyboard: [
        [{ text: '/참가' }, { text: '/나가기' }],
        [{ text: '/참모현' }, { text: '/참유현' }],
        [{ text: '/유형' }, { text: '/모드' }],
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
        bot.sendMessage(chatId, '게임은 4인부터 플레이 가능하며, 방장만 시작할 수 있습니다.');
      }
    });

    //모드 - 이미지 송출 여부 선택가능
    bot.onText(/\/모드/, (msg) => {
      // 'msg' : 텔레그램으로 부터 수신한 메세지
      const chatId = msg.chat.id;
      
      room.changeTextMode(chatId, bot)
    });

    //DLC - 사신
    bot.onText(/\/유형/, (msg) => {
      // 'msg' : 텔레그램으로 부터 수신한 메세지
      const chatId = msg.chat.id;
      if(chatId === room.getRoom()[0].id || chatId === masterId){
      //if(chatId === room.getRoom()[0].id || chatId === masterId){  
        room.changeGameMode(chatId, bot)
      }
      else{
        bot.sendMessage(chatId, '게임유형 변경은 방장 또는 관리자만 사용할 수 있습니다.');
      }
    });


    //참여중인 사람 확인
    bot.onText(/\/현황/, (msg) => {
      const chatId = msg.chat.id;
      const response = room.getRoomStatus();
      bot.sendMessage(chatId, response);
    });

    //방장 재촉하기
    bot.onText(/\/민원 (.+)/, (msg, match) => {
      const chatId = msg.chat.id
      const message = match[1];
      const roomMasterId = room.getRoom()[0].id
      if(room.getGameStatus() === false){
        bot.sendMessage(roomMasterId, '민원이 들어왔습니다\n내용: ' + message);
        bot.sendMessage(chatId, `방장에게 민원을 전달했습니다. 너무 자주 나무라진 말아주세요^^`)  
      }
      else{
        bot.sendMessage(roomMasterId, '게임중에는 사용이 불가능합니다.');
      }
    });

    //강퇴하기
    bot.onText(/\/강퇴 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const person = match[1].split(' ');;
      const values = person[0];
      
      if(chatId === room.getRoom()[0].id || chatId === masterId){
        room.expelUserFromRoom(chatId, values, bot); // 사용자를 room 배열에서 추방하는 함수 호출
      }
      else{
        bot.sendMessage(chatId, '강퇴기능은 방장 또는 관리자만 사용할 수 있습니다.');
      }
      
    });

    //참가모드현황
    bot.onText(/\/참모현/, (msg, match) => {
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
      
      // 모드
      room.changeTextMode(chatId, bot)
      
      // 현황
      const res = room.getRoomStatus();
      bot.sendMessage(chatId, res);
    });

    //참가유형현황
    bot.onText(/\/참유현/, (msg, match) => {
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
      
      // 모드
      if(chatId === room.getRoom()[0].id || chatId === masterId){
      //if(chatId === room.getRoom()[0].id || chatId === masterId){  
        room.changeGameMode(chatId, bot)
      }
      else{
        bot.sendMessage(chatId, '게임유형 변경은 방장 또는 관리자만 사용할 수 있습니다.');
      }
      
      // 현황
      const res = room.getRoomStatus();
      bot.sendMessage(chatId, res);
    });


    //게임 명령어

    //게시판
    // bot.onText(/^\/게시판 (.+)/, (msg) => {
    //   const chatId = msg.chat.id;
      
    //   if(room.getGameStatus() === false){
    //     bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
    //   }
    //   else{
        
    //   }
    // });

    // //메모 [역할] [메모내용]
    // bot.onText(/^\/메모 (.+)/, (msg, match) => {
    //   const chatId = msg.chat.id;
    //   const input = match[1];
    //   const values = input.split(' ');

    //   const target = values[0];
    //   const reason_id = values.slice(1).join(' ');
      
    //   if(room.getGameStatus() === false){
    //     bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
    //   }
    //   else if(reason_id.length>=6){
    //     bot.sendMessage(chatId, '게시판에 등록할 내용이 너무 깁니다.');
    //   }
    //   else{
    //     if (values.length >= 2) {
          
    //     } else {
    //       bot.sendMessage(chatId, '역할과 메모내용을 잘 구분해주세요');
    //     }
    //   }
    // });
    //제거

    //귓 [상대] [메세지]
    bot.onText(/^\/귓 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        if (values.length >= 2) {
          const receiver = values[0];
          const whisper_msg = values.slice(1).join(' ');
          game.whisper(chatId, receiver, whisper_msg, bot);
        } else {
          bot.sendMessage(chatId, '이름과 메세지를 잘 구분해주세요');
        }
      }
    });

    //쪽지 [상대] [메세지]
    bot.onText(/^\/쪽지 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        if (values.length >= 2) {
          const receiver = values[0];
          const note_msg = values.slice(1).join(' ');
          game.note(chatId, receiver, note_msg, bot);
        } else {
          bot.sendMessage(chatId, '이름과 메세지를 잘 구분해주세요');
        }
      }
    });


    //명교 [상대]
    // bot.onText(/\/명교 (.+)/, (msg, match) => {
    //   const chatId = msg.chat.id;
    //   const receiver = match[1];
      
    //   if(room.getGameStatus() === false){
    //     bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
    //   }
    //   else{
    //     game.namecard_exchange(chatId, receiver, msg, bot)
    //   }
    // });

    //키라 체포 - 엘, 니아
    bot.onText(/^\/체포 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const capturedPerson = match[1];
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.arrest_Kira(chatId, capturedPerson, bot, function(arrest){
          if(arrest === true){
            room.resetRoom();
          }
        })  
      }
    });

    //방송 - 엘, 니아, 키요미(2회)
    bot.onText(/^\/방송 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const broadMsg = `[L방송] : ` + match[1];
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.broadcast(chatId, broadMsg, bot)  
      }
    });

    //도청 - 엘
    bot.onText(/^\/도청 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const target = match[1];
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.wiretapping(chatId, target, msg, bot);  
      }
    });    

    //키요미 감시 - 니아
    bot.onText(/^\/감시 (.+)/, (msg, match) => {
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
    
    //키요미 납치 - 멜로
    bot.onText(/^\/납치 (.+)/, (msg, match) => {
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

    //노트조각 + 역할 - 멜로
    bot.onText(/^\/노트조각 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      let deathreason = '심장마비';
      
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        if (values.length >= 2) {
          const role = values[0];
          const capturedPerson = values[1];
          if (values.length > 2) {
            deathreason = values.slice(2).join(' '); // 사용자가 입력한 값으로 업데이트됩니다.
            if(deathreason == '생존'){
              deathreason = '심장마비';
              game.pieceNote(chatId, role, capturedPerson, deathreason, bot, function(pieceNote){
                if(pieceNote === true){
                  room.resetRoom();
                }
              });
            }
            else{
              game.pieceNote(chatId, role, capturedPerson, deathreason, bot, function(pieceNote){
                if(pieceNote === true){
                  room.resetRoom();
                }
              });
            }
          }
          else{
            game.pieceNote(chatId, role, capturedPerson, deathreason, bot, function(pieceNote){
              if(pieceNote === true){
                room.resetRoom();
              }
            });
          }

        } else {
          bot.sendMessage(chatId, '역할과 이름을 잘 구분해주세요');
        }
      }
    });

    //집사 - 와타리
    bot.onText(/^\/집사/, (msg) => {
      const chatId = msg.chat.id;

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        //game.js 함수에서 스킬사용 가능자인지 체크
        game.deacon(chatId, bot);  
      }
    });

    //와미즈하우스 - 와타리
    bot.onText(/^\/와미즈하우스 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const NiaMelo = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        //game.js 함수에서 스킬사용 가능자인지 체크
        game.wamizuHouse(chatId, NiaMelo, bot);  
      }
    });

    //미사 연금 - 할리드너
    bot.onText(/^\/연금 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const role = '미사'
      const arrestPerson = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.arrest_Misa(chatId, role, arrestPerson, bot);  
      }
    });

    //수사관 + 이름 - 할리드너
    bot.onText(/^\/수사관 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const detectivePerson = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.check_detective(chatId, detectivePerson, bot);  
      }
    });

    //미행 + 이름 - 모기
    bot.onText(/^\/미행 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const followPerson = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.follow(chatId, followPerson, bot);  
      }
    });

    //엘확인 - 모기
    bot.onText(/^\/엘확인/, (msg) => {
      const chatId = msg.chat.id;

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.check_L(chatId, bot);  
      }
    });

    //바보 - 마츠다
    bot.onText(/^\/바보 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const checkPerson = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.babo(chatId, checkPerson, bot);  
      }
    });    

    //바꿔치기 + 이름 - 제반니
    bot.onText(/^\/바꿔치기 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const role = '미카미'
      const changeNote = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.arrest_Mikami(chatId, role, changeNote, bot);  
      }
    });

    //추적 + 이름 - 제반니
    bot.onText(/^\/추적 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const chasePerson = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.chase(chatId, chasePerson, bot);  
      }
    });
    
    //데스노트 + 역할 + 이름 - 라이토
    bot.onText(/^\/데스노트 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      let deathreason = '심장마비';
      
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        if (values.length >= 2) {
          const role = values[0];
          const capturedPerson = values[1];
          if (values.length > 2) {
            deathreason = values.slice(2).join(' '); // 사용자가 입력한 값으로 업데이트됩니다.
            if(deathreason == '생존'){
              deathreason = '심장마비';
              game.deathNote(chatId, role, capturedPerson, deathreason, bot, function(deathNotes){
                if(deathNotes === true){ 
                  room.resetRoom();
               }
              });
            }
            else{
              game.deathNote(chatId, role, capturedPerson, deathreason, bot, function(deathNotes){
                if(deathNotes === true){ 
                  room.resetRoom();
               }
              });
            }
          }
          else{
            game.deathNote(chatId, role, capturedPerson, deathreason, bot, function(deathNotes){
              if(deathNotes === true){ 
                room.resetRoom();
             }
            });
          }    
        } else {
          bot.sendMessage(chatId, '역할과 이름을 잘 구분해주세요');
        }
      }
    });

    //시계노트 + 역할 + 이름 - 라이토
    bot.onText(/^\/시계노트 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      let deathreason = '심장마비';
      
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        if (values.length >= 2) {
          const role = values[0];
          const capturedPerson = values[1];
          if (values.length > 2) {
            deathreason = values.slice(2).join(' '); // 사용자가 입력한 값으로 업데이트됩니다.
            if(deathreason == '생존'){
              deathreason = '심장마비';
              game.watchNote(chatId, role, capturedPerson, deathreason, bot, function(watchNote){
                if(watchNote === true){ 
                  room.resetRoom();
                }
              });
            }
            else{
              game.watchNote(chatId, role, capturedPerson, deathreason, bot, function(watchNote){
                if(watchNote === true){ 
                  room.resetRoom();
                }
              });
            }
          }
          else{
            game.watchNote(chatId, role, capturedPerson, deathreason, bot, function(watchNote){
              if(watchNote === true){ 
                room.resetRoom();
              }
            });
          }
        } else {
          bot.sendMessage(chatId, '역할과 이름을 잘 구분해주세요');
        }
      }
    });

    //연모 - 미사
    bot.onText(/^\/연모/, (msg) => {
      const chatId = msg.chat.id;

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        //game.js 함수에서 스킬사용 가능자인지 체크
        game.love_Kira(chatId, bot);  
      }
    });

    //사신의눈 - 미사
    bot.onText(/^\/사신의눈 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const envoyEye = match[1];

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        //game.js 함수에서 스킬사용 가능자인지 체크
        game.envoyEyes(chatId, envoyEye, bot);  
      }
    });

    bot.onText(/^\/렘의노트 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      let deathreason = '심장마비';
      
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        if (values.length >= 2) {
          const role = values[0];
          const capturedPerson = values[1];
          if (values.length > 2) {
            deathreason = values.slice(2).join(' '); // 사용자가 입력한 값으로 업데이트됩니다.
            if(deathreason == '생존'){
              deathreason = '심장마비';
              game.remNote(chatId, role, capturedPerson, deathreason, bot, function(deathNotes){
                if(deathNotes === true){ 
                  room.resetRoom();
               }
              });
            }
            else{
              game.remNote(chatId, role, capturedPerson, deathreason, bot, function(deathNotes){
                if(deathNotes === true){ 
                  room.resetRoom();
               }
              });
            }
          }
          else{
            game.remNote(chatId, role, capturedPerson, deathreason, bot, function(deathNotes){
              if(deathNotes === true){ 
                room.resetRoom();
             }
            });
          }    
        } else {
          bot.sendMessage(chatId, '역할과 이름을 잘 구분해주세요');
        }
      }
    });

    //정보수집 - 키요미
    bot.onText(/^\/정보수집 (.+)/, (msg, match) => {
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

    //속옷노트 - 키요미
    bot.onText(/^\/속옷노트/, (msg) => {
      const chatId = msg.chat.id;

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        //game.js 함수에서 스킬사용 가능자인지 체크
        game.underwearNote(chatId, bot);
      }
    });

    //대신노트 + 역할 + 이름 - 미카미
    bot.onText(/^\/대신노트 (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const input = match[1];
      const values = input.split(' ');
      let deathreason = '심장마비';
      
      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        if (values.length >= 2) {
          const role = values[0];
          const capturedPerson = values[1];
          if (values.length > 2) {
            deathreason = values.slice(2).join(' '); // 사용자가 입력한 값으로 업데이트됩니다.
            if(deathreason == '생존'){
              deathreason = '심장마비';
              game.desinNote(chatId, role, capturedPerson, deathreason, bot, function(desinNotes){
                if(desinNotes === true){ 
                  room.resetRoom();
                }
              });
            }
            else{
              game.desinNote(chatId, role, capturedPerson, deathreason, bot, function(desinNotes){
                if(desinNotes === true){ 
                  room.resetRoom();
                }
              });
            }
          }
          else{
            game.desinNote(chatId, role, capturedPerson, deathreason, bot, function(desinNotes){
              if(desinNotes === true){ 
                room.resetRoom();
              }
            });
          }
        } else {
          bot.sendMessage(chatId, '역할과 이름을 잘 구분해주세요');
        }
      }
    });    

    //키라숭배 - 미카미
    bot.onText(/^\/키라숭배/, (msg) => {
      const chatId = msg.chat.id;

      if(room.getGameStatus() === false){
        bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
      }
      else{
        game.worship_Kira(chatId, bot);  
      }
    });
    /////////////////////////////////////////  사신전 ///////////////////////////////////////////////////////
    //사신노트 + 역할 + 이름 - 모든 사신
    // bot.onText(/^\/사신노트 (.+)/, (msg, match) => {
    //   const chatId = msg.chat.id;
    //   const input = match[1];
    //   const values = input.split(' ');
    //   let deathreason = '심장마비';
      
    //   if(room.getGameStatus() === false){
    //     bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
    //   }
    //   else{
    //     if (values.length >= 2) {
    //       const role = values[0];
    //       const capturedPerson = values[1];
    //       if (values.length > 2) {
    //         deathreason = values.slice(2).join(' '); // 사용자가 입력한 값으로 업데이트됩니다.
    //         if(deathreason == '생존'){
    //           deathreason = '심장마비';
    //           sasinGame.sasinNote(chatId, role, capturedPerson, deathreason, bot, function(deathNotes){
    //             if(deathNotes === true){ 
    //               room.resetRoom();
    //             }
    //           });
    //         }
    //         else{
    //           sasinGame.sasinNote(chatId, role, capturedPerson, deathreason, bot, function(deathNotes){
    //             if(deathNotes === true){ 
    //               room.resetRoom();
    //             }
    //           });
    //         }
    //       }
    //       else{
    //         sasinGame.sasinNote(chatId, role, capturedPerson, deathreason, bot, function(deathNotes){
    //           if(deathNotes === true){ 
    //             room.resetRoom();
    //           }
    //         });
    //       }    
    //     } else {
    //       bot.sendMessage(chatId, '역할과 이름을 잘 구분해주세요');
    //     }
    //   }
    // });

    // //방송 - 사신대왕, 킨다라
    // bot.onText(/^\/사신방송 (.+)/, (msg, match) => {
    //   const chatId = msg.chat.id;
    //   const broadMsg = `[사신 방송] : ` + match[1];
    //   if(room.getGameStatus() === false){
    //     bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
    //   }
    //   else{
    //     sasinGame.broadcast(chatId, broadMsg, bot)  
    //   }
    // });
    
    // //사신정보 - 누, 아라모니아
    // bot.onText(/^\/사신정보 (.+)/, (msg, match) => {
    //   const chatId = msg.chat.id;
    //   const input = match[1];
    //   const values = input.split(' ');
      
    //   if(room.getGameStatus() === false){
    //     bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
    //   }
    //   else{
    //     if (values.length >= 2) {
    //       const role = values[0];
    //       const infoPerson = values[1];
    //       sasinGame.getInfo(chatId, role, infoPerson, bot)
    //     } else {
    //       bot.sendMessage(chatId, '역할과 이름을 잘 구분해주세요');
    //     }
    //   }
    // });

    // //음식먹기  - 류크, 미드라, 칼리카차
    // bot.onText(/^\/음식먹기 (.+)/, (msg) => {
    //   const chatId = msg.chat.id;
    //   if(room.getGameStatus() === false){
    //     bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
    //   }
    //   else{
    //     sasinGame.eatFood(chatId, bot)  
    //   }
    // });
    // //금단의사랑  - 렘, 제라스
    // bot.onText(/^\/금단의사랑 (.+)/, (msg) => {
    //   const chatId = msg.chat.id;
    //   if(room.getGameStatus() === false){
    //     bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
    //   }
    //   else{
    //     sasinGame.forbiddenLove(chatId, bot)  
    //   }
    // });

    // //스킬확인  -  모든 사신, 쿨타임확인, 스킬사용 가능여부
    // bot.onText(/^\/스킬확인 (.+)/, (msg) => {
    //   const chatId = msg.chat.id;
    //   if(room.getGameStatus() === false){
    //     bot.sendMessage(chatId, '게임중에만 사용할 수 있습니다.');
    //   }
    //   else{
    //     sasinGame.skillcheck(chatId, bot)  
    //   }
    // });
      

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

    //타임아웃 초기화
    bot.onText(/\/타임리셋/, (msg, match) => {
      // 'msg' : 텔레그램으로 부터 수신한 메세지
      // 'match' : 정규식을 실행한 결과
       const chatId = msg.chat.id; 
       if(chatId === masterId){
         game.clearAllTimeout(bot);
         const resp = `타임아웃 및 인터벌을 초기화 합니다`;
         bot.sendMessage(chatId, resp);
       }else{
         const resp = `관리자만 사용할 수 있는 기능입니다`;
         bot.sendMessage(chatId, resp)
       }
    });

    bot.onText(/\/사진/, (msg, match) => {
      const chatId = msg.chat.id;
      console.log(__dirname)
      const photoPath = __dirname + '/img/start.jpg'; // 이미지 파일 경로
      bot.sendPhoto(chatId, photoPath, { caption: '사진입니다.' })
      .then(() => {
        console.log('사진 전송 완료');
      })
      .catch((error) => {
        console.error('사진 전송 실패:', error);
      });
    });
}

module.exports = { 
   start: start,
   reset: reset
};

function reset(){
  room.resetRoom();
}
