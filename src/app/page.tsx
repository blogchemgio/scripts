"use client"; // Chuyển sang Client Component

import { useEffect, useState } from "react";
import { getPosts } from "../lib/blogger";
import Link from "next/link";

export default function Home() {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 9;

  useEffect(() => {
    async function fetchData() {
      const data = await getPosts(100); // Lấy danh sách bài viết
      setAllPosts(data.items || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Tính toán phân trang
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const posts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  if (loading) return <div className="text-center py-20">Đang tải bài viết...</div>;

  return (
    <div className="space-y-10">
      {/* Banner & Tiêu đề - Giữ nguyên code UI của bạn */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative group">
         <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-2">
            Blog Chém Gió <span className="text-[#ff7a18]">Chứng Khoán</span>
         </h2>
         <p className="text-gray-500 text-xs">Chia sẻ thực tế từ góc nhìn F0.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post: any) => {
          const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
          const firstImg = imgMatch ? imgMatch[1] : "https://via.placeholder.com/400x250";
          const cleanText = post.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
          
          return (
            <div key={post.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
               {/* Phần hiển thị bài viết giữ nguyên như cũ */}
               <div className="h-40 overflow-hidden relative">
                 <img src={firstImg} className="w-full h-full object-cover" />
               </div>
               <div className="p-5 flex flex-col flex-grow">
                 <h3 className="text-sm font-bold mb-3">{post.title}</h3>
                 <p className="text-gray-500 text-[12px] line-clamp-3 mb-5">{cleanText.substring(0, 130)}...</p>
                 <a href={`/post/${post.id}`} className="mt-auto text-[10px] font-black text-[#ff7a18]">XEM NGAY →</a>
               </div>
            </div>
          );
        })}
      </div>

      {/* BỘ NÚT PHÂN TRANG (Client Side) */}
      <div className="flex justify-center items-center gap-2 pt-10">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
              currentPage === p 
              ? "bg-[#ff7a18] text-white" 
              : "bg-white border border-gray-100 text-gray-600 hover:border-[#ff7a18]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}