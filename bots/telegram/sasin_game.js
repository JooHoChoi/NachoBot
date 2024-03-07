const fs = require('fs');
const path = require('path');
const characters = require('./sasin_char14.json');
import SasinNote from './sasin_note.js';

const deathNoteCool = 80000; //데스노트 스킬 쿨타임: 테스트 60초, 본게임 80초
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

const eatFoodSkill_Cool = 60000;
const eatFood_Cool = 30000;
let RyukEatFood_Cool_start;
let MeadraEatFood_Cool_start;
let CaliEatFood_Cool_start;
let RyukEatFoodTimeout;
let MeadraEatFoodTimeout;
let CaliEatFoodTimeout;

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


//사신노트
function sasinNote(chatId, role, capturedPerson, deathReason, bot, deathNotes) {
    let character = null;
    for (const key in mapped_role) {
      if (mapped_role[key].id === chatId) {
        character = mapped_role[key];
        if (character.noteObj === ""){
            character.noteObj = new SasinNote(bot);
        }
        break;
      }
    }

    deathNotes = character.noteObj.executeNote(chatId, role, capturedPerson, deathReason);

    if (deathNotes){
        clearAllTimeout(bot);
    }
}

// /사신방송 - 사신대왕, 시도우, 킨다라
function broadcast(chatId, broadMsg, bot){
    console.log('사신 방송 실행')
    
    if(mapped_role.King.id === chatId){
        // 사신대왕
      if(mapped_role.King.skill2 === true && mapped_role.King.alive === true){
        mapped_role.King.skill2 = false;
        mapped_role.King.skill2_cool = Date.now();
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
        const elapsedTime = currentTime - mapped_role.King.skill2_cool
        const remainingTime = Math.ceil((broadCool - elapsedTime) / 1000);
        bot.sendMessage(chatId, `[System] 스킬쿨타임이 ` + remainingTime + `초 남았습니다`);
      }
      else{
        bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`)
      }
    } else if (mapped_role.Sidoh.id === chatId){
        // 시도우
        if(mapped_role.Sidoh.skill2 === true && mapped_role.Sidoh.alive === true){
            mapped_role.Sidoh.skill2 = false;
            mapped_role.Sidoh.skill2_cool = Date.now();
            setTimeout(()=>{
              mapped_role.Sidoh.skill2 = true;
            }, broadCool)
            for(const key in mapped_role){
              const participant = mapped_role[key];
              bot.sendMessage(participant.id, broadMsg)
            } 
          }
          else if(mapped_role.Sidoh.alive === true && mapped_role.Sidoh.skill2 === false){
            const currentTime = Date.now();
            const elapsedTime = currentTime - mapped_role.Sidoh.skill2_cool
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
            mapped_role.Kinddara.skill2_cool = Date.now();
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
            const elapsedTime = currentTime - mapped_role.Kinddara.skill2_cool
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
                const participant = mapped_role[key2];
                bot.sendMessage(participant.id, `[System] ${mapped_role.Nu.role}이(가) ${capturedPerson}의 정보를 수집했습니다.`)
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
                  const participant = mapped_role[key2];
                  bot.sendMessage(participant.id, `[System] ${mapped_role.Ara.role}이(가) ${capturedPerson}의 정보를 수집했습니다.`)
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

//음식먹기 - 류크, 미드라, 칼리카차
function eatFood(chatId, bot){
    if(mapped_role.Ryuk.id === chatId){
      if(mapped_role.Ryuk.alive === true && mapped_role.Ryuk.skill3 === true){

        mapped_role.Ryuk.skill3 = false;
        mapped_role.Ryuk.skill3_check = true;
        RyukEatFood_Cool_start = Date.now();
        setTimeout(()=>{
            mapped_role.Ryuk.skill3 = true;
        }, eatFoodSkill_Cool)
  
        bot.sendMessage(chatId, `[System] ${mapped_role.Ryuk.role}이(가) 사과를 먹습니다. 30초간 사신노트에 죽지 않습니다.`);
  
        RyukEatFoodTimeout = setTimeout(()=>{
          mapped_role.Ryuk.skill3_check = false;
          bot.sendMessage(chatId, `[System] 음식 효능이 떨어졌습니다.`);
        }, eatFood_Cool)
      }
      else{
        bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
      }
    }
    else if(mapped_role.Meadra.id === chatId){
        if(mapped_role.Meadra.alive === true && mapped_role.Meadra.skill3 === true){

            mapped_role.Meadra.skill3 = false;
            mapped_role.Meadra.skill3_check = true;
            MeadraEatFood_Cool_start = Date.now();
            setTimeout(()=>{
                mapped_role.Meadra.skill3 = true;
            }, eatFoodSkill_Cool)
      
            bot.sendMessage(chatId, `[System] ${mapped_role.Meadra.role}이(가) 바나나를 먹습니다. 30초간 사신노트에 죽지 않습니다.`);
      
            MeadraEatFoodTimeout = setTimeout(()=>{
              mapped_role.Meadra.skill3_check = false;
              bot.sendMessage(chatId, `[System] 음식 효능이 떨어졌습니다.`);
            }, eatFood_Cool)
          }
          else{
            bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
          }

    }
    else if(mapped_role.Cali.id === chatId){
        if(mapped_role.Cali.alive === true && mapped_role.Cali.skill3 === true){

            mapped_role.Cali.skill3 = false;
            mapped_role.Cali.skill3_check = true;
            CaliEatFood_Cool_start = Date.now();
            setTimeout(()=>{
                mapped_role.Cali.skill3 = true;
            }, eatFoodSkill_Cool)
      
            bot.sendMessage(chatId, `[System] ${mapped_role.Cali.role}이(가) 블루베리를 먹습니다. 30초간 사신노트에 죽지 않습니다.`);
      
            CaliEatFoodTimeout = setTimeout(()=>{
              mapped_role.Cali.skill3_check = false;
              bot.sendMessage(chatId, `[System] 음식 효능이 떨어졌습니다.`);
            }, eatFood_Cool)
          }
          else{
            bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
          }
    }

    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
    }
}

//금단의사랑 - 캐릭터: 렘, 제라스
function forbiddenLove(chatId, bot){
    if(mapped_role.Rem.id === chatId){
      if(mapped_role.Rem.alive === true ){
        mapped_role.Rem.skill3 = false;
        mapped_role.Rem.skill3_check = true;
  
        bot.sendMessage(chatId, `[System] 규율 위반!! 미사를 살리기 위해 노트를 사용하였습니다. 3분뒤 재가 되어 소멸합니다.`);
  
        forbiddenLoveTimeout = setTimeout(()=>{
            mapped_role.Rem.alive === false;
            for (const key in mapped_role) {
                bot.sendMessage(mapped_role[key].id, `[System] 렘이 재가 되어 소멸합니다.`);
            }

        }, forbiddenLoveCool)
      } else if(mapped_role.Jealous.alive === true ){
        mapped_role.Jealous.skill3 = false;
        mapped_role.Jealous.skill3_check = true;
  
        bot.sendMessage(chatId, `[System] 규율 위반!! 미사를 살리기 위해 노트를 사용하였습니다. 3분뒤 재가 되어 소멸합니다.`);
  
        forbiddenLoveTimeout = setTimeout(()=>{
            mapped_role.Jealous.alive === false;
            for (const key in mapped_role) {
                bot.sendMessage(mapped_role[key].id, `[System] 제라스가 재가 되어 소멸합니다.`);
            }

        }, forbiddenLoveCool)
      }

      else{
        bot.sendMessage(chatId, `[System] 스킬사용이 가능한 상태가 아닙니다`);
      }
    } 
    else{
      bot.sendMessage(chatId, `[System] 스킬사용이 가능한 역할이 아닙니다`);
    }
  }

//스킬확인  -  모든 사신, 쿨타임확인, 스킬사용 가능여부
function skillcheck(chatId, bot){
    for (const key in mapped_role) {
        if (mapped_role[key].id === chatId) {
          character = mapped_role[key];
        }
    }
    const currentTime = Date.now();
    const sanoelapsedTime = currentTime - character.skill1_cool
    const sanoLeftTime = Math.ceil((deathNoteCool - sanoelapsedTime) / 1000);
    
    bot.sendMessage(chatId, `[System] 사신노트 쿨타임이 ` + sanoLeftTime + `초 남았습니다`);


}

//타임아웃 초기화
function clearAllTimeout(bot){
    bot.removeListener('message', messageListener);
    clearTimeout(getInfoTimeout);
    clearTimeout(AraGetInfoTimeout);
    clearTimeout(RyukEatFoodTimeout);
    clearTimeout(MeadraEatFoodTimeout);
    clearTimeout(CaliEatFoodTimeout);

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
    eatFood,
    forbiddenLove,
    skillcheck,

    whisper,
    whisper_result,
    note,
    note_result,
}
