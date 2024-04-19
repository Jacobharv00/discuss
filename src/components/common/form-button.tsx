"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

interface IFormButton {
    children: React.ReactNode;
}

export default function FormButton({ children }: IFormButton) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" isLoading={pending}>
            {children}
        </Button>
    );
}
