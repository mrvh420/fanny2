'use client'

import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [posts, setPosts] = useState([])
  const [pages, setPages] = useState([])

  useEffect(() => {
    // In a real setup, you'd fetch content from your CMS
    setPosts([
      { title: 'Hello World', date: '2024-01-15', path: 'content/posts/hello-world.md' }
    ])
    setPages([
      { title: 'About Us', path: 'content/pages/about.md' }
    ])
  }, [])

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ marginBottom: '2rem', color: '#333' }}>Content Management</h1>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#666' }}>Posts</h2>
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          padding: '1rem'
        }}>
          {posts.map((post, index) => (
            <div key={index} style={{
              padding: '1rem',
              border: '1px solid #eee',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, color: '#333' }}>{post.title}</h3>
                <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                  {post.date} • {post.path}
                </p>
              </div>
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007acc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#666' }}>Pages</h2>
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          padding: '1rem'
        }}>
          {pages.map((page, index) => (
            <div key={index} style={{
              padding: '1rem',
              border: '1px solid #eee',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, color: '#333' }}>{page.title}</h3>
                <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                  {page.path}
                </p>
              </div>
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007acc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#666', marginBottom: '1rem' }}>Tina Cloud Setup</h3>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          For full CMS functionality, you need to set up Tina Cloud:
        </p>
        <ol style={{ textAlign: 'left', color: '#666', maxWidth: '500px', margin: '0 auto' }}>
          <li>Go to <a href="https://tina.io" target="_blank" rel="noopener noreferrer">tina.io</a></li>
          <li>Create a free account</li>
          <li>Connect your repository</li>
          <li>Get your clientId and token</li>
          <li>Add them to your .env file</li>
        </ol>
      </div>
    </div>
  )
} 