import Article from '@/components/pages/news/article'

const NewsArticlePage = ({ params }: { params: { id: string } }) => {
  return (
    <Article id={params.id} />
  )
}

export default NewsArticlePage
