<template>
  <div>
    <h2>9. SVG Graph (동적 스탯 차트 예제)</h2>
    <PolyGraph :stats="stats" @remove="removeStat" />

    <form @submit.prevent="addStat" style="margin-top: 15px;">
      <input v-model="newTag" placeholder="새 스탯 이름 (예: F)" />
      <button type="submit">스탯 추가</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PolyGraph, { type StatItem } from "../components/PolyGraph.vue";

const stats = ref<StatItem[]>([
  { label: "A", value: 100 },
  { label: "B", value: 100 },
  { label: "C", value: 100 },
  { label: "D", value: 100 },
  { label: "E", value: 100 },
  { label: "F", value: 100 },
]);

const newTag = ref("");

function addStat() {
  if (!newTag.value.trim()) return;
  stats.value.push({
    label: newTag.value.trim(),
    value: 100,
  });
  newTag.value = "";
}

function removeStat(stat: StatItem) {
  if (stats.value.length > 3) {
    stats.value = stats.value.filter((s) => s !== stat);
  } else {
    alert("최소 3개 이상의 스탯이 있어야 차트를 그릴 수 있습니다!");
  }
}
</script>

<style scoped></style>
