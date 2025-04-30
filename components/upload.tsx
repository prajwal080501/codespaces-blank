'use client';
import { useRef, useState} from "react";

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            // Handle file upload logic here
            console.log("File uploaded:", file);
        }
    };
    
    return (
        <form action={handleSubmit} ref={formRef} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Upload File</span>
                <input
                    type="file"
                    accept=".txt,.pdf,.docx"
                    onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }}
                    className="border border-gray-300 rounded-md p-2"
                />
            </label>
            {file && (
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Selected File:</span>
                    <span>{file.name}</span>
                </div>
            )}
            <button

                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"
                onClick={(e) => {
                    e.preventDefault();
                    if (file) {
                        // Handle file upload
                        console.log("File uploaded:", file);
                    }
                }}
            >
                Upload
            </button>
        </form>
    )
}