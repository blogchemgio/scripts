// src/lib/blogger.ts

const API_KEY = process.env.BLOGGER_API_KEY;
const BLOG_ID = process.env.BLOG_ID;

// Hàm lấy danh sách nhiều bài (dùng cho trang chủ)
export async function getPosts(maxResults = 9) {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${maxResults}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return { items: [] };
  return res.json();
}

// HÀM MỚI: Lấy chi tiết 1 bài duy nhất (dùng cho trang [id])
export async function getPostById(postId: string) {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}?key=${API_KEY}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    console.error("Lỗi API Blogger khi lấy bài viết:", postId);
    return null;
  }
  return res.json();
}