import type { Metadata } from "next";
import { Quicksand } from "next/font/google"; // 1. Import font
import "./globals.css";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

// 2. Khởi tạo font Quicksand
const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand", // Biến này sẽ được dùng trong className
});

export const metadata: Metadata = {
  title: "Blog Chém Gió - Kiến thức F0",
  description: "Chia sẻ kiến thức chứng khoán phong cách chém gió",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      {/* 3. Sử dụng quicksand.variable ở đây */}
      <body className={`${quicksand.variable} font-sans antialiased bg-[#f9fafb]`}>
        
        {/* Header của bạn - Hãy đảm bảo code Header đầy đủ nội dung */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
           <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              <a href="/" className="text-2xl font-black text-[#ff7a18]">BLOG CHÉM GIÓ</a>
           </div>
        </header>

        <div className="max-w-[1440px] mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* CỘT TRÁI: 3 CỘT BÀI VIẾT */}
            <main className="lg:w-[78%] w-full">
              {children}
            </main>

            {/* CỘT PHẢI: SIDEBAR */}
            <aside className="lg:w-[22%] w-full">
              <Sidebar />
            </aside>

          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}