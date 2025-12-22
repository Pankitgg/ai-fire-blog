<template>
  <div class="blog-types">
    <div
      class="prev-btn"
      @mousedown="scrollLeft"
      @mouseup="stopScroll"
      @mouseleave="stopScroll"
    >
      <i class="iconfont icon-arrow_left"></i>
    </div>
    <div
      class="next-btn"
      @mousedown="scrollRight"
      @mouseup="stopScroll"
      @mouseleave="stopScroll"
    >
      <i class="iconfont icon-arrow_right"></i>
    </div>
    <div id="tab">
      <div
        v-for="item in props.typeList"
        :key="item.id"
        class="item"
        :class="{ active: item.id === props.activeType }"
        @click="checkType(item.id)"
      >
        <i
          class="iconfont"
          :class="item.font"
          :style="{ color: item.id === props.activeType ? '#fff' : (item.color || 'var(--primary-color)') }"
        ></i>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  activeType: number
  typeList: any[]
}>()
let timer: any = null
const stopScroll = () => {
  clearInterval(timer)
}
const scrollLeft = () => {
  stopScroll()
  timer = setInterval(() => {
    document.getElementById('tab')!.scrollLeft -= 10
  }, 100)
}
const scrollRight = () => {
  stopScroll()
  timer = setInterval(() => {
    document.getElementById('tab')!.scrollLeft += 10
  }, 100)
}
const activeType = ref(props.activeType)
const emit = defineEmits(['changeActiveType'])
const checkType = (id: number) => {
  activeType.value = id
  emit('changeActiveType', id)
}
</script>

<style lang="less" scoped>
.blog-types {
  width: 100%;
  position: relative;
  background: var(--bg-color); /* Match body bg */
  padding: 16px 0;
  margin-bottom: 24px;
  
  /* Buttons */
  .prev-btn, .next-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 32px;
    height: 32px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    transition: all 0.3s;
    color: var(--text-secondary);
    
    &:hover {
      background: var(--primary-color);
      color: #fff;
    }
  }
  
  .prev-btn { left: 0; }
  .next-btn { right: 0; }
}

#tab {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 60px; /* increased height */
  align-items: center;
  padding: 0 40px; /* Space for buttons */
  gap: 12px;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  .item {
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 500;
    color: var(--text-secondary);
    padding: 8px 20px;
    height: 40px;
    border-radius: 9999px; /* Pill shape */
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fff;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
    
    .iconfont {
      margin-right: 8px;
      font-size: 18px;
      transition: color 0.3s;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    
    &.active {
      background: var(--primary-color);
      color: #fff;
      border-color: var(--primary-color);
      box-shadow: var(--shadow-md);
      
      .iconfont {
        color: #fff !important; /* Force white icon when active */
      }
    }
  }
}
</style>
