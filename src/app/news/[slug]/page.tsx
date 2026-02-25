import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "../api";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  //   console.log("Post metadata:", post);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.seo.title || post.title} - Ceylon Travels`,
    description: post.seo.description || post.excerpt,
    keywords: post.seo.keywords,
  };
}

export async function generateStaticParams() {
  const { data: posts } = await getPosts({ limit: 100 });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function SingleNewsPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* Header */}
      <div className="bg-gray-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            {post.categories.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 bg-[#004b9d] rounded-full text-xs font-bold uppercase tracking-wider"
              >
                {cat.name}
              </span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-gray-300 text-sm md:text-base">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-lg prose-amber max-w-none">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="text-lg text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Related Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-default"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
