<template>
  <div>
    <h2>4. Form Bindings (폼 입력 요소 종합 바인딩)</h2>

    <h3>텍스트 입력</h3>
    <input v-model="text" />
    <p>{{ text }}</p>

    <h3>단일 체크박스</h3>
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">체크됨: {{ checked }}</label>

    <h3>다중 체크박스</h3>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>
    <p>체크된 이름: {{ checkedNames }}</p>

    <h3>라디오 버튼</h3>
    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>
    <br />
    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
    <p>선택됨: {{ picked }}</p>

    <h3>셀렉트 드롭다운</h3>
    <select v-model="selected">
      <option disabled value="">하나를 선택하세요</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <p>선택됨: {{ selected }}</p>

    <h3>다중 선택 드롭다운</h3>
    <select v-model="multiSelected" multiple style="width: 100px">
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <p>선택됨: {{ multiSelected }}</p>
  </div>
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

<style scoped>
h3 {
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
