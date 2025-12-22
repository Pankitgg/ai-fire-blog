export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  description: string;
  route: string;
  themeColor: string;
  author?: string;
}

export const recommendedBooks: Book[] = [
  {
    id: 'rysh',
    title: '人月神话',
    subtitle: 'The Mythical Man-Month',
    author: 'Frederick P. Brooks Jr.',
    coverImage: 'https://blog.ai-nous.com/images/books/2f683f9b86c0593f8aa92db63345bf42.webp',
    description: '软件工程的圣经，深刻洞察软件开发中的核心问题：人力、进度与复杂性。',
    route: '/book/books/rysh',
    themeColor: '#2c3e50'
  }
]
