import { getPosts } from "@/lib/blogger";
export const runtime = 'edge';
export default async function LabelPage({ params }: { params: { slug: string } }) {
  // Giải mã slug từ URL (ví dụ: chung-khoan)
  const slug = params.slug;
  
  // Lấy dữ liệu (Lưu ý: Bạn có thể cần chỉnh hàm getPosts để lọc theo nhãn)
  const data = await getPosts(20); 
  const allPosts = data.items || [];

  // Logic lọc bài viết có nhãn trùng với slug (tạm thời lọc theo text gần đúng)
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post: any) => (
           // Tái sử dụng giao diện card bài viết của bạn ở đây
           <div key={post.id} className="..."> 
              {/* Copy code Card bài viết từ trang chủ vào đây */}
           </div>
        ))}
      </div>
    </main>
  );
}