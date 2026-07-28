<template>
  <button @click="show = !show"> 목록 토글</button>
  <button @click="list.push(list.length + 1)">숫자 추가</button>
  <button @click="list.pop()">숫자 제거</button>
  <button @click="list.reverse()">목록 뒤집기</button>

  <ul v-if="show && list.length">
    <li v-for="item of list" :key="item">{{ item }}</li>
  </ul>
  <p v-else-if="list.length"> 숨겨져있습니다.</p>
  <p v-else> 목록이 비어있습니다.</p>
</template>

<script setup lang="ts">
import { ref } from "vue";

const show = ref(true);
const list = ref([1, 2, 3]);

</script>

<style scoped>
</style>
