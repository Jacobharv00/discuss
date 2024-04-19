"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

import type { Topic } from "@prisma/client";

const createTopicSchema = z.object({
    name: z
        .string()
        .min(3)
        .regex(/^[a-z-]+$/, {
            message: "Must be lower case letters or dashes without spaces",
        }),
    description: z.string().min(10),
});

interface ICreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    };
}

export async function createTopic(
    formState: ICreateTopicFormState,
    formData: FormData
): Promise<ICreateTopicFormState> {
    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must be signed in to do this."],
            },
        };
    }

    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    _form: ["Something went wrong"],
                },
            };
        }
    }

    revalidatePath("/");
    redirect(paths.topicShow(topic.slug));
}
