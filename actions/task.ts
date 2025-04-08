'use server'

import prisma from "@/primsa"

export const addTask = async (input:any) => {
    console.log(input, 'input');debugger;
    let res = await prisma.task.create({
        data:input,
    })
    console.log(res, 'res action')
    return res;
}