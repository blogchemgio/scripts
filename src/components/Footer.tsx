// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Cột 1: Giới thiệu */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tighter text-[#ff7a18]">
              BLOG CHÉM GIÓ
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nơi chia sẻ kiến thức chứng khoán, tài chính cá nhân và những câu chuyện đời thường của một F0.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h4 className="font-bold mb-6 text-gray-200 uppercase tracking-widest text-xs">Khám phá</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/" className="hover:text-[#ff7a18] transition-colors">Trang chủ</a></li>
              <li><a href="#" className="hover:text-[#ff7a18] transition-colors">Về tác giả</a></li>
            </ul>
          </div>

          {/* Cột 3: Kết nối */}
          <div>
            <h4 className="font-bold mb-6 text-gray-200 uppercase tracking-widest text-xs">Kết nối</h4>
            <p className="text-xs text-gray-500">Email: contact@blogchemgio.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Blog Chém Gió. Powered by Next.js.</p>
        </div>
      </div>
    </footer>
  );
}