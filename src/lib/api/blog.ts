export type BlogPost = {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    imageSrc: string;
    imageAlt?: string;
    authorName: string;
    authorAvatar: string;
    date: string;
    onBlogClick?: () => void;
};

export const defaultPosts: BlogPost[] = [
    {
        id: "1",
        category: "Design",
        title: "UX review presentations",
        excerpt: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        imageSrc: "/placeholders/placeholder3.avif",
        imageAlt: "Abstract design with purple and silver tones",
        authorName: "Olivia Rhye",
        authorAvatar: "/placeholders/placeholder3.avif",
        date: "20 Jan 2025",
    },
    {
        id: "2",
        category: "Development",
        title: "Building scalable applications",
        excerpt: "Learn the best practices for building applications that can handle millions of users.",
        imageSrc: "/placeholders/placeholder4.webp",
        imageAlt: "Development workspace",
        authorName: "John Smith",
        authorAvatar: "/placeholders/placeholder4.webp",
        date: "18 Jan 2025",
    },
    {
        id: "3",
        category: "Marketing",
        title: "Content strategy essentials",
        excerpt: "Discover how to create a content strategy that drives engagement and conversions.",
        imageSrc: "/placeholders/placeholder3.avif",
        imageAlt: "Marketing strategy board",
        authorName: "Sarah Johnson",
        authorAvatar: "/placeholders/placeholder3.avif",
        date: "15 Jan 2025",
    },
    {
        id: "4",
        category: "Product",
        title: "Product management 101",
        excerpt: "Everything you need to know to become an effective product manager in 2025.",
        imageSrc: "/placeholders/placeholder4.webp",
        imageAlt: "Product planning session",
        authorName: "Mike Davis",
        authorAvatar: "/placeholders/placeholder4.webp",
        date: "12 Jan 2025",
    },
];

export async function fetchBlogPosts(): Promise<BlogPost[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

    if (!apiUrl || !projectId) {
        console.warn("NEXT_PUBLIC_API_URL or NEXT_PUBLIC_PROJECT_ID not configured");
        return [];
    }

    try {
        const url = `${apiUrl}/posts/${projectId}?status=published`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.warn(`API request failed with status ${response.status}`);
            return [];
        }

        const resp = await response.json();
        const data = resp.data;

        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }

        return data.map((post: any) => ({
            id: post.id || String(Math.random()),
            category: post.category || "General",
            title: post.title || "Untitled",
            excerpt: post.excerpt || post.content?.slice(0, 30) || "",
            imageSrc: post.imageUrl || "/placeholders/placeholder3.avif",
            imageAlt: post.imageAlt || post.title || "",
            authorName: post.author?.name || "Anonymous",
            authorAvatar: post.author?.avatar || "/placeholders/placeholder3.avif",
            date: post.date || post.createdAt || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        }));
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}
