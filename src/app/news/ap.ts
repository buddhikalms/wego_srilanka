export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  seo: {
    title: string | null;
    description: string | null;
    keywords: string | null;
  };
  publishedAt: string;
  categories: Array<{ id: string; name: string; slug: string }>;
  tags: Array<{ id: string; name: string; slug: string }>;
}

export interface PostsResponse {
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const CMS_API_URL = "http://localhost:3000/api/public";
const API_KEY = "sk_fxOuWzHbPXPedx8qIhNvHingef50tr7HM5wdFW2sxNVxQqAB";

export async function getPosts(options?: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
}): Promise<PostsResponse> {
  const params = new URLSearchParams();

  if (options?.page) params.append("page", options.page.toString());
  if (options?.limit) params.append("limit", options.limit.toString());
  if (options?.category) params.append("category", options.category);
  if (options?.tag) params.append("tag", options.tag);
  if (options?.search) params.append("search", options.search);

  const headers: HeadersInit = {};
  if (API_KEY) {
    headers["x-api-key"] = API_KEY;
  }

  try {
    const response = await fetch(`${CMS_API_URL}/posts?${params}`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(`API returned ${response.status}: Failed to fetch posts`);
      return {
        data: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      };
    }

    const json = await response.json();
    const baseUrl = CMS_API_URL.split("/api")[0];

    if (json.data) {
      json.data = json.data.map((post: Post) => ({
        ...post,
        featuredImage: post.featuredImage
          ? post.featuredImage.startsWith("http")
            ? post.featuredImage
            : `${baseUrl}${post.featuredImage.startsWith("/") ? "" : "/"}${post.featuredImage}`
          : null,
      }));
    }
    return json;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return {
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const headers: HeadersInit = {};

  if (API_KEY) {
    headers["x-api-key"] = API_KEY;
  }

  try {
    const response = await fetch(
      `${CMS_API_URL}/posts/${encodeURIComponent(slug)}`,
      {
        headers,
        cache: "no-store",
      },
    );

    if (response.ok) {
      const json = await response.json();

      if (json.data) {
        const baseUrl = CMS_API_URL.split("/api")[0];

        // Handle case where API returns a list (array) instead of single object
        if (Array.isArray(json.data)) {
          const found = json.data.find((p: any) => p.slug === slug);
          if (found) {
            if (
              found.featuredImage &&
              !found.featuredImage.startsWith("http")
            ) {
              found.featuredImage = `${baseUrl}${found.featuredImage.startsWith("/") ? "" : "/"}${found.featuredImage}`;
            }
            return found;
          }
        } else {
          // Single object returned. Trust the API response.
          if (
            json.data.featuredImage &&
            !json.data.featuredImage.startsWith("http")
          ) {
            json.data.featuredImage = `${baseUrl}${json.data.featuredImage.startsWith("/") ? "" : "/"}${json.data.featuredImage}`;
          }
          return json.data;
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }

  return null;
}
