<template>
  <h1 :title="title">마우스를 올려보세요</h1>
  <p :class="{ red: isRed }" @click="toggleRed">클릭하면 빨간색 글자 클래스가 토글됩니다!</p>
  <p :style="{color}" @click="toggleColor">클릭하면 인라인 스타일 색상이 초록/파랑으로 바뀝니다!</p>
</template>

<script setup lang="ts">
import { ref } from "vue";

const title = ref("속성 바인딩 실습");
const isRed = ref(true);
const color = ref("green");

const toggleRed = () => {
  isRed.value = !isRed.value;
};

const toggleColor = () => {
   color.value = color.value === 'green' ? 'blue' : 'green'
};
</script>

<style scoped>
.red { color: red; font-weight: bold; cursor: pointer; }
</style>
