"use client";
import { addTask } from "@/actions/task";
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
import { Pencil } from "lucide-react";

export default function TaskForm({ editMode = false, data }: { editMode?: boolean, data?: {
  id: string;
  title: string;
  priority: string;
  status: string;
} }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    title: editMode && data ? data.title : "",
    priority: editMode && data ? data.priority.toLocaleLowerCase : "low",
    status: editMode && data ? data.status : "todo",
  });


  const queryClient = useQueryClient();
  // Create mutation
  const mutation = useMutation({
    mutationFn: (data: any) => addTask(data),
    onSuccess: () => {
      // Invalidate and refetch tasks query
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      //Show success message
      toast("Task added", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
      // Close dialog
      setOpen(false);
      // Reset form
      formRef.current?.reset();
    },
    onError: (error) => {
      console.error("Failed to add task:", error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (userId) {
      data.userId = userId;
      // Use the mutation to add the task
      mutation.mutate(data);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger >
          {editMode ? <Pencil className="w-4 h-4 cursor-pointer" /> : <span className="bg-blue-500 text-white hover:bg-black cursor-pointer font-medium duration-150 ease-linear rounded px-2 py-1">Add Task</span>}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new task</DialogTitle>
            <DialogDescription>
              Add a new task to the list.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4" ref={formRef} onSubmit={handleSubmit}>
            {/* Form fields remain the same */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Task Title" type="text" name="title" className="name" defaultValue={task.title} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue={task}>
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
              <Select name="status" defaultValue={task.status}>
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
            <Input
              className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600 duration-150"
              type="submit"
              disabled={mutation.isPending}
              value={mutation.isPending ? "Adding..." : "Add Task"}
            />
            {mutation.isError && (
              <p className="text-red-500 text-sm">
                Error: Failed to add task
              </p>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}