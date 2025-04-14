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

export const getAllTasksByUserId = async (userId:string) => {
    console.log(userId, 'userId');debugger;
    let res = await prisma.task.findMany({
        where:{
            userId:userId,
        }
    })
    console.log(res, 'res action')
    return res;
}


export const deleteTask = async (taskId:string) => {
    const res = await prisma.task.delete({
        where: {
            id:taskId
        }
    })

    return res;
}

const getTaskByyId = async (taskId:string) => {
    const task = await prisma.create({
        where: {
            id: taskId,
        }
    })

    return task;
}