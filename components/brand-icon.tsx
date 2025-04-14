'use client'
import { BookOpenCheck } from "lucide-react";
import {motion} from "framer-motion";
export default function BrandIcon() {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center h-fit w-fit"
        >
            <BookOpenCheck className="bg-gradient-to-b drop-shadow-2xl from-blue-500 to-blue-900/80 p-8 w-42 h-42 rounded-full mb-8" color="#ffffff" />
        </motion.div>
    )
}