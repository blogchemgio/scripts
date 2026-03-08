import { getPosts } from "@/lib/blogger";

export default async function LabelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPosts(20); 
  const allPosts = data.items || [];

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
           <div key={post.id} className="border p-4 rounded-lg"> 
              <h2 className="font-bold text-xl">{post.title}</h2>
           </div>
        ))}
      </div>
    </main>
  );
}

// BẮT BUỘC PHẢI CÓ HÀM NÀY NẰM RIÊNG Ở DƯỚI CÙNG
export async function generateStaticParams() {
  return []; 
}