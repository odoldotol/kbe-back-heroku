# deploy heroku version

* 배포때는 env_sample 를 빼고 .env 를 함께 배포할것
* 
*
*
---

### 데이터베이스 마이그레이션이나 시드 등등 sequelize-cli 작업 하려면

    heroku config:set PGSSLMODE=no-verify

이 렇게 수정해주고 sequelize-cli 작업 해주고

    heroku config:set PGSSLMODE=require

다시 위와같이 수정해주고 배포하기