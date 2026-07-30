<template>
  <table v-if="filteredData.length">
    <thead>
      <tr>
        <th v-for="key in columns" :key="key" @click="sortBy(key)" :class="{ active: sortKey === key }">
          {{ capitalize(key) }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in filteredData" :key="index">
        <td v-for="key in columns" :key="key">
        {{ entry[key] }}
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>일치하는 결과가 없습니다.</p>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// 💡 1. 자바의 Map<String, Object> 와 같은 역할입니다.
// { name: 'Chuck', power: 9000 } 처럼 어떤 키(컬럼명)든 들어올 수 있는 동적 객체 타입 선언!
export interface DataRow {
  [key: string]: any;
}

// 💡 2. 부모(App.vue)에게 전달받을 데이터 파라미터(Props) 선언
const props = defineProps<{
  data: DataRow[];      // 테이블에 띄울 데이터 목록 (행 리스트)
  columns: string[];    // 화면에 보여줄 컬럼명 배열 (예: ['name', 'power'])
  filterKey: string;    // 검색창에 입력한 검색어 키워드
}>()

// 💡 3. 현재 사용자가 어떤 컬럼을 클릭해서 정렬 중인지 저장하는 변수 (예: 'name' 또는 'power')
const sortKey = ref("")

// 💡 4. 각 컬럼별 정렬 방향을 저장하는 객체 (1: 오름차순 🔼 / -1: 내림차순 🔽)
// reduce를 사용해 ['name', 'power'] 컬럼 목록을 { name: 1, power: 1 } 객체로 초기화함!
const sortOrders = ref<Record<string, number>>(
  props.columns.reduce((o: Record<string, number>, key: string) => {
    o[key] = 1; // 기본은 모두 오름차순(1)으로 세팅
    return o;
  }, {})
)

// 💡 5. [핵심!] 검색어 필터링 + 정렬이 완료된 '최종 결과 배열'을 계산하는 computed 속성
const filteredData = computed<DataRow[]>(() => {
  let data = props.data
  let filterKey = props.filterKey

  // ----------------------------------------------------
  // A단계: 검색어 필터링 (SQL의 WHERE name LIKE '%검색어%' 역할)
  // ----------------------------------------------------
  if (filterKey) {
    const query = filterKey.toLowerCase() // 대소문자 구분을 없애기 위해 소문자로 변환

    data = data.filter((row: DataRow) => {
      // 행(row)의 모든 필드('name', 'power') 중 하나라도 검색어를 포함하고 있는지 검사(some)
      return Object.keys(row).some((key: string) => {
        return String(row[key]).toLowerCase().includes(query)
      })
    })
  }

  // ----------------------------------------------------
  // B단계: 컬럼 클릭 시 정렬 (SQL의 ORDER BY key ASC/DESC 역할)
  // ----------------------------------------------------
  const key = sortKey.value;
  if (key) {
    const order = sortOrders.value[key] || 1; // 1이면 오름차순, -1이면 내림차순

    // 원본 데이터가 훼손되지 않도록 .slice()로 복사본을 만든 뒤 .sort() 정렬
    data = data.slice().sort((a: DataRow, b: DataRow) => {
      const valA = a[key]
      const valB = b[key]

      if (valA === valB) return 0 // 두 값이 같으면 순서 변경 없음

      // valA > valB 면 1, 아니면 -1 을 리턴하는데,
      // 여기에 order(1 또는 -1)를 곱해줘서 오름차순/내림차순을 뒤집음!
      return (valA > valB ? 1 : -1) * order
    })
  }

  // 필터링과 정렬이 끝난 최종 배열 리턴 (화면의 <tr> 태그들이 이걸로 그려짐)
  return data
})

// 💡 6. 사용자가 테이블 헤더(<th>)를 클릭했을 때 실행되는 메서드
const sortBy = (key: string) => {
  sortKey.value = key // 클릭한 컬럼을 정렬 컬럼으로 지정
  sortOrders.value[key] = (sortOrders.value[key] || 1) * -1 // 1이면 -1로, -1이면 1로 정렬 방향을 뒤집음! (토글)
}

// 💡 7. 컬럼 첫 글자를 대문자로 바꿔주는 헬퍼 함수 ('name' ➔ 'Name')
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style scoped>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>