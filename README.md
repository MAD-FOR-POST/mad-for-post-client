# Mad For Post Client

## 🖥 개요

생성형 Ai기반 자동 포스팅 서비스 구축  
담당자 - 윤재승, 양정윤, 김강열

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
API_BASE_URL=https://naver.com
```

### 프로젝트 내에서 환경변수 사용

```javascript
const apiBaseUrl = process.env.API_BASE_URL // "https://naver.com"
```

## 🗂 프로젝트 구조

├── frontend (client)  
│ ├── public  
│ ├── src  
│ │ ├── common  
│ │ ├── components  
│ │ │ ├── layout  
│ │ │ └── ui  
│ │ │ └── button  
│ │ ├── configs  
│ │ ├── interfaces  
│ │ │ ├── api  
│ │ │ ├── auth  
│ │ │ ├── post  
│ │ │ └── user  
│ │ ├── pages  
│ │ │ ├── examples  
│ │ │ │ ├── api  
│ │ │ │ ├── atom  
│ │ │ │ └── publish  
│ │ │ ├── input  
│ │ │ │ ├── image  
│ │ │ │ └── text  
│ │ │ └── _app  
│ │ ├── services  
│ │ ├── stores  
│ │ └── styles  
│ └── .gitlab    
├── .env  
├── .eslintrc.json  
├── Dockerfile  
├── newrelic.js  
├── next.config.js  
├── package.json  
├── tailwind.config.js  
└── tsconfig.json

## 달라진 점

### react-router의 페이지 라우팅 방식

```ts
//AS-IS
const navigate = useNavigate()
navigate(AppRoutes.login)
```

### Next.js에서의 페이지 라우팅

```ts
//TO-BE
const router = useRouter()
router.push(AppRoutes.login)
```

### 페이지 라우팅 방식 변경

<small>별도의 Route파일을 통한 라우팅 설정이 필요 없음.</small>
> ex) pages/login/index.html -> localhost:3000/login

### 페이지 파라미터 가져오기

<small>이 부분은 Next.js가 좀더 번거로운거 같아요</small>

```ts
//a.com?token=12345 라는 url에서 token의 12345를 파싱할 경우
const router = useRouter()

useEffect(() => {
    //ready가 되어야 파라미터 파싱이 가능합니다.
    if (!router.isReady) return;

    const {token} = router.query;

    if (token) {
        console.log(`token : ${token}`)
    } else {
        console.log(`토큰이 존재하지 않습니다.`)
    }
}, [router.isReady]); //이 부분이 중요합니다. []이 아닙니다.
```
