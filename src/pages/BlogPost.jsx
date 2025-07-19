import { useParams } from 'react-router-dom'

// Placeholder data for individual blog posts
const blogPostsData = {
  'getting-started-with-react': {
    title: 'Getting Started with React and Vite',
    content: `
      React is a powerful library for building user interfaces. Vite helps to set up a modern development environment easily.
      This post guides you through the initial steps to set up a React project with Vite, including installation and building your first component.
    `,
    date: '2024-07-15',
    readTime: '5 min read',
    author: 'Jane Doe'
  },
  'tailwind-css-best-practices': {
    title: 'Tailwind CSS Best Practices for Modern Web Development',
    content: `
      Tailwind CSS is a utility-first framework that allows you to build custom designs without leaving your HTML.
      Learn essential tips, from structuring your styles to optimizing for production.
    `,
    date: '2024-07-12',
    readTime: '8 min read',
    author: 'John Smith'
  },
  'deploying-to-s3': {
    title: 'Deploying Static Sites to AWS S3',
    content: `
      Hosting a static site on AWS S3 is cost-effective and scalable. This comprehensive guide covers everything from 
      setting up your S3 bucket to configuring CloudFront for a CDN-backed deployment.
    `,
    date: '2024-07-10',
    readTime: '12 min read',
    author: 'Emily Davis'
  }
}

const BlogPost = () => {
  const { slug } = useParams()
  const post = blogPostsData[slug]

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <h1 className="text-3xl font-bold text-gray-900">Post Not Found</h1>
        <p className="text-gray-600 mt-4">Sorry, the blog post you are looking for does not exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        <span className="mx-2">•</span>
        <span>{post.readTime}</span>
        <span className="mx-2">•</span>
        <span>By {post.author}</span>
      </div>

      <div className="prose prose-lg text-gray-800">{post.content}</div>
    </div>
  )
}

export default BlogPost

