const fs = require('fs');
const path = require('path');

module.exports = {
  mysql: {
    host: 'nacho-mafia.mysql.database.azure.com',
    user: 'nacho_king',
    password: 'Mafia_1234',
    database: 'DenoDB',
    ssl: {
      ca: fs.readFileSync(path.join(__dirname, 'BaltimoreCyberTrustRoot.crt.pem')),
      rejectUnauthorized: false // 이 부분을 false로 변경하여 자체 서명된 인증서를 허용합니다.
    }
  }
};

