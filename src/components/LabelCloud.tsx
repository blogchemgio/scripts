// src/components/LabelCloud.tsx
export default function LabelCloud() {
  const labels = [
    { name: "Báo cáo tài chính", slug: "bao-cao-tai-chinh", count: 2 },
    { name: "Chứng khoán", slug: "chung-khoan", count: 11 },
    { name: "Đăng ký", slug: "dang-ky", count: 1 },
    { name: "Kiến thức doanh nghiệp", slug: "kien-thuc-doanh-nghiep", count: 3 },
    { name: "Kiến thức F0", slug: "kien-thuc-f0", count: 9 },
    { name: "Kinh nghiệm đầu tư", slug: "kinh-nghiem-dau-tu", count: 1 },
    { name: "Phái sinh", slug: "phai-sinh", count: 1 },
    { name: "Thuật ngữ tài chính", slug: "thuat-ngu-tai-chinh", count: 10 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-black uppercase tracking-widest text-gray-800 mb-5 flex items-center gap-2">
        <span className="w-6 h-0.5 bg-[#ff7a18]"></span> Khám phá chủ đề
      </h3>
      
      <ul className="flex flex-wrap gap-2">
        {labels.map((label) => (
          <li key={label.slug}>
            <a 
              href={`/label/${label.slug}`}
              className="group flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-[#fff0e6] border border-gray-100 hover:border-[#ff7a18] rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="text-[13px] font-semibold text-gray-600 group-hover:text-[#ff7a18]">
                {label.name}
              </span>
              <span className="text-[10px] font-bold bg-gray-200 group-hover:bg-[#ff7a18] text-gray-400 group-hover:text-white px-2 py-0.5 rounded-full transition-colors">
                {label.count}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}