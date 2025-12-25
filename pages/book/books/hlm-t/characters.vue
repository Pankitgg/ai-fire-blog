<template>
  <HlmLayout>
    <div class="page-header">
      <h1>金陵十二钗正册</h1>
      <p>点击卡片查看人物在不同时期的命运</p>
    </div>

    <div class="characters-grid">
      <CharacterCard 
        v-for="char in characters" 
        :key="char.姓名" 
        :character="char" 
      />
    </div>
  </HlmLayout>
</template>

<script setup lang="ts">
import HlmLayout from '../../../../components/book/hlm-t/HlmLayout.vue'
import CharacterCard from '../../../../components/book/hlm-t/CharacterCard.vue'
import { useHlmData } from '../../../../components/book/hlm-t/useHlmData'

const { data } = useHlmData()
const characters = data['金陵十二钗正册']

definePageMeta({
  layout: false
})
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

h1 {
  font-family: 'Songti SC', serif;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
  padding-bottom: 4rem;
}
</style>
