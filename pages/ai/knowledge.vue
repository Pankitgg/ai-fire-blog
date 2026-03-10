<template>
  <div class="knowledge-container">
    <!-- 第一次握手对话框 -->
    <div v-if="showHandshakeDialog" class="handshake-overlay">
      <div class="handshake-box">
        <h3>请输入作者名称</h3>
        <p class="desc">请输入作者名字的全英文小写</p>
        <div class="input-group">
          <input 
            v-model="authorName" 
            type="text" 
            placeholder="作者名称（全英文小写）"
            @keyup.enter="submitHandshake"
          />
          <p v-if="handshakeError" class="error">{{ handshakeError }}</p>
        </div>
        <div class="actions">
          <button @click="showHandshakeDialog = false" class="cancel-btn">取消</button>
          <button @click="submitHandshake" class="confirm-btn">确定</button>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content" v-else>
      <div class="control-panel">
        <div class="input-wrapper">
          <input 
            v-model="initialNodeText" 
            placeholder="输入初始节点内容" 
            @keyup.enter="addInitialNode" 
            class="node-input"
          />
          <button @click="addInitialNode" class="create-btn">创建初始节点</button>
        </div>
        <div class="tips">
          <i class="iconfont icon-info"></i> 点击节点可生成相关联的子节点
        </div>
      </div>
      
      <div class="graph-wrapper" ref="graphContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import request from '@/utils/request'
import * as d3 from 'd3'

// --- 握手逻辑 ---
const showHandshakeDialog = ref(true)
const authorName = ref('')
const handshakeError = ref('')
const validateId = ref('')

const submitHandshake = () => {
  const name = authorName.value.trim()
  if (!name) {
    handshakeError.value = '请输入作者名称'
    return
  }
  if (!/^[a-z]+$/.test(name)) {
    handshakeError.value = '作者名称必须是全英文小写'
    return
  }
  validateId.value = name
  showHandshakeDialog.value = false
}

// --- 图谱逻辑 ---
const graphContainer = ref<HTMLElement | null>(null)
const initialNodeText = ref('')
const nodes = ref<any[]>([])
const links = ref<any[]>([])

let simulation: d3.Simulation<any, any> | null = null
let svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null

// 初始化图谱
const initGraph = () => {
  if (!graphContainer.value) return
  
  // 清理旧的 SVG
  d3.select(graphContainer.value).selectAll('*').remove()
  
  const width = graphContainer.value.clientWidth || 800
  const height = graphContainer.value.clientHeight || 600

  svg = d3.select(graphContainer.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', [0, 0, width, height])
    .style('background-color', '#f9fafb')

  // 添加缩放容器
  const g = svg.append('g')
  
  // 添加缩放功能
  const zoom = d3.zoom()
    .scaleExtent([0.1, 4]) // 缩放范围
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
    })
  
  svg.call(zoom as any)

  // 如果节点为空，添加样例数据
  if (nodes.value.length === 0) {
    initSampleData(width, height)
  }

  // 力导向模拟
  simulation = d3.forceSimulation(nodes.value)
    .force('link', d3.forceLink(links.value).id((d: any) => d.id).distance(120))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(40))
    .on('tick', ticked)

  // 立即渲染一次
  updateGraph()
}

// 颜色映射函数
const getColorByLevel = (level: number) => {
  const colors = [
    '#3b82f6', // Level 0: 蓝色
    '#10b981', // Level 1: 绿色
    '#f59e0b', // Level 2: 黄色
    '#ef4444', // Level 3: 红色
    '#8b5cf6', // Level 4: 紫色
    '#ec4899', // Level 5: 粉色
    '#6366f1', // Level 6: 靛青
  ]
  return colors[level % colors.length]
}

// 初始化样例数据
const initSampleData = (width: number, height: number) => {
  const cx = width / 2
  const cy = height / 2
  
  const rootId = 'sample-root'
  nodes.value = [
    { id: rootId, name: '人工智能', x: cx, y: cy, level: 0, color: getColorByLevel(0) },
    { id: 'sample-1', name: '机器学习', x: cx - 100, y: cy - 50, level: 1, color: getColorByLevel(1) },
    { id: 'sample-2', name: '深度学习', x: cx + 100, y: cy - 50, level: 1, color: getColorByLevel(1) },
    { id: 'sample-3', name: '神经网络', x: cx, y: cy + 100, level: 1, color: getColorByLevel(1) },
    { id: 'sample-1-1', name: '监督学习', x: cx - 150, y: cy - 100, level: 2, color: getColorByLevel(2) },
    { id: 'sample-2-1', name: 'CNN', x: cx + 150, y: cy - 100, level: 2, color: getColorByLevel(2) }
  ]
  
  links.value = [
    { source: rootId, target: 'sample-1' },
    { source: rootId, target: 'sample-2' },
    { source: rootId, target: 'sample-3' },
    { source: 'sample-1', target: 'sample-1-1' },
    { source: 'sample-2', target: 'sample-2-1' }
  ]
}

// 渲染更新
const updateGraph = () => {
  if (!svg || !simulation) return

  const g = svg.select('g')
  if (g.empty()) return

  // 连线
  const link = g.selectAll('.link')
    .data(links.value, (d: any) => `${d.source.id || d.source}-${d.target.id || d.target}`)
    
  link.exit().remove()
  
  const linkEnter = link.enter().insert('line', '.node') // 保证线在节点下方
    .attr('class', 'link')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .attr('stroke-width', 2)

  // 节点
  const node = g.selectAll('.node')
    .data(nodes.value, (d: any) => d.id)

  node.exit().remove()

  const nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended) as any)
    .on('click', handleNodeClick)

  // 节点圆形
  nodeEnter.append('circle')
    .attr('r', 30)
    .attr('fill', (d: any) => d.color || getColorByLevel(d.level || 0)) 
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))')

  // 节点文字
  nodeEnter.append('text')
    .text((d: any) => d.name)
    .attr('x', 0)
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('fill', '#fff')
    .attr('pointer-events', 'none')
    .style('font-weight', 'bold')

  // 重启模拟
  simulation.nodes(nodes.value)
  const linkForce = simulation.force('link') as d3.ForceLink<any, any>
  linkForce.links(links.value)
  simulation.alpha(1).restart()
}

// 每一帧更新位置
const ticked = () => {
  if (!svg) return
  
  const g = svg.select('g')
  
  g.selectAll('.link')
    .attr('x1', (d: any) => d.source.x)
    .attr('y1', (d: any) => d.source.y)
    .attr('x2', (d: any) => d.target.x)
    .attr('y2', (d: any) => d.target.y)

  g.selectAll('.node')
    .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
}

// 拖拽处理
const dragstarted = (event: any, d: any) => {
  if (!event.active) simulation?.alphaTarget(0.3).restart()
  d.fx = d.x
  d.fy = d.y
}

const dragged = (event: any, d: any) => {
  d.fx = event.x
  d.fy = event.y
}

const dragended = (event: any, d: any) => {
  if (!event.active) simulation?.alphaTarget(0)
  d.fx = null
  d.fy = null
}

// 创建初始节点
const addInitialNode = () => {
  if (!initialNodeText.value.trim()) return
  
  const width = graphContainer.value?.clientWidth || 800
  const height = graphContainer.value?.clientHeight || 600

  const newNode = {
    id: Date.now().toString(),
    name: initialNodeText.value,
    x: width / 2,
    y: height / 2,
    level: 0,
    color: getColorByLevel(0)
  }
  
  nodes.value.push(newNode)
  updateGraph()
  initialNodeText.value = ''
}

// 点击节点生成子节点
const handleNodeClick = async (event: any, d: any) => {
  // 简单的防抖或状态检查可以加在这里
  
  try {
    // 获取已存在的节点名称列表，避免重复
    const existingNames = nodes.value.map((n: any) => n.name).join('、')
    const prompt = `请生成一个与"${d.name}"最相关的关键词，要求不能与这些词重复：[${existingNames}]。只返回这一个关键词，不要包含任何标点符号或其他解释。`
    
    const { data }: any = await request.post('/ai/chatFirstPageAi', {
       messages: [{ role: 'user', content: prompt }],
       validateId: validateId.value
    })
    
    const keyword = data?.content?.trim().replace(/[。.]/g, '') || 'New Node'
    
    // 检查是否已存在（可选）
    
    const newNode = {
      id: Date.now().toString(),
      name: keyword,
      x: d.x + (Math.random() - 0.5) * 50,
      y: d.y + (Math.random() - 0.5) * 50,
      level: (d.level || 0) + 1,
      color: getColorByLevel((d.level || 0) + 1)
    }
    
    nodes.value.push(newNode)
    links.value.push({ source: d.id, target: newNode.id })
    updateGraph()
    
  } catch (e) {
    console.error('生成关键词失败:', e)
    alert('生成失败，请检查网络或配置')
  }
}

// 监听握手状态，关闭后初始化图谱
watch(showHandshakeDialog, (val) => {
  if (!val) {
    setTimeout(() => {
      initGraph()
    }, 100)
  }
})

// 窗口大小改变时重置
const handleResize = () => {
  initGraph()
  updateGraph()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  // 如果没有握手弹窗（开发测试用），直接初始化
  if (!showHandshakeDialog.value) {
    setTimeout(initGraph, 100)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  simulation?.stop()
})
</script>

<style scoped lang="less">
.knowledge-container {
  width: 100%;
  height: calc(100vh - 100px); /* 减去导航栏高度 */
  position: relative;
  background: var(--bg-color, #fff);
  overflow: hidden;
}

/* 握手弹窗样式 (复用 chatOnce 风格) */
.handshake-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.handshake-box {
  background: var(--card-bg, #fff);
  padding: 32px;
  border-radius: 16px;
  width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  h3 {
    margin: 0 0 8px;
    font-size: 20px;
    color: var(--text-main, #333);
    text-align: center;
  }
  
  .desc {
    margin: 0 0 24px;
    color: var(--text-secondary, #666);
    text-align: center;
    font-size: 14px;
  }
}

.input-group {
  margin-bottom: 24px;
  
  input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 8px;
    outline: none;
    transition: all 0.3s;
    
    &:focus {
      border-color: var(--primary-color, #10b981);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
  }
  
  .error {
    color: #ef4444;
    font-size: 12px;
    margin-top: 6px;
  }
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  
  button {
    padding: 8px 20px;
    border-radius: 8px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: var(--bg-color-hover, #f3f4f6);
    }
    
    &.confirm-btn {
      background: var(--primary-color, #10b981);
      color: #fff;
      border-color: var(--primary-color, #10b981);
      
      &:hover {
        opacity: 0.9;
      }
    }
  }
}

/* 主内容区 */
.main-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.control-panel {
  padding: 16px 24px;
  background: var(--card-bg, #fff);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  z-index: 10;
  
  .input-wrapper {
    display: flex;
    gap: 12px;
  }
  
  .node-input {
    padding: 8px 16px;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 20px;
    width: 240px;
    outline: none;
    
    &:focus {
      border-color: var(--primary-color, #10b981);
    }
  }
  
  .create-btn {
    padding: 8px 20px;
    background: var(--primary-color, #10b981);
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.1s;
    
    &:hover {
      background: var(--primary-hover, #059669);
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
  
  .tips {
    color: var(--text-secondary, #6b7280);
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
}

.graph-wrapper {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  
  /* 确保 SVG 容器占满 */
  :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
