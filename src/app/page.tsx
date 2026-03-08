// src/app/page.tsx
import { getPosts } from "../lib/blogger";
export const runtime = 'edge'; // Phải có 'export const' ở đầu dòng này

export default async function Home() {
  const data = await getPosts(12); // Lấy 12 bài để chia hết cho 3 cột
  const posts = data.items || [];

  return (
    <div className="space-y-10">
      {/* Banner chào mừng */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative group">
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-2">
            Blog Chém Gió <span className="text-[#ff7a18]">Chứng Khoán</span>
          </h2>
          <p className="text-gray-500 text-xs md:text-sm max-w-md">
            Chia sẻ thực tế từ góc nhìn F0.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-10 -mt-10"></div>
      </div>

      {/* Tiêu đề danh sách */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-1.5 bg-[#ff7a18] rounded-full"></div>
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Mới cập nhật</h2>
      </div>

      {/* Grid 3 cột bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post: any) => {
          const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
          const firstImg = imgMatch ? imgMatch[1] : "https://via.placeholder.com/400x250?text=Blog+Chemgio";

          const cleanText = post.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
          const excerpt = cleanText.substring(0, 130) + "...";

          return (
            <a 
              href={`/post/${post.id}`} 
              key={post.id} 
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl flex flex-col h-full"
            >
              {/* Ảnh đại diện - Chiều cao thấp hơn một chút (h-40) để card không quá dài */}
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={firstImg} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[9px] uppercase tracking-widest text-white font-bold px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
                    {post.labels?.[0] || 'F0'}
                  </span>
                </div>
              </div>

              {/* Nội dung */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-sm font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#ff7a18] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-3 mb-5 italic">
                  {excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-medium italic">
                    {new Date(post.published).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="text-[10px] font-black text-[#ff7a18] tracking-widest group-hover:translate-x-1 transition-transform">
                    XEM NGAY →
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}