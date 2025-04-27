'use client'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SlidersHorizontal } from "lucide-react"
import { useRef, useState } from "react"

export function TableFilter({ setFilter, filterTitle }: {
  setFilter: (filter: Record<string, string>) => void,
  filterTitle: string,
  tasks: {
    userId: string,
    id: string,
    title: string,
    status: string,
    priority: string,
  }[]
}) {
  const [localFilter, setLocalFilter] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)
  const [open, setOpen] = useState(false);

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(formRef.current as HTMLFormElement)
    const filterData = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Remove "all" values as they should not be used for filtering
    // Original code with error:
    const cleanFilter = Object.fromEntries(
      Object.entries(filterData).filter(([, value]) => value !== '' && value !== 'all')
    );
    setLocalFilter(cleanFilter)
    setFilter(cleanFilter)
    setOpen(false); // Close the popover
  }
  const handleResetFilter = () => {
    setFilter({})
    setLocalFilter({})
    formRef.current?.reset()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter
          {Object.keys(localFilter).length > 0 &&
            <span className="ml-1 h-2 w-2 rounded-full bg-blue-500"></span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{filterTitle}</h4>
            <p className="text-sm text-muted-foreground">
              Filter your tasks by status or priority
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleApplyFilter} ref={formRef} className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Status</label>
                <Select name="status">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any status</SelectItem> {/* Changed from empty string to "all" */}
                    <SelectItem value="inProgress">In Progress</SelectItem>
                    <SelectItem value="todo">To do</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Priority</label>
                <Select name="priority">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any priority</SelectItem> {/* Changed from empty string to "all" */}
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetFilter}
                >
                  Reset
                </Button>
                <Button type="submit">Apply</Button>
              </div>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}