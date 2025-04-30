"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Papa from 'papaparse';
import { CsvFile } from "@/types";
import { importTasks } from "@/actions/task";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UploadPopup() {
    const [csvData, setCsvData] = useState<CsvFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const { userId } = useAuth();
    const formRef = useRef<HTMLFormElement>(null);
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const readCsvFile = async (file: File) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data as CsvFile[];
                setCsvData(data);
                console.log("Parsed CSV data:", data);
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
                toast.error("Failed to parse CSV file");
            }
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(formRef.current as HTMLFormElement);
        const file = formData.get('file') as File;

        if (!file) {
            toast.error("Please select a file");
            return;
        }

        if (!file.name.endsWith('.csv')) {
            toast.error("Please upload a CSV file");
            return;
        }

        await readCsvFile(file);
    }

    // Process CSV data after it's loaded
    useEffect(() => {
        const processData = async () => {
            // Only proceed if we have CSV data and a userId
            if (csvData.length > 0 && userId) {
                try {
                    setIsUploading(true);

                    // Type safety: ensure all required fields exist
                    const formattedData = csvData.map((data) => {
                        // Verify required fields
                        if (!data.title || !data.status || !data.priority) {
                            throw new Error("CSV missing required fields: title, status, and priority");
                        }

                        return {
                            title: data.title,
                            status: data.status,
                            priority: data.priority,
                            // Convert date to ISO string format or undefined
                            dueDate: data.date ? new Date(data.date).toISOString() : undefined,
                            // Use the non-null assertion because we checked above
                            userId: userId,
                        };
                    });

                    const result = await importTasks(formattedData);
                    console.log("Import result:", result);
                    toast.success(`Imported ${formattedData.length} tasks successfully`);
                    router.refresh(); // Refresh the page to show new tasks
                    setOpen(false); // Close dialog after successful import
                    setCsvData([]); // Clear CSV data
                } catch (err) {
                    console.error("Import failed:", err);
                    toast.error("Failed to import tasks: " + (err instanceof Error ? err.message : "Unknown error"));
                } finally {
                    setIsUploading(false);
                }
            }
        };

        // Only process if we have data
        if (csvData.length > 0) {
            processData();
        }
    }, [csvData, userId, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Import Tasks</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Import Tasks</DialogTitle>
                    <DialogDescription>
                        Upload a CSV file to import tasks. Ensure the CSV has the following headers: <strong>title, status, priority, date</strong>.
                        <br />
                        <br />
                        <strong>Note:</strong> The <code>date</code> field is optional and should be in YYYY-MM-DD format.
                    </DialogDescription>
                </DialogHeader>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="file"
                        accept=".csv"
                        name="file"
                        className="cursor-pointer"
                    />
                    <Button
                        type="submit"
                        disabled={isUploading}
                        className="w-full"
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                </form>

                {csvData.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-medium mb-2">Preview ({csvData.length} rows):</h3>
                        <div className="max-h-40 overflow-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr>
                                        {Object.keys(csvData[0]).slice(0, 3).map((header, index) => (
                                            <th key={index} className="text-left p-1">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {csvData.slice(0, 5).map((row, index) => (
                                        <tr key={index}>
                                            {Object.values(row).slice(0, 3).map((cell, cellIndex) => (
                                                <td key={cellIndex} className="p-1">{String(cell)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}