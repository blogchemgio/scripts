"use client";

import { useEffect, useState } from "react";
import { getPosts } from "../lib/blogger";
import Link from "next/link";

export default function Home() {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // CẤU HÌNH MỚI: 9 bài mỗi trang để tạo 3 hàng x 3 cột
  const postsPerPage = 9; 

  useEffect(() => {
    async function fetchData() {
      try {
        // Tải 27 hoặc 36 bài để chia hết cho 9, giúp có khoảng 3-4 trang đầu cực nhanh
        const data = await getPosts(36); 
        setAllPosts(data.items || []);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Logic phân trang
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const posts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff7a18]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Banner chào mừng */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative group">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">
            Blog Chém Gió <span className="text-[#ff7a18]">Chứng Khoán</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md italic">
            "Chia sẻ thực tế từ góc nhìn F0 - Nơi những con sóng không chỉ là con số."
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
      </div>

      {/* Tiêu đề danh sách */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-6 w-2 bg-[#ff7a18] rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">Mới cập nhật</h2>
        </div>
        <div className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 uppercase tracking-widest">
          Trang {currentPage} / {totalPages}
        </div>
      </div>

      {/* Grid bài viết: 9 bài (3 hàng x 3 cột trên Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post: any) => {
          const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
          const firstImg = imgMatch ? imgMatch[1] : "https://via.placeholder.com/600x400?text=Blog+Chemgio";
          const cleanText = post.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
          const excerpt = cleanText.substring(0, 110) + "...";

          return (
            <Link 
              href={`/post/${post.id}`} 
              key={post.id} 
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <img 
                  src={firstImg} 
                  alt={post.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[9px] font-black px-3 py-1.5 bg-[#ff7a18]/90 text-white backdrop-blur-md rounded-lg">
                    {post.labels?.[0] || 'Phân Tích'}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-md font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#ff7a18] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-3 mb-6 italic">
                  {excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    {new Date(post.published).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="text-[10px] font-black text-[#ff7a18] tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                    ĐỌC TIẾP <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* BỘ PHÂN TRANG */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`min-w-[42px] h-10 flex items-center justify-center rounded-xl text-xs font-black transition-all duration-300 ${
                currentPage === p 
                ? "bg-[#ff7a18] text-white shadow-xl shadow-orange-200 scale-110 border border-[#ff7a18]" 
                : "bg-white border border-gray-100 text-gray-400 hover:border-[#ff7a18] hover:text-[#ff7a18]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}