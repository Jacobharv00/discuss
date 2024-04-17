"use client";

import { Button } from "@nextui-org/react";

import * as actions from "@/actions";
import Profile from "@/components/profile";

export default function Home() {
    return (
        <div className="flex flex-col gap-6 p-4">
            <form action={actions.signIn}>
                <Button type="submit">SIGN IN</Button>
            </form>
            <form action={actions.signOut}>
                <Button type="submit">SIGN OUT</Button>
            </form>
            <Profile />
        </div>
    );
}
