<template>
  <div>
    <h2>7. Grid Component (그리드 테이블 정렬 및 검색)</h2>
    <form id="search" style="margin-bottom: 15px;">
      Search <input name="query" v-model="searchQuery" placeholder="검색어 입력..." />
    </form>

    <GridTable
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GridTable, { type DataRow } from "../components/GridTable.vue";

const searchQuery = ref("");
const gridColumns = ref(["name", "power"]);
const gridData = ref<DataRow[]>([
  { name: "Chuck Norris", power: Infinity },
  { name: "Bruce Lee", power: 9000 },
  { name: "Jackie Chan", power: 7000 },
  { name: "Jet Li", power: 8000 },
]);
</script>

<style scoped></style>
