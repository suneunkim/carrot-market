# 프로젝트 소개:

- 당근마켓을 목표로 한 클론코딩
- 주된 목표는 클라이언트와 서버 코드를 함께 작성하는 기술 습득.
- 데이터베이스를 활용하여 사용자와의 상호작용 및 CRUD 작업을 연습.

## 사용 기술 스택:
```
Next.js, tailwindcss, Prisma, TypeScript, Cloudinary, swr
```

## 요약

- Next.js 프레임워크, Prisma ORM을 활용하여 MySQL 데이터베이스를 사용했습니다.
- 회원가입과 로그인, 상품 등록, 좋아요 기능과 게시판 기능을 가진 “동네생활”에 글을 등록하고 댓글을 등록하는 기능들에 DB를 연동했습니다.
- data fetch로 swr를 사용하고, api 요청 시 쿼리 파라미터를 이용해 엔드포인트에서 카테고리를 구분해서 반환값을 구분했습니다.
- 상품 등록 시 이미지 업로드는 Cloudinary CDN을 이용해 이미지를 안전하게 업로드하였습니다.

## 페이지 별 기능

#### 1. 홈
- 등록된 상품 조회, 상품 등록하기
- 카테고리 선택 시 선택한 카테고리의 상품이 최상단 표시.
    
#### 2. 상품 업로드 페이지
- 판매할 상품의 사진과 정보를 입력하고 등록시키기

#### 3. 동네 생활 페이지
- 소통할 수 있는 게시판으로 등록된 게시물을 조회 (가까운 게시물 확인 가능)
- 게시물 작성 기능 (작성 시 위도와 경도를 받음)
- 게시물 선택 시 상세 페이지로 이동, 작성된 댓글을 조회 & 댓글 작성 기능

#### 4. 사용자 페이지
- 회원가입과 로그인: 간단하게 이메일을 아이디로 회원가입과 로그인 처리.
- 마이페이지: 프로필 수정 기능(닉네임 변경, 프로필 사진 변경)


## 페이지 별 스크린샷

<img src="https://private-user-images.githubusercontent.com/98196225/293012638-36bc7957-4414-4044-b6f7-c4b88b07af3a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDM2NzI5MTEsIm5iZiI6MTcwMzY3MjYxMSwicGF0aCI6Ii85ODE5NjIyNS8yOTMwMTI2MzgtMzZiYzc5NTctNDQxNC00MDQ0LWI2ZjctYzRiODhiMDdhZjNhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMjclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjI3VDEwMjMzMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQ2ZjU5OWM5YTAxZjk1YjkxMGY2NDEwYTMwZmZiOWMwZTU4NDM1MGRkNmYxZjQ0NWM1Yzg2ZGVmOWMwZmQ3N2UmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.GUiP_ecYOkavYUYaUFsMPVUQ3OvzttPbPyu8OtU1MBA"></img>
<img src="https://private-user-images.githubusercontent.com/98196225/293012529-7b05b468-fdd2-4355-b66e-319f35463420.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDM2NzI5MTEsIm5iZiI6MTcwMzY3MjYxMSwicGF0aCI6Ii85ODE5NjIyNS8yOTMwMTI1MjktN2IwNWI0NjgtZmRkMi00MzU1LWI2NmUtMzE5ZjM1NDYzNDIwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMjclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjI3VDEwMjMzMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY0N2MzMjJmN2RiZTlkZmQxNWI3NjlkMzY5MGVlYzc1YTJmYjUxMzNlNzRhZTcxNzczOGVhOTllNTEwOGIyZDkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Mc8XaByrZiqtyPS3E1wyE93aBQcTZi1-q9yjJkviI5M"></img>
<img src="https://private-user-images.githubusercontent.com/98196225/293012359-acd8256a-ef15-457e-97d2-6dfafc1a8d9d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDM2NzI5MTEsIm5iZiI6MTcwMzY3MjYxMSwicGF0aCI6Ii85ODE5NjIyNS8yOTMwMTIzNTktYWNkODI1NmEtZWYxNS00NTdlLTk3ZDItNmRmYWZjMWE4ZDlkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMjclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjI3VDEwMjMzMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQxODFiZDVmNGYxZDZkNDYyODViNDFiMTExMzdjMWFlMGMzMTgxNWIyZWUwZTQ3ZWI3ZDk1NjI1MmY3YzRlNzAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.EfJoOI87cFw9tR6ToD1XzxSf8dGtIyh-6YxAyg-BHfM"></img>
