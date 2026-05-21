'use client';

import { FormEvent, useEffect, useState } from 'react';

type Post = {
  _id: string;
  caption: string;
  mediaUrl: string;
  createdAt: string;
};

const isVideo = (url: string) => /\.(mp4|webm|mov|mkv|avi)$/i.test(url);

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    const res = await fetch('/api/posts', { cache: 'no-store' });
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError('');

    try {
      const form = new FormData();
      form.append('file', file);

      const uploadRes = await fetch('/api/upload', { method: 'POST', body: form });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');

      const postRes = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, mediaUrl: uploadData.url })
      });

      const postData = await postRes.json();
      if (!postRes.ok) throw new Error(postData.error || 'Post failed');

      setCaption('');
      setFile(null);
      const input = document.getElementById('file-input') as HTMLInputElement | null;
      if (input) input.value = '';
      await loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>CJP SOCIAL</h1>
      <p className="subtitle">iOS-style sharing. Upload to Catbox, store in MongoDB, show on your feed.</p>

      <form onSubmit={onSubmit} className="card composer">
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          maxLength={280}
        />
        <input id="file-input" type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button disabled={loading || !file} type="submit">{loading ? 'Posting...' : 'Post'}</button>
        {error ? <p className="error">{error}</p> : null}
      </form>

      <section className="feed">
        {posts.map((post) => (
          <article key={post._id} className="card post">
            {isVideo(post.mediaUrl) ? (
              <video src={post.mediaUrl} controls preload="metadata" />
            ) : (
              <img src={post.mediaUrl} alt={post.caption || 'CJP Social post'} loading="lazy" />
            )}
            {post.caption ? <p>{post.caption}</p> : null}
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </article>
        ))}
      </section>
    </main>
  );
}
