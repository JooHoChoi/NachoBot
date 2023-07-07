// game.js
const charactor_test = require('./charactor_test.json')
const characotr_test4 = require('./charactor_test4.json')
const charactor_test5 = require('./charactor_test5.json')
const charactor9 = require('./charactor9.json');
const charactor10 = require('./charactor10.json');
const charactor11 = require('./charactor11.json');
const charactor12 = require('./charactor12.json');

const index = require('./index');

let room = [];
let mapped_role;

//스킬 쿨다운 기준값
//스킬 쿨다운 체크값
const broadCool = 10000; //방송 스킬 쿨타임: 테스트: 10초, 본게임 60초
let broadCool_start;

const deathNoteCool = 30000; //데스노트 스킬 쿨타임: 테스트 30초, 본게임 90초
let deathNoteCool_start;

const deathCool = 5000; // 데스노트 스킬로 죽는데 걸리는 시간: 테스트 5초, 본게임 40초

const watching_Kiyomi_Cool = 10000; //키요미 감시 스킬 쿨타임: 테스트 10초, 본게임 60초
let watching_Kiyomi_Cool_start;

const kidnap_Kiyomi_Cool = 10000; //키요미 납치 스킬 쿨타임: 테스트 10초, 본게임 30초
let kidnap_Kiyomi_Cool_start;

const gatheringInfo_Cool = 10000; //정보수집 스킬 쿨타입: 테스트 10초, 본게임 30초
let gatheringInfo_Cool_start;


function startGame(roomData, callback_mapping) {
  room = roomData;
  if(roomData.length === 9){
    mapNameToJSON(roomData, charactor9, function(callback){
      callback_mapping(callback);
    });
  }
  else if(roomData.length === 10){
    mapNameToJSON(roomData, charactor10, function(callback){
      callback_mapping(callback);
    });
  }
  else if(roomData.length === 11){
    mapNameToJSON(roomData, charactor11, function(callback){
      callback_mapping(callback);
    });
  }
  else if(roomData.length === 12){
    mapNameToJSON(roomData, charactor12, function(callback){
      callback_mapping(callback);
    });
  }
  //3인 테스트용 조건문
  else if(roomData.length === 3){
    mapNameToJSON(roomData, charactor_test, function(callback){
      callback_mapping(callback);
    });
  }
  //4인 테스트용 조건문
  else if(roomData.length === 4){
    mapNameToJSON(roomData, charactor_test4, function(callback){
      callback_mapping(callback);
    });
  }
  //5인 테스트용 조건문
  else if(roomData.length === 5){
    mapNameToJSON(roomData, charactor_test5, function(callback){
      callback_mapping(callback);
    });
  }
}

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
  mapped_role = charactor
  console.log(mapped_role);
  callback(charactor);
}

//키라 체포, 캐릭터: 엘, 니아
function arrest_Kira(chatId, capturedPerson, bot, arrest){
  if(mapped_role.L.id === chatId && mapped_role.L.alive === true && mapped_role.L.skill1 === true){
    if(mapped_role.Kira.name === capturedPerson){
      console.log('L추리성공')
      for(const key in mapped_role){
        const participant = mapped_role[key];
        const arrestMsg = `**[속보] 키라 ${mapped_role.Kira.name} (이)가 체포되었습니다 -게임 종료-**`
        bot.sendMessage(participant.id, arrestMsg)
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
  else if(mapped_role.N.id === chatId && mapped_role.L.alive === false && mapped_role.N.skill1 === true){
    if(mapped_role.Kira.name === capturedPerson){
      console.log('N추리성공')
      for(const key3 in mapped_role){
        const participant3 = mapped_role[key3];
        const arrestMsg3 = `**[속보] 키라 ${mapped_role.Kira.name} (이)가 체포되었습니다 -게임 종료-**`
        bot.sendMessage(participant3.id, arrestMsg3)
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
    bot.sendMessage(chatId, `스킬사용이 가능한 역할 또는 상태가 아닙니다`);
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
    }else if(mapped_role.L.alive === true && mapped_role.L.skill2 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - broadCool_start
      const remainingTime = Math.ceil((broadCool - elapsedTime) / 1000);
      bot.sendMessage(chatId, `스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `스킬사용이 가능한 상태가 아닙니다`)
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
      bot.sendMessage(chatId, `L이 살아 있습니다.`);
    }
  }
  if(mapped_role.Kiyomi.id === chatId){
    if(mapped_role.Kiyomi.alive == true){
      console.log("키요미 방송")
      //const skill_temp = parseInt(mapped_role.Kiyomi.skill2) - 1;
      mapped_role.Kiyomi.skill2 = parseInt(mapped_role.Kiyomi.skill2) - 1
      for(const key3 in mapped_role){
        const participant3 = mapped_role[key3];
        bot.sendMessage(participant3.id, broadMsg)
      }
    }
    else{
      bot.sendMessage(chatId, `스킬사용이 가능한 상태가 아닙니다`); 
    }    
  }
  
  if(!(mapped_role.L.id === chatId || mapped_role.N.id === chatId || mapped_role.Kiyomi.id === chatId)){
    bot.sendMessage(chatId, `스킬사용이 가능한 역할이 아닙니다`)  
  }

}

//키요미 감시, 캐릭터: 니아
function watching_Kiyomi(chatId, role, capturedPerson, bot){
  if(mapped_role.N.id === chatId && mapped_role.N.alive === true && mapped_role.N.skill3 === true){
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
        bot.sendMessage(chatId, capturedPerson + `의 정체는 키요미가 맞습니다. 그녀의 정보수집 스킬을 봉인합니다.`)
        foundMatch = true;
        break;
      }
    }
    if(!foundMatch){
      bot.sendMessage(chatId, '해당 플레이어는 키요미가 아닙니다');
    }
  }
  else if(mapped_role.N.alive === true && mapped_role.N.skill3 === false){
    const currentTime = Date.now();
    const elapsedTime = currentTime - watching_Kiyomi_Cool_start
    const remainingTime = Math.ceil((watching_Kiyomi_Cool - elapsedTime) / 1000);
    bot.sendMessage(chatId, `스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
  }
  else{
    bot.sendMessage(chatId, `스킬사용이 가능한 역할 또는 상태가 아닙니다`);
  }
}

//엘의 후계자, 캐릭터: 니아
function successor(){
  //보류
}

//키요미납치, 캐릭터: 멜로
function kidnap_Kiyomi(chatId, role, capturedPerson, bot){
  if(mapped_role.M.id === chatId && mapped_role.M.alive === true && mapped_role.M.skill1 === true){
    mapped_role.M.skill1 = false;
    kidnap_Kiyomi_Cool_start = Date.now();
    setTimeout(()=>{
      mapped_role.M.skill1 = true;
    }, kidnap_Kiyomi_Cool)

    let foundMatch = false; //일치하는 플레이어를 찾는 변수
    for(const key in mapped_role){
      console.log('키요미 납치여부 checking...')
      if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson) {
        mapped_role.M.skill2 = true; //데스노트 조각 활성화
        mapped_role.Kiyomi.alive = false; // 키요미 사망처리

        bot.sendMessage(chatId, capturedPerson + `의 정체는 키요미가 맞습니다. 그녀를 체포합니다.`)
        setTimeout(()=>{
          for(const key2 in mapped_role){
            const participant = mapped_role[key2];
            const message = `
            ****[속보] 키요미가 멜로에 의해 납치되었습니다.****`;
            //bot.sendMessage(participant.id, message)
            //roomReset.resetRoom();
            bot.sendMessage(participant.id, message)
          }
        }, 2000)
        foundMatch = true;
        break;
      }
    }
    if(!foundMatch){
      bot.sendMessage(chatId, '해당 플레이어는 키요미가 아닙니다');
      for(const key3 in mapped_role){
        const participant = mapped_role[key3];
        const message = `
        ****[속보] 멜로의 정체는 ${mapped_role.M.name} 입니다.****`;
        //bot.sendMessage(participant.id, message)
        //roomReset.resetRoom();
        bot.sendMessage(participant.id, message)
      }
    }
  }
  else if(mapped_role.M.alive === true && mapped_role.M.skill1 === false){
    const currentTime = Date.now();
    const elapsedTime = currentTime - kidnap_Kiyomi_Cool_start
    const remainingTime = Math.ceil((kidnap_Kiyomi_Cool - elapsedTime) / 1000);
    bot.sendMessage(chatId, `스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
  }
  else{
    bot.sendMessage(chatId, `스킬사용이 가능한 역할 또는 상태가 아닙니다`);
  }
}

//데스노트 조각, 캐릭터: 멜로(1회)
function pieceNote(){

}

//엘의 집사(1회), 캐릭터: 와타리
function deacon(){

}

//와미즈 하우스(1회), 캐릭터: 와타리
function wamizuHouse(){

}

//미사 체포, 캐릭터: 할 리드너
function arrest_Misa(){

}

//수사관 확인, 캐릭터: 할 리드너
function check_detective(){

}

//미카미 체포, 캐릭터: 제반니
function arrest_Mikami(){

}

//미행, 캐릭터: 제반니, 모기 - 둘이 조건이 살짝 다름
function follow(){

}

//엘 확인, 캐릭터: 모기
function check_L(){

}

//바보, 캐릭터: 마츠다
function babo(){

}

//데스노트, 캐릭터: 키라, 미카미(3회)
function deathNote(chatId, role, capturedPerson, bot, deathNotes){
  if(mapped_role.Kira.id === chatId && mapped_role.Kira.skill1 === true){
    mapped_role.Kira.skill1 = false;
    deathNoteCool_start = Date.now();
    setTimeout(()=>{
      mapped_role.Kira.skill1 = true;
    }, deathNoteCool)

    let foundMatch = false; //일치하는 플레이어를 찾는 변수
    for(const key in mapped_role){
      console.log('데스노트 일치여부 checking...')
      if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson) {
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
    if(!foundMatch){
      bot.sendMessage(chatId, '아무 일도 일어나지 않았습니다.');
    }
  }
  else if(mapped_role.Kira.skill1 === false){
    const currentTime = Date.now();
    const elapsedTime = currentTime - deathNoteCool_start
    const remainingTime = Math.ceil((deathNoteCool - elapsedTime) / 1000);
    bot.sendMessage(chatId, `스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
  }
  else{
    bot.sendMessage(chatId, `스킬사용이 가능한 역할 또는 상태가 아닙니다`);
  }
}

//시계노트, 캐릭터: 키라
function watchNote(){

}

function deathMsg(chatId, dead, bot, callback){
  dead.alive = false;
  console.log(`노트적힘:` + dead);
  bot.sendMessage(chatId, `데스노트로 인해 ` + dead.role + `(이)가 사망했습니다.`)
  bot.sendMessage(dead.id, '당신은 데스노트에 의해 사망했습니다');
  
  if(dead.role === '엘'){
    if(mapped_role.N.alive === false){ //니아가 죽어있는 상태면 게임 종료
      for(const key in mapped_role){
        const participant = mapped_role[key];
        const message = `
        **L과N 전원 사망했습니다. 키라의 승리입니다 -게임 종료-**`;
        //bot.sendMessage(participant.id, message)
        //roomReset.resetRoom();
        bot.sendMessage(participant.id, message)
      }
      callback(true);
    }
    else{ //니아가 살아있는 상태라면
      mapped_role.N.skill1 = true;
      mapped_role.N.skill2 = true;
      bot.sendMessage(mapped_role.N.id, `[안내] 엘이 사망했습니다...L의 뒤를 이어 키라를 체포하세요`)
      callback(false);
    }
  }
  if(dead.role === '니아' && mapped_role.L.alive === false){
    for(const key in mapped_role){
      const participant = mapped_role[key];
      const message = `
      **L과N 전원 사망했습니다. 키라의 승리입니다 -게임 종료-**`;
      //bot.sendMessage(participant.id, message)
      bot.sendMessage(participant.id, message)
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
      bot.sendMessage(participant.id, message)
    }
    callback(true);
  }
}

//2대 키라, 캐릭터: 미사
function second_Kira(){

}

//사신의 눈, 캐릭터: 미사
function envoyEyes(){

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
      bot.sendMessage(chatId, `엘 / 니아 / 멜로에 대한 정보수집은 불가능합니다`)
    }
    else{
      let foundMatch = false; //일치하는 플레이어를 찾는 변수
      for(const key in mapped_role){
        console.log('정보수집결과 checking...')
        if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson) {
          bot.sendMessage(chatId, capturedPerson + `의 정체는 ` + role + `(이)가 맞습니다.`)
          foundMatch = true;
          break;
        }
      }
      if(!foundMatch){
        bot.sendMessage(chatId, '해당 플레이어는 ' + role + ` (이)가 아닙니다`);
      }
    }    
  }
  else if(mapped_role.Kiyomi.alive === true && mapped_role.Kiyomi.skill1 === false){
    const currentTime = Date.now();
    const elapsedTime = currentTime - gatheringInfo_Cool_start
    const remainingTime = Math.ceil((gatheringInfo_Cool - elapsedTime) / 1000);
    bot.sendMessage(chatId, `스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
  }
  else{
    bot.sendMessage(chatId, `스킬사용이 가능한 역할 또는 상태가 아닙니다`);
  }
}

//키라 숭배, 캐릭터: 미카미
function worship_Kira(){

}

//(공용) 역할 전달
function notice(info){
  info(mapped_role)
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
  follow,
  check_L,
  babo,
  deathNote,
  watchNote,
  second_Kira,
  envoyEyes,
  gatheringInfo,
  worship_Kira,
  notice,
};