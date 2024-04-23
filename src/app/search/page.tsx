import { redirect } from "next/navigation";
import PostList from "@/components/posts/post-list";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";

interface ISearchPage {
    searchParams: {
        term: string;
    };
}

export default async function SearchPage({ searchParams }: ISearchPage) {
    const { term } = searchParams;

    if (!term) {
        redirect("/");
    }

    return <PostList fetchData={() => fetchPostsBySearchTerm(term)} />;
}
