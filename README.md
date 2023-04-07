# react_twitter_clone

---

개인 포트폴리오 용 사이트 입니다.  twitter를 클로닝 한 사이트로 twitter의 일부의 기능을 본 따 제작 하였습니다.  

어떠한 악의적인 또는 상업적인 의도는 없습니다. 🙏

## 배포 주소

---

> [http://mangotwitter.site/](http://mangotwitter.site/)
> 

## 📚Stacks

---

### Environment

- Visual Studio Code
- git
- github

### Development

- Javascript
- React
- Next.js
- Redux, Redux-saga
- Ant Design
- Style Component
- MySQL
- AWS-E2C
- AWS-S3

## 주요 기능

---

- 로그인
- 회원 가입
- 게시 글 포스팅 , 이미지 업로드, 삭제
- 이미지 원본 보기
- 리트윗
- 좋아요
- 댓글 등록
- 팔로우, 언팔로우
- 해시태그 검색
- 프로필 페이지
- 프로필 닉네임 수정

## 시작 가이드

---

### Requirements

- Node.js 16.19.1
- Npm 8.19.3
- MySQL 8.0.31

### Installation

```bash
git clone https://github.com/mangojang/react_twitter_clone.git 
cd ./react_twitter_clone
```

### Frontend

- .env setting
    
    ```json
    COOKIE_SECRET= Your cookie secret
    NODE_ENV=dev
    ```
    

```bash
cd ./front
npm install
npm run dev
```

### Backend

- .env setting
    
    ```json
    COOKIE_SECRET= Your cookie secret
    DB_PASSWORD = Your db password
    FRONT_URL= Your front url
    ```
    

```bash
cd ./back
npm install
npm run dev
```
