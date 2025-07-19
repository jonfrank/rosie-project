# Museum in your Classroom

A modern, responsive educational resource platform built with React, Vite, and Tailwind CSS, designed to bring the museum experience into your classroom. Optimized for static deployment to AWS S3.

## Features

- **Modern Stack**: React 18, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Fast Performance**: Optimized builds with code splitting
- **SEO Ready**: Semantic HTML and meta tags
- **S3 Deployment**: Optimized for static hosting on AWS S3

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

- `npm run dev` - Start development server at http://localhost:5173
- `npm run build` - Create production build in `dist/` folder
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment to AWS S3

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist/` folder contains all static assets ready for deployment.

3. Upload the contents of `dist/` to your S3 bucket.

4. Configure S3 bucket for static website hosting:
   - Set index document to `index.html`
   - Set error document to `index.html` (for client-side routing)

5. (Optional) Set up CloudFront CDN for better performance and custom domains.

### S3 Bucket Policy Example

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

## Project Structure

```
Project/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── BlogPost.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Adding New Posts

1. Add post data to `src/pages/Home.jsx` in the `blogPosts` array
2. Add corresponding post content to `src/pages/BlogPost.jsx` in the `blogPostsData` object
3. Use the slug format: `your-post-title` (lowercase, hyphen-separated)

### Styling

- Main styles are in `src/index.css`
- Tailwind configuration is in `tailwind.config.js`
- Custom component styles use Tailwind's `@layer` directive

### SEO and Meta Tags

- Update `index.html` for global meta tags
- Add page-specific meta tags in individual components
- Consider using React Helmet for dynamic meta tags

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project as a starting point for your own blog!
