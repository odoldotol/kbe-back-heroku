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


### 배포 링크
[kbe-back](https://kbe-project-be.herokuapp.com/ "back")


### API doc
[API Doc](https://grove-hickory-8ec.notion.site/API-doc-d4583829581d4d3980f167d4b272edc2 "API Doc")


### DB Schema
[db schema](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/075a9261-3d5c-4862-b33e-492321c7bef9/Screen_Shot_2022-04-18_at_5.49.50_PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220418T090801Z&X-Amz-Expires=86400&X-Amz-Signature=611839a6e66ba1f9c49e2cc1be2916bd17c8eb92c270fce36b80cd52902a16f0&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Screen%2520Shot%25202022-04-18%2520at%25205.49.50%2520PM.png%22&x-id=GetObject "schema")


### 프로젝트 레포 링크
[project](https://github.com/codestates/BEB-03-KBexpressway-project "p1")

---
p.s. 혹시 이 레포에서 몇가지 키와 postgresql uri 같은걸 알아냈다고 미소짓고 있을수도 있는데, 실제 배포할때는 다른 키나 다른 uri 를 이용했으니 좋아하지 말것
