const BLOG_ID = '8860933158336876517';
const API_KEY = 'AIzaSyBkeq3GH90DX_eehyYRMiGTT72zcoNazsQ';

export async function getPostById(id: string) {
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`
  );
  if (!res.ok) return null;
  return res.json();
}

export async function getPosts(maxResults = 10) {
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${maxResults}`
  );
  return res.json();
}