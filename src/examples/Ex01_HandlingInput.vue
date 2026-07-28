<template>
  <div>
    <h2>1. Handling User Input (사용자 입력 및 이벤트 수식어)</h2>
    <h1>{{ message }}</h1>
    <button @click="reverseMessage">메시지 뒤집기</button>
    <button @click="message += '!'">"!" 추가</button>

    <a href="https://vuejs.org" @click.prevent="notify">링크 (click.prevent 차단 테스트)</a>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const message = ref("hello world");

function reverseMessage() {
  message.value = message.value.split("").reverse().join("");
}

function notify() {
  alert("이동 차단");
}
</script>

<style scoped>
button,
a {
  display: block;
  margin-bottom: 1em;
}
</style>
