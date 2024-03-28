"use client"
import { cn } from '@/lib/utils'
import React from 'react'
import DropzoneComp from 'react-dropzone'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

function Dropzone() {
    const [loading, setLoading] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.onload = async () => {
                await uploadPost(file);
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const uploadPost = async (selectedFile: File) => {
        if (loading) return;
        if (!user) return;

        setLoading(true);

        setLoading(false);
    };

    const maxSize = 20971520; // 20MB
    return (


        <DropzoneComp
            minSize={0}
            maxSize={maxSize}
            onDrop={acceptedFiles => console.log(acceptedFiles)} >

            {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                fileRejections,
            }) => {

                const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

                return (
                    <section className='m-4'>
                        <div {...getRootProps()} className={cn("w-full h-52 flex justify-center items-center p-5 border border-dashed text-center rounded-lg",
                            isDragActive
                                ? "bg-[#035ffe] text-white animate-pulse"
                                : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                        )}>
                            < input {...getInputProps()} />
                            {!isDragActive && 'Click here or drop a file to upload!'}
                            {isDragActive && !isDragReject && "Drop to Upload this file!!"}
                            {isDragReject && "File type not accepted, sorry!"}
                            {isFileTooLarge && (
                                <div className="text-danger mt-2">File is too large.</div>
                            )}
                        </div>
                    </section>
                );
            }}
        </DropzoneComp >
    )
}

export default Dropzone