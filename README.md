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
- [ ] **6. Markdown Editor (실시간 마크다운 에디터)**
- [ ] **7. Fetching Data (외부 REST API 통신)**
- [ ] **8. Grid with Sort and Filter (그리드 테이블 정렬 및 검색)**
- [ ] **9. Tree View (트리 뷰 - 재귀 컴포넌트)**
- [ ] **10. SVG Graph (SVG 그래프)**
- [ ] **11. Modal Component (모달 팝업 & `<slot>`)**
- [ ] **12. List Transition (목록 애니메이션)**
- [ ] **13. TodoMVC (완성형 TodoApp)**

---

### 🔴 Level 3: 7 GUIs (UI 벤치마크 챌린지)
- [ ] **14. Counter (카운터)**
- [ ] **15. Temperature Converter (온도 변환기)**
- [ ] **16. Flight Booker (항공권 예약 시스템)**
- [ ] **17. Timer (타이머)**
- [ ] **18. CRUD (회원/데이터 C.R.U.D 관리)**
- [ ] **19. Circle Drawer (원 그리기 & Undo/Redo)**
- [ ] **20. Cells (스프레드시트 셀 수식 연산)**
