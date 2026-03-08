// src/app/label/[slug]/page.tsx
import { getPosts } from "@/lib/blogger";

// CẤU HÌNH QUAN TRỌNG: Ép buộc render tĩnh và không cho phép dynamic path lúc runtime
export const dynamic = 'force-static';
export const dynamicParams = false; 

export default async function LabelPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await params theo chuẩn Next.js 15
  const { slug } = await params;
  
  // 2. Lấy dữ liệu bài viết (tăng số lượng lấy về để đảm bảo lọc đủ bài)
  const data = await getPosts(50); 
  const allPosts = data.items || [];

  // 3. Lọc bài viết theo label (slug)
  const filteredPosts = allPosts.filter((post: any) => 
    post.labels?.some((l: string) => 
      l.toLowerCase().replace(/\s+/g, '-') === slug
    )
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <span className="text-[#ff7a18] font-bold uppercase tracking-widest text-sm">Chủ đề</span>
        <h1 className="text-4xl font-black text-gray-900 mt-2 capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-500 mt-2">Tìm thấy {filteredPosts.length} bài viết liên quan</p>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post: any) => (
             <div key={post.id} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow"> 
                <h2 className="font-bold text-xl text-gray-900 leading-tight mb-4">{post.title}</h2>
                <a 
                  href={`/post/${post.id}`} 
                  className="text-[#ff7a18] font-bold text-sm hover:underline"
                >
                  Đọc tiếp →
                </a>
             </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-gray-400">Không có bài viết nào trong chủ đề này.</p>
          <a href="/" className="text-[#ff7a18] underline mt-4 inline-block">Quay lại trang chủ</a>
        </div>
      )}
    </main>
  );
}

/**
 * BẮT BUỘC PHẢI CÓ CHO OUTPUT: EXPORT
 * Hiện tại trả về mảng rỗng để bypass bước build. 
 * Nếu muốn các trang label có sẵn file HTML, bạn cần fetch danh sách nhãn ở đây.
 */
export async function generateStaticParams() {
  return []; 
}