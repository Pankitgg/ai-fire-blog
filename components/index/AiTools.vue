<!--
 * @Author: Shaoli
 * @Date: 2023-02-26 22:10:00
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-02-26 22:10:00
 * @Description: AI工具汇总组件
-->
<template>
  <div class="ai-tools-section">
    <div class="section-header">
      <h2>AI工具汇总</h2>
      <a href="#" class="more-link">查看更多</a>
    </div>
    <div class="tools-grid">
      <div v-for="(tool, index) in toolsList" :key="index" class="tool-card">
        <div class="tool-icon">
          <img :src="tool.icon" :alt="tool.name" />
        </div>
        <div class="tool-content">
          <h3 class="tool-name">{{ tool.name }}</h3>
          <p class="tool-description">{{ tool.description }}</p>
          <div class="tool-category">
            <span class="category-tag">{{ tool.category }}</span>
          </div>
          <div class="tool-actions">
            <a :href="tool.link" target="_blank" class="use-button">立即使用</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/request'

interface ToolItem {
  id: number
  name: string
  description: string
  icon: string
  category: string
  link: string
  rating: number
  users: number
}

const toolsList = ref<ToolItem[]>([])

// 模拟数据 - 实际项目中应从API获取
const mockToolsData: ToolItem[] = [
  {
    id: 1,
    name: "ChatGPT",
    description: "OpenAI开发的强大语言模型，可用于各种文本生成和对话任务",
    icon: "https://picsum.photos/id/10/100/100",
    category: "对话模型",
    link: "https://chat.openai.com/",
    rating: 4.9,
    users: 100000000
  },
  {
    id: 2,
    name: "Midjourney",
    description: "AI图像生成工具，通过文本描述创建高质量图像",
    icon: "https://picsum.photos/id/20/100/100",
    category: "图像生成",
    link: "https://www.midjourney.com/",
    rating: 4.8,
    users: 50000000
  },
  {
    id: 3,
    name: "GitHub Copilot",
    description: "AI编程助手，帮助开发者更快地编写代码",
    icon: "https://picsum.photos/id/30/100/100",
    category: "编程工具",
    link: "https://github.com/features/copilot",
    rating: 4.7,
    users: 10000000
  },
  {
    id: 4,
    name: "DALL-E 2",
    description: "OpenAI的AI图像生成器，将文本转换为逼真的图像",
    icon: "https://picsum.photos/id/40/100/100",
    category: "图像生成",
    link: "https://openai.com/dall-e-2/",
    rating: 4.8,
    users: 20000000
  },
  {
    id: 5,
    name: "Grammarly",
    description: "AI写作助手，提供语法检查、拼写纠正和写作建议",
    icon: "https://picsum.photos/id/50/100/100",
    category: "写作工具",
    link: "https://www.grammarly.com/",
    rating: 4.6,
    users: 300000000
  },
  {
    id: 6,
    name: "Canva AI",
    description: "集成AI功能的设计工具，简化图形设计流程",
    icon: "https://picsum.photos/id/60/100/100",
    category: "设计工具",
    link: "https://www.canva.com/ai/",
    rating: 4.5,
    users: 100000000
  }
]

const fetchToolsData = async () => {
  try {
    // 实际项目中应使用API获取数据
    // const { data } = await request.get('/ai-tools/list')
    // toolsList.value = data
    
    // 使用模拟数据
    toolsList.value = mockToolsData
  } catch (error) {
    console.error('Failed to fetch tools data:', error)
  }
}

onMounted(() => {
  fetchToolsData()
})
</script>

<style lang="less" scoped>
.ai-tools-section {
  margin-bottom: 40px;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #21293c;
    margin: 0;
  }
  
  .more-link {
    font-size: 14px;
    color: #31c48c;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: #20a878;
    }
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.tool-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  padding: 20px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
}

.tool-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  border-radius: 50%;
  overflow: hidden;
  background: #f6f7f8;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
}

.tool-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tool-name {
  font-size: 18px;
  font-weight: 600;
  color: #21293c;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.tool-description {
  font-size: 14px;
  color: #67788a;
  margin: 0 0 12px 0;
  line-height: 1.5;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-category {
  margin-bottom: 16px;
}

.category-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #f6ffed;
  color: #52c41a;
  border-radius: 12px;
  font-size: 12px;
  border: 1px solid #b7eb8f;
}

.tool-actions {
  margin-top: auto;
}

.use-button {
  display: inline-block;
  padding: 8px 16px;
  background: #31c48c;
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.3s;
  
  &:hover {
    background: #20a878;
  }
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>