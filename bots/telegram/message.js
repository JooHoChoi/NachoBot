const room = require('./room');

function resetRoom(){
  room.resetRoom();
}

module.exports = {
  resetRoom: resetRoom
};