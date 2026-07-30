<template>
  <div>
    <h2>8. Tree View (재귀 컴포넌트)</h2>
    <p>💡 항목을 더블클릭하면 폴더로 변경되고, 클릭하면 폴더가 켜집니다.</p>
    <ul>
      <TreeItem class="item" :model="treeData" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TreeItem, { type TreeData } from "../components/TreeItem.vue";

const treeData = ref<TreeData>({
  name: "My Tree",
  children: [
    { name: "hello" },
    { name: "world" },
    {
      name: "child folder",
      children: [
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "world" }],
        },
        { name: "hello" },
        { name: "world" },
      ],
    },
  ],
});
</script>

<style scoped>
ul {
  padding-left: 1em;
  line-height: 1.5;
}
</style>
