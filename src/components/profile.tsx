"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
    const { data: session } = useSession();

    if (!session?.user) {
        return <div>User is signed out</div>;
    }

    if (session?.user) {
        return <div>User is signed in</div>;
    }

    return <div>Loading...</div>;
}
