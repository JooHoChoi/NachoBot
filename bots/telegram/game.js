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
const characters = require('./charactor12.json');

const index = require('./index');
const message = require('./message');

let room;
let mapped_role;
let originalCharactor;
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
const arrestCool_L = 180000; //체포 스킬 쿨타임: 테스트 10초, 본게임 180초
let arrestCool_L_start;

const arrestCool_N = 180000; //체포 스킬 쿨타임: 테스트 10초, 본게임 180초
let arrestCool_N_start;

const broadCool = 30000; //방송 스킬 쿨타임: 테스트: 10초, 본게임 30초
let broadCool_start;

const wiretapping_Cool = 60000; //도청 스킬 쿨타임 테스트 , 본게임 60초, 
let wiretappingCool_start;
const wiretappingCool = 30000; // 도청스킬 지속시간: 테스트 10초, 본게임 30초

const deathNoteCool = 90000; //데스노트 스킬 쿨타임: 테스트 60초, 본게임 90초
let deathNoteCool_start;
const deathCool = 40000; // 데스노트 스킬로 죽는데 걸리는 시간: 테스트 10초, 본게임 40초

const desinNoteCool = 90000; // 대신노트 스킬 쿨타임: 테스트 60초, 본게임 90초
let desinNoteCool_start;

const watching_Kiyomi_Cool = 60000; //키요미 감시 스킬 쿨타임: 테스트 10초, 본게임 60초
let watching_Kiyomi_Cool_start;

const kidnap_Kiyomi_Cool = 60000; //키요미 납치 스킬 쿨타임: 테스트 10초, 본게임 60초
let kidnap_Kiyomi_Cool_start;

const gatheringInfo_Cool = 60000; //정보수집 스킬 쿨타임: 테스트 10초, 본게임 60초
let gatheringInfo_Cool_start;

const arrest_Misa_Cool = 60000; //연금 스킬: 테스트 10초, 본게임 60초
let arrest_Misa_Cool_start;

const detective_Cool = 60000; //수사관 스킬: 테스트 10초, 본게임 60초
const detective_waiting_Cool = 10000; //수사관스킬 결과를 받는데 걸리는 시간 10초
let detective_Cool_start;

const love_Kira_Cool = 10000; //연모 스킬: 테스트 15초, 본게임 10초(미사상향으로 쿨제거)
let love_Kira_Cool_start;
const loveCool = 10000; // 연모스킬로 키라를 찾는데 걸리는 시간: 테스트 10초, 본게임 10초

const envoyEyes_Cool = 60000; //사신의눈 스킬: 테스트 10초, 본게임 60초
let envoyEyes_Cool_start;

const remNoteCool = 90000; // 렘의노트 스킬 쿨타임: 테스트 60초, 본게임 90초
let remNoteCool_start;

const follow_Mogi_Cool = 120000; //미행 스킬: 테스트 15초, 본게임 120초
let follow_Mogi_Cool_start;
const followMogiCool = 60000; //미행스킬로 플레이어를 확인하는데 걸리는 시간: 테스트 10초, 본게임 60초

const check_L_Cool = 150000; // 엘확인 스킬: 테스트 30초, 본게임 150초
let check_L_Cool_start;

const babo_Mathuda_Cool = 60000; //바보 스킬: 테스트 10초, 본게임 60초
let babo_Mathuda_Cool_start;

const arrest_Mikami_Cool = 60000; //바꿔치기 스킬: 테스트 10초, 본게임 60초
let arrest_Mikami_Cool_start;

const chase_Jebanni_Cool = 100000; //추적 스킬: 테스트 15초, 본게임 100초
let chase_Jebanni_Cool_start;
const chaseJebanniCool = 50000; //추적스킬로 플레이어를 확인하는데 걸리는 시간: 테스트 10초, 본게임 50초

const worship_kira_Cool = 100000; // 키라숭배 스킬: 테스트 30초, 본게임 120초
let worship_kira_Cool_start;


function startGame(roomData, sasin, callback_mapping) {
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
    
    // 필수로 들어가야 하는 5명의 캐릭터
    const requiredCharacters = ["L", "N", "M", "Kira", "Kiyomi"];

    // const group1 = ["Hal", "Misa"];
    // const group2 = ["Jebanni", "Mikami"];
    
    // // 그룹 중 하나를 무작위로 선택
    // const selectedGroup = Math.random() < 0.5 ? group1 : group2;
    
    // // 선택된 그룹에 있는 캐릭터를 필수 캐릭터에 추가
    // requiredCharacters.push(...selectedGroup);
      
    // 남은 1명의 캐릭터를 무작위로 선택
    const remainingCharacters = Object.keys(characters).filter(character => !requiredCharacters.includes(character));
    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
      requiredCharacters.push(remainingCharacters[randomIndex]);
      remainingCharacters.splice(randomIndex, 1);
    }

    const selectedCharacters = {};
    requiredCharacters.forEach((character) => {
      selectedCharacters[character] = characters[character];
    });


    if (!originalCharactor) {
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }else{
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }

    // if (!originalCharactor6) {
    //   originalCharactor6 = JSON.parse(JSON.stringify(charactor6));
    //   mapNameToJSON(roomData, charactor6, function(callback) {
    //     callback_mapping(callback);
    //   });
    // } else {
    //   const charactor_origin = JSON.parse(JSON.stringify(originalCharactor6));
    //   mapNameToJSON(roomData, charactor_origin, function(callback) {
    //     callback_mapping(callback);
    //   });
    // }
  }
  //7인 조건문
  else if(roomData.length === 7){
    // 필수로 들어가야 하는 5명의 캐릭터
    const requiredCharacters = ["L", "N", "M", "Kira", "Kiyomi"];

    const group1 = ["Hal", "Misa"];
    const group2 = ["Jebanni", "Mikami"];
    
    // 그룹 중 하나를 무작위로 선택
    const selectedGroup = Math.random() < 0.5 ? group1 : group2;
    
    // 선택된 그룹에 있는 캐릭터를 필수 캐릭터에 추가
    requiredCharacters.push(...selectedGroup);
      
    // 남은 1명의 캐릭터를 무작위로 선택
    // const remainingCharacters = Object.keys(characters).filter(character => !requiredCharacters.includes(character));
    // for (let i = 0; i < 1; i++) {
    //   const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
    //   requiredCharacters.push(remainingCharacters[randomIndex]);
    //   remainingCharacters.splice(randomIndex, 1);
    // }

    const selectedCharacters = {};
    requiredCharacters.forEach((character) => {
      selectedCharacters[character] = characters[character];
    });


    if (!originalCharactor) {
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }else{
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }
    
    
    
    
    // if (!originalCharactor7) {
    //   originalCharactor7 = JSON.parse(JSON.stringify(charactor7));
    //   mapNameToJSON(roomData, charactor7, function(callback) {
    //     callback_mapping(callback);
    //   });
    // } else {
    //   const charactor_origin = JSON.parse(JSON.stringify(originalCharactor7));
    //   mapNameToJSON(roomData, charactor_origin, function(callback) {
    //     callback_mapping(callback);
    //   });
    // }
  }
  //8인 조건문
  else if(roomData.length === 8){
    // 필수로 들어가야 하는 5명의 캐릭터
    const requiredCharacters = ["L", "N", "M", "Kira", "Kiyomi"];

    const group1 = ["Hal", "Misa"];
    const group2 = ["Jebanni", "Mikami"];
    
    // 그룹 중 하나를 무작위로 선택
    const selectedGroup = Math.random() < 0.5 ? group1 : group2;

    // 선택된 그룹에 있는 캐릭터를 필수 캐릭터에 추가
    requiredCharacters.push(...selectedGroup);
    
    // 선택된 그룹에 있는 멤버를 제외한 그룹의 멤버들을 저장
    const unselectedGroupMembers = selectedGroup === group1 ? group2 : group1;
    
    // 남은 1명의 캐릭터를 무작위로 선택
    const remainingCharacters = Object.keys(characters).filter(character =>
      !requiredCharacters.includes(character) && !unselectedGroupMembers.includes(character)
    );
    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
      requiredCharacters.push(remainingCharacters[randomIndex]);
      remainingCharacters.splice(randomIndex, 1);
    }
    
    const selectedCharacters = {};
    requiredCharacters.forEach((character) => {
      selectedCharacters[character] = characters[character];
    });
    
    if (!originalCharactor) {
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }else{
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }
    
    // if (!originalCharactor8) {
    //   originalCharactor8 = JSON.parse(JSON.stringify(charactor8));
    //   mapNameToJSON(roomData, charactor8, function(callback) {
    //     callback_mapping(callback);
    //   });
    // } else {
    //   const charactor_origin = JSON.parse(JSON.stringify(originalCharactor8));
    //   mapNameToJSON(roomData, charactor_origin, function(callback) {
    //     callback_mapping(callback);
    //   });
    // }
  }
  //9인 조건문
  else if(roomData.length === 9){   

  // 필수로 들어가야 하는 7명의 캐릭터
  const requiredCharacters = ["L", "N", "M", "Kira", "Kiyomi", "Hal", "Misa"];

  // Jebanni와 Mikami 그룹
  const jebanniAndMikamiGroup = ["Jebanni", "Mikami"];

  // Jebanni와 Mikami 중 하나를 선택
  const shouldIncludeJebanniAndMikami = Math.random() < 0.5;

  // 선택할 나머지 캐릭터 수 (2명)
  const remainingCharacterCount = 2;

  // 남은 캐릭터 목록
  const remainingCharacters = Object.keys(characters).filter(character =>
    !requiredCharacters.includes(character) && !jebanniAndMikamiGroup.includes(character)
  );

  // 선택할 캐릭터 그룹 초기화
  const selectedCharacters = [...requiredCharacters];

  if (shouldIncludeJebanniAndMikami) {
    // Jebanni와 Mikami 둘 다 선택하는 경우
    selectedCharacters.push(...jebanniAndMikamiGroup);
  } else {
    // 나머지 캐릭터 중에서 2개 선택
    for (let i = 0; i < remainingCharacterCount; i++) {
      const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
      selectedCharacters.push(remainingCharacters[randomIndex]);
      remainingCharacters.splice(randomIndex, 1);
    }
  }
  
  const finalSelectedCharacters = {};

  // 선택한 캐릭터로 초기화
  selectedCharacters.forEach((character) => {
    finalSelectedCharacters[character] = characters[character];
  });

  if (!originalCharactor) {
    originalCharactor = JSON.parse(JSON.stringify(finalSelectedCharacters));
    mapNameToJSON(roomData, originalCharactor, function(callback) {
      callback_mapping(callback);
    });
  }else{
    originalCharactor = JSON.parse(JSON.stringify(finalSelectedCharacters));
    mapNameToJSON(roomData, originalCharactor, function(callback) {
      callback_mapping(callback);
    });
  }
    
    //if (!originalCharactor9) {
    //  originalCharactor9 = JSON.parse(JSON.stringify(charactor9));
    //  mapNameToJSON(roomData, charactor9, function(callback) {
    //    callback_mapping(callback);
    //  });
    //} else {
    //  const charactor_origin = JSON.parse(JSON.stringify(originalCharactor9));
    //  mapNameToJSON(roomData, charactor_origin, function(callback) {
    //   callback_mapping(callback);
    //  });
    // }
  }
  //10인 조건문
  else if(roomData.length === 10){
    // 필수로 들어가야 하는 5명의 캐릭터
    const requiredCharacters = ["L", "N", "M", "Kira", "Kiyomi", "Hal", "Misa","Jebanni", "Mikami"];
      
    // 남은 1명의 캐릭터를 무작위로 선택
    const remainingCharacters = Object.keys(characters).filter(character => !requiredCharacters.includes(character));
    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
      requiredCharacters.push(remainingCharacters[randomIndex]);
      remainingCharacters.splice(randomIndex, 1);
    }

    const selectedCharacters = {};
    requiredCharacters.forEach((character) => {
      selectedCharacters[character] = characters[character];
    });


    if (!originalCharactor) {
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }else{
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }
    
    // if (!originalCharactor10) {
    //   originalCharactor10 = JSON.parse(JSON.stringify(charactor10));
    //   mapNameToJSON(roomData, charactor10, function(callback) {
    //     callback_mapping(callback);
    //   });
    // } else {
    //   const charactor_origin = JSON.parse(JSON.stringify(originalCharactor10));
    //   mapNameToJSON(roomData, charactor_origin, function(callback) {
    //     callback_mapping(callback);
    //   });
    // }
  }
  //11인 조건문
  else if(roomData.length === 11){
     // 필수로 들어가야 하는 5명의 캐릭터
     const requiredCharacters = ["L", "N", "M", "Kira", "Kiyomi", "Hal", "Misa","Jebanni", "Mikami"];
      
     // 남은 2명의 캐릭터를 무작위로 선택
     const remainingCharacters = Object.keys(characters).filter(character => !requiredCharacters.includes(character));
     for (let i = 0; i < 2; i++) {
       const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
       requiredCharacters.push(remainingCharacters[randomIndex]);
       remainingCharacters.splice(randomIndex, 1);
     }
 
     const selectedCharacters = {};
     requiredCharacters.forEach((character) => {
       selectedCharacters[character] = characters[character];
     });
 
 
     if (!originalCharactor) {
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }else{
      originalCharactor = JSON.parse(JSON.stringify(selectedCharacters));
      mapNameToJSON(roomData, originalCharactor, function(callback) {
        callback_mapping(callback);
      });
    }
    
    
    // if (!originalCharactor11) {
    //   originalCharactor11 = JSON.parse(JSON.stringify(charactor11));
    //   mapNameToJSON(roomData, charactor11, function(callback) {
    //     callback_mapping(callback);
    //   });
    // } else {
    //   const charactor_origin = JSON.parse(JSON.stringify(originalCharactor11));
    //   mapNameToJSON(roomData, charactor_origin, function(callback) {
    //     callback_mapping(callback);
    //   });
    // }
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
  if(sasin === true){
    setTimeout(sasin_start(bot), 300000); // 게임 시작 5분 후 사신 류크가 랜덤으로 한 명씩 노트에 적는다.
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

// 사신 활동 시작
function sasin_start(bot){

  // 모든 플레이어에게 통합된 메시지 전송
  for (const key_vf in mapped_role) {
    const person = mapped_role[key_vf];
    bot.sendMessage(person.id, `** 사신 류크가 따분해 합니다. **\n 1분 마다 무작위로 사신 노트에 이름이 적힙니다. \n`);
  }
  setInterval(sasinNote, 60000);
} 

// 사신노트 
function sasinNote(bot){
  for(const key in mapped_role){
    if(mapped_role[key].alive == true){
      const aliveCharacters = [];
      aliveCharacters.push(key);
    }
  }
  
  // 류크의 선택
  alive_len = aliveCharacters.length;
  const sasinPick_num = Math.floor(Math.random() * alive_len);
  const sasinPick = aliveCharacters[sasinPick_num];

  message.deathMsgSasin(sasinPick, bot, function(callback){
    if(callback===true){
      const combinedMessage = Object.values(mapped_role)
      .map(person => `${person.role}: ${person.name} - 사인: 류크`)
      .join('\n');

      // 모든 플레이어에게 통합된 메시지 전송
      for (const key_vf in mapped_role) {
        const person = mapped_role[key_vf];
        bot.sendMessage(person.id, `**최종 결과를 안내드립니다**\n${combinedMessage}`);
      } 
      deathNotes(true);
    }
  });
}

//키라 체포, 캐릭터: 엘, 니아
function arrest_Kira(chatId, capturedPerson, bot, arrest){
  if(mapped_role.L.id === chatId){
    if(mapped_role.L.alive === true && mapped_role.L.skill1 === true){
      mapped_role.L.skill1 = false;
      arrestCool_L_start = Date.now();
      setTimeout(()=>{
        mapped_role.L.skill1 = true;
      }, arrestCool_L)

      if(mapped_role.Kira.name === capturedPerson){
        console.log('L추리성공')
        winLTeam(bot);
        arrest(true)
      }
      else{
        console.log('L추리실패')
        //mapped_role.L.skill1 = false;
        for(const key2 in mapped_role){
          const participant2 = mapped_role[key2];
          const arrestMsg2 = `**[속보] 엘의 정체는 ${mapped_role.L.name} 입니다.**`
          bot.sendMessage(participant2.id, arrestMsg2)
        }
      }
    }
    else if(mapped_role.L.alive === true && mapped_role.L.skill1 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - arrestCool_L_start
      const remainingTime = Math.ceil((arrestCool_L - elapsedTime) / 1000);
      bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`)
    }
  }


  if(mapped_role.N.id === chatId){
    if(mapped_role.L.alive === false){
      if(mapped_role.N.skill1 === true && mapped_role.N.alive === true){
        mapped_role.N.skill1 = false;
        arrestCool_N_start = Date.now();
        setTimeout(()=>{
          mapped_role.N.skill1 = true;
        }, arrestCool_N)

        if(mapped_role.Kira.name === capturedPerson){
          console.log('N추리성공')
          winLTeam(bot);
          arrest(true);
        }
        else{
          console.log('N추리실패')
          //mapped_role.N.skill1 = false;
          for(const key4 in mapped_role){
            const participant4 = mapped_role[key4];
            const arrestMsg4 = `**[속보] 니아의 정체는 ${mapped_role.N.name} 입니다.**`
            bot.sendMessage(participant4.id, arrestMsg4)
          }
        }
      }
      else if(mapped_role.N.alive === true && mapped_role.N.skill1 === false){
        const currentTime = Date.now();
        const elapsedTime = currentTime - arrestCool_N_start
        const remainingTime = Math.ceil((arrestCool_N - elapsedTime) / 1000);
        bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
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
      bot.sendMessage(chatId, `[System] 남은 방송횟수: ` + mapped_role.Kiyomi.skill2 + `회`);
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


//도청, 캐릭터: 엘
function wiretapping(chatId, target, msg, bot){
  if(mapped_role.L.id === chatId){
    if(mapped_role.L.alive === true && mapped_role.L.skill3 === true){      
      let foundMatch = false;
      for(const key in mapped_role){
        if(mapped_role[key].name === target){
          mapped_role.L.skill3 = false;
          wiretappingCool_start = Date.now();
          setTimeout(()=>{
            mapped_role.L.skill3 = true;
          }, wiretapping_Cool)

          bot.sendMessage(chatId, `[System] ${target}을 대상으로 30초간 도청을 시도합니다.`)

          foundMatch = true;
          const messageListener = (msg) => {
            if (msg.chat.id === mapped_role[key].id && mapped_role[key].alive === true) {
              const messageText = msg.text.trim(); // 메시지 텍스트를 양 끝의 공백을 제거하고 저장합니다.
              const firstTwoCharacters = messageText.slice(0,2);
              const firstThreeCharacters = messageText.slice(0, 3);
              if (firstTwoCharacters === '/귓' || firstThreeCharacters === '/쪽지') {
                const spaceIndex = messageText.indexOf(' '); // 첫 번째 공백의 위치를 찾습니다.
                if (spaceIndex !== -1) {
                  const nextSpaceIndex = messageText.indexOf(' ', spaceIndex + 1); // 두 번째 공백의 위치를 찾습니다.
                  const targetName = messageText.substring(spaceIndex + 1, nextSpaceIndex !== -1 ? nextSpaceIndex : undefined); // 첫 번째 공백부터 두 번째 공백 전까지의 부분을 추출합니다.
                  for(const key2 in mapped_role){
                    if (targetName === mapped_role[key2].name) {
                      bot.sendMessage(chatId, '[System - 도청] ' + target + ': ' + messageText); // sender에게 메시지를 전송합니다.
                    }
                  }
                  
                }
              }
            }
          };

          // const messageListener = (msg) => {
          //   if (msg.chat.id === mapped_role[key].id && mapped_role[key].alive === true && (msg.text.includes('/귓') || msg.text.includes('/쪽지'))) {
          //     bot.sendMessage(chatId, '[System - 도청] '+ target +': ' + msg.text); // sender에게 메시지를 전송합니다.
          //   }
          // };
    
          bot.on('message', messageListener);
    
          // 30초 후에 이벤트 리스너를 자동으로 제거합니다.
          setTimeout(() => {
            bot.removeListener('message', messageListener);
            bot.sendMessage(chatId, `[System] ${target}을 대상으로 한 도청이 종료되었습니다.`);
          }, wiretappingCool);
    
          break;
        }
      }

      if (!foundMatch) {
        bot.sendMessage(chatId, `[System] ${target}은(는) 도청할 수 있는 대상이 아닙니다.`);
      }

      // wiretapping_result(chatId, target, msg, bot, function(callback){
      //   if(callback === true){
      //     bot.sendMessage(chatId, `[System] ${target}을 대상으로 한 도청이 종료되었습니다.`);
      //   }
      // })
    }
    else if(mapped_role.L.alive === true && mapped_role.L.skill3 === false){
      const currentTime = Date.now();
      const elapsedTime = currentTime - wiretappingCool_start
      const remainingTime = Math.ceil((wiretapping_Cool - elapsedTime) / 1000);
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

//도청에 대한 결과 처리
function wiretapping_result(chatId, target, msg, bot, callback){
  let foundMatch = false;
  for(const key in mapped_role){
    if(mapped_role[key].name === target){
      bot.sendMessage(chatId, `[System] ${target}을 대상으로 30초간 도청을 시도합니다.`)

      foundMatch = true;
      const messageListener = (msg) => {
        if (msg.chat.id === mapped_role[key].id && (msg.text.includes('/귓') || msg.text.includes('/쪽지'))) {
          bot.sendMessage(chatId, '[System - 도청] '+ target +': ' + msg.text); // sender에게 메시지를 전송합니다.
        }
      };

      bot.on('message', messageListener);

      // 30초 후에 이벤트 리스너를 자동으로 제거합니다.
      setTimeout(() => {
        bot.removeListener('message', messageListener);
        callback(true)
      }, wiretappingCool);

      break;
    }
  }

  if(!foundMatch){
    bot.sendMessage(chatId, `${receiver}의 도청에 실패했습니다.`)
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
          bot.sendMessage(chatId, `[System] `+ capturedPerson + `의 정체는 키요미가 맞습니다. 그녀의 정보수집을 방해합니다.`)
          bot.sendMessage(mapped_role.Kiyomi.id, `[System] 니아의 감시로 정보수집 스킬이 제한되었습니다.(엘/니아/멜로 정보수집 불가)`)
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
            mapped_role.Kiyomi.deathreason = "납치";
  
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
function pieceNote(chatId, role, capturedPerson, deathreason, bot, pieceNote){
  if(mapped_role.M.id === chatId){
    if(mapped_role.M.skill2 === true && mapped_role.M.alive === true){
      mapped_role.M.skill2 = false;

      bot.sendMessage(chatId, '[System] 노트의 일치여부를 체크합니다.');
      setTimeout(()=>{
        let foundMatch = false; //일치하는 플레이어를 찾는 변수
        for(const key in mapped_role){
          console.log('데스노트 일치여부 checking...')
          if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson && mapped_role[key].alive === true) {
            console.log(mapped_role[key].role + ' & ' + mapped_role[key].alive )
              deathMsg(chatId, mapped_role[key], deathreason, bot, function(callback){
                if(callback===true){
                  pieceNote(true);
                }
              });
            foundMatch = true;
            break;
          }
        }
        if(!foundMatch){
          bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
        }
      }, deathCool)
      
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
          mapped_role.Misa.deathreason = "연금";
  
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
          setTimeout(()=>{
            bot.sendMessage(chatId, `[System] `+ detectivePerson + `는 수사관(L측)입니다.`)
          }, detective_waiting_Cool)
          break;
        }
        else if(mapped_role[key].team === 'Kira' && mapped_role[key].name === detectivePerson){
          setTimeout(()=>{
            bot.sendMessage(chatId, `[System] `+ detectivePerson + `(은)는 키라측입니다. 당신의 정체가 해당 플레이어에게 전달되었습니다.`);
          }, detective_waiting_Cool)        
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
          bot.sendMessage(chatId, `[System] `+ arrestPerson + `의 정체는 미카미가 맞습니다. 그의 대신노트 스킬을 무력화합니다.`)
          //bot.sendMessage(mapped_role.Mikami.id, `[System] 제반니의 바꿔치기로 대신노트 스킬이 봉인되었습니다.`)
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
      let foundMatch = false;
      for(const key_name in mapped_role){
        if(mapped_role[key_name].name === chasePerson){
          foundMatch = true;
          bot.sendMessage(chatId, `[System] ${chasePerson} 플레이어를 추적합니다.`);
          mapped_role.Jebanni.skill2 = false;
          chase_Jebanni_Cool_start = Date.now();
          setTimeout(()=>{
            mapped_role.Jebanni.skill2 = true;
          }, chase_Jebanni_Cool)

          //70% 확률로 플레이어 확인
          if(chance_Jebanni > 0.3){
            for(const key in mapped_role){
              if (mapped_role[key].name === chasePerson) {
                setTimeout(()=>{
                  bot.sendMessage(chatId, `[System] 추적한 플레이어의 정체는 ` + mapped_role[key].role + ` 입니다.`);
                  if(chance2_Jebanni > 0.5){
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
      }

      if (!foundMatch) {
        bot.sendMessage(chatId, `[System] ${chasePerson}은(는) 추적할 수 있는 대상이 아닙니다.`);
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

      //70% 확률로 플레이어 확인
      if(chance_Mogi >= 0.3){
        for(const key in mapped_role){
          if (mapped_role[key].name === followPerson) {
            setTimeout(()=>{
              bot.sendMessage(chatId, `[System] 플레이어의 정체는 ` + mapped_role[key].role + ` 입니다.`);
              if(mapped_role[key].team === 'Kira' && chance2_Mogi > 0.5){
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
      check_L_Cool_start = Date.now();
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

//데스노트, 캐릭터: 키라
function deathNote(chatId, role, capturedPerson, deathreason, bot, deathNotes){
  if(mapped_role.Kira.id === chatId){
    if(mapped_role.Kira.skill1 === true){
      mapped_role.Kira.skill1 = false;
      deathNoteCool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Kira.skill1 = true;
      }, deathNoteCool)

      bot.sendMessage(chatId, '[System] 노트의 일치여부를 체크합니다.');
      setTimeout(()=>{
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
                deathMsg(chatId, mapped_role[key], deathreason, bot, function(callback){
                  if(callback===true){ 
                    deathNotes(true);
                  }
              });
            foundMatch = true;
            break;
            }  
          }
        }
        if(!foundMatch){
          bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
        }
      }, deathCool)
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
function watchNote(chatId, role, capturedPerson, deathreason, bot, watchNote){
  if(mapped_role.Kira.id === chatId){
    if(mapped_role.Kira.skill2 === true){
      mapped_role.Kira.skill2 = false;
      bot.sendMessage(chatId, '[System] 노트의 일치여부를 체크합니다.');
      
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
            deathMsg(chatId, mapped_role[key], deathreason, bot, function(callback){
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
function deathMsg(chatId, dead, deathreason, bot, callback){
  let KiraWinPhoto = __dirname + '/img/KiraWin.jpg'
  let LLosePhoto = __dirname + '/img/LLose.jpg'
  const LwinPhoto = __dirname + '/img/LWin_renewal.jpg'
  const KiraLosePhoto = __dirname + '/img/KiraLose.jpg'

  //이벤트 스킨 적용
  if(mapped_role.Kira.id === 6419631188){
    KiraWinPhoto = __dirname + '/img/KiraWin_peach.jpg'
    LLosePhoto = __dirname + '/img/KiraWin_peach.jpg'
  }
  else if(mapped_role.Kira.id === 6125062530){
    KiraWinPhoto = __dirname + '/img/KiraWin_6125062530.jpg'
    LLosePhoto = __dirname + '/img/KiraWin_6125062530.jpg'
  }

  dead.alive = false; //사망처리
  dead.deathreason = deathreason;
  bot.sendMessage(chatId, '[System] 데스노트로 인해 ' + dead.role + '(이)가 사망했습니다.\n※사인: '+deathreason)
  bot.sendMessage(dead.id, '[System] 당신은 데스노트에 의해 사망했습니다\n※사인: '+deathreason);
  
  if(dead.role === '엘'){
    if(mapped_role.N.alive === false){ //니아가 죽어있는 상태면 게임 종료
      const combinedMessage = Object.values(mapped_role)
      .map(person => {
        let message;
        if (person.deathreason === '생존') {
          message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
        }
        else if(person.deathreason === '체포'){
          message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
        } 
        else {
          message = `${person.role}: ${person.name} - 결과: ${person.deathreason}(으)로 사망`;
        }
        return message;
      })
      .join('\n');

      // 모든 플레이어에게 통합된 메시지 전송
      for (const key_vf in mapped_role) {
        const person = mapped_role[key_vf];
        bot.sendMessage(person.id, `**최종 결과를 안내드립니다**\n${combinedMessage}`);
      }

      for(const key in mapped_role){
        const participant = mapped_role[key];
        const message = `
        **L과N 전원 사망했습니다. 키라의 승리입니다 -게임 종료-**`;

        if(participant.team === 'L'){
          bot.sendPhoto(participant.id, LLosePhoto, { caption: message })
          .then(() => {
            //console.log('사진 전송 완료');
          })
          .catch((error) => {
            //console.error('사진 전송 실패:', error);
            bot.sendMessage(participant.id, message)
          });
        }
        else if(participant.team === 'Kira'){
          bot.sendPhoto(participant.id, KiraWinPhoto, { caption: message })
          .then(() => {
            //console.log('사진 전송 완료');
          })
          .catch((error) => {
            //console.error('사진 전송 실패:', error);
            bot.sendMessage(participant.id, message)
          });
        }
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
    const combinedMessage = Object.values(mapped_role)
    .map(person => {
      let message;
      if (person.deathreason === '생존') {
        message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
      }
      else if(person.deathreason === '체포'){
        message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
      } 
      else {
        message = `${person.role}: ${person.name} - 결과: ${person.deathreason}(으)로 사망`;
      }
      return message;
    })
    .join('\n');

    // 모든 플레이어에게 통합된 메시지 전송
    for (const key_vf in mapped_role) {
      const person = mapped_role[key_vf];
      bot.sendMessage(person.id, `**최종 결과를 안내드립니다**\n${combinedMessage}`);
    }
    
    for(const key in mapped_role){
      const participant = mapped_role[key];
      const message = `
      **L과N 전원 사망했습니다. 키라의 승리입니다 -게임 종료-**`;
      
      if(participant.team === 'L'){
        bot.sendPhoto(participant.id, LLosePhoto, { caption: message })
        .then(() => {
          //console.log('사진 전송 완료');
        })
        .catch((error) => {
          //console.error('사진 전송 실패:', error);
          bot.sendMessage(participant.id, message)
        });
      }
      else if(participant.team === 'Kira'){
        bot.sendPhoto(participant.id, KiraWinPhoto, { caption: message })
        .then(() => {
          //console.log('사진 전송 완료');
        })
        .catch((error) => {
          //console.error('사진 전송 실패:', error);
          bot.sendMessage(participant.id, message)
        });
      }
    }
    callback(true);
  }

  if(dead.role === '키라'){
    const combinedMessage = Object.values(mapped_role)
    .map(person => {
      let message;
      if (person.deathreason === '생존') {
        message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
      }
      else if(person.deathreason === '체포'){
        message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
      } 
      else {
        message = `${person.role}: ${person.name} - 결과: ${person.deathreason}(으)로 사망`;
      }
      return message;
    })
    .join('\n');

    // 모든 플레이어에게 통합된 메시지 전송
    for (const key_vf in mapped_role) {
      const person = mapped_role[key_vf];
      bot.sendMessage(person.id, `**최종 결과를 안내드립니다**\n${combinedMessage}`);
    }

    for(const key in mapped_role){
      const participant = mapped_role[key];
      const message = `
      **키라가 사망했습니다. L측의 승리입니다 -게임 종료-**`;
      if(mapped_role[key].team === 'L'){
        bot.sendPhoto(participant.id, LwinPhoto, { caption: message })
        .then(() => {
          //console.log('사진 전송 완료');
        })
        .catch((error) => {
          //console.error('사진 전송 실패:', error);
          bot.sendMessage(participant.id, message)
        });
      }
      else if(mapped_role[key].team === 'Kira'){
        bot.sendPhoto(participant.id, KiraLosePhoto, { caption: message })
        .then(() => {
          //console.log('사진 전송 완료');
        })
        .catch((error) => {
          //console.error('사진 전송 실패:', error);
          bot.sendMessage(participant.id, message)
        });
      }
    }
    callback(true);
  }
}

//연모, 캐릭터: 미사
function love_Kira(chatId, bot){
  if(mapped_role.Misa.id === chatId){
    const chance_Misa = Math.random()
    if(mapped_role.Misa.alive === true && mapped_role.Misa.skill1 === true){
      if(mapped_role.Misa.lifepoint >= 50){
        mapped_role.Misa.skill1 = false;
        love_Kira_Cool_start = Date.now();
        setTimeout(()=>{
          mapped_role.Misa.skill1 = true;
        }, love_Kira_Cool)
  
        //50% 확률로 키라 확인
        if(chance_Misa > 0.5){
          setTimeout(()=>{
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 50;
            bot.sendMessage(chatId, `[System] 키라의 정체는 ` + mapped_role.Kira.name + ` 입니다. \n 남은포인트: ` + mapped_role.Misa.lifepoint);
          }, loveCool)
        }
        else{
          setTimeout(()=>{
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 50;
            bot.sendMessage(chatId, `[System] 키라를 확인하는데 실패했습니다 \n 남은포인트: ` + mapped_role.Misa.lifepoint);
  
          }, loveCool)
        }
      }
      else{
        bot.sendMessage(chatId, `[System] 스킬사용을 위한 남은 포인트가 부족합니다.`);
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
      if(mapped_role.Misa.lifepoint >= 100){
        mapped_role.Misa.skill2 = false;
        envoyEyes_Cool_start = Date.now();
        setTimeout(()=>{
          mapped_role.Misa.skill2 = true;
        }, envoyEyes_Cool)
  
        if(parseInt(mapped_role.Misa.chance) === 4){
          if(chance_Misa > 0.9){
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 100;
            mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
            bot.sendMessage(chatId, `[System] 사신의눈 발동에 실패했습니다.\n 남은포인트: ` + mapped_role.Misa.lifepoint + ` / 남은횟수: 3회`);
          }
          else{
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 100;
            mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
            for(const key in mapped_role){
              //console.log('사신의눈 checking...')
              if (mapped_role[key].name === envoyEyePerson) {
                bot.sendMessage(chatId, `[System] `+ envoyEyePerson + `의 정체는 ` + mapped_role[key].role + `입니다.\n 남은포인트: ` + mapped_role.Misa.lifepoint + ` / 남은횟수: 3회`)
              }
            }
          }
        }
        else if(parseInt(mapped_role.Misa.chance) === 3){
          if(chance_Misa > 0.8){
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 100;
            mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
            bot.sendMessage(chatId, `[System] 사신의눈 발동에 실패했습니다.\n 남은포인트: ` + mapped_role.Misa.lifepoint + ` / 남은횟수: 2회`);
          }
          else{
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 100;
            mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
            for(const key in mapped_role){
              //console.log('사신의눈 checking...')
              if (mapped_role[key].name === envoyEyePerson) {
                bot.sendMessage(chatId, `[System] `+ envoyEyePerson + `의 정체는 ` + mapped_role[key].role + `입니다.\n 남은포인트: ` + mapped_role.Misa.lifepoint + ` / 남은횟수: 2회`)
              }
            }
          }
        }
        else if(parseInt(mapped_role.Misa.chance) === 2){
          if(chance_Misa > 0.6){
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 100;
            mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
            bot.sendMessage(chatId, `[System] 사신의눈 발동에 실패했습니다.\n 남은포인트: ` + mapped_role.Misa.lifepoint + ` / 남은횟수: 1회`);
          }
          else{
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 100;
            mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
            for(const key in mapped_role){
              //console.log('사신의눈 checking...')
              if (mapped_role[key].name === envoyEyePerson) {
                bot.sendMessage(chatId, `[System] `+ envoyEyePerson + `의 정체는 ` + mapped_role[key].role + `입니다.\n 남은포인트: ` + mapped_role.Misa.lifepoint + ` / 남은횟수: 1회`)
              }
            }
          }
        }
        else if(parseInt(mapped_role.Misa.chance) === 1){
          if(chance_Misa > 0.2){
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 100;
            mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
            bot.sendMessage(chatId, `[System] 사신의눈 발동에 실패했습니다.\n 남은포인트: ` + mapped_role.Misa.lifepoint + ` / 남은횟수: 0회`);
          }
          else{
            mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 100;
            mapped_role.Misa.chance = parseInt(mapped_role.Misa.chance) - 1;
            for(const key in mapped_role){
              //console.log('사신의눈 checking...')
              if (mapped_role[key].name === envoyEyePerson) {
                bot.sendMessage(chatId, `[System] `+ envoyEyePerson + `의 정체는 ` + mapped_role[key].role + `입니다.\n 남은포인트: ` + mapped_role.Misa.lifepoint + ` / 남은횟수: 0회`)
              }
            }
          }
        }
        else if(parseInt(mapped_role.Misa.chance) === 0){
          bot.sendMessage(chatId, `[System] 더이상 사신의눈을 사용할 수 없습니다.`);
        }
      }
      else{
        bot.sendMessage(chatId, `[System] 스킬사용을 위한 포인트가 부족합니다.`);
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

//렘의노트. 캐릭터: 미사
function remNote(chatId, role, capturedPerson, deathreason, bot, deathNotes){
  if(mapped_role.Misa.id === chatId){
    if(mapped_role.Misa.lifepoint >= 300){
      if(mapped_role.Misa.alive === true && mapped_role.Misa.skill3 === true){
        mapped_role.Misa.skill3 = false;
        remNoteCool_start = Date.now();
        setTimeout(()=>{
          mapped_role.Misa.skill3 = true;
        }, remNoteCool)
        
        bot.sendMessage(chatId, '[System] 노트의 일치여부를 체크합니다.');
        let foundMatch = false; //일치하는 플레이어를 찾는 변수
        for(const key in mapped_role){
          console.log('데스노트 일치여부 checking...')
          if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson && mapped_role[key].alive === true){
            console.log(mapped_role[key].role + ' & ' + mapped_role[key].alive )
              mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 300;
              bot.sendMessage(chatId, '[System] 남은포인트: ' + mapped_role.Misa.lifepoint);
              deathMsg(chatId, mapped_role[key], deathreason, bot, function(callback){
                if(callback===true){
                  const combinedMessage = Object.values(mapped_role)
                  .map(person => {
                    let message;
                    if (person.deathreason === '생존') {
                      message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
                    }
                    else if(person.deathreason === '체포'){
                      message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
                    } 
                    else {
                      message = `${person.role}: ${person.name} - 결과: ${person.deathreason}(으)로 사망`;
                    }
                    return message;
                  })
                  .join('\n');

                  // 모든 플레이어에게 통합된 메시지 전송
                  for (const key_vf in mapped_role) {
                    const person = mapped_role[key_vf];
                    bot.sendMessage(person.id, `**최종 결과를 안내드립니다**\n${combinedMessage}`);
                  }
                  deathNotes(true);
                }
              });
            foundMatch = true;
            break;
          }
        }
        if(!foundMatch){
          mapped_role.Misa.lifepoint = parseInt(mapped_role.Misa.lifepoint) - 300;
          bot.sendMessage(chatId, '[System] 남은포인트: ' + mapped_role.Misa.lifepoint);
          bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
        }
      }
      else if(mapped_role.Misa.alive === true && mapped_role.Misa.skill3 === false){
        const currentTime = Date.now();
        const elapsedTime = currentTime - remNoteCool_start
        const remainingTime = Math.ceil((remNoteCool - elapsedTime) / 1000);
        bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
      }
      else{
        bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
      }
    }
    else{
      bot.sendMessage(chatId, `[System] 스킬사용을 위한 포인트가 부족합니다.`);
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//정보수집. 캐릭터: 키요미
function gatheringInfo(chatId, role, capturedPerson, bot){
  if(mapped_role.Kiyomi.id === chatId){
    if(mapped_role.Kiyomi.alive === true && mapped_role.Kiyomi.skill1 === true){
      mapped_role.Kiyomi.skill1 = false;
      gatheringInfo_Cool_start = Date.now();
      setTimeout(()=>{
        mapped_role.Kiyomi.skill1 = true;
      }, gatheringInfo_Cool)

      if(mapped_role.Kiyomi.seal === false){
        if(role === '엘' || role === '니아' || role === '멜로'){
          bot.sendMessage(chatId, `[System] 감시로 인해 엘 / 니아 / 멜로에 대한 정보수집은 불가능합니다`)
        }
        else{
          let foundMatch = false; //일치하는 플레이어를 찾는 변수
          for(const key in mapped_role){
            console.log('정보수집결과 checking...')
            if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson) {
              mapped_role.Kiyomi.skill2 = parseInt(mapped_role.Kiyomi.skill2) + 1;
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
      else{
        let foundMatch = false; //일치하는 플레이어를 찾는 변수
        for(const key2 in mapped_role){
          console.log('정보수집결과 checking...')
          if (mapped_role[key2].role === role && mapped_role[key2].name === capturedPerson) {
            mapped_role.Kiyomi.skill2 = parseInt(mapped_role.Kiyomi.skill2) + 1;
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
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`); 
    }
  }
  else{
    bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
  }
}

//대신노트 - 캐릭터: 미카미
function desinNote(chatId, role, capturedPerson, deathreason, bot, desinNotes){
  if(mapped_role.Mikami.id === chatId){
    if(mapped_role.Mikami.skill1_num > 0){
      if(mapped_role.Mikami.alive === true && mapped_role.Mikami.seal === true && mapped_role.Mikami.skill1 === true){
        mapped_role.Mikami.skill1 = false;
        desinNoteCool_start = Date.now();
        setTimeout(()=>{
          mapped_role.Mikami.skill1 = true;
        }, deathNoteCool)
        
        bot.sendMessage(chatId, '[System] 노트의 일치여부를 체크합니다.');
        setTimeout(()=>{
          let foundMatch = false; //일치하는 플레이어를 찾는 변수
          for(const key in mapped_role){
            console.log('데스노트 일치여부 checking...')
            if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson && mapped_role[key].alive === true){
              console.log(mapped_role[key].role + ' & ' + mapped_role[key].alive )
                mapped_role.Mikami.skill1_num = parseInt(mapped_role.Mikami.skill1_num) - 1;
                bot.sendMessage(chatId, '[System] 남은 노트횟수:' + mapped_role.Mikami.skill1_num+'회');
                deathMsg(chatId, mapped_role[key], deathreason, bot, function(callback){
                  if(callback===true){
                    desinNotes(true);
                  }
                });

              foundMatch = true;
              break;
            }
          }
          if(!foundMatch){
              mapped_role.Mikami.skill1_num = parseInt(mapped_role.Mikami.skill1_num) - 1;
              bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
              bot.sendMessage(chatId, '[System] 남은 노트횟수:' + mapped_role.Mikami.skill1_num+'회');
          }
        }, deathCool)
        
      }
      else if(mapped_role.Mikami.alive === true && mapped_role.Mikami.skill1 === false){
        const currentTime = Date.now();
        const elapsedTime = currentTime - desinNoteCool_start
        const remainingTime = Math.ceil((desinNoteCool - elapsedTime) / 1000);
        bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
      }
      else if(mapped_role.Mikami.alive === true && mapped_role.Mikami.seal === false && mapped_role.Mikami.skill1 === true){
        bot.sendMessage(chatId, '[System] 노트의 일치여부를 체크합니다.');
        setTimeout(()=>{
          mapped_role.Mikami.skill1_num = parseInt(mapped_role.Mikami.skill1_num) - 1;
          bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
          bot.sendMessage(chatId, '[System] 남은 노트횟수:' + mapped_role.Mikami.skill1_num+'회');
        }, deathCool);
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

//키라숭배, 캐릭터: 미카미
function worship_Kira(chatId, bot){
  if(mapped_role.Mikami.id === chatId){
    const chance_Mikami = Math.random();
    if(mapped_role.Mikami.alive === true && mapped_role.Mikami.skill2 === true){
      mapped_role.Mikami.skill2 = false;
      worship_kira_Cool_start = Date.now();
      
      //키라 정체 알려줌
      if(chance_Mikami > 0.5){
        setTimeout(()=>{
          bot.sendMessage(chatId, `[System] 키라의 정체는 ` + mapped_role.Kira.name + '입니다.');
          mapped_role.Mikami.skill2 = true;
        }, worship_kira_Cool)
      }
      //키요미 정체 알려줌
      else{
        setTimeout(()=>{
          bot.sendMessage(chatId, `[System] 키요미의 정체는 ` + mapped_role.Kiyomi.name + '입니다.');
          mapped_role.Mikami.skill2 = true;
        }, worship_kira_Cool)
      }
      
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

//체포 스킬로 인한 결과처리 - 엘팀 승리
function winLTeam(bot){
  const LwinPhoto = __dirname + '/img/LWin_renewal.jpg'
  const KiraLosePhoto = __dirname + '/img/KiraLose.jpg'
  mapped_role.Kira.deathreason = "체포";
  const combinedMessage = Object.values(mapped_role)
  .map(person => {
    let message;
    if (person.deathreason === '생존') {
      message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
    }
    else if(person.deathreason === '체포'){
      message = `${person.role}: ${person.name} - 결과: ${person.deathreason}`;
    } 
    else {
      message = `${person.role}: ${person.name} - 결과: ${person.deathreason}(으)로 사망`;
    }
    return message;
  })
  .join('\n');

  // 모든 플레이어에게 통합된 메시지 전송
  for (const key_vf in mapped_role) {
    const person = mapped_role[key_vf];
    bot.sendMessage(person.id, `**최종 결과를 안내드립니다**\n${combinedMessage}`);
  }

  for(const key in mapped_role){
    const participant = mapped_role[key];
    const arrestMsg = `**[속보] 키라 ${mapped_role.Kira.name} (이)가 체포되었습니다 -게임 종료-**`
    if(participant.team === 'L'){
      bot.sendPhoto(participant.id, LwinPhoto, { caption: arrestMsg })
      .then(() => {
        //console.log('사진 전송 완료');
      })
      .catch((error) => {
        //console.error('사진 전송 실패:', error);
        bot.sendMessage(participant.id, arrestMsg)
      });
    }
    else if(participant.team === 'Kira'){
      bot.sendPhoto(participant.id, KiraLosePhoto, { caption: arrestMsg })
      .then(() => {
        //console.log('사진 전송 완료');
      })
      .catch((error) => {
        //console.error('사진 전송 실패:', error);
        bot.sendMessage(participant.id, arrestMsg)
      });
    }
    
  }
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

//(공용) 명함교환
function namecard_exchange(chatId, receiver, msg, bot){
  let foundMatch = false;
  for(const key in mapped_role){
    if(mapped_role[key].id === chatId && mapped_role[key].alive === true){
      if(mapped_role[key].note> 0 && !foundMatch){
        const sender = mapped_role[key]        
        namecard_result(sender, receiver, msg, bot, function(callback){
          if(callback === true){
            mapped_role[key].note = parseInt(mapped_role[key].note) - 1
          }
        })
        foundMatch = true;
        break;      
      }
      else if(!foundMatch){
        bot.sendMessage(chatId, `남은 교환요청 횟수가 없습니다.`)
        foundMatch = true;
      }
    }else if(mapped_role[key].id === chatId && mapped_role[key].alive === false){
      bot.sendMessage(chatId, `당신은 사망상태입니다.`);
    }
  }
}

function namecard_result(sender, receiver, msg, bot, callback){
  let foundMatch = false;
  for(const key in mapped_role){
    if(mapped_role[key].name === receiver){
      bot.sendMessage(sender.id, `${receiver}에게 쪽지 전달에 성공했습니다\n남은횟수: ${sender.note-1}회`)
      bot.sendMessage(mapped_role[key].id, `${sender.name}에게서 명함교환 요청이 왔습니다.`)
          
      
      bot.on('message', (msg) => {     
        if (msg.chat.id === mapped_role[key].id && (msg.text.includes('/귓') || msg.text.includes('/쪽지'))) {
          bot.sendMessage(sender.id, msg.text); // sender에게 메시지를 전송합니다.
        }
      });
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
  winLTeam,
  broadcast,
  wiretapping,
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
  remNote,
  gatheringInfo,
  desinNote,
  worship_Kira,
  notice,
  whisper,
  whisper_result,
  namecard_exchange,
  note,
  note_result,
  sasin_start,
  sasinNote
};