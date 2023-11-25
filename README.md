# Mad For Post Client

## 🖥 개요

생성형 Ai기반 자동 포스팅 서비스 구축  
담당자 - ㅁㅁㅁ, ㅁㅁㅁ 

## ⚙️ 기술 스택

<div  align="center">

![NodeJS](https://img.shields.io/badge/Node.js-v20.8.0-339933?logo=node.js&style=plastic) ![typescript](https://img.shields.io/badge/typescript-v5.3.2-007acc?logo=typescript&style=plastic) ![react](https://img.shields.io/badge/react-v18.2.38-61dafb?logo=React&style=plastic) ![next](https://img.shields.io/badge/next-v14.0.3-eee?logo=next.js&style=plastic)

</div>
 
## 🎁 패키지

**패치** | `axios` `"@tanstack/react-query`

**상태관리** | `recoil` `recoil-persist`

**CSS 스타일** | `tailwindcss` `@headlessui`

**아이콘** | `@heroicons`

**테이블** | `@mui/x-data-grid`

**날짜** | `@mui/x-date-pickers`

**차트** | `chart.js` `react-chartjs-2`

**폼** | `react-hook-form`

**토스트 알람** | `react-toastify`

<br>

## 🔨 실행 명령어

- yarn 명령 & next 가동

- stage는 local, dev, production 3개로 구성되어 있습니다. 각 명령어 뒤에 :stage 붙여 사용.

- 주요 스크립트

`yarn` : 패키지 설치 및 업데이트

`yarn dev`: http://localhost:3000 에서 로컬 서버 작동

`yarn build`: .next 폴더 생성 및 페이지, 스크립트 빌드

`yarn start`: .next 폴더 작동

- [주의] branch 처음 사용 및 개발 서버 작동 시
  .env.local 파일 생성 후 아래와 같이 작성한 파일 첨부 필요
  <!-- NEXT_PUBLIC_API_URL_BASE = 'http://223.253.99.155:8081' -->

  <br>

### 환경변수 정의

개발 : .env.development  
운영 : .env.production

```text
API_BASE_URL=https://aidev.lotte.net
```

### 프로젝트 내에서 환경변수 사용

```javascript
const apiBaseUrl = process.env.API_BASE_URL // "https://aidev.lotte.net"
```


## 🗂 프로젝트 구조

├── frontend(client)

│ ├── public

│ │ ├── docx

│ │ ├── images

│ │ └── js

│ ├── src

│ │ ├── api

│ │ │ └── fetcher

│ │ ├── components

│ │ │ ├── Fallback

│ │ │ ├── Layout

│ │ │ ├── Pages

│ │ │ └── UI

│ │ ├── config

│ │ ├── constants

│ │ ├── hooks

│ │ │ └── query

│ │ ├── pages

│ │ │ ├── assets

│ │ │ │ └── fonts

│ │ │ │ └── styles

│ │ │ └── \_app

│ │ │ └── \_document

│ │ │ └── \_error

│ │ ├── store

│ │ │ └── atoms

│ │ │ └── selectors

│ │ ├── styles

│ │ │ └── UI

│ │ ├── type

│ │ │ └── response

│ │ └── utils

│ └── .gitlab

├── .env

├── .eslintrc.json

├── Dockerfile

├── newrelic.js

├── next.config.js

├── package.js

├── tailwind.config.js

└── tsconfig.json
