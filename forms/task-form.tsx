'use client'
import { addTask } from "@/actions/task";
import { Input } from "@/components/ui/input";
import { useRef } from "react"


export default function TaskForm() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log(data, 'data')
        const res = await addTask(data);
        console.log(res, 'res')
    }
    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <Input type="text" name="title" className="name" />
            <Input type="text" name="status" className="status" />
            <Input type="text" name="priority" className="name" />
            <Input type="submit" />
        </form>
    )
}