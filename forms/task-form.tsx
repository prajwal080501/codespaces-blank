"use client";
import { addTask, updateTask } from "@/actions/task";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/nextjs";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner"
import { Pencil, Plus } from "lucide-react";
import { TaskObjectData } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TaskForm({ editMode = false, data, displayMode, className }: {
  editMode?: boolean,
  data?: TaskObjectData
  displayMode?: "icon" | "button",
  className?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  // State for task data
  const [task, setTask] = useState({
    title: editMode && data ? data.title : "",
    priority: editMode && data ? data.priority.toLowerCase() : "low",
    status: editMode && data ? data.status : "todo",
    dueDate: editMode && data ? data.dueDate && new Date(data.dueDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
  });

  // Update task state when data changes or dialog opens
  useEffect(() => {
    if (editMode && data && open) {
      setTask({
        title: data.title,
        priority: data.priority.toLowerCase(),
        status: data.status,
        dueDate: data.dueDate && new Date(data.dueDate).toISOString().split("T")[0] || '',
      });
    }
  }, [data, editMode, open]);

  const queryClient = useQueryClient();

  // Fixed mutation definition
  const mutation = useMutation({
    mutationFn: (formData: {
      title: string;
      priority: string;
      status: string;
      dueDate: string;
      userId: string;
    }) => {
      if (editMode && data) {
        // Remove id from data before sending to API
        return updateTask(data.id, {
          ...formData,
          dueDate: new Date(formData.dueDate),
        });
      } else {
        return addTask({
          ...formData,
          description: formData.title, // Use title as description or update as needed
          dueDate: new Date(formData.dueDate), // Convert dueDate to Date object
        });
      }
    },
    onSuccess: () => {
      // Handle success
      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      setOpen(false);
      formRef.current?.reset();

      toast(editMode ? "Task updated" : "Task added", {
        description: new Date().toLocaleString(),
      });
    },
    onError: (error) => {
      console.error("Error:", error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    if (userId) {
      const submitData = {
        ...formValues,
        userId
      };

      mutation.mutate(submitData as {
        title: string;
        priority: string;
        status: string;
        dueDate: string;
        userId: string;
      });
    }
  };

  const title = editMode ? "Edit Task" : "Add Task";
  const description = editMode ? "Edit the task details." : "Add a new task to the list.";
  const buttonText = editMode ? "Save Changes" : "Add Task";

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="mb-1">
          {editMode ?
            <Pencil className="w-4 text-blue-700 font-medium h-4 cursor-pointer" /> :
            displayMode === "icon" ?
              <Plus className="w-8 rounded-full duration-200 text-blue-700 font-medium hover:bg-blue-500 p-1 hover:rounded-full hover:text-white h-8 cursor-pointer" /> :
              <p className={`bg-blue-500 text-white px-2 py-1 rounded ${className}`}>
                {isMobile ? <Plus /> : buttonText}
              </p>
          }
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-4" ref={formRef} onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Task Title"
                type="text"
                name="title"
                defaultValue={task.title}
                key={`title-${task.title}`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue={task.priority} key={`priority-${task.priority}`}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={task.status} key={`status-${task.status}`}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="inProgress">In progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                type="date"
                id="dueDate"
                defaultValue={task.dueDate}
                name="dueDate"
                key={`dueDate-${task.dueDate}`}
              />
            </div>

            <Input
              className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600 duration-150"
              type="submit"
              disabled={mutation.isPending}
              value={mutation.isPending ?
                (editMode ? "Saving..." : "Adding...") :
                buttonText
              }
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}