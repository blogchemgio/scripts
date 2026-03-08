// src/app/label/[slug]/page.tsx
import { getPosts } from "@/lib/blogger";

export const dynamic = 'force-static';
export const dynamicParams = false; 

export default async function LabelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Lưu ý: Hàm getPosts này sẽ sử dụng API_KEY từ file lib/blogger.ts
  const data = await getPosts(50); 
  const allPosts = data.items || [];

  const filteredPosts = allPosts.filter((post: any) => 
    post.labels?.some((l: string) => 
      l.toLowerCase().replace(/\s+/g, '-') === slug
    )
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black capitalize">{slug.replace(/-/g, ' ')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {filteredPosts.map((post: any) => (
           <div key={post.id} className="border p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow"> 
              <h2 className="font-bold text-xl text-gray-900">{post.title}</h2>
              <a href={`/post/${post.id}`} className="text-[#ff7a18] font-bold mt-4 inline-block hover:underline">
                Đọc tiếp →
              </a>
           </div>
        ))}
      </div>
    </main>
  );
}

/**
 * HÀM QUAN TRỌNG ĐỂ SỬA LỖI BUILD:
 * Đảm bảo biến môi trường khả dụng bên trong hàm này
 */
export async function generateStaticParams() {
  const BLOG_ID = process.env.NEXT_PUBLIC_BLOGGER_BLOG_ID;
  const API_KEY = process.env.NEXT_PUBLIC_BLOGGER_API_KEY;

  // Nếu thiếu biến môi trường, bỏ qua việc tạo trang để không làm hỏng quá trình build
  if (!BLOG_ID || !API_KEY) {
    console.error("⚠️ LabelPage: Missing environment variables during build.");
    return [];
  }

  try {
    const data = await getPosts(50);
    const posts = data.items || [];
    
    const labels = new Set<string>();
    posts.forEach((post: any) => {
      post.labels?.forEach((l: string) => {
        labels.add(l.toLowerCase().replace(/\s+/g, '-'));
      });
    });

    if (labels.size === 0) return [];

    return Array.from(labels).map((label) => ({
      slug: label,
    }));
  } catch (e) {
    console.error("❌ LabelPage Error:", e);
    return [];
  }
}