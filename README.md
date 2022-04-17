# Server

npm install

.env 만드세요 (.env_sample 참고)

다음 명령을 통해 데이터베이스 만드세요. (mysql)

    sequelize db:migrate
    sequelize db:seed:all

* npm start
* npm run dev
* npm run debug


## HTTPS


https 서버를 쓰려면
app.js 에 "//// HTTPS 서버 주석" 아래 부분의 주석들을 모두 해제하고 인증서를 준비하세요.
