<template>
  <h1>최신 커밋 내역</h1>

  <template v-for="branch in branches" :key="branch">
    <input type="radio" :id="branch" :value="branch" name="branch" v-model="currentBranch" />
    <label :for="branch" style="margin-right: 10px;">{{ branch }}</label>
  </template>

  <p>현재 선택된 브랜치: vuejs/core@{{ currentBranch }}</p>

  <ul>
    <li v-for="{ html_url, sha, commit, author } in commits" :key="sha">
      <a :href="html_url" target="_blank" class="commit">{{ sha.slice(0, 7) }}</a>
      - <span class="message">{{ truncate(commit.message) }}</span><br />
      by <span class="author">
        <a :href="author?.html_url" target="_blank">{{ commit.author.name }}</a>
      </span>
      at <span class="date">{{ formatDate(commit.author.date) }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'


const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`
const branches = ref(['main', 'v2-compat'])
const currentBranch = ref('main')
const commits = ref<any[] | null>(null)


watchEffect(async () => {
    const url = `${API_URL}${currentBranch.value}`
    const response = await fetch(url)
    commits.value = await response.json()
})

const truncate = (v: string) => {
    const newLine = v.indexOf('\n')
    return newLine > 0 ? v.slice(0, newLine) : v
}

const formatDate = (v: string) => {
    return v.replace(/T|Z/g, ' ')
}

</script>

<style scoped>
a {
  color: #42b883;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
li {
  margin-bottom: 12px;
  line-height: 1.4;
}
.author, .date {
  font-weight: bold;
}
</style>
