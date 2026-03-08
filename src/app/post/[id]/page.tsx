import { getPostById } from "../../../lib/blogger";
import { notFound } from 'next/navigation';

// Cấu hình bắt buộc cho Cloudflare Pages (Static Export)
export const dynamic = 'force-static';
export const dynamicParams = false; 

// Thông tin Blogger của bạn
const BLOG_ID = process.env.BLOGGER_BLOG_ID;
const API_KEY = process.env.BLOGGER_API_KEY;

/**
 * Hàm lấy danh sách ID bài viết để tạo file HTML tĩnh lúc Build
 */
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&fields=items(id)&maxResults=500`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.warn("⚠️ Không tìm thấy bài viết hoặc API lỗi.");
      return [];
    }

    return data.items.map((post: any) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error("❌ Lỗi Build tại generateStaticParams:", error);
    return [];
  }
}

/**
 * Trang chi tiết bài viết
 */
export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await params theo chuẩn Next.js 15
  const { id } = await params;
  
  // 2. Gọi hàm lấy chi tiết bài viết
  // LƯU Ý: Đảm bảo hàm getPostById bên file lib cũng đang dùng API_KEY này
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto my-10">
      <header className="mb-10">
        <a href="/" className="text-[#ff7a18] text-sm font-bold mb-6 inline-block hover:-translate-x-1 transition-transform">
          ← Quay lại trang chủ
        </a>
        
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center text-gray-400 gap-4 border-b border-gray-100 pb-6">
          <span className="bg-orange-50 text-[#ff7a18] px-4 py-1.5 rounded-full text-xs font-bold">
            📅 {new Date(post.published).toLocaleDateString('vi-VN')}
          </span>
          {post.labels && (
            <div className="flex gap-2">
              {post.labels.map((label: string) => (
                <span key={label} className="text-xs text-gray-500 italic">#{label}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Nội dung bài viết từ Blogger */}
      <div 
        className="prose prose-lg max-w-none prose-orange 
          prose-headings:font-black prose-headings:text-gray-900
          prose-img:mx-auto prose-img:block prose-img:rounded-2xl prose-img:shadow-md
          [&_a]:text-[#ff7a18] [&_a]:font-bold
          [&_div.separator]:flex [&_div.separator]:justify-center 
          [&_div.tr-caption-container]:mx-auto [&_div.tr-caption-container]:text-center"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

      <footer className="mt-16 pt-8 border-t border-gray-100 text-center">
        <p className="text-gray-400 italic text-sm">Cảm ơn bạn đã đọc bài viết tại Blog Chém Gió!</p>
      </footer>
    </article>
  );
}