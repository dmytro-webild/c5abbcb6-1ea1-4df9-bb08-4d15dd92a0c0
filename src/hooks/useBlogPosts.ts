"use client";

import { useEffect, useState } from "react";
import { BlogPost, defaultPosts, fetchBlogPosts } from "@/lib/api/blog";

export function useBlogPosts() {
    const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadPosts() {
            try {
                const data = await fetchBlogPosts();
                if (isMounted) {
                    setPosts(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error("Failed to fetch posts"));
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadPosts();

        return () => {
            isMounted = false;
        };
    }, []);

    return { posts, isLoading, error };
}
