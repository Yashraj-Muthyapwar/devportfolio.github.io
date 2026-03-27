/* ═══════════════════════════════════════════════════════════════
   Page Transitions & Blog System
   Smooth page transitions and markdown blog support
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ─── Page Transitions ──────────────────────────────────────────

  // Add transition overlay
  const transitionOverlay = document.createElement('div');
  transitionOverlay.className = 'page-transition-overlay';
  transitionOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(transitionOverlay);

  // Handle internal navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');

    if (!link) return;
    if (link.hostname !== window.location.hostname) return;
    if (link.target === '_blank') return;
    if (link.href.includes('#')) return;

    e.preventDefault();
    const targetUrl = link.href;

    // Show transition
    transitionOverlay.style.opacity = '1';

    // Navigate after transition
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 300);
  });

  // Hide overlay on page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      transitionOverlay.style.opacity = '0';
    }, 100);
  });

  // ─── Blog System ───────────────────────────────────────────────

  window.BlogSystem = {
    // Blog posts data (would typically come from markdown files)
    posts: [
      {
        id: 'understanding-microservices',
        title: 'Understanding Microservices Architecture',
        date: '2024-03-15',
        author: 'Alice Johnson',
        excerpt: 'A deep dive into microservices patterns, when to use them, and common pitfalls to avoid.',
        tags: ['Architecture', 'Microservices', 'Backend'],
        readTime: '8 min read',
        content: `
          <p>Microservices have become the de facto architecture for modern applications, but they're not without their challenges...</p>
          <h2>What Are Microservices?</h2>
          <p>Microservices are an architectural style that structures an application as a collection of loosely coupled services...</p>
          <h2>Benefits</h2>
          <ul>
            <li>Independent deployment</li>
            <li>Technology diversity</li>
            <li>Fault isolation</li>
            <li>Scalability</li>
          </ul>
          <h2>Challenges</h2>
          <p>However, microservices introduce complexity in distributed systems, testing, and deployment...</p>
        `
      },
      {
        id: 'optimizing-react-performance',
        title: 'Optimizing React Performance',
        date: '2024-02-28',
        author: 'Alice Johnson',
        excerpt: 'Practical techniques for improving React application performance, from lazy loading to memoization.',
        tags: ['React', 'Performance', 'Frontend'],
        readTime: '6 min read',
        content: `
          <p>React performance optimization is crucial for delivering great user experiences...</p>
          <h2>Key Optimization Techniques</h2>
          <ul>
            <li>Use React.memo for component memoization</li>
            <li>Implement code splitting with React.lazy</li>
            <li>Optimize re-renders with useMemo and useCallback</li>
            <li>Virtualize long lists</li>
          </ul>
        `
      },
      {
        id: 'database-indexing-strategies',
        title: 'Database Indexing Strategies',
        date: '2024-02-10',
        author: 'Alice Johnson',
        excerpt: 'Learn how to use database indexes effectively to improve query performance.',
        tags: ['Database', 'PostgreSQL', 'Performance'],
        readTime: '10 min read',
        content: `
          <p>Database indexes are critical for query performance, but they come with trade-offs...</p>
          <h2>Types of Indexes</h2>
          <p>B-tree, Hash, GiST, GIN - each has its use case...</p>
        `
      }
    ],

    // Render blog list
    renderBlogList: function(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const postsHTML = this.posts.map(post => `
        <article class="blog-post-card" data-id="${post.id}">
          <div class="blog-post-meta">
            <time datetime="${post.date}">${this.formatDate(post.date)}</time>
            <span class="blog-post-read-time">${post.readTime}</span>
          </div>
          <h3><a href="blog.html?post=${post.id}">${post.title}</a></h3>
          <p class="blog-post-excerpt">${post.excerpt}</p>
          <div class="blog-post-tags">
            ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
          </div>
          <a href="blog.html?post=${post.id}" class="blog-read-more">Read more →</a>
        </article>
      `).join('');

      container.innerHTML = postsHTML;
    },

    // Render single blog post
    renderBlogPost: function(postId, containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const post = this.posts.find(p => p.id === postId);
      if (!post) {
        container.innerHTML = '<p>Post not found.</p>';
        return;
      }

      container.innerHTML = `
        <article class="blog-post-full">
          <header class="blog-post-header">
            <div class="blog-post-meta">
              <time datetime="${post.date}">${this.formatDate(post.date)}</time>
              <span>•</span>
              <span>${post.readTime}</span>
              <span>•</span>
              <span>By ${post.author}</span>
            </div>
            <h1>${post.title}</h1>
            <div class="blog-post-tags">
              ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
          </header>
          <div class="blog-post-content">
            ${post.content}
          </div>
          <footer class="blog-post-footer">
            <a href="blog.html" class="btn-secondary">← Back to Blog</a>
          </footer>
        </article>
      `;
    },

    // Format date
    formatDate: function(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    // Get URL parameter
    getUrlParameter: function(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    },

    // Initialize blog page
    init: function() {
      const postId = this.getUrlParameter('post');

      if (postId) {
        // Single post view
        this.renderBlogPost(postId, 'blog-post-container');
      } else {
        // Blog list view
        this.renderBlogList('blog-posts-list');
      }
    }
  };

  // Auto-initialize if on blog page
  if (window.location.pathname.includes('blog.html')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => window.BlogSystem.init());
    } else {
      window.BlogSystem.init();
    }
  }

})();
