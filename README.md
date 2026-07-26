# 🛒 타입스크립트 실습 프로젝트 - 미니 쇼핑몰

타입스크립트 기본부터 클래스, 오버로딩, 유니언 타입, 튜플 구조분해 할당, 사용자 정의 타입 가드, Discriminated Union과 never 안전장치, 제네릭 만능 저장소까지 실습하며 배우는 프로젝트입니다.

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

### 10. Discriminated Union + `switch` 문과 `never` 안전장치
- **학습:** `switch (payment.tag)` 를 사용하면 각 `case` 블록 내에서 `payment`가 `CardPayment`, `CashPayment` 등으로 자동 타입 좁히기(Narrowing)됨.
- **`never` 안전장치 (Exhaustiveness Check):**
  - `default:` 블록에서 `const _exhaustiveCheck: never = payment;` 구문을 작성.
  - **효과:** 미래에 `Payment` 유니언에 새로운 결제 수단이 추가되었을 때, `switch` 문에 `case`를 추가하지 않으면 컴파일 단계에서 빌드 에러를 발생시켜 개발자의 실수를 예방함.
- **언더바(`_`) 관례:** 변수명 앞의 `_`는 실제 코드 실행용이 아닌 타입 검사/경고 방지용 변수임을 나타내는 개발자 간의 관례.

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
