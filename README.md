# 🛒 타입스크립트 실습 프로젝트 - 미니 쇼핑몰

타입스크립트 기본부터 클래스, 오버로딩, 유니언 타입까지 실습하며 배우는 프로젝트입니다.

---

## 📝 오답 노트 & 오답 정리 (Learning Notes)

프로젝트를 진행하며 겪었던 실수와 해결 방법을 정리한 노틉니다.

### 1. 튜플(Tuple)과 인덱스 시그니처(Index Signature)의 차이
- **실수:** `type CartItem = { [key: Product]: number }`
  - 인덱스 시그니처 `[key: ...]`의 Key 자리에는 `string`이나 `number`만 사용할 수 있으며, `Product` 객체 타입은 사용 불가.
- **해결:** 순서와 길이가 정해진 튜플 형태로 작성
  ```typescript
  type CartItem = [Product, number]; // [상품, 수량]
  ```

---

### 2. 모듈 내보내기 (`export`)
- **실수:** `type.ts`에 정의한 타입 및 인터페이스 앞에 `export` 키워드를 빼먹음.
- **해결:** 다른 파일(`Product.ts` 등)에서 `import`하여 사용할 수 있도록 앞에 `export` 추가
  ```typescript
  export enum Category { ... }
  export interface Product { ... }
  export type CartItem = [Product, number];
  ```

---

### 3. 인터페이스 구현 시 프로퍼티 타입 일치
- **실수:** `Product` 인터페이스에서는 `name: string`이었으나, `ProductItem` 클래스 생성자에서 `public name: number`로 타입을 다르게 작성함.
- **해결:** 인터페이스의 규격을 동일하게 맞춰서 `public name: string`으로 수정.

---

### 4. 타입스크립트 예약어 대소문자 구별
- **실수:** `target: Any` 처럼 대문자 `Any`로 작성.
- **해결:** 타입스크립트의 기본 타입은 소문자(`any`, `string`, `number` 등)로 작성해야 함.

---

### 5. 함수 오버로딩(Function Overloading) 작성법
- **실수:** 오버로드 시그니처(선언부) 없이 바로 구현부만 작성하려고 함.
- **해결:** 
  1. 구현부 위에 호출 규칙(오버로드 시그니처) 선언
  2. 구현부에는 유니언 타입(`number | string`)으로 매개변수를 처리하고 `typeof`로 타입을 좁혀서(Narrowing) 작성
  ```typescript
  // 📜 1. 오버로드 시그니처 (규칙 선언)
  applyDiscount(discountRate: number): number;
  applyDiscount(couponCode: string): string;

  // 🪄 2. 실제 구현부
  applyDiscount(target: number | string): number | string {
      if (typeof target === 'string') {
          return `쿠폰 ${target}이 적용되었습니다.`;
      } else {
          return this.price * ((100 - target) / 100);
      }
  }
  ```

---

### 6. 조건문의 반환값 처리 (Function lacks ending return statement)
- **실수:** `if (typeof target === 'string')` 과 `if (typeof target === 'number')` 두 가지 `if` 문만 작성함.
  - TS의 `strict` 모드에서는 모든 코드 경로에서 `return`이 보장되어야 함 (두 `if`에 걸리지 않는 예외 상황 시 `undefined` 반환 가능성 문제).
- **해결:** 두 번째 조건문을 `else`로 작성하여 어떤 상황에서도 반환값이 존재함을 보장.
