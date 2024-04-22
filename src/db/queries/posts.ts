import { db } from "@/db";

import type { Post } from "@prisma/client";

export type PostWithData = Post & {
    topic: { slug: string };
    user: { name: string | null };
    _count: { comments: number };
};

// ** Another way to type out PostWithData **
// export type PostWithData = Awaited<
//     ReturnType<typeof fetchPostsByTopicSlug>
// >[number];

export function fetchPostsByTopicSlug(slug: string) {
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
    });
}
