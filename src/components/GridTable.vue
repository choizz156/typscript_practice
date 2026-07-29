<template>
  <table v-if="filteredData.length">
    <thead>
      <tr>
        <th v-for="key in columns" :key="key" @click="sortBy(key)" :class="{ active: sortKey === key }">
          {{ capitalize(key) }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in filteredData" :key="index">
        <td v-for="key in columns" :key="key">
        {{ entry[key] }}
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>일치하는 결과가 없습니다.</p>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';


export interface DataRow {
  [key: string]: any;
}

const props = defineProps<{
  data: DataRow[];
  columns: string[];
  filterKey: string;
}>()

const sortKey = ref("")
const sortOrders = ref<Record<string, number>>(
  props.columns.reduce((o: Record<string, number>, key: string) => {
    o[key] = 1;
    return o;
  }, {})
)

const filteredData = computed<DataRow[]>(() => {

  let data = props.data
  let filterKey = props.filterKey

  if (filterKey) {
    const query = filterKey.toLowerCase()
    data = data.filter((row: DataRow) => {
      return Object.keys(row).some((key: string) => {
        return String(row[key]).toLowerCase().includes(query)
      })
    })
  }

  const key = sortKey.value;
  if (key) {
    const order = sortOrders.value[key] || 1;
    data = data.slice().sort((a: DataRow, b: DataRow) => {
      const valA = a[key]
      const valB = b[key]
      if (valA === valB) return 0
      return (valA > valB ? 1 : -1) * order
    })
  }

  return data
})

const sortBy = (key: string) => {
  sortKey.value = key
  sortOrders.value[key] = (sortOrders.value[key] || 1) * -1
}

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

</script>

<style scoped>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>