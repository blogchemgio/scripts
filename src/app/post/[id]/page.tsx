// src/app/post/[id]/page.tsx
import { getPostById } from "../../../lib/blogger";

// Quan trọng: dynamicParams = true không hoạt động với output: export.
// Trong chế độ export tĩnh, Next.js yêu cầu tất cả các path phải có sẵn hoặc xử lý phía client.
// Nhưng để vượt qua bước Build, ta giữ generateStaticParams rỗng.

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await params theo chuẩn Next.js 15
  const { id } = await params;
  const post = await getPostById(id);

  // 2. Xử lý trường hợp không tìm thấy bài viết
  if (!post) {
    return (
      <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-red-500">Lỗi: Không tìm thấy bài viết!</h1>
        <p className="mt-4 text-gray-500">ID bài viết có thể không tồn tại hoặc dữ liệu chưa kịp tải.</p>
        <a href="/" className="mt-6 inline-block text-[#ff7a18] font-bold hover:underline">
          ← Quay về trang chủ
        </a>
      </div>
    );
  }

  return (
    <article className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
      <header className="mb-10">
        <a href="/" className="text-[#ff7a18] text-sm font-bold mb-6 inline-block hover:translate-x-[-5px] transition-transform">
          ← Quay lại trang chủ
        </a>
        
        <h1 className="text-2xl md:text-2xl font-black text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center text-gray-400 gap-4 border-b border-gray-100 pb-6">
          <span className="bg-orange-50 text-[#ff7a18] px-4 py-1.5 rounded-full text-xs font-bold">
            📅 {new Date(post.published).toLocaleDateString('vi-VN')}
          </span>
          {post.labels && (
            <div className="flex gap-2">
              {post.labels.map((label: string) => (
                <span key={label} className="text-xs text-gray-500 underline">#{label}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 4. Nội dung bài viết */}
      <div 
        className="prose prose-lg max-w-none prose-orange 
          prose-headings:font-black prose-headings:text-gray-900
          prose-img:mx-auto prose-img:block prose-img:rounded-2xl prose-img:shadow-lg
          [&_a]:flex [&_a]:justify-center 
          [&_div.separator]:flex [&_div.separator]:justify-center 
          [&_div.tr-caption-container]:mx-auto [&_div.tr-caption-container]:text-center"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

      <footer className="mt-16 pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-400 italic text-sm">Cảm ơn bạn đã theo dõi Blog Chém Gió!</p>
      </footer>
    </article>
  );
}

// SỬA LẠI HÀM NÀY: Thêm async để chuẩn hóa với Next.js 15
export async function generateStaticParams() {
  return [];
}