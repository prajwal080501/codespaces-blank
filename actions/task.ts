'use server'

import { prisma } from "@/lib/prisma";

export const addTask = async (input: {
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    priority: string;
    userId: string;
}) => {
    console.log(input, 'input'); debugger;
    input.dueDate = new Date(input.dueDate);
    const res = await prisma.task.create({
        data: input,
    })
    console.log(res, 'res action')
    return res;
}

export const getAllTasksByUserId = async (userId: string) => {
    console.log(userId, 'userId'); debugger;
    const res = await prisma.task.findMany({
        where: {
            userId: userId,
        }
    })
    console.log(res, 'res action')
    return res;
}


export const deleteTask = async (taskId: string) => {
    const res = await prisma.task.delete({
        where: {
            id: taskId
        }
    })

    return res;
}

// const getTaskByyId = async (taskId: string) => {
//     const task = await prisma.task.findFirst({
//         where: {
//             id: taskId,
//         }
//     })

//     return task;
// }

export const updateTask = async (taskId: string, data: {
    title: string;
    dueDate: Date;
    status: string;
    priority: string;
    userId: string;
}) => {
    // Create a new object without the id property
    data.dueDate = new Date(data.dueDate); // Ensure dueDate is a Date object
    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: data, // Use the data object directly
    });
  
    return task;
  }


  export const importTasks = async (tasks: {
    title: string;
    status: string;
    priority: string;
    dueDate?: string;
    userId: string;
  }[]) => {
    if(tasks.length === 0) {
        throw new Error("No tasks to import");
    }

    await prisma.task.createMany({
        data: tasks.map(task => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : '',
        })),
    })
    return tasks;
  }