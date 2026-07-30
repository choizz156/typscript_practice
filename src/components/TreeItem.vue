<template>
    <li>
        <div :class="{ bold: isFolder }" @click="toggle" @dblclick="changeType">
            {{ model.name }}
            <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
        </div>
        <ul v-show="isOpen" v-if="isFolder">
            <TreeItem class="item" v-for="(child, index) in model.children" :key="index" :model="child">
            </TreeItem>
            <li class="add" @click="addChild">+</li>
        </ul>
    </li>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface TreeData {
    name: string
    children?: TreeData[] // ? 는 자식 노드가 없을 수도 있다는 뜻 
}

const props = defineProps<{
    model: TreeData
}>()

const isOpen = ref(false)
// children 배열이 존재하고 1개 이상 있으면 "폴더"로 판단하는 계산된 속성
const isFolder = computed(() => {
    return Boolean(props.model.children && props.model.children.length)
})

function toggle() {
    if (isFolder.value) {
        isOpen.value = !isOpen.value
    }
}

function changeType() {
    if (!isFolder.value) {
        props.model.children = []
        addChild()
        isOpen.value = true
    }
}

function addChild() {
    props.model.children?.push({
        name: 'new stuff'
    })
}

</script>

<style scoped>
.bold {
    font-weight: bold;
}

.item {
    cursor: pointer;
    line-height: 1.5;
}

.add {
    color: #42b883;
    font-weight: bold;
    cursor: pointer;
}
</style>