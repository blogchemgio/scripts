// src/app/label/[slug]/page.tsx
import { getPosts } from "@/lib/blogger";

export const dynamic = 'force-static';
export const dynamicParams = false; 

export default async function LabelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {filteredPosts.map((post: any) => (
             <div key={post.id} className="border p-6 rounded-3xl shadow-sm hover:shadow-md transition-all"> 
                <h2 className="font-bold text-xl text-gray-900">{post.title}</h2>
                <a href={`/post/${post.id}`} className="text-[#ff7a18] font-bold mt-4 inline-block hover:underline">
                  Đọc tiếp →
                </a>
             </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-gray-500 italic">Chưa có bài viết nào trong mục này.</p>
      )}
    </main>
  );
}

/**
 * HÀM QUAN TRỌNG ĐỂ SỬA LỖI BUILD
 * Sử dụng chiến thuật "slug ảo" để tránh lỗi 'missing generateStaticParams'
 */
export async function generateStaticParams() {
  const BLOG_ID = process.env.NEXT_PUBLIC_BLOGGER_BLOG_ID;
  const API_KEY = process.env.NEXT_PUBLIC_BLOGGER_API_KEY;

  // Nếu thiếu biến môi trường, trả về một slug mặc định để vượt qua kiểm tra Build
  if (!BLOG_ID || !API_KEY) {
    console.error("⚠️ LabelPage: Biến môi trường chưa được nạp.");
    return [{ slug: 'general' }]; 
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

    // Nếu không có label nào từ API, vẫn trả về 1 slug ảo để không bị crash Build
    if (labels.size === 0) {
      return [{ slug: 'general' }];
    }

    return Array.from(labels).map((label) => ({
      slug: label,
    }));
  } catch (e) {
    console.error("❌ Lỗi trong quá trình lấy nhãn:", e);
    return [{ slug: 'general' }];
  }
}