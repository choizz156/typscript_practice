# 🏆 Vue 3 공식 21개 예제 도장 깨기 (Official Examples Master)

> Vue.js 공식 문서 21개 실전 예제를 TypeScript + Composition API `<script setup>` 및 Vite 환경에서 100% 직접 구현하고 검증하는 학습 저장소입니다.

---

## 🗺️ 전체 21개 예제 현황

### 🟢 Level 1: Basic (기초 예제) - **[100% 완수 🎉]**
- [x] **1. Handling User Input (사용자 입력 처리)** (`src/examples/Ex01_HandlingInput.vue`)
  - `@click` 이벤트 리스너, `ref.value.split('').reverse().join('')` 문자열 반전, `@click.prevent` 기본 동작 차단 수식어.
- [x] **2. Attribute Bindings (속성 바인딩)** (`src/examples/Ex02_AttributeBindings.vue`)
  - `:title` 툴팁 바인딩, `:class="{ red: isRed }"` 조건부 동적 클래스 토글, `:style="{ color }"` 인라인 스타일 동적 바인딩.
- [x] **3. Conditionals and Loops (조건문과 반복문)** (`src/examples/Ex03_ConditionalsAndLoops.vue`)
  - `v-if="show && list.length"`, `v-else-if="list.length"`, `v-else` 조건부 삼중 바인딩 연쇄, `v-for="item of list" :key="item"` 배열 조작 (push, pop, reverse).
- [x] **4. Form Bindings (폼 바인딩)** (`src/examples/Ex04_FormBindings.vue`)
  - `v-model` 종합 폼 제어: Text Input, Single Checkbox (`boolean`), Multiple Checkbox (`ref<string[]>`), Radio Button, Select Dropdown, Multiple Select Dropdown.
- [x] **5. Simple Component (컴포넌트 분리)** (`src/examples/Ex05_SimpleComponent.vue`, `src/components/TodoItem.vue`)
  - 자식 컴포넌트(`TodoItem.vue`) 생성, `defineProps<{ todo: { id: number; text: string } }>()` 타입 기반 수신, 부모에서 `v-for` 연동 Props 전달.

---

### 🟡 Level 2: Practical (실무 응용)
- [x] **6. Fetching Data (외부 REST API 통신)** (`src/examples/Ex06_FetchingData.vue`)
  - GitHub REST API (`https://api.github.com/repos/vuejs/core/commits?sha=`) 비동기 조회, `watchEffect` 자동 재요청, 비동기 `fetch` / `async-await`, 헬퍼 함수 가공.
- [x] **7. Grid with Sort and Filter (그리드 테이블 정렬 및 검색)** (`src/examples/Ex07_GridComponent.vue`, `src/components/GridTable.vue`)
  - 자식 컴포넌트(`GridTable.vue`) 생성 및 TypeScript 인터페이스(`interface DataRow`) 정의, `computed` 검색 필터링 & `sort()` 오름차순/내림차순 컬럼 정렬, 동적 CSS 클래스 (`.asc`, `.dsc`).
- [x] **8. Tree View (트리 뷰 - 재귀 컴포넌트)** (`src/examples/Ex08_TreeView.vue`, `src/components/TreeItem.vue`)
  - 자기 자신을 템플릿 내부에서 다시 부르는 재귀 컴포넌트(`TreeItem`), 재귀 인터페이스(`interface TreeData`), 더블클릭(`@dblclick`)으로 일반 파일 ➔ 폴더 변환, 옵셔널 체이닝(`children?.push`) NPE 방지.
- [x] **9. SVG Graph (SVG 그래프)** (`src/examples/Ex09_SVGGraph.vue`, `src/components/PolyGraph.vue`)
  - SVG `<polygon>` 및 `<circle>` 벡터 차트 그리기, 삼각함수(`Math.sin`, `Math.cos`) 기반 스탯 X,Y 좌표 산출 `computed`, `v-model.number` 슬라이더 실시간 차트 변형.
- [ ] **10. Modal Component (모달 팝업 & `<slot>`)**
- [ ] **11. List Transition (목록 애니메이션)**
- [ ] **12. TodoMVC (완성형 TodoApp)**

---

### 🔴 Level 3: 7 GUIs (UI 벤치마크 챌린지)
- [ ] **13. Counter (카운터)**
- [ ] **14. Temperature Converter (온도 변환기)**
- [ ] **15. Flight Booker (항공권 예약 시스템)**
- [ ] **16. Timer (타이머)**
- [ ] **17. CRUD (회원/데이터 C.R.U.D 관리)**
- [ ] **18. Circle Drawer (원 그리기 & Undo/Redo)**
- [ ] **19. Cells (스프레드시트 셀 수식 연산)**

---

## 💡 [예제 8] 핵심 Q&A 및 백엔드 관점 개념 정리

### 1. `children?: TreeData[]` 의 의미와 재귀 타입
- `?` (선택적 프로퍼티): 일반 파일일 때는 `children` 속성이 없어 `undefined`이고, 폴더일 때는 `children` 배열을 가짐.
- `TreeData[]`: 자기 자신 클래스/타입을 참조하는 **재귀 데이터 구조**.
  - **Java 비유:** `public class TreeData { private String name; private List<TreeData> children; }` (카테고리/댓글 트리 엔티티와 동일).

### 2. 옵셔널 체이닝 (`props.model.children?.push(...)`)
- `?.` 은 자바의 `NullPointerException` (NPE)을 방지하는 안전장치 연산자.
- `children` 이 `undefined` 이면 `.push()` 호출을 무시하고, 배열일 때만 안전하게 실행.
  - **Java 비유:** `Optional.ofNullable(model.getChildren()).ifPresent(c -> c.add(...));`

### 3. 파일 ➔ 폴더 변환 (`changeType()`) 메커니즘
```typescript
function changeType() {
  if (!isFolder.value) {
    props.model.children = []  // 1. 빈 배열을 할당하여 폴더 상자로 변환!
    addChild()                 // 2. 상자 안에 { name: 'new stuff' } 객체 밀어넣기!
    isOpen.value = true        // 3. 폴더를 열어서 하위 노드 표시!
  }
}
```
- `props.model.children = []` 할당 시, TypeScript 인터페이스에 따라 빈 배열이 자동으로 `TreeData[]` 타입으로 추론 및 지정됨.
