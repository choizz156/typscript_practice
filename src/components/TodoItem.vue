<template>
  <li>{{  todo.text }}</li>
</template>

<script setup lang="ts">
const props = defineProps<{
  todo: { id: number; text: string };
}>();
</script>

<style scoped></style>
