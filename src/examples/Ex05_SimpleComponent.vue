<template>
  <div>
    <h2>5. Simple Component (자식 컴포넌트 분리 및 Props 전달)</h2>
    <ol>
      <TodoItem v-for="item in groceryList" :todo="item" :key="item.id" />
    </ol>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoItem from "../components/TodoItem.vue";

const groceryList = ref([
  { id: 0, text: "채소" },
  { id: 1, text: "치즈" },
  { id: 2, text: "사람들이 먹어야 하는 그 밖의 것들" },
]);
</script>

<style scoped></style>
