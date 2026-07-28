<template>
  <h2>텍스트 입력</h2>
  <input v-model="text" />
  <p>{{ text }}</p>

  <h2>체크박스</h2>
  <input type="checkbox" id="checkbox" v-model="checked" />
  <label for="checkbox">체크됨: {{ checked }}</label>

  <h2>다중 체크박스</h2>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
  <p>체크된 이름: {{ checkedNames }}</p>

  <h2>라디오</h2>
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  <br />
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  <p>선택됨: {{ picked }}</p>

  <h2>셀렉트</h2>
  <select v-model="selected">
    <option disabled value="">하나를 선택하세요</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>선택됨: {{ selected }}</p>
  <h2>다중 선택</h2>
  <select v-model="multiSelected" multiple style="width: 100px">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>선택됨: {{ multiSelected }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";

const text = ref("수정하세요");
const checked = ref(true);
const checkedNames = ref<string[]>([]);
const picked = ref("하나");
const selected = ref("A");
const multiSelected = ref<string[]>(["A"]);
</script>

<style scoped></style>
