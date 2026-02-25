import Link from "next/link";
import { HeroSection, SectionTitle } from "@/components/Components";
import { getPosts } from "./api";

export const metadata = {
  title: "News & Updates - Ceylon Travels",
  description: "Latest news, travel updates, and stories from Sri Lanka.",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { data: posts, pagination } = await getPosts({ page, limit: 9 });

  return (
    <div>
      <HeroSection
        title="News & Updates"
        subtitle="Stay informed with the latest stories from Sri Lanka"
        image="https://images.unsplash.com/photo-1546708773-e52953b720a7?w=1600&auto=format&fit=crop"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Latest Stories"
            subtitle="Discover what's happening in the Pearl of the Indian Ocean"
          />

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        {post.categories[0] && (
                          <span className="px-3 py-1 bg-[#004b9d] text-white text-xs font-bold rounded-full">
                            {post.categories[0].name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-sm text-gray-500 mb-3">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-[#002967] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="text-[#002967] font-medium text-sm flex items-center mt-auto">
                        Read Article
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No news articles found at the moment.
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <Link
                  key={p}
                  href={`/news?page=${p}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                    p === pagination.page
                      ? "bg-[#004b9d] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
