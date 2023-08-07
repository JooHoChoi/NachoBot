// game.js
const charactor3 = require('./charactor3.json');
const charactor4 = require('./charactor4.json');
const charactor5 = require('./charactor5.json');
const charactor6 = require('./charactor6.json');
const charactor7 = require('./charactor7.json');
const charactor8 = require('./charactor8.json');
const charactor9 = require('./charactor9.json');
const charactor10 = require('./charactor10.json');
const charactor11 = require('./charactor11.json');
const charactor12 = require('./charactor12.json');

const index = require('./index');

let room;
let mapped_role;
let originalCharactor3;
let originalCharactor4;
let originalCharactor5;
let originalCharactor6;
let originalCharactor7;
let originalCharactor8;
let originalCharactor9;
let originalCharactor10;
let originalCharactor11;
let originalCharactor12;

//스킬 쿨다운 기준값
//스킬 쿨다운 체크값
const broadCool = 30000; //방송 스킬 쿨타임: 테스트: 10초, 본게임 30초
let broadCool_start;

const deathNoteCool = 90000; //데스노트 스킬 쿨타임: 테스트 60초, 본게임 90초
let deathNoteCool_start;
const deathCool = 40000; // 데스노트 스킬로 죽는데 걸리는 시간: 테스트 10초, 본게임 40초

const desinNoteCool = 90000; // 대신노트 스킬 쿨타임: 테스트 60초, 본게임 90초
let desinNoteCool_start;

const watching_Kiyomi_Cool = 60000; //키요미 감시 스킬 쿨타임: 테스트 10초, 본게임 60초
let watching_Kiyomi_Cool_start;

const kidnap_Kiyomi_Cool = 60000; //키요미 납치 스킬 쿨타임: 테스트 10초, 본게임 60초
let kidnap_Kiyomi_Cool_start;

const gatheringInfo_Cool = 30000; //정보수집 스킬 쿨타입: 테스트 10초, 본게임 30초
let gatheringInfo_Cool_start;

const arrest_Misa_Cool = 60000; //연금 스킬: 테스트 10초, 본게임 60초
let arrest_Misa_Cool_start;

const detective_Cool = 60000; //수사관 스킬: 테스트 10초, 본게임 60초
let detective_Cool_start;

const love_Kira_Cool = 120000; //연모 스킬: 테스트 15초, 본게임 120초(키라정체가 1분뒤 공개되기 때문)
let love_Kira_Cool_start;
const loveCool = 60000; // 연모스킬로 키라를 찾는데 걸리는 시간: 테스트 10초, 본게임 60초

const envoyEyes_Cool = 60000; //사신의눈 스킬: 테스트 10초, 본게임 60초
let envoyEyes_Cool_start;

const follow_Mogi_Cool = 120000; //미행 스킬: 테스트 15초, 본게임 120초
let follow_Mogi_Cool_start;
const followMogiCool = 60000; //미행스킬로 플레이어를 확인하는데 걸리는 시간: 테스트 10초, 본게임 60초

const check_L_Cool = 180000; // 엘확인 스킬: 테스트 30초, 본게임 180초
let check_L_Cool_start;

const babo_Mathuda_Cool = 60000; //바보 스킬: 테스트 10초, 본게임 60초
let babo_Mathuda_Cool_start;

const arrest_Mikami_Cool = 60000; //바꿔치기 스킬: 테스트 10초, 본게임 60초
let arrest_Mikami_Cool_start;

const chase_Jebanni_Cool = 120000; //추적 스킬: 테스트 15초, 본게임 120초
let chase_Jebanni_Cool_start;
const chaseJebanniCool = 60000; //추적스킬로 플레이어를 확인하는데 걸리는 시간: 테스트 10초, 본게임 60초

const worship_kira_Cool = 120000; // 키라숭배 스킬: 테스트 30초, 본게임 120초
let worship_kira_Cool_start;


function startGame(roomData, callback_mapping) {
  room = roomData;
  //3인 테스트용 조건문
  if(roomData.length === 3){
    if (!originalCharactor3) {
      originalCharactor3 = JSON.parse(JSON.stringify(charactor3));
      //console.log("최초 실행: " + JSON.stringify(originalCharactor));
      mapNameToJSON(roomData, charactor3, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor3));
      //console.log("다회차 진행:" + JSON.stringify(charactor_origin));
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
  //4인 조건문
  else if(roomData.length === 4){
    if (!originalCharactor4) {
      originalCharactor4 = JSON.parse(JSON.stringify(charactor4));
      mapNameToJSON(roomData, charactor4, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor4));
      console.log("3인후4인" + charactor_origin.length);
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
  //5인 조건문
  else if(roomData.length === 5){
    if (!originalCharactor5) {
      originalCharactor5 = JSON.parse(JSON.stringify(charactor5));
      mapNameToJSON(roomData, charactor5, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor5));
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
  //6인  조건문
  else if(roomData.length === 6){
    if (!originalCharactor6) {
      originalCharactor6 = JSON.parse(JSON.stringify(charactor6));
      mapNameToJSON(roomData, charactor6, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor6));
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
  //7인 조건문
  else if(roomData.length === 7){
    if (!originalCharactor7) {
      originalCharactor7 = JSON.parse(JSON.stringify(charactor7));
      mapNameToJSON(roomData, charactor7, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor7));
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
  //8인 조건문
  else if(roomData.length === 8){
    if (!originalCharactor8) {
      originalCharactor8 = JSON.parse(JSON.stringify(charactor8));
      mapNameToJSON(roomData, charactor8, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor8));
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
  //9인 조건문
  else if(roomData.length === 9){
    if (!originalCharactor9) {
      originalCharactor9 = JSON.parse(JSON.stringify(charactor9));
      mapNameToJSON(roomData, charactor9, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor9));
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
  //10인 조건문
  else if(roomData.length === 10){
    if (!originalCharactor10) {
      originalCharactor10 = JSON.parse(JSON.stringify(charactor10));
      mapNameToJSON(roomData, charactor10, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor10));
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
  //11인 조건문
  else if(roomData.length === 11){
    if (!originalCharactor11) {
      originalCharactor11 = JSON.parse(JSON.stringify(charactor11));
      mapNameToJSON(roomData, charactor11, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor11));
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
  //12인 조건문
  else if(roomData.length === 12){
    if (!originalCharactor12) {
      originalCharactor12 = JSON.parse(JSON.stringify(charactor12));
      mapNameToJSON(roomData, charactor12, function(callback) {
        callback_mapping(callback);
      });
    } else {
      const charactor_origin = JSON.parse(JSON.stringify(originalCharactor12));
      mapNameToJSON(roomData, charactor_origin, function(callback) {
        callback_mapping(callback);
      });
    }
  }
}

//캐릭 배정 알고리즘
function mapNameToJSON(roomData, charactor, callback){
  const jsonKeys = Object.keys(charactor); // JSON 키 배열 추출

  // 배열을 랜덤하게 섞는 Fisher-Yates 알고리즘
  for (let i = jsonKeys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [jsonKeys[i], jsonKeys[j]] = [jsonKeys[j], jsonKeys[i]];
  }

  for (let i = 0; i < jsonKeys.length; i++) {
    const key = jsonKeys[i];
    const nameIndex = Math.floor(Math.random() * roomData.length);
    charactor[key].name = roomData[nameIndex].name;
    charactor[key].id = roomData[nameIndex].id;
    roomData.splice(nameIndex, 1);
  }
  
  mapped_role = charactor;
  console.log(charactor);
  callback(charactor);
}

//키라 체포, 캐릭터: 엘, 니아
function arrest_Kira(chatId, capturedPerson, bot, arrest){
  const LwinPhoto = __dirname + '/img/LWin.jpg'
  if(mapped_role.L.id === chatId ){
    if(mapped_role.L.skill1 === true && mapped_role.L.alive === true){
      if(mapped_role.Kira.name === capturedPerson){
        console.log('L추리성공')
        for(const key in mapped_role){
          const participant = mapped_role[key];
          const arrestMsg = `**[속보] 키라 ${mapped_role.Kira.name} (이)가 체포되었습니다 -게임 종료-**`
          bot.sendPhoto(participant.id, LwinPhoto, { caption: arrestMsg })
          .then(() => {
            //console.log('사진 전송 완료');
          })
          .catch((error) => {
            //console.error('사진 전송 실패:', error);
            bot.sendMessage(participant.id, arrestMsg)
          });
        }
        arrest(true)
      }
      else{
        console.log('L추리실패')
        mapped_role.L.skill1 = false;
        for(const key2 in mapped_role){
          const participant2 = mapped_role[key2];
          const arrestMsg2 = `**[속보] 엘의 정체는 ${mapped_role.L.name} 입니다.**`
          bot.sendMessage(participant2.id, arrestMsg2)
        }
      }
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`)
    }
  }
  if(mapped_role.N.id === chatId){
    if(mapped_role.L.alive === false){
      if(mapped_role.N.skill1 === true && mapped_role.N.alive === true){
        if(mapped_role.Kira.name === capturedPerson){
          console.log('N추리성공')
          for(const key3 in mapped_role){
            const participant3 = mapped_role[key3];
            const arrestMsg3 = `**[속보] 키라 ${mapped_role.Kira.name} (이)가 체포되었습니다 -게임 종료-**`
            bot.sendPhoto(participant3.id, LwinPhoto, { caption: arrestMsg3 })
            .then(() => {
              //console.log('사진 전송 완료');
            })
            .catch((error) => {
              //console.error('사진 전송 실패:', error);
              bot.sendMessage(participant3.id, arrestMsg3)
            });              
          }
          arrest(true)
        }
        else{
          console.log('N추리실패')
          mapped_role.N.skill1 = false;
          for(const key4 in mapped_role){
            const participant4 = mapped_role[key4];
            const arrestMsg4 = `**[속보] 니아의 정체는 ${mapped_role.N.name} 입니다.**`
            bot.sendMessage(participant4.id, arrestMsg4)
          }
        }
      }
      else{
        bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`)
      }
    }
    else{
      bot.sendMessage(chatId, `[System] 엘이 살아 있습니다.`)
    }
  }

  if(!(mapped_role.L.id === chatId || mapped_role.N.id === chatId)){
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//방송, 캐릭터: 엘, 니아(엘 사망 이후), 키요미(2회)
function broadcast(chatId, broadMsg, bot){
  console.log('방송 실행')

  if(mapped_role.L.id === chatId){
    if(mapped_role.L.skill2 === true && mapped_role.L.alive === true){
      mapped_role.L.skill2 = false;
      broadCool_start = Date.now();
      setTimeout(()=>{
        mapped_role.L.skill2 = true;
      }, broadCool)
      for(const key in mapped_role){
        const participant = mapped_role[key];
        bot.sendMessage(participant.id, broadMsg)
      } 
    }
    else if(mapped_role.L.alive === true && mapped_role.L.skill2 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - broadCool_start
      const remainingTime = Math.ceil((broadCool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`)
    }
  }
  if(mapped_role.N.id === chatId){
    if(mapped_role.L.alive === false){
      if(mapped_role.N.skill2 === true && mapped_role.N.alive === true){
        mapped_role.N.skill2 = false;
        broadCool_start = Date.now();
        setTimeout(()=>{
          mapped_role.N.skill2 = true;
        }, broadCool)
        for(const key2 in mapped_role){
          const participant2 = mapped_role[key2];
          bot.sendMessage(participant2.id, broadMsg)
        }
      }
      else if(mapped_role.N.alive === true && mapped_role.N.skill2 === false){
        const currentTime2 = Date.now();
        const elapsedTime2 = currentTime2 - broadCool_start
        const remainingTime2 = Math.ceil((broadCool - elapsedTime2) / 1000);
        bot.sendMessage(chatId, `스킬쿨타임이 ` + remainingTime2 + `초 남았습니다`);
      }
      else{
        bot.sendMessage(chatId, `스킬사용이 가능한 상태가 아닙니다.`);
      }
    }else{
      bot.sendMessage(chatId, `엘이 살아 있습니다.`);
    }
  }
  if(mapped_role.Kiyomi.id === chatId){
    if(mapped_role.Kiyomi.alive === true && mapped_role.Kiyomi.skill2 > 0){
      console.log("키요미 방송")
      //const skill_temp = parseInt(mapped_role.Kiyomi.skill2) - 1;
      mapped_role.Kiyomi.skill2 = parseInt(mapped_role.Kiyomi.skill2) - 1
      for(const key3 in mapped_role){
        const participant3 = mapped_role[key3];
        bot.sendMessage(participant3.id, broadMsg)
      }
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`); 
    }    
  }
  
  if(!(mapped_role.L.id === chatId || mapped_role.N.id === chatId || mapped_role.Kiyomi.id === chatId)){
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`)  
  }

}

//키요미 감시, 캐릭터: 니아
function watching_Kiyomi(chatId, role, capturedPerson, bot){
  if(mapped_role.N.id === chatId){
    if(mapped_role.N.alive === true && mapped_role.N.skill3 === true){
      mapped_role.N.skill3 = false;
      watching_Kiyomi_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.N.skill3 = true;
      }, watching_Kiyomi_Cool)

      let foundMatch = false; //일치하는 플레이어를 찾는 변수
      for(const key in mapped_role){
        console.log('키요미 감시여부 checking...')
        if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson) {
          mapped_role.Kiyomi.seal = false;
          bot.sendMessage(chatId, `[System] `+ capturedPerson + `의 정체는 키요미가 맞습니다. 그녀의 정보수집 스킬을 봉인합니다.`)
          bot.sendMessage(mapped_role.Kiyomi.id, `[System] 니아의 감시로 정보수집 스킬이 봉인되었습니다.`)
          foundMatch = true;
          break;
        }
      }
      if(!foundMatch){
        bot.sendMessage(chatId, '[System] 해당 플레이어는 키요미가 아닙니다');
      }
    }
    else if(mapped_role.N.alive === true && mapped_role.N.skill3 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - watching_Kiyomi_Cool_start
      const remainingTime = Math.ceil((watching_Kiyomi_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//엘의 후계자, 캐릭터: 니아
function successor(){
  //보류
}

//키요미납치, 캐릭터: 멜로
function kidnap_Kiyomi(chatId, role, capturedPerson, bot){
  if(mapped_role.M.id === chatId){
    if(mapped_role.M.alive === true && mapped_role.M.skill1 === true){
      mapped_role.M.skill1 = false;
      kidnap_Kiyomi_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.M.skill1 = true;
      }, kidnap_Kiyomi_Cool)

      let foundMatch = false; //일치하는 플레이어를 찾는 변수
      for(const key in mapped_role){
        console.log('키요미 납치여부 checking...')
        if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson) {
          if(mapped_role.Kiyomi.alive === true){
            mapped_role.M.skill2 = true; //데스노트 조각 활성화
            mapped_role.Kiyomi.alive = false; // 키요미 사망처리
  
            bot.sendMessage(chatId, `[System] `+ capturedPerson + `의 정체는 키요미가 맞습니다. 그녀를 체포합니다.`)
            bot.sendMessage(mapped_role.Kiyomi.id, `[System] 당신은 멜로에 의해 납치되었습니다.`)
  
            foundMatch = true;
            break;
          }
          else{
            bot.sendMessage(chatId, `[System] `+ capturedPerson + `는 이미 납치or사망 상태입니다`);
            foundMatch = true;
            break;
          }
        }
      }
      if(!foundMatch){
        bot.sendMessage(chatId, '[System] 해당 플레이어는 키요미가 아닙니다');
        for(const key3 in mapped_role){
          const participant = mapped_role[key3];
          const message = `
          ****[속보] 멜로의 정체는 ${mapped_role.M.name} 입니다.****`;
          bot.sendMessage(participant.id, message)
        }
      }

    }
    else if(mapped_role.M.alive === true && mapped_role.M.skill1 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - kidnap_Kiyomi_Cool_start
      const remainingTime = Math.ceil((kidnap_Kiyomi_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//데스노트 조각, 캐릭터: 멜로(1회)
function pieceNote(chatId, role, capturedPerson, bot, pieceNote){
  if(mapped_role.M.id === chatId){
    if(mapped_role.M.skill2 === true && mapped_role.M.alive === true){
      mapped_role.M.skill2 = false;
      let foundMatch = false; //일치하는 플레이어를 찾는 변수
      for(const key in mapped_role){
        console.log('데스노트 일치여부 checking...')
        if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson && mapped_role[key].alive === true) {
          console.log(mapped_role[key].role + ' & ' + mapped_role[key].alive )
          setTimeout(()=>{
            deathMsg(chatId, mapped_role[key], bot, function(callback){
              if(callback===true){
                pieceNote(true);
              }
            });
  
          }, deathCool);
          foundMatch = true;
          break;
        }
      }
      if(!foundMatch){
        bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
      }
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//엘의 집사(1회), 캐릭터: 와타리
function deacon(chatId, bot){
  if(mapped_role.W.id === chatId){
    if(mapped_role.W.alive === true && mapped_role.W.skill1 === true){
      mapped_role.W.skill1 = false;
      bot.sendMessage(chatId, `[System] 엘의 정체는 ${mapped_role.L.name} 입니다.`)
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//와미즈 하우스(1회), 캐릭터: 와타리
function wamizuHouse(chatId, NiaMelo, bot){
  if(mapped_role.W.id === chatId){
    if(mapped_role.L.alive === false){
      if(mapped_role.W.alive === true && mapped_role.W.skill2 === true){
        if(NiaMelo === mapped_role.N.role){
          mapped_role.W.skill2 = false;
          bot.sendMessage(chatId, `[System] ${mapped_role.N.role}의 정체는 ${mapped_role.N.name} 입니다.`)
        }
        else if(NiaMelo === mapped_role.M.role){
          mapped_role.W.skill2 = false;
          bot.sendMessage(chatId, `${mapped_role.M.role}의 정체는 ${mapped_role.M.name} 입니다.`)
        }
        else{
          bot.sendMessage(chatId, `[System] 니아 or 멜로만 확인할 수 있습니다.`)
        }
      }
      else{
        bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
      }
    }
    else{
      bot.sendMessage(chatId, `엘이 살아 있습니다.`)
    }
  }
  else{
    bot.sendMessage(chatId, `스킬사용이 가능한 역할이 아닙니다`);
  }
}

//미사 체포, 캐릭터: 할 리드너
function arrest_Misa(chatId, role, capturedPerson, bot){
  if(mapped_role.Hal.id === chatId){
    if(mapped_role.Hal.alive === true && mapped_role.Hal.skill1 === true){
      mapped_role.Hal.skill1 = false;
      arrest_Misa_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Hal.skill1 = true;
      }, arrest_Misa_Cool)

      let foundMatch = false; //일치하는 플레이어를 찾는 변수
      for(const key in mapped_role){
        console.log('미사 연금여부 checking...')
        if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson) {
          mapped_role.Misa.alive = false; // 미사 사망처리
  
          bot.sendMessage(chatId, `[System] `+ capturedPerson + `의 정체는 미사가 맞습니다. 그녀를 연금합니다.`)
          bot.sendMessage(mapped_role.Misa.id, `[System] 당신은 할리드너에 의해 연금되었습니다.`)
          //setTimeout(()=>{
          //  for(const key2 in mapped_role){
          //    const participant = mapped_role[key2];
          //    const message = `
          //    ****[속보] 미사가 할리드너에 의해 연금되었습니다.****`;
          //    
          //    bot.sendMessage(participant.id, message)
          //  }
          //}, 2000)
          foundMatch = true;
          break;
        }
      }
      if(!foundMatch){
        bot.sendMessage(chatId, '[System] 해당 플레이어는 미사가 아닙니다');
        for(const key2 in mapped_role){
          const participant = mapped_role[key2];
          const message = `
          ****[속보] 할리드너의 정체는 ${mapped_role.Hal.name} 입니다.****`;
          bot.sendMessage(participant.id, message)
        }
      }
    }
    else if(mapped_role.Hal.alive === true && mapped_role.Hal.skill1 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - arrest_Misa_Cool_start
      const remainingTime = Math.ceil((arrest_Misa_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//수사관 확인, 캐릭터: 할 리드너
function check_detective(chatId, detectivePerson, bot){
  if(mapped_role.Hal.id === chatId){
    if(mapped_role.Hal.alive === true && mapped_role.Hal.skill2 === true){
      mapped_role.Hal.skill2 = false;
      detective_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Hal.skill2 = true;
      }, detective_Cool)

      for(const key in mapped_role){
        console.log('수사관 checking...')
        if (mapped_role[key].team === 'L' && mapped_role[key].name === detectivePerson) {
          bot.sendMessage(chatId, `[System] `+ detectivePerson + `는 수사관(L측)입니다.`)
          break;
        }
        else if(mapped_role[key].team === 'Kira' && mapped_role[key].name === detectivePerson){
          bot.sendMessage(chatId, `[System] `+ detectivePerson + `(은)는 키라측입니다. 당신의 정체가 해당 플레이어에게 전달됩니다.`);
          bot.sendMessage(mapped_role[key].id, `[System] 당신을 수사한 `+ mapped_role.Hal.name + `의 정체는 할리드너입니다.`)
          break;
        }
      }
    }
    else if(mapped_role.Hal.alive === true && mapped_role.Hal.skill2 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - detective_Cool_start
      const remainingTime = Math.ceil((detective_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//바꿔치기(미카미 체포), 캐릭터: 제반니
function arrest_Mikami(chatId, role, arrestPerson, bot){
  if(mapped_role.Jebanni.id === chatId){
    if(mapped_role.Jebanni.alive === true && mapped_role.Jebanni.skill1 === true){
      mapped_role.Jebanni.skill1 = false;
      arrest_Mikami_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Jebanni.skill1 = true;
      }, arrest_Mikami_Cool)

      let foundMatch = false; //일치하는 플레이어를 찾는 변수
      for(const key in mapped_role){
        console.log('미카미 일치여부 checking...')
        if (mapped_role[key].role === role && mapped_role[key].name === arrestPerson) {
          mapped_role.Mikami.seal = false;
          bot.sendMessage(chatId, `[System] `+ arrestPerson + `의 정체는 미카미가 맞습니다. 그의 대신노트 스킬을 봉인합니다.`)
          bot.sendMessage(mapped_role.Mikami.id, `[System] 제반니의 바꿔치기로 대신노트 스킬이 봉인되었습니다.`)
          foundMatch = true;
          break;
        }
      }
      if(!foundMatch){
        bot.sendMessage(chatId, '[System] 해당 플레이어는 미카미가 아닙니다');
        for(const key2 in mapped_role){
          const participant = mapped_role[key2];
          const message = `
          ****[속보] 제반니의 정체는 ${mapped_role.Jebanni.name} 입니다.****`;
          bot.sendMessage(participant.id, message)
        }
      }
    }
    else if(mapped_role.Jebanni.alive === true && mapped_role.Jebanni.skill1 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - arrest_Mikami_Cool_start
      const remainingTime = Math.ceil((arrest_Mikami_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//추적, 캐릭터: 제반니
function chase(chatId, chasePerson, bot){
  if(mapped_role.Jebanni.id === chatId){
    const chance_Jebanni = Math.random();
    const chance2_Jebanni = Math.random();
    if(mapped_role.Jebanni.alive === true && mapped_role.Jebanni.skill2 === true){
      mapped_role.Jebanni.skill2 = false;
      chase_Jebanni_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Jebanni.skill2 = true;
      }, chase_Jebanni_Cool)

       //50% 확률로 플레이어 확인
       if(chance_Jebanni > 0.5){
        for(const key in mapped_role){
          if (mapped_role[key].name === chasePerson) {
            setTimeout(()=>{
              bot.sendMessage(chatId, `[System] 추적한 플레이어의 정체는 ` + mapped_role[key].role + ` 입니다.`);
              if(mapped_role[key].team === 'L' && chance2_Jebanni > 0.5){
                bot.sendMessage(chatId, `[System] ` + mapped_role[key].name+`에게 당신의 정체가 전달됩니다`)
                bot.sendMessage(mapped_role[key].id, `[System] 당신을 추적한 `+ mapped_role.Jebanni.name + `의 정체는 제반니입니다.`)
              }
            }, chaseJebanniCool)
          }
        } 
      }
      else{
        setTimeout(()=>{
          bot.sendMessage(chatId, `[System] 플레이어 추적에 실패했습니다`);
        }, chaseJebanniCool)
      }

    }
    else if(mapped_role.Jebanni.alive === true && mapped_role.Jebanni.skill2 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - chase_Jebanni_Cool_start
      const remainingTime = Math.ceil((chase_Jebanni_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//미행, 캐릭터: 모기
function follow(chatId, followPerson, bot){
  if(mapped_role.Mogi.id === chatId){
    const chance_Mogi = Math.random()
    const chance2_Mogi = Math.random();
    if(mapped_role.Mogi.alive === true && mapped_role.Mogi.skill1 === true){
      mapped_role.Mogi.skill1 = false;
      follow_Mogi_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Mogi.skill1 = true;
      }, follow_Mogi_Cool)

      //50% 확률로 플레이어 확인
      if(chance_Mogi > 0.5){
        for(const key in mapped_role){
          if (mapped_role[key].name === followPerson) {
            setTimeout(()=>{
              bot.sendMessage(chatId, `[System] 플레이어의 정체는 ` + mapped_role[key].role + ` 입니다.`);
              if(mapped_role[key].team === 'Kira' && chance2_Mogi > 0.3){
                bot.sendMessage(chatId, `[System] ` + mapped_role[key].name+`에게 당신의 정체가 전달됩니다`)
                bot.sendMessage(mapped_role[key].id, `[System] 당신을 미행한 `+ mapped_role.Mogi.name + `의 정체는 모기입니다.`)
              }
            }, followMogiCool)
          }
        } 
      }
      else{
        setTimeout(()=>{
          bot.sendMessage(chatId, `[System] 플레이어 미행에 실패했습니다`);
        }, followMogiCool)
      }

    }
    else if(mapped_role.Mogi.alive === true && mapped_role.Mogi.skill1 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - follow_Mogi_Cool_start
      const remainingTime = Math.ceil((follow_Mogi_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }

  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }

}

//엘 확인, 캐릭터: 모기
function check_L(chatId, bot){
  if(mapped_role.Mogi.id === chatId){
    if(mapped_role.Mogi.alive === true && mapped_role.Mogi.skill2 === true){
      mapped_role.Mogi.skill2 = false;
      setTimeout(()=>{
        check_L_MSG(chatId, bot);
        mapped_role.Mogi.skill2 = true;
      }, check_L_Cool)
    }
    else if(mapped_role.Mogi.alive === true && mapped_role.Mogi.skill2 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - check_L_Cool_start
      const remainingTime = Math.ceil((check_L_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//엘확인 메세지 처리
function check_L_MSG(chatId, bot){
  if(mapped_role.L.alive === true){
    bot.sendMessage(chatId, `[System] 엘의 정체는 ` + mapped_role.L.name + '입니다.');
  }
  else{
    bot.sendMessage(chatId, '[System] 엘의 정체는' + mapped_role.N.name + `입니다.`);
  }
}

//바보, 캐릭터: 마츠다
function babo(chatId, checkPerson, bot){
  if(mapped_role.Mathuda.id === chatId){
    const chance_Mathuda = Math.random();
    if(mapped_role.Mathuda.alive === true && mapped_role.Mathuda.skill1 === true){
      mapped_role.Mathuda.skill1 = false;
      babo_Mathuda_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Mathuda.skill1 = true;
      }, babo_Mathuda_Cool)

      //자신의 정체를 노출 후, 50% 확률로 플레이어 확인
       
      if(chance_Mathuda > 0.5){
        for(const key in mapped_role){
          if (mapped_role[key].name === checkPerson) {
            bot.sendMessage(mapped_role[key].id, `[System] 바보 마츠다의 정체는 ` + mapped_role.Mathuda.name + ` 입니다.`);
            bot.sendMessage(chatId, `[System] 당신이 지목한 플레이어의 정체는 ` + mapped_role[key].role + ` 입니다.`);
            if(mapped_role[key].role === '키라'){
              for(const key2 in mapped_role){
                if(mapped_role[key2].team === 'Kira'){
                  bot.sendMessage(mapped_role[key2].id, `[System] 키라에게 접근한 마츠다의 정체는 ` + mapped_role.Mathuda.name + ` 입니다.`);
                }
              }
            }
            if(mapped_role[key].role === '엘'){
              for(const key3 in mapped_role){
                if(mapped_role[key3].team === 'L'){
                  bot.sendMessage(mapped_role[key3].id, `[System] 엘에게 접근한 마츠다의 정체는 ` + mapped_role.Mathuda.name + ` 입니다.`);
                }
              }
            }
          }
        } 
      }
      else{
        for(const key in mapped_role){
          if (mapped_role[key].name === checkPerson) {
            bot.sendMessage(mapped_role[key].id, `[System] 바보 마츠다의 정체는 ` + mapped_role.Mathuda.name + ` 입니다.`);
            bot.sendMessage(chatId, `[System] 바보짓으로 상대에게 정체만 노출되었습니다.`);
          }
        }
      }
    }
    else if(mapped_role.Mathuda.alive === true && mapped_role.Mathuda.skill1 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - babo_Mathuda_Cool_start
      const remainingTime = Math.ceil((babo_Mathuda_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//데스노트, 캐릭터: 키라, 미카미(3회)
function deathNote(chatId, role, capturedPerson, bot, deathNotes){
  if(mapped_role.Kira.id === chatId){
    if(mapped_role.Kira.skill1 === true){
      mapped_role.Kira.skill1 = false;
      deathNoteCool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Kira.skill1 = true;
      }, deathNoteCool)

      let foundMatch = false; //일치하는 플레이어를 찾는 변수
      for(const key in mapped_role){
        console.log('데스노트 일치여부 checking...')
        if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson && mapped_role[key].alive === true){
          if(mapped_role[key].role === '니아' && mapped_role.L.alive === true){
            setTimeout(()=>{
              bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
            }, deathCool);
            foundMatch = true;
            break;
          }
          else{
            console.log(mapped_role[key].role + ' & ' + mapped_role[key].alive )
            setTimeout(()=>{
              deathMsg(chatId, mapped_role[key], bot, function(callback){
                if(callback===true){
                 deathNotes(true);
                }
            });
          }, deathCool);
          foundMatch = true;
          break;
          }  
        }
      }
      if(!foundMatch){
        setTimeout(()=>{
          bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
        }, deathCool);
      }
    }
    else if(mapped_role.Kira.skill1 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - deathNoteCool_start
      const remainingTime = Math.ceil((deathNoteCool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//시계노트, 캐릭터: 키라
function watchNote(chatId, role, capturedPerson, bot, watchNote){
  if(mapped_role.Kira.id === chatId){
    if(mapped_role.Kira.skill2 === true){
      mapped_role.Kira.skill2 = false;
      
      let foundMatch = false; //일치하는 플레이어를 찾는 변수
      for(const key in mapped_role){
        console.log('데스노트 일치여부 checking...')
        if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson && mapped_role[key].alive === true) {
          if(mapped_role[key].role === '니아' && mapped_role.L.alive === true){
            bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
            foundMatch = true;
            break;
          }
          else{
            console.log(mapped_role[key].role + ' & ' + mapped_role[key].alive )
            deathMsg(chatId, mapped_role[key], bot, function(callback){
              if(callback===true){
                watchNote(true);
              }
            });
            foundMatch = true;
            break;
          }
        }
      }
      if(!foundMatch){
        bot.sendMessage(chatId, '아무 일도 일어나지 않았습니다.');
      }
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//데스노트로 인한 결과처리
function deathMsg(chatId, dead, bot, callback){
  const KirawinPhoto = __dirname + '/img/KiraWin.jpg'
  const LwinPhoto = __dirname + '/img/LWin.jpg'
  dead.alive = false;
  bot.sendMessage(chatId, `[System] 데스노트로 인해 ` + dead.role + `(이)가 사망했습니다.`)
  bot.sendMessage(dead.id, '[System] 당신은 데스노트에 의해 사망했습니다');
  
  if(dead.role === '엘'){
    if(mapped_role.N.alive === false){ //니아가 죽어있는 상태면 게임 종료
      for(const key in mapped_role){
        const participant = mapped_role[key];
        const message = `
        **L과N 전원 사망했습니다. 키라의 승리입니다 -게임 종료-**`;

        bot.sendPhoto(participant.id, KirawinPhoto, { caption: message })
          .then(() => {
            //console.log('사진 전송 완료');
          })
          .catch((error) => {
            console.error('사진 전송 실패:', error);
            bot.sendMessage(participant.id, message)
          });
      }
      callback(true);
    }
    else{ //니아가 살아있는 상태라면
      mapped_role.N.skill1 = true;
      mapped_role.N.skill2 = true;
      //bot.sendMessage(mapped_role.N.id, `[System] 엘이 사망했습니다...L의 유지를 이어 키라를 체포하세요`)

      for(const key in mapped_role){
        const deadLmsg = mapped_role[key];
        const message = `[System] 엘이 사망했습니다...L의 유지를 이어 키라를 체포하세요`;
        if(deadLmsg.team === 'L'){
          bot.sendMessage(mapped_role[key].id, message);
        }
      }
      callback(false);
    }
  }
  if(dead.role === '니아' && mapped_role.L.alive === false){
    for(const key in mapped_role){
      const participant = mapped_role[key];
      const message = `
      **L과N 전원 사망했습니다. 키라의 승리입니다 -게임 종료-**`;
      bot.sendPhoto(participant.id, KirawinPhoto, { caption: message })
          .then(() => {
            //console.log('사진 전송 완료');
          })
          .catch((error) => {
            console.error('사진 전송 실패:', error);
            bot.sendMessage(participant.id, message)
          });
    }
    callback(true);
  }

  if(dead.role === '키라'){
    for(const key in mapped_role){
      const participant = mapped_role[key];
      const message = `
      **키라가 사망했습니다. L측의 승리입니다 -게임 종료-**`;
      //bot.sendMessage(participant.id, message)
      //roomReset.resetRoom();
      bot.sendPhoto(participant.id, LwinPhoto, { caption: message })
          .then(() => {
            //console.log('사진 전송 완료');
          })
          .catch((error) => {
            console.error('사진 전송 실패:');
            bot.sendMessage(participant.id, message)
          });
    }
    callback(true);
  }
}

//연모, 캐릭터: 미사
function love_Kira(chatId, bot){
  if(mapped_role.Misa.id === chatId){
    const chance_Misa = Math.random()
    if(mapped_role.Misa.alive === true && mapped_role.Misa.skill1 === true){
      mapped_role.Misa.skill1 = false;
      love_Kira_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Misa.skill1 = true;
      }, love_Kira_Cool)

      //50% 확률로 키라 확인
      if(chance_Misa > 0.5){
        setTimeout(()=>{
          bot.sendMessage(chatId, `[System] 키라의 정체는 ` + mapped_role.Kira.name + ` 입니다.`);
        }, loveCool)
      }
      else{
        setTimeout(()=>{
          bot.sendMessage(chatId, `[System] 키라를 확인하는데 실패했습니다`);
        }, loveCool)
      }

    }
    else if(mapped_role.Misa.alive === true && mapped_role.Misa.skill1 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - love_Kira_Cool_start
      const remainingTime = Math.ceil((love_Kira_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);

    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `스킬사용이 가능한 역할이 아닙니다`);
  }
}

//사신의 눈, 캐릭터: 미사 1회 10%, 2회 20%, 3회 40%, 4회 80% 확률로 실패(4회 사용가능)
function envoyEyes(chatId, envoyEyePerson, bot){
  if(mapped_role.Misa.id === chatId){
    const chance_Misa = Math.random();
    if(mapped_role.Misa.alive === true && mapped_role.Misa.skill2 === true){
      mapped_role.Misa.skill2 = false;
      envoyEyes_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Misa.skill2 = true;
      }, envoyEyes_Cool)

      if(parseInt(mapped_role.Misa.chance) === 4){
        if(chance_Misa > 0.9){
          bot.sendMessage(chatId, `[System] 사신의눈 발동에 실패했습니다.\n 남은횟수: 3회`);
          mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
        }
        else{
          mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
          for(const key in mapped_role){
            //console.log('사신의눈 checking...')
            if (mapped_role[key].name === envoyEyePerson) {
              bot.sendMessage(chatId, `[System] `+ envoyEyePerson + `의 정체는 ` + mapped_role[key].role + `입니다.\n 남은횟수: 3회`)
            }
          }
        }
      }
      else if(parseInt(mapped_role.Misa.chance) === 3){
        if(chance_Misa > 0.8){
          bot.sendMessage(chatId, `[System] 사신의눈 발동에 실패했습니다.\n 남은횟수: 2회`);
          mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
        }
        else{
          mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
          for(const key in mapped_role){
            //console.log('사신의눈 checking...')
            if (mapped_role[key].name === envoyEyePerson) {
              bot.sendMessage(chatId, `[System] `+ envoyEyePerson + `의 정체는 ` + mapped_role[key].role + `입니다.\n 남은횟수: 2회`)
            }
          }
        }
      }
      else if(parseInt(mapped_role.Misa.chance) === 2){
        if(chance_Misa > 0.6){
          bot.sendMessage(chatId, `[System] 사신의눈 발동에 실패했습니다.\n 남은횟수: 1회`);
          mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
        }
        else{
          mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
          for(const key in mapped_role){
            //console.log('사신의눈 checking...')
            if (mapped_role[key].name === envoyEyePerson) {
              bot.sendMessage(chatId, `[System] `+ envoyEyePerson + `의 정체는 ` + mapped_role[key].role + `입니다.\n 남은횟수: 1회`)
            }
          }
        }
      }
      else if(parseInt(mapped_role.Misa.chance) === 1){
        if(chance_Misa > 0.8){
          bot.sendMessage(chatId, `[System] 사신의눈 발동에 실패했습니다.\n 남은횟수: 0회`);
          mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
        }
        else{
          mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
          for(const key in mapped_role){
            //console.log('사신의눈 checking...')
            if (mapped_role[key].name === envoyEyePerson) {
              bot.sendMessage(chatId, `[System] `+ envoyEyePerson + `의 정체는 ` + mapped_role[key].role + `입니다.\n 남은횟수: 0회`)
            }
          }
        }
      }
      else if(parseInt(mapped_role.Misa.chance) === 0){
        bot.sendMessage(chatId, `[System] 더이상 사신의눈을 사용할 수 없습니다.`);
      }
    }
    else if(mapped_role.Misa.alive === true && mapped_role.Misa.skill2 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - envoyEyes_Cool_start
      const remainingTime = Math.ceil((envoyEyes_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);

    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `스킬사용이 가능한 역할이 아닙니다`);
  }
}

//정보수집. 캐릭터: 키요미
function gatheringInfo(chatId, role, capturedPerson, bot){
  if(mapped_role.Kiyomi.id === chatId && mapped_role.Kiyomi.alive === true && mapped_role.Kiyomi.skill1 === true && mapped_role.Kiyomi.seal === true){
    mapped_role.Kiyomi.skill1 = false;
    gatheringInfo_Cool_start = Date.now();
    setTimeout(()=>{
      mapped_role.Kiyomi.skill1 = true;
    }, gatheringInfo_Cool)

    if(role === '엘' || role === '니아' || role === '멜로'){
      bot.sendMessage(chatId, `[System] 엘 / 니아 / 멜로에 대한 정보수집은 불가능합니다`)
    }
    else{
      let foundMatch = false; //일치하는 플레이어를 찾는 변수
      for(const key in mapped_role){
        console.log('정보수집결과 checking...')
        if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson) {
          bot.sendMessage(chatId, `[System] `+ capturedPerson + `의 정체는 ` + role + `(이)가 맞습니다.`)
          foundMatch = true;
          break;
        }
      }
      if(!foundMatch){
        bot.sendMessage(chatId, '[System] 해당 플레이어는 ' + role + ` (이)가 아닙니다`);
      }
    }    
  }
  else if(mapped_role.Kiyomi.alive === true && mapped_role.Kiyomi.skill1 === false){
    const currentTime = Date.now();
    const elapsedTime = currentTime - gatheringInfo_Cool_start
    const remainingTime = Math.ceil((gatheringInfo_Cool - elapsedTime) / 1000);
    bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할 또는 상태가 아닙니다`);
  }
}

//대신노트 - 캐릭터: 미카미
function desinNote(chatId, role, capturedPerson, bot, deathNotes){
  if(mapped_role.Mikami.id === chatId){
    if(mapped_role.Mikami.skill1_num > 0){
      if(mapped_role.Mikami.alive === true && mapped_role.Mikami.seal === true && mapped_role.Mikami.skill1 === true){
        mapped_role.Mikami.skill1 = false;
        desinNoteCool_start = Date.now();
        setTimeout(()=>{
          mapped_role.Mikami.skill1 = true;
        }, deathNoteCool)
  
        let foundMatch = false; //일치하는 플레이어를 찾는 변수
        for(const key in mapped_role){
          console.log('데스노트 일치여부 checking...')
          if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson && mapped_role[key].alive === true){
            console.log(mapped_role[key].role + ' & ' + mapped_role[key].alive )
            setTimeout(()=>{
              deathMsg(chatId, mapped_role[key], bot, function(callback){
                if(callback===true){
                  mapped_role.Mikami.skill1_num = parseInt(mapped_role.Mikami.skill1_num) - 1;
                  bot.sendMessage(chatId, '[System] 남은 노트횟수:' + mapped_role.Mikami.skill1_num+'회');
                  deathNotes(true);
                }
              });
            }, deathCool);
            foundMatch = true;
            break;
          }
        }
        if(!foundMatch){
          setTimeout(()=>{
            mapped_role.Mikami.skill1_num = parseInt(mapped_role.Mikami.skill1_num) - 1;
            bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
            bot.sendMessage(chatId, '[System] 남은 노트횟수:' + mapped_role.Mikami.skill1_num+'회');
          }, deathCool);
        }
      }
      else if(mapped_role.Mikami.alive === true && mapped_role.Mikami.skill1 === false){
        const currentTime = Date.now();
        const elapsedTime = currentTime - desinNoteCool_start
        const remainingTime = Math.ceil((desinNoteCool - elapsedTime) / 1000);
        bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
      }
      else{
        bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
      }
    }
    else{
      bot.sendMessage(chatId, `[System] 남아있는 노트사용 가능횟수가 없습니다`);
    }
    
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//키라 숭배, 캐릭터: 미카미
function worship_Kira(chatId, bot){
  if(mapped_role.Mikami.id === chatId){
    if(mapped_role.Mikami.alive === true && mapped_role.Mikami.skill2 === true){
      mapped_role.Mikami.skill2 = false;
      worship_kira_Cool_start = Date.now();
      setTimeout(()=>{
        bot.sendMessage(chatId, `[System] 키요미의 정체는 ` + mapped_role.Kiyomi.name + '입니다.');
        mapped_role.Mikami.skill2 = true;
      }, worship_kira_Cool)
    }
    else if(mapped_role.Mikami.alive === true && mapped_role.Mikami.skill2 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - worship_kira_Cool_start
      const remainingTime = Math.ceil((worship_kira_Cool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//(공용) 역할 전달
function notice(info){
  info(mapped_role)
}

//(공용) 귓날리기 횟수 검증
function whisper(chatId, receiver, whisper_msg, bot){
  let foundMatch = false;
  for(const key in mapped_role){
    if(mapped_role[key].id === chatId && mapped_role[key].alive === true){
      if(mapped_role[key].whisper > 0 && !foundMatch){
        const sender = mapped_role[key]        
        whisper_result(sender, receiver, whisper_msg, bot, function(callback){
          if(callback === true){
            mapped_role[key].whisper = parseInt(mapped_role[key].whisper) - 1
          }
        })
        foundMatch = true;
        break;      
      }
      else if(!foundMatch){
        bot.sendMessage(chatId, `귓속말 남은 횟수가 없습니다.`)
        foundMatch = true;
      }
    }
    else if(mapped_role[key].id === chatId && mapped_role[key].alive === false){
      bot.sendMessage(chatId, `당신은 사망상태입니다.`);
    }
  }
}

//(공용) 귓날리기 검증 후 처리
function whisper_result(sender, receiver, whisper_msg, bot, callback){
  let foundMatch = false;
  for(const key in mapped_role){
    if(mapped_role[key].name === receiver){
      bot.sendMessage(sender.id, `${receiver}에게 귓속말 전달에 성공했습니다\n남은횟수: ${sender.whisper-1}회`)
      bot.sendMessage(mapped_role[key].id, `[귓속말] ???: ${whisper_msg}`)
      callback(true)
      foundMatch = true;
      break;
    }
  }

  if(!foundMatch){
    bot.sendMessage(sender.id, `${receiver}에게 귓속말 전달에 실패했습니다\n남은횟수: ${sender.whisper}회`)
  }
}


//(공용) 쪽지날리기
function note(chatId, receiver, note_msg, bot){
  let foundMatch = false;
  for(const key in mapped_role){
    if(mapped_role[key].id === chatId && mapped_role[key].alive === true){
      if(mapped_role[key].note> 0 && !foundMatch){
        const sender = mapped_role[key]        
        note_result(sender, receiver, note_msg, bot, function(callback){
          if(callback === true){
            mapped_role[key].note = parseInt(mapped_role[key].note) - 1
          }
        })
        foundMatch = true;
        break;      
      }
      else if(!foundMatch){
        bot.sendMessage(chatId, `쪽지 남은 횟수가 없습니다.`)
        foundMatch = true;
      }
    }else if(mapped_role[key].id === chatId && mapped_role[key].alive === false){
      bot.sendMessage(chatId, `당신은 사망상태입니다.`);
    }
  }
}

//(공용) 쪽지날리기 검증 후 처리
function note_result(sender, receiver, note_msg, bot, callback){
  let foundMatch = false;
  for(const key in mapped_role){
    if(mapped_role[key].name === receiver){
      bot.sendMessage(sender.id, `${receiver}에게 쪽지 전달에 성공했습니다\n남은횟수: ${sender.note-1}회`)
      bot.sendMessage(mapped_role[key].id, `[쪽지] ${sender.name}: ${note_msg}`)
      callback(true)
      foundMatch = true;
      break;
    }
  }

  if(!foundMatch){
    bot.sendMessage(sender.id, `${receiver}에게 쪽지 전달에 실패했습니다\n남은횟수: ${sender.note}회`)
  }
}

module.exports = {
  startGame,
  arrest_Kira,
  broadcast,
  watching_Kiyomi,
  successor,
  kidnap_Kiyomi,
  pieceNote,
  deacon,
  wamizuHouse,
  arrest_Misa,
  check_detective,
  arrest_Mikami,
  chase,
  follow,
  check_L,
  babo,
  deathNote,
  watchNote,
  love_Kira,
  envoyEyes,
  gatheringInfo,
  desinNote,
  worship_Kira,
  notice,
  whisper,
  whisper_result,
  note,
  note_result
};