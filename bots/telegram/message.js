

function deathMsgSasin(dead, bot, callback){
    dead.alive = false; //사망처리
    bot.sendMessage(dead.id, '[System] 당신은 데스노트에 의해 사망했습니다\n※사인: 류크');
  
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