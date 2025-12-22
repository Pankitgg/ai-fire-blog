// AI产品库数据结构
export interface AiTool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  logo?: string;
  tags: string[];
  rating?: number;
}

export interface AiCategory {
  id: string;
  name: string;
  icon?: string;
  description: string;
}

// AI工具分类
export const aiCategories: AiCategory[] = [
  {
    id: 'writing',
    name: 'AI写作工具',
    description: 'AI写作、文案生成、论文写作等工具'
  },
  {
    id: 'image',
    name: 'AI图片工具',
    description: 'AI绘画、图片处理、图像生成等工具'
  },
  {
    id: 'video',
    name: 'AI视频工具',
    description: 'AI视频生成、剪辑、数字人等工具'
  },
  {
    id: 'programming',
    name: 'AI编程工具',
    description: 'AI编程助手、代码生成、IDE插件等工具'
  },
  {
    id: 'audio',
    name: 'AI音频工具',
    description: 'AI语音合成、音频处理、音乐生成等工具'
  },
  {
    id: 'office',
    name: 'AI办公工具',
    description: 'AI办公套件、文档处理、数据分析等工具'
  },
  {
    id: 'design',
    name: 'AI设计工具',
    description: 'AI logo设计、UI设计、海报生成等工具'
  },
  {
    id: 'fun',
    name: 'AI趣味工具',
    description: 'AI聊天、AI游戏、AI创作等趣味工具'
  }
];

// AI工具列表
export const aiTools: AiTool[] = [
  // AI写作工具
  {
    id: 'tool-1',
    name: 'ChatGPT',
    description: 'OpenAI开发的强大对话AI，可用于各种文本生成任务',
    category: 'writing',
    url: 'https://chat.openai.com/',
    tags: ['对话AI', '文本生成', '多语言'],
    rating: 4.9
  },
  {
    id: 'tool-2',
    name: '文心一言',
    description: '百度开发的知识增强大语言模型',
    category: 'writing',
    url: 'https://yiyan.baidu.com/',
    tags: ['中文AI', '知识增强', '多模态'],
    rating: 4.7
  },
  {
    id: 'tool-3',
    name: '通义千问',
    description: '阿里巴巴开发的大语言模型，支持多种应用场景',
    category: 'writing',
    url: 'https://tongyi.aliyun.com/',
    tags: ['中文AI', '商业应用', '多模态'],
    rating: 4.6
  },
  
  // AI图片工具
  {
    id: 'tool-4',
    name: 'MidJourney',
    description: '强大的AI绘画工具，可生成高质量的创意图像',
    category: 'image',
    url: 'https://www.midjourney.com/',
    tags: ['AI绘画', '创意设计', '艺术生成'],
    rating: 4.8
  },
  {
    id: 'tool-5',
    name: 'DALL·E 3',
    description: 'OpenAI开发的文本到图像生成模型',
    category: 'image',
    url: 'https://openai.com/dall-e-3',
    tags: ['文生图', '创意设计', '高分辨率'],
    rating: 4.7
  },
  {
    id: 'tool-6',
    name: 'Stable Diffusion',
    description: '开源的文本到图像生成模型，支持自定义训练',
    category: 'image',
    url: 'https://stability.ai/stable-diffusion',
    tags: ['开源', '文生图', '自定义模型'],
    rating: 4.6
  },
  
  // AI视频工具
  {
    id: 'tool-7',
    name: 'Runway ML',
    description: 'AI视频编辑和生成平台，支持多种创意功能',
    category: 'video',
    url: 'https://runwayml.com/',
    tags: ['视频编辑', 'AI生成', '创意工具'],
    rating: 4.5
  },
  {
    id: 'tool-8',
    name: 'Pika Labs',
    description: 'AI视频生成工具，支持文本到视频转换',
    category: 'video',
    url: 'https://pika.art/',
    tags: ['文生视频', '创意视频', 'AI动画'],
    rating: 4.4
  },
  
  // AI编程工具
  {
    id: 'tool-9',
    name: 'GitHub Copilot',
    description: 'AI编程助手，支持代码自动补全和生成',
    category: 'programming',
    url: 'https://github.com/features/copilot',
    tags: ['代码生成', '编程助手', 'IDE集成'],
    rating: 4.7
  },
  {
    id: 'tool-10',
    name: 'Cursor',
    description: 'AI驱动的代码编辑器，内置GPT-4支持',
    category: 'programming',
    url: 'https://cursor.sh/',
    tags: ['代码编辑器', 'AI辅助', '多语言'],
    rating: 4.6
  },
  
  // AI音频工具
  {
    id: 'tool-11',
    name: 'Descript',
    description: 'AI音频编辑和生成平台，支持语音合成和编辑',
    category: 'audio',
    url: 'https://www.descript.com/',
    tags: ['音频编辑', '语音合成', '播客工具'],
    rating: 4.5
  },
  {
    id: 'tool-12',
    name: 'ElevenLabs',
    description: '高质量AI语音合成平台',
    category: 'audio',
    url: 'https://elevenlabs.io/',
    tags: ['语音合成', '多语言', '自然语音'],
    rating: 4.6
  },
  
  // AI办公工具
  {
    id: 'tool-13',
    name: 'Notion AI',
    description: 'AI增强的笔记和协作工具',
    category: 'office',
    url: 'https://www.notion.so/ai',
    tags: ['笔记工具', '协作平台', 'AI辅助'],
    rating: 4.5
  },
  {
    id: 'tool-14',
    name: 'Tome',
    description: 'AI驱动的演示文稿生成工具',
    category: 'office',
    url: 'https://tome.app/',
    tags: ['PPT生成', '演示文稿', 'AI设计'],
    rating: 4.4
  },
  
  // AI设计工具
  {
    id: 'tool-15',
    name: 'Canva AI',
    description: 'AI增强的图形设计平台',
    category: 'design',
    url: 'https://www.canva.com/ai/',
    tags: ['图形设计', '模板生成', 'AI辅助'],
    rating: 4.6
  },
  {
    id: 'tool-16',
    name: 'Figma AI',
    description: 'AI增强的UI/UX设计工具',
    category: 'design',
    url: 'https://www.figma.com/ai/',
    tags: ['UI设计', '协作设计', 'AI辅助'],
    rating: 4.7
  },
  
  // AI趣味工具
  {
    id: 'tool-17',
    name: 'Character.AI',
    description: 'AI角色对话平台，可创建和聊天',
    category: 'fun',
    url: 'https://character.ai/',
    tags: ['AI聊天', '角色对话', '趣味互动'],
    rating: 4.3
  },
  {
    id: 'tool-18',
    name: 'GPTZero',
    description: 'AI文本检测工具，检测内容是否由AI生成',
    category: 'fun',
    url: 'https://gptzero.me/',
    tags: ['AI检测', '文本分析', '教育工具'],
    rating: 4.2
  }
];