<template>
  <HlmLayout>
    <HlmHero />
    
    <section class="intro-grid">
      <GlassCard class="intro-card" :hover="true" @click="router.push('/book/books/hlm-t/characters')">
        <h3>金陵十二钗</h3>
        <p>红颜薄命，千红一哭。查看十二金钗的命运沉浮。</p>
      </GlassCard>
      
      <GlassCard class="intro-card" :hover="true" @click="router.push('/book/books/hlm-t/timeline')">
        <h3>演进大事记</h3>
        <p>从木石前盟到白茫茫大地，时间线索全览。</p>
      </GlassCard>
      
      <GlassCard class="intro-card" :hover="true" @click="router.push('/book/books/hlm-t/analysis')">
        <h3>前后对比</h3>
        <p>前80回与后28回的巨大反差，揭示癸酉本的残酷真相。</p>
      </GlassCard>
      
      <GlassCard class="intro-card" :hover="true" @click="router.push('/book/books/hlm-t/gallery')">
        <h3>物品与诗词</h3>
        <p>通灵宝玉、海棠花、十独吟... 关键意象解析。</p>
      </GlassCard>
    </section>

    <div class="quote-section">
      <blockquote>
        <p>“满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中味？”</p>
      </blockquote>
    </div>
  </HlmLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import HlmLayout from '../../../../components/book/hlm-t/HlmLayout.vue'
import HlmHero from '../../../../components/book/hlm-t/HlmHero.vue'
import GlassCard from '../../../../components/book/hlm-t/GlassCard.vue'

const router = useRouter()

definePageMeta({
  layout: false 
})
</script>

<style scoped>
.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.intro-card {
  cursor: pointer;
  height: 100%;
}

.intro-card h3 {
  color: var(--primary-color, #d81b60);
  margin-bottom: 1rem;
}

.quote-section {
  text-align: center;
  margin-top: 6rem;
  margin-bottom: 4rem;
}

blockquote {
  font-family: 'Songti SC', serif;
  font-size: 1.5rem;
  font-style: italic;
  opacity: 0.7;
}
</style>
