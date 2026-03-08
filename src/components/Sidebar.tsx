// src/components/Sidebar.tsx
import LabelCloud from "./LabelCloud";

export default function Sidebar() {
  return (
    <div className="lg:sticky lg:top-24 space-y-8">
      {/* Widget 1: Profile */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-[#ff7a18] to-orange-300 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-200">
          F0
        </div>
        <h3 className="font-bold text-gray-800 text-lg">Admin Chém Gió</h3>
        <p className="text-gray-500 text-xs mt-2 italic">
          "kể chuyện F0 đi buôn chứng khoán. Chia sẻ những bài học thực tế nhất."
        </p>
      </div>

      {/* Widget 2: Nhãn (LabelCloud) */}
      <LabelCloud />

      {/* Widget 3: Newsletter */}
      <div className="bg-[#111827] p-6 rounded-2xl shadow-xl relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="font-bold text-white mb-2 text-sm">Đăng ký nhận tin</h3>
          <input 
            type="email" 
            placeholder="Email..." 
            className="w-full bg-gray-800 border-none rounded-lg p-3 text-white text-xs mb-3" 
          />
          <button className="w-full bg-[#ff7a18] text-white py-2 rounded-lg text-xs font-bold">
            GỬI NGAY
          </button>
        </div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#ff7a18] opacity-20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}