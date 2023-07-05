// game.js
const charactor_test = require('./charactor_test.json')
const charactor9 = require('./charactor9.json');
const charactor10 = require('./charactor10.json');
const charactor11 = require('./charactor11.json');
const charactor12 = require('./charactor12.json');

let room = [];
let mapped_role;

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
  //테스트용 조건문
  else if(roomData.length === 3){
    mapNameToJSON(roomData, charactor_test, function(callback){
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
function arrest_Kira(chatId, capturedPerson, arrest){
  if(mapped_role.L.id === chatId && mapped_role.L.alive === true){
    if(mapped_role.Kira.name === capturedPerson){
      console.log('L추리성공')
      const result = 'success'
      arrest(result)
    }
    else{
      console.log('L추리실패')
      const result = 'fail-L'
      arrest(result)
    }
  }
  else if(mapped_role.N.id === chatId && mapped_role.L.alive === false){
    if(mapped_role.Kira.name === capturedPerson){
      console.log('N추리성공')
      const result = 'success'
      arrest(result)
    }
    else{
      console.log('N추리실패')
      const result = 'fail-N'
      arrest(result)
    }
  }
  else{
   // console.log('대상아님')
    const result = 'NotTarget'
    arrest(result)
  }
}

//방송, 캐릭터: 엘, 니아(엘 사망 이후), 키요미(2회)
function broadcast(chatId, broad){
  if(mapped_role.L.id === chatId && mapped_role.L.alive === true){
    const result = true
    broad(result)    
  }
  else if(mapped_role.N.id === chatId && mapped_role.L.alive === false){
    const result = true
    broad(result)
  }
  else if(mapped_role.Kiyomi.id === chatId && mapped_role.kiyomi.skill2<=2){
    mapped_role.kiyomi.skill2 = mapped_role.kiyomi.skill2-1;
    const result = true
    broad(result)
  }
  else{
   // console.log('대상아님')
   const result = false
    broad(result)
  }
}

//키요미 감시, 캐릭터: 니아
function watching_Kiyomi(){

}

//엘의 후계자, 캐릭터: 니아
function successor(){

}

//키요미납치, 캐릭터: 멜로
function kidnap_kiyomi(){

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
function deathNote(){

}

//시계노트, 캐릭터: 키라
function watchNote(){

}

//2대 키라, 캐릭터: 미사
function second_Kira(){

}

//사신의 눈, 캐릭터: 미사
function envoyEyes(){

}

//정보수집. 캐릭터: 키요미
function gatheringInfo(){

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
  kidnap_kiyomi,
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
  notice
};