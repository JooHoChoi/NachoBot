const charactor9 = require('./charactor9.json');
const charactor10 = require('./charactor10.json');
const charactor11 = require('./charactor11.json');
const charactor12 = require('./charactor12.json');

// game.js

function startGame(roomData, callback_mapping) {
  //gameStarted = true;
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
  
}


module.exports = {
  startGame
};

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
  callback(charactor);
}