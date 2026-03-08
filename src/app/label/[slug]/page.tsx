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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {filteredPosts.map((post: any) => (
           <div key={post.id} className="border p-6 rounded-3xl shadow-sm"> 
              <h2 className="font-bold text-xl">{post.title}</h2>
              <a href={`/post/${post.id}`} className="text-[#ff7a18] mt-4 inline-block">Đọc tiếp →</a>
           </div>
        ))}
      </div>
    </main>
  );
}

// HÀM QUAN TRỌNG NHẤT ĐỂ SỬA LỖI BUILD:
export async function generateStaticParams() {
  try {
    const data = await getPosts(50);
    const posts = data.items || [];
    
    // Lấy tất cả label từ các bài viết, làm sạch và tạo danh sách slug
    const labels = new Set<string>();
    posts.forEach((post: any) => {
      post.labels?.forEach((l: string) => {
        labels.add(l.toLowerCase().replace(/\s+/g, '-'));
      });
    });

    // Nếu không có label nào, trả về mảng rỗng để không bị crash
    if (labels.size === 0) return [];

    return Array.from(labels).map((label) => ({
      slug: label,
    }));
  } catch (e) {
    return [];
  }
}