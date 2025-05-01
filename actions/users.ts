'use server';

import {prisma} from "@/lib/prisma";
import { User } from "@/types";


export const addUser = async (userData: User) => {
    let userExists = await prisma.user.findFirst({
        where: {
            clerkUserId: userData.clerkUserId ?? '', // Replace 'clerkUserId' with a valid property from your Prisma schema
        },
    });
    if (!userExists) {
        userExists = await prisma.user.create({
            data: {
                clerkUserId: userData.clerkUserId ?? '',
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                imageUrl: userData.imageUrl,
            },
        });
    }

    console.log("User exists:", userExists);
    return userExists;
}