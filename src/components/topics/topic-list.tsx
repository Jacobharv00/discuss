import Link from "next/link";

import { db } from "@/db";
import paths from "@/paths";
import Chip from "../common/chip";

export default async function TopicList() {
    const topics = await db.topic.findMany();

    const renderedTopiccs = topics.map((topic) => {
        return (
            <div key={topic.id} className="mt-4">
                <Link href={paths.topicShow(topic.slug)}>
                    <Chip color="warning" variant="shadow">
                        {topic.slug}
                    </Chip>
                </Link>
            </div>
        );
    });

    return (
        <div className="flex flex-row flex-wrap gap-2">{renderedTopiccs}</div>
    );
}
