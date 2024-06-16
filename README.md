# Cash Stacker Backend

## 개요

Cash Stacker Backend는 금융 거래를 관리하고 추적하는 서버 측 애플리케이션입니다. 이 프로젝트는 TypeScript로 작성되었으며, 현대적인 백엔드 개발의 모범 사례를 따르고 있습니다.

## 주요 기능

- **거래 관리:** 금융 거래의 생성, 조회, 수정, 삭제 기능 제공
- **사용자 인증:** 안전한 사용자 인증 및 권한 부여
- **API 문서화:** Swagger 통합을 통한 API 문서화

## 기술 스택

- **언어:** TypeScript
- **프레임워크:** Express
- **데이터베이스:** Prisma ORM과 MySQL

## 설치 및 실행

1. **레포지토리 클론:**

    ```bash
    git clone https://github.com/minckan/cash-stacker-backend.git
    cd cash-stacker-backend
    ```

2. **의존성 설치:**

    ```bash
    npm install
    ```

3. **환경 변수 설정:** `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.

4. **데이터베이스 설정:**

    ```bash
    npx prisma migrate dev
    ```

5. **서버 실행:**

    ```bash
    npm start
    ```

## 사용 예

Swagger UI를 통해 API 문서를 확인하고 테스트할 수 있습니다. 서버가 실행되면 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)에서 접근할 수 있습니다.


## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
