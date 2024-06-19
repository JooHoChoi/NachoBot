// export class SasinNote {
//     constructor(bot) {
//       this.bot = bot;
//       this.deathNotes = false;
//       this.deathNoteCool = 70000; // 예시 쿨타임 1분
//     }
  
//     findCharacterById(chatId) {
//       for (const key in mapped_role) {
//         if (mapped_role[key].id === chatId) {
//           return mapped_role[key];
//         }
//       }
//       return null;
//     }
//     findCharacterByRole(role) {
//         for (const key in mapped_role) {
//           if (mapped_role[key].role === role) {
//             return mapped_role[key];
//           }
//         }
//         return null;
//       }
  
//     sendMessage(chatId, message) {
//       this.bot.sendMessage(chatId, message);
//     }
  
//     checkSkillCooldown(character) {
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - character.skill1_cool;
//       const remainingTime = Math.ceil((this.deathNoteCool - elapsedTime) / 1000);
//       if (remainingTime > 0) {
//         this.sendMessage(character.id, `[System] 스킬쿨타임이 ${remainingTime}초 남았습니다`);
//         return false;
//       }
//       return true;
//     }
  
//     executeNote(chatId, role, capturedPerson, deathReason) {
//       const character = this.findCharacterById(chatId);
//       if (!character || (character.role === "시도우" && !character.skill1_note)) {
//         this.sendMessage(chatId, `[System] 사용할 수 있는 노트가 없습니다. 먼저 노트를 찾으세요`);
//         return;
//       } else if (character.role === "제르오기"){
//         //Zellogi
//         Meadra = this.findCharacterByRole("미드라");
//         this.sendMessage(Meadra.id, `[System] 제르오기의 노트사용이 감지되었습니다.`);
//         this.sendMessage(Meadra.id, `[System] 역할 : ${role}, 이름 : ${capturedPerson}`);
//       } else if (character.role === "미드라"){
//         //Meadra
//         Zellogi = this.findCharacterByRole("제르오기");
//         this.sendMessage(Zellogi.id, `[System] 미드라의 노트사용이 감지되었습니다.`);
//         this.sendMessage(Zellogi.id, `[System] 역할 : ${role}, 이름 : ${capturedPerson}`);
//       }
  
//       if (!this.checkSkillCooldown(character)) {
//         return;
//       }
  
//       let participantMatch = false;
//       for (const part_key in mapped_role) {
//         if (mapped_role[part_key].name === capturedPerson) {
//           participantMatch = true;
//           character.skill1 = false;
//           character.skill1_cool = Date.now();
  
//           this.processNoteEffect(chatId, role, capturedPerson, deathReason, character);
//           return this.deathNotes;
//         }
//       }
  
//       if (!participantMatch) {
//         this.sendMessage(chatId, `[System] ${capturedPerson}은(는) 데스노트 사용가능한 대상이 아닙니다.`);
//       }
//     }
  
//     processNoteEffect(chatId, role, capturedPerson, deathReason, character) {
//       // 이 메소드 내에서는 'bot.sendMessage' 호출과 'setTimeout' 로직을 처리합니다.
//       // 캐릭터별 조건 로직을 여기에 구현합니다. 예를 들어, '사신대왕', '류크' 등의 조건 분기를 처리합니다.
//       // 예시로 단순화된 로직만 포함되어 있으므로, 실제 게임 로직에 맞게 조건들을 추가해야 합니다.
//       this.sendMessage(chatId, '[System] 노트의 일치여부를 체크합니다.');
//       // 상세한 실행 로직은 생략하고, 필요한 로직을 여기에 추가합니다.
//       deathNoteTimeout = setTimeout(() => {
//         let foundMatch = false;
//         for (const key in mapped_role) {
//           console.log('데스노트 일치여부 checking...');
//           if (mapped_role[key].role === role && mapped_role[key].name === capturedPerson && mapped_role[key].alive === true) {
//             // 여기에 각 캐릭터 별 조건 로직 추가
//             if (mapped_role[key].role === '사신대왕' && mapped_role.King.life_cnt === 1){
//                 mapped_role.King.life_cnt = 0;
//                 bot.sendMessage(mapped_role.King.id, '[System] 사신노트에 이름이 적혀 생명력 하나를 잃습니다.');
//                 setTimeout(()=>{
//                     bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
//                   }, deathCool);
//                 break;
//             }
//             else if (mapped_role[key].role === '류크' && mapped_role.Ryuk.skill3_check === true){
//                 bot.sendMessage(mapped_role.Ryuk.id, '[System] 사신노트에 적혔지만 사과의 효능으로 죽지 않았습니다.');
//                 setTimeout(()=>{
//                     bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
//                   }, deathCool);
//                 break;
//             }
//             else if (mapped_role[key].role === '미드라' && mapped_role.Meadra.skill3_check === true){
//                 bot.sendMessage(mapped_role.Meadra.id, '[System] 사신노트에 적혔지만 바나나의 효능으로 죽지 않았습니다.');
//                 setTimeout(()=>{
//                     bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
//                     }, deathCool);
//                 break;
//             }
//             else if (mapped_role[key].role === '칼리카차' && mapped_role.Cali.skill3_check === true){
//                 bot.sendMessage(mapped_role.Cali.id, '[System] 사신노트에 적혔지만 블루베리의 효능으로 죽지 않았습니다.');
//                 setTimeout(()=>{
//                     bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
//                     }, deathCool);
//                 break;
//             }
//             else if (mapped_role[key].role === '렘' && mapped_role.Rem.skill3_check === true){
//                 bot.sendMessage(mapped_role.Rem.id, '[System] 사신노트에 적혔지만 효과가 없었습니다.');
//                 setTimeout(()=>{
//                     bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
//                     }, deathCool);
//                 break;
//             }
//             else if (mapped_role[key].role === '제라스' && mapped_role.Jealous.skill3_check === true){
//                 bot.sendMessage(mapped_role.Jealous.id, '[System] 사신노트에 적혔지만 효과가 없었습니다.');
//                 setTimeout(()=>{
//                     bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
//                     }, deathCool);
//                 break;
//             }
//             this.deathMsg(chatId, character, mapped_role[key], deathReason, bot, function(callback) {
//               if (callback === true) {
//                 // 생존자 1명 남아서 게임 끝
//                 this.victory(bot);
//                 this.deathNotes = true;
//               }
//             });
//             foundMatch = true;
//             break;
//           }
//         }
//         if (!foundMatch) {
//           bot.sendMessage(chatId, '[System] 아무 일도 일어나지 않았습니다.');
//         }
//       }, character.deathCool);
//     }

//     checkForLastSurvivor(mapped_role) {
//         let aliveCount = 0;
//         let lastSurvivor = null;
      
//         for (const key in mapped_role) {
//           if (mapped_role[key].alive === true) {
//             aliveCount += 1;
//             lastSurvivor = mapped_role[key]; // 마지막으로 발견된 생존자 저장
//           }
//         }
      
//         if (aliveCount === 1) {
//             mapped_role.Winner.name = lastSurvivor.name;
//             mapped_role.Winner.role = lastSurvivor.role;
//           console.log("단 한 명의 생존자가 있습니다:", lastSurvivor.name);
//           return 1;
//           // 여기서 단 한 명의 생존자가 남았을 때의 게임 로직을 처리할 수 있습니다.
//           // 예를 들어, 승자를 발표하거나 게임을 종료할 수 있습니다.
//         } else {
//           console.log("여러 명의 생존자가 있거나 아무도 없습니다.");
//           return 0;
//           // 여기서 여러 명의 생존자가 있거나 아무도 없을 때의 게임 로직을 처리할 수 있습니다.
//         }
//     }
    
//     //사신노트로 인한 결과처리
//     deathMsg(chatId, character, dead, deathreason, bot, callback){
//         dead.alive = false; //사망처리
//         dead.deathreason = deathreason;
//         const participant = mapped_role[key];
//         character.kill = parseInt(character.kill) + 1
    
//         bot.sendMessage(chatId, '[System] 사신노트로 인해 ' + dead.role + '(이)가 사망했습니다.\n※사인: '+deathreason);
//         bot.sendMessage(participant.id, '[System] '+ dead.role + '(이)가 사신노트에 의해 사망했습니다\n※사인: '+deathreason);
//         let winner = 0;
//         winner = this.checkForLastSurvivor(mapped_role);
    
//         if (winner){
//             callback(true);
//         } 
//         else {
//             callback(false);
//         }
//     }

//     // 최종 승리자 결과처리
//     victory(bot){
//         let WinnerPhoto = __dirname + '/sasin_img/winner.png'
//         let LosersPhoto = __dirname + '/sasin_img/loser.png'

//         clearAllTimeout();
//         const combinedMessage = Object.values(mapped_role)
//         .map(person => {
//             let message;
//             if (person.deathreason === '생존') {
//             message = `${person.role}: ${person.name} - ${person.kill}킬 - 결과: ${person.deathreason}`;
//             }
//             else {
//             message = `${person.role}: ${person.name} - ${person.kill}킬 - 결과: ${person.deathreason}(으)로 사망`;
//             }
//             return message;
//         })
//         .join('\n');

//             // 모든 플레이어에게 통합된 메시지 전송
//         for (const key_vf in mapped_role) {
//             const person = mapped_role[key_vf];
//             bot.sendMessage(person.id, `**최종 결과를 안내드립니다**\n${combinedMessage}`);
//         }
        
//         for(const key in mapped_role){
//             const participant = mapped_role[key];
//             const arrestMsg = `**[속보]  ${mapped_role.Winner.name} (이)가 최후의 생존자가 되었습니다. -게임 종료-**`

//             if(participant.name === mapped_role.Winner.name){
//             if(participant.mode === '이미지'){
//                 bot.sendPhoto(participant.id, WinnerPhoto, { caption: arrestMsg })
//                 .then(() => {
//                 //console.log('사진 전송 완료');
//                 })
//                 .catch((error) => {
//                 //console.error('사진 전송 실패:', error);
//                 bot.sendMessage(participant.id, arrestMsg)
//                 });
//             }
//             else if(participant.mode === '텍스트'){
//                 bot.sendMessage(participant.id, arrestMsg)
//             }
            
//             }
//             else{
//             if(participant.mode === '이미지'){
//                 bot.sendPhoto(participant.id, LosersPhoto, { caption: arrestMsg })
//                 .then(() => {
//                 //console.log('사진 전송 완료');
//                 })
//                 .catch((error) => {
//                 //console.error('사진 전송 실패:', error);
//                 bot.sendMessage(participant.id, arrestMsg)
//                 });
//             }
//             else if(participant.mode === '텍스트'){
//                 bot.sendMessage(participant.id, arrestMsg)
//             }
//             }  
//         }
//     }
//     //타임아웃 초기화
//     clearAllTimeout(){
//         clearTimeout(deathNoteTimeout);

//     }
//   }
  
//   // 사용 예시
//   const sasinNote = new SasinNote(bot, deathNotesFunction);
//   sasinNote.executeNote(chatId, role, capturedPerson, deathReason);
  
