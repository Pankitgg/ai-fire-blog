<template>
  <HlmLayout>
    <div class="page-header">
      <h1>前后对比与悼明说</h1>
      <p>伏笔与应验，历史与虚构</p>
    </div>

    <section class="section">
      <h2>前后呼应大事记</h2>
      <ContrastPanel
        v-for="(item, index) in contrastEvents"
        :key="index"
        :before-title="'前文伏笔 (' + item.前文伏笔.split(' ')[0] + ')'"
        :after-title="'后文应验 (' + item.后文应验.split(' ')[0] + ')'"
      >
        <template #before>
          <p>{{ item.前文伏笔 }}</p>
        </template>
        <template #after>
          <p>{{ item.后文应验 }}</p>
        </template>
      </ContrastPanel>
    </section>

    <section class="section">
      <h2>悼明说核心观点</h2>
      <GlassCard>
        <div class="analysis-text">
          <p><strong>核心主张：</strong> {{ daomingInfo['悼明说']['核心主张'] }}</p>
          
          <h3>人物影射</h3>
          <ul>
            <li v-for="(desc, name) in daomingInfo['悼明说']['主要解读方法与细节']['人物影射']" :key="name">
              <strong>{{ name }}：</strong> {{ desc }}
            </li>
          </ul>
        </div>
      </GlassCard>
    </section>
  </HlmLayout>
</template>

<script setup lang="ts">
import HlmLayout from '../../../../components/book/hlm-t/HlmLayout.vue'
import ContrastPanel from '../../../../components/book/hlm-t/ContrastPanel.vue'
import GlassCard from '../../../../components/book/hlm-t/GlassCard.vue'
import { useHlmData } from '../../../../components/book/hlm-t/useHlmData'
// I need to access daoming.js data as well. Since I didn't create a composable for it, I'll hardcode or read it.
// Actually daoming.js content was provided in the prompt. I will create a local object for it.

const { data } = useHlmData()
const contrastEvents = data['前后呼应大事记']

const daomingInfo = {
  "悼明说": {
    "核心主张": "认为《红楼梦》并非简单的家族兴衰故事，而是一部以曲笔隐写明清易代历史，哀悼明朝灭亡、揭露清朝过失的政治寓言。",
    "主要解读方法与细节": {
      "人物影射": {
        "贾宝玉": "象征传国玉玺。通灵宝玉对应传国玉玺。",
        "林黛玉": "象征明朝或崇祯皇帝。'林'字双木，'朱'拆开为木。'玉带林中挂'隐喻崇祯自缢。",
        "薛宝钗": "象征清朝。'钗'为金，'雪'谐音'薛'，金簪雪里埋喻指北方势力。",
        "元迎探惜": "原应叹息，明朝国运四春。",
      }
    }
  }
}

definePageMeta({
  layout: false
})
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section {
  margin-bottom: 4rem;
}

h2 {
  font-family: 'Songti SC', serif;
  margin-bottom: 2rem;
  border-left: 4px solid var(--primary-color, #d81b60);
  padding-left: 1rem;
}

.analysis-text {
  line-height: 1.8;
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 1rem;
}
</style>
