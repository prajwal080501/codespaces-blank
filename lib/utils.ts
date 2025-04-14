import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const priorityClassMap = {
  'high': ' text-red-800',
  'medium': ' text-yellow-800',
  'low': ' text-green-800',
}
export const priorityMap = {
  'high': 'High',
  'medium': 'Medium',
  'low': 'Low',
}

export const taskStatusClassMap = {
  'inProgress': ' text-yellow-800',
  'completed': ' text-green-800',
  'todo': ' text-blue-800',
}
export const taskStatusMap = {
  'inProgress': 'In Progress',
  'completed': 'Completed',
  'todo': 'To Do',
}
