# 🛒 타입스크립트 실습 프로젝트 - 미니 쇼핑몰

타입스크립트 기본부터 클래스, 오버로딩, 유니언 타입, 튜플 구조분해 할당, 사용자 정의 타입 가드, Discriminated Union과 never 안전장치, 제네릭 만능 저장소, 유틸리티 타입 DTO, 템플릿 리터럴 타입 기반 이벤트 시스템, 비동기 Promise 시뮬레이션까지 실습하며 배우는 프로젝트입니다.

---

## 📝 오답 노트 & 학습 정리 (Learning Notes)

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

---

### 7. 튜플 배열 순회 및 구조 분해 할당 (Destructuring)
- **고민:** `CartItem`이 `[Product, number]` 튜플 배열이라 순회 시 `item[0]`, `item[1]` 처럼 인덱스 숫자로 접근해야 해서 코드가 직관적이지 않음.
- **해결:** 구조 분해 할당 `([product, quantity])` 문법을 활용하여 인덱스 숫자 없이 직관적인 이름으로 순회 및 가독성 향상.
  ```typescript
  // 💡 구조 분해 할당으로 가독성 극대화
  this.items.forEach(([product, quantity]) => {
      total += product.price * quantity;
  });

  // filter에서도 필요한 요소만 쏙 받아서 필터링
  this.items = this.items.filter(([product]) => product.id !== productId);
  ```

---

### 8. 사용자 정의 타입 가드 (`is`)와 `unknown` 타입 검증
- **학습:** `is` 키워드를 사용하여 나만의 타입 가드(Type Guard) 돋보기를 작성할 수 있음.
- **활용:** 
  1. **서로소 유니언 식별:** `payment is CardPayment` 반환 타입을 통해 `payment.tag === "CARD"` 조건으로 안전하게 타입을 좁힘.
  2. **`unknown` 타입 안심 검증:** 외부 알 수 없는 데이터(`unknown`)가 객체인지(`typeof input === "object" && input !== null`), 필요한 속성을 가졌는지(`"id" in input`) 단계별로 검증하여 안전하게 타입 확정.
  ```typescript
  export function isValidProduct(input: unknown): input is Product {
      return typeof input === "object" 
          && input !== null
          && "id" in input
          && "name" in input
          && "price" in input
          && "category" in input;
  }
  ```

---

### 9. 클래스 인스턴스 생성 (`new`)과 일반 객체 리터럴 `{}`의 차이
- **실수:** `const item: ProductItem = { id: 1, name: "노트북", ... }` 객체 리터럴 형태로 생성 후 `item.getInfo()` 호출.
  - **오류 발생:** `TypeError: item.getInfo is not a function`
  - **원인:** 일반 객체 리터럴 `{}`에는 클래스의 프로토타입 메서드(`getInfo`, `applyDiscount`)가 탑재되어 있지 않음.
- **해결:** 반드시 `new` 키워드를 사용하여 인스턴스 생성
  ```typescript
  const item = new ProductItem(1, "노트북", 1000000, Category.ELECTRONICS);
  ```

---

### 10. Discriminated Union + `switch` 문과 `never` 안전장치 (Exhaustiveness Checking)
- **학습:** `switch (payment.tag)` 를 사용하면 각 `case` 블록 내에서 `payment`가 `CardPayment`, `CashPayment` 등으로 자동 타입 좁히기(Narrowing)됨.
- **`never` 안전장치 동작 원리 (`const _exhaustiveCheck: never = payment;`):**
  1. **`never` 타입 규칙:** `never` 변수에는 오직 `never` 타입 데이터만 대입 가능 (실제 데이터 대입 시 컴파일 에러 발생).
  2. **모든 케이스 처리 완료 시:** `CARD`, `CASH`, `POINT`를 모두 깎아냈으므로 `default:` 블록에서 `payment`는 아무것도 남지 않은 `never` 상태가 되어 무사 통과됨.
  3. **결제 수단 추가 시 예방:** 나중에 `Payment` 유니언에 `KakaoPay`를 추가하고 `switch`문에서 `case`를 빼먹으면, `default:` 블록에 `KakaoPay` 타입이 남은 채 내려옴. 이때 `KakaoPay`를 `never` 변수에 대입하려고 하면서 즉시 **컴파일 에러**가 발생하여 누락을 완벽히 감지함.
- **언더바(`_`) 관례:** 변수명 앞의 `_`는 실제 코드 실행용이 아닌 타입 검사/경고 방지용 변수임을 나타내는 개발자 간의 관례.
  ```typescript
  processPayment(payment: Payment): string {
      switch (payment.tag) {
          case "CARD":
              return `카드 결제 승인: 카드번호 [${payment.cardNumber}], [${payment.installment}]개월 할부`;
          case "CASH":
              return `현금 결제 완료: [${payment.receivedAmount}]원 입금 확인`;
          case "POINT":
              return `포인트 결제 완료: [${payment.pointAmount}]점 차감`;
          default:
              const _exhaustiveCheck: never = payment;
              throw new Error(`알 수 없는 결제 수단입니다: ${_exhaustiveCheck}`);
      }
  }
  ```

---

### 11. 제네릭 만능 저장소 (`Repository<T extends { id: number }>`) 및 Map 활용
- **학습:** `T extends { id: number }` 제약조건을 활용하여 `id`를 가진 모든 객체를 보관할 수 있는 만능 데이터베이스 클래스 구현.
- **배열(`T[]`) vs Map(`Map<number, T>`) 구현 비교:**
  - **배열 방식:** `findIndex`, `push`, `splice`, `filter` 사용.
  - **Map 방식:** `set`, `get`, `delete`, `Array.from(values())`를 사용하여 1줄 코딩 및 O(1) 초고속 조회/삭제 구현.
  ```typescript
  export class Repository<T extends { id: number }> {
      private items: Map<number, T> = new Map();

      saveItem(item: T): void {
          this.items.set(item.id, item);
      }

      findById(id: number): T | undefined {
          return this.items.get(id);
      }

      findAll(): T[] {
          return Array.from(this.items.values());
      }

      deleteById(id: number): boolean {
          return this.items.delete(id);
      }
  }
  ```

---

### 12. 내장 유틸리티 타입 기반 DTO (Data Transfer Object) 설계
- **학습:** `Partial`, `Omit`, `Pick` 유틸리티 타입을 조합하여 안전한 데이터 전달 객체 구현.
- **`ProductUpdateInput`:** `id` 수정은 금지하고 남은 속성만 선택적으로 받기 위해 `Partial<Omit<Product, "id">>` 적용.
- **`ProductSummary`:** 필요한 속성만 쏙 골라내기 위해 `Pick<Product, "id" | "name" | "price">` 적용.
  ```typescript
  export type ProductUpdateInput = Partial<Omit<Product, "id">>;
  export type ProductSummary = Pick<Product, "id" | "name" | "price">;

  // ProductItem 내부 수정 메서드
  update(input: ProductUpdateInput): void {
      if (input.name !== undefined) this.name = input.name;
      if (input.price !== undefined) this.price = input.price;
      if (input.category !== undefined) this.category = input.category;
  }
  ```

---

### 13. `keyof typeof` 의 필요성과 Enum 동작 원리
- **질문:** `keyof`를 쓰는데 왜 `typeof`가 필요할까?
- **원인:**
  - `keyof`는 오직 **'타입(Type/Interface)'** 의 키만 가져올 수 있음.
  - `enum OrderStatus` 또는 일반 객체(`const obj = ...`)는 런타임에 메모리에 존재하는 **'실제 값/객체(Value)'** 임.
  - 따라서 `typeof OrderStatus`로 값 객체를 타입으로 먼저 변환한 후 `keyof`를 붙여야 키 리터럴 유니언(`"PENDING" | "PAID" | ...`)이 정상 추출됨.
  ```typescript
  type statusKey = keyof typeof OrderStatus; // "PENDING" | "PAID" | "SHIPPING" | "DELIVERED" | "CANCELLED"
  ```

---

### 14. 템플릿 리터럴 타입 (`OrderEventType`)과 이벤트 이미터 패턴
- **학습:** 백틱(`` `on_${statusKey}_order` ``)을 사용하여 이벤트 이름 리터럴 유니언을 자동 생성.
- **`OrderEventType`을 따로 만드는 이유:**
  - 이벤트를 구독하는 사용자의 콜백 함수 `(event: OrderEventType, id: number) => void` 에게 **자동완성 및 오타 방지(타입 안전성)**를 제공하기 위해 필수적임.
- **숫자형 Enum vs 문자열 Enum 차이:**
  - 숫자형 Enum은 `OrderStatus[status]` 역방향 매핑 및 `as OrderEventType` 단언이 필요함.
  - 문자열 Enum(`PENDING = "PENDING"`)으로 선언하면 `as` 타입 단언 없이 100% 깔끔하게 동적 템플릿 리터럴 타입이 추론됨.
  ```typescript
  export type OrderEventType = `on_${statusKey}_order`;
  export type OrderEventListener = (event: OrderEventType, orderId: number) => void;

  export class OrderEventEmitter {
      private listeners: OrderEventListener[] = [];

      on(listener: OrderEventListener) {
          this.listeners.push(listener);
      }

      emit(status: OrderStatus, orderId: number) {
          const eventName = `on_${OrderStatus[status]}_order` as OrderEventType;
          this.listeners.forEach((listener) => {
              listener(eventName, orderId);
          });
      }
  }
  ```

---

### 15. `Promise<T>` 비동기 통신 시뮬레이션 및 생성 방식 비교
- **학습:** 제네릭 `ApiResponse<T>` 표준 응답 인터페이스와 비동기 `Promise` 모듈 작성.
- **Promise 반환 3가지 대안 방식:**
  1. `new Promise((resolve) => setTimeout(...))` ➡️ 지연 시간 시뮬레이션 시 사용.
  2. `async` 키워드 ➡️ `return { ... }` 반환값이 자동으로 `Promise`로 감싸짐 (실무 선호).
  3. `Promise.resolve(...)` ➡️ 준비된 성공 결과값을 1줄로 비동기 포장하여 즉시 반환.

---

### 16. 자바스크립트 일급 객체 (First-Class Object) 특성
- **질문:** 자바스크립트는 왜 함수를 변수에 저장할 수 있을까?
- **원인:** 자바스크립트에서 함수는 단순 코드 조각이 아닌, 숫자(`10`)나 문자열(`"안녕"`)과 완전히 동등한 지위를 가진 **'일급 객체(First-Class Object)'** 이기 때문.
- **일급 객체의 3가지 조건:**
  1. 변수나 객체/배열에 값으로 저장할 수 있다. (`const fn = () => {}`)
  2. 다른 함수의 매개변수(콜백 함수)로 전달할 수 있다. (`setTimeout(fn, 1000)`)
  3. 다른 함수의 반환값(`return`)으로 돌려줄 수 있다.

---

### 17. 서버 고도화 풀 파이프라인 통합 시나리오 (`src/index.ts`)
- **학습:** 고도화된 모든 타입스크립트 모듈을 하나로 연결하여 실무 엔드-투-엔드 백엔드 파이프라인 구동.
- **구동 순서:**
  1. `OrderEventEmitter` 리스너 등록 (`on_PAID_order`)
  2. `fetchProductsAsync` 1초 비동기 서버 조회
  3. `Repository<ProductItem>` 만능 DB 저장소 보관
  4. `ProductUpdateInput` DTO 특가 할인가 수정 (`laptop.update({ price: 850000 })`)
  5. `Cart` 장바구니 담기 및 총 금액 계산
  6. `processOrderAsync` 비동기 결제 실행 및 `OrderStatus.PAID` 상태 변경
  7. `emitter.emit` 이벤트 자동 발송 및 콘솔 출력 완료
