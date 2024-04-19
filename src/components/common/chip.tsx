"use client";

import { Chip as NChip } from "@nextui-org/react";

type Color =
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;

type Variant =
    | "dot"
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | undefined;

export default function Chip({
    children,
    color,
    variant,
}: {
    children: React.ReactNode;
    color: Color;
    variant: Variant;
}) {
    return (
        <NChip color={color} variant={variant}>
            {children}
        </NChip>
    );
}
