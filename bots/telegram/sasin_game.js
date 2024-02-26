const fs = require('fs');
const path = require('path');
const characters = require('./sasin_char14.json');

const deathNoteCool = 90000; //데스노트 스킬 쿨타임: 테스트 60초, 본게임 90초
let deathNoteCool_start;
const deathCool = 40000; // 데스노트 스킬로 죽는데 걸리는 시간: 테스트 10초, 본게임 40초
let deathNoteTimeout;

const broadCool = 10000; //방송 스킬 쿨타임: 테스트: 10초, 본게임 10초
let broadCool_start;
let KinddaraBroadCool_start;

const getInfo_Cool = 60000; //사신정보 스킬 쿨타임: 테스트 10초, 본게임 60초
const getInfo_waiting_Cool = 10000; //사신정보 결과 받는데 걸리는 시간 10초
let getInfo_Cool_start;
let getInfoTimeout;
let AraGetInfo_Cool_start;
let AraGetInfoTimeout;

// read character data from the JSON file
function readCharacterData(callback) {
    const filePath = path.join(__dirname, './sasin_char14.json');
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      const characters = JSON.parse(data);
      callback(characters);
    });
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
      charactor[key].mode = roomData[nameIndex].mode;
      roomData.splice(nameIndex, 1);
    }
    
    mapped_role = charactor;
    console.log(charactor);
    callback(charactor);
}

function startSasinGame(roomData, mode, bot, callback_mapping) {
    readCharacterData((characters) => {
        if (roomData.length > Object.keys(characters).length) {
        console.error("Not enough characters for the number of players.");
        return;
        }

        mapNameToJSON([...roomData], characters, function(mappedCharacters) {
        callback_mapping(mappedCharacters);
        });
    });
}

//사신노트로 인한 결과처리
function deathMsg(chatId, dead, deathreason, bot, callback){
    dead.alive = false; //사망처리
    dead.deathreason = deathreason;
    bot.sendMessage(chatId, '[System] 사신노트로 인해 ' + dead.role + '(이)가 사망했습니다.\n※사인: '+deathreason)
    bot.sendMessage(dead.id, '[System] 당신은 사신노트에 의해 사망했습니다\n※사인: '+deathreason);
    
    if(dead.role === '엘'){
      if(mapped_role.N.alive === false){ //니아가 죽어있는 상태면 게임 종료
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
    else if(dead.role === '니아' && mapped_role.L.alive === false){
      callback(true);
    }
  
    else if(dead.role === '키라'){
      callback(true);
    }
    else{
      callback(false);
    }
  }

//사신노트
function sasinNote(chatId, role, capturedPerson, deathReason, bot, deathNotes) {
    let character = null;
    for (const key in mapped_role) {
      if (mapped_role[key].id === chatId) {
        character = mapped_role[key];
        break;
      }
    }
  
    if (character === null) {
      bot.sendMessage(chatId, `[System] 스킬 사용이 가능한 역할이 아닙니다.`);
      return;
    }
  
    let participantMatch = false;
    for (const part_key in mapped_role) {
      if (mapped_role[part_key].name === capturedPerson) {
        participantMatch = true;
        if (character.skill1 === true) {
          character.skill1 = false;
          deathNoteCool_start = Date.now();
          setTimeout(() => {
            character.skill1 = true;
          }, character.deathNoteCool);
  
          bot.sendMessage(chatId, '[System] 노트의 일치여부를 체크합니다.');
          deathNoteTimeout = setTimeout(() => {
            let foundMatch = false;
            for (const key in mapped_role) {
              console.log('데스노트 일치여부 checking...');
              if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson && mapped_role[key].alive === true) {
                // 여기에 각 캐릭터 별 조건 로직 추가
                if (mapped_role[key].role === '사신대왕' && mapped_role.King.life_cnt === 1){
                    mapped_role.King.life_cnt = 0;
                    bot.sendMessage(mapped_role.King.id, '[System] 사신노트에 이름이 적혀 생명력 하나를 잃습니다.');
                    setTimeout(()=>{
                        bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
                      }, deathCool);
                    break;
                }
                deathMsg(chatId, mapped_role[key], deathReason, bot, function(callback) {
                  if (callback === true) {
                    // 승리 조건이나 게임 상태 업데이트 로직
                    deathNotes(true);
                  }
                });
                foundMatch = true;
                break;
              }
            }
            if (!foundMatch) {
              bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
            }
          }, character.deathCool);
        } else if (character.skill1 === false) {
          const currentTime = Date.now();
          const elapsedTime = currentTime - deathNoteCool_start;
          const remainingTime = Math.ceil((character.deathNoteCool - elapsedTime) / 1000);
          bot.sendMessage(chatId, `[System] 스킬쿨타임이 ${remainingTime}초 남았습니다`);
        }
        break;
      }
    }
  
    if (!participantMatch) {
      bot.sendMessage(chatId, `[System] ${capturedPerson}은(는) 데스노트 사용가능한 대상이 아닙니다.`);
    }
  }

// /사신방송 - 사신대왕, 킨다라
function broadcast(chatId, broadMsg, bot){
    console.log('사신 방송 실행')
    
    if(mapped_role.King.id === chatId){
        // 사신대왕
      if(mapped_role.King.skill2 === true && mapped_role.King.alive === true){
        mapped_role.King.skill2 = false;
        broadCool_start = Date.now();
        setTimeout(()=>{
          mapped_role.King.skill2 = true;
        }, broadCool)
        for(const key in mapped_role){
          const participant = mapped_role[key];
          bot.sendMessage(participant.id, broadMsg)
        } 
      }
      else if(mapped_role.King.alive === true && mapped_role.King.skill2 === false){
        const currentTime = Date.now();
        const elapsedTime = currentTime - broadCool_start
        const remainingTime = Math.ceil((broadCool - elapsedTime) / 1000);
        bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
      }
      else{
        bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`)
      }
    } else if (mapped_role.Kinddara.id === chatId){
        // 킨다라
        if(mapped_role.Kinddara.skill2 === true && mapped_role.Kinddara.alive === true){
            mapped_role.Kinddara.skill2 = false;
            KinddaraBroadCool_start = Date.now();
            setTimeout(()=>{
              mapped_role.Kinddara.skill2 = true;
            }, broadCool)
            for(const key in mapped_role){
              const participant = mapped_role[key];
              bot.sendMessage(participant.id, broadMsg)
            } 
          }
          else if(mapped_role.Kinddara.alive === true && mapped_role.Kinddara.skill2 === false){
            const currentTime = Date.now();
            const elapsedTime = currentTime - KinddaraBroadCool_start
            const remainingTime = Math.ceil((broadCool - elapsedTime) / 1000);
            bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
          }
          else{
            bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`)
          }
    }
    
    if(!(mapped_role.King.id === chatId || mapped_role.Kinddara.id === chatId )){
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`)  
    }
  
}

// 사신정보 - 누, 아라모니아
function getInfo(chatId, role, capturedPerson, bot){
    if(mapped_role.Nu.id === chatId){
        // 누
      let particicpantMatch = false;
      for(const part_key in mapped_role){
        if(mapped_role[part_key].name === capturedPerson){
          particicpantMatch = true;
          if(mapped_role.Nu.alive === true && mapped_role.Nu.skill2 === true){
            mapped_role.Nu.skill2 = false;
            getInfo_Cool_start = Date.now();
            setTimeout(()=>{
              mapped_role.Nu.skill2 = true;
            }, getInfo_Cool)
      
            let foundMatch = false; //일치하는 플레이어를 찾는 변수
            for(const key2 in mapped_role){
                console.log('정보수집결과 checking...')
                if (mapped_role[key2].role === role && mapped_role[key2].name === capturedPerson) {
                    getInfoTimeout = setTimeout(()=>{
                        bot.sendMessage(chatId, `[System] `+ capturedPerson + `의 정체는 ` + role + `(이)가 맞습니다.`)
                    }, getInfo_waiting_Cool)
                    foundMatch = true;
                    break;
                }
            }
            if(!foundMatch){
                getInfoTimeout = setTimeout(()=>{
                    bot.sendMessage(chatId, '[System] 해당 플레이어는 ' + role + ` (이)가 아닙니다`);
                }, getInfo_waiting_Cool)
                
            }
            
          }
          else if(mapped_role.Nu.alive === true && mapped_role.Nu.skill2 === false){
            const currentTime = Date.now();
            const elapsedTime = currentTime - getInfo_Cool_start
            const remainingTime = Math.ceil((getInfo_Cool - elapsedTime) / 1000);
            bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
          }
          else{
            bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`); 
          }

        }
      }
  
      if (!particicpantMatch) {
        bot.sendMessage(chatId, `[System] ${capturedPerson}은(는) 정보수집 사용가능한 대상이 아닙니다.`);
      }
    } else if (mapped_role.Ara.id === chatId){
        // 아라모니아
        let particicpantMatch = false;
        for(const part_key in mapped_role){
          if(mapped_role[part_key].name === capturedPerson){
            particicpantMatch = true;
            if(mapped_role.Ara.alive === true && mapped_role.Ara.skill2 === true){
              mapped_role.Ara.skill2 = false;
              AraGetInfo_Cool_start = Date.now();
              setTimeout(()=>{
                mapped_role.Ara.skill2 = true;
              }, getInfo_Cool)
        
              let foundMatch = false; //일치하는 플레이어를 찾는 변수
              for(const key2 in mapped_role){
                  console.log('정보수집결과 checking...')
                  if (mapped_role[key2].role === role && mapped_role[key2].name === capturedPerson) {
                    AraGetInfoTimeout = setTimeout(()=>{
                          bot.sendMessage(chatId, `[System] `+ capturedPerson + `의 정체는 ` + role + `(이)가 맞습니다.`)
                      }, getInfo_waiting_Cool)
                      foundMatch = true;
                      break;
                  }
              }
              if(!foundMatch){
                AraGetInfoTimeout = setTimeout(()=>{
                      bot.sendMessage(chatId, '[System] 해당 플레이어는 ' + role + ` (이)가 아닙니다`);
                  }, getInfo_waiting_Cool)
                  
              }
              
            }
            else if(mapped_role.Ara.alive === true && mapped_role.Ara.skill2 === false){
              const currentTime = Date.now();
              const elapsedTime = currentTime - AraGetInfo_Cool_start
              const remainingTime = Math.ceil((getInfo_Cool - elapsedTime) / 1000);
              bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
            }
            else{
              bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`); 
            }
  
          }
        }
    
        if (!particicpantMatch) {
          bot.sendMessage(chatId, `[System] ${capturedPerson}은(는) 정보수집 사용가능한 대상이 아닙니다.`);
        }


    }
    else {
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
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

module.exports = {
    startSasinGame,
    sasinNote,
    broadcast,
    getInfo,

    whisper,
    whisper_result,
    note,
    note_result,
}
