<script setup lang="ts">

import {computed} from "vue";

export interface StatItem {
  label: string
  value: number
}

const props = defineProps<{ stats: StatItem[] }>()

const emit = defineEmits<{
  (e: 'remove', stat: StatItem): void
}>()


//  3. 삼각함수(Sin/Cos)를 이용해 0~100 스탯 값을 SVG (X,Y) 좌표로 변환하는 헬퍼 함수
function valueToPoint(value: number, index: number, total: number) {
  const x = 0
  const y = -value * 0.8 // 80% 스케일링
  const angle = ((Math.PI * 2) / total) * index // 각도 계산 (360도 / 총 스탯 개수)
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const tx = x * cos - y * sin + 100 // 중심점(100, 100)으로 이동
  const ty = x * sin + y * cos + 100
  return {x: tx, y: ty}
}

// 4. <polygon :points="..."> 에 들어갈 "x1,y1 x2,y2 ..." 형태의 동적 좌표 문자열 계산
const points = computed(() => {
  const total = props.stats.length
  return props.stats.map((stat, i) => {
    const {x, y} = valueToPoint(stat.value, i, total)
    return `${x},${y}`
  })
      .join(' ')
})

// 💡 5. 라벨 텍스트가 표시될 좌표 계산 (차트 외곽 밖 스탯+10 에 위치)
const pointList = computed(() => {
  const total = props.stats.length
  return props.stats.map((stat, i) => {
    const {x, y} = valueToPoint(stat.value + 10, i, total)
    return {
      label: stat.label,
      x,
      y
    }
  });
})

</script>

<template>
  <div class="graph-container">
    <!-- 💡 SVG 태그: 200x200 크기의 벡터 그래픽 도화지 -->
    <svg width="200" height="200">
      <g>
        <!-- 💡 다각형(Polygon): points="x1,y1 x2,y2..." 좌표를 받아 다각형 차트를 그림 -->
        <polygon :points="points"></polygon>
        <!-- 💡 배경 외곽 원(Circle): 중심(100,100), 반지름 80 -->
        <circle cx="100" cy="100" r="80"></circle>
        <!-- 💡 각 스탯 축 끝점에 라벨(A, B, C...) 텍스트 표시 -->
        <text v-for="point in pointList" :key="point.label" :x="point.x" :y="point.y" class="label">
          {{ point.label }}
        </text>
      </g>
    </svg>
    <!-- 💡 각 스탯별 슬라이더(range) 컨트롤러 목록 -->
    <div v-for="stat in stats" :key="stat.label" class="stat-slider">
      <label>{{ stat.label }}</label>
      <input type="range" v-model.number="stat.value"  min="0" max="100"/>
      <span>{{stat.value}}</span>
      <button @click="$emit('remove', stat)" class="remove-btn">X</button>
    </div>
  </div>
</template>

<style scoped>
svg {
  display: block;
}

polygon {
  fill: #42b883;
  opacity: 0.75;
}

circle {
  fill: none;
  stroke: #999;
}

.label {
  font-size: 12px;
  fill: #666;
  text-anchor: middle;
}

.graph-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-slider {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remove-btn {
  color: red;
  cursor: pointer;
  border: none;
  background: none;
}
</style>