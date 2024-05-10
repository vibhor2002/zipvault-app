"use client"
import { cn } from '@/lib/utils'
import React from 'react'
import DropzoneComp from 'react-dropzone'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { update } from 'firebase/database'
import toast from 'react-hot-toast'

function Dropzone() {
    const [loading, setLoading] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();

    // 2
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

    // 3
    const uploadPost = async (selectedFile: File) => {
        if (loading) return;
        if (!user) return;

        const toastId = toast.loading("Uploading...");
        setLoading(true);

        // addDoc -> user/user123/files
        const docRef = await addDoc(collection(db, "users", user.id, "files"), {
            userId: user.id,
            filename: selectedFile.name,
            fullname: user.fullName,
            profileImg: user.imageUrl,
            timestamp: serverTimestamp(),
            size: selectedFile.size,
            type: selectedFile.type,
        })

        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

        uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
                downloadURL: downloadURL,
            });
        });

        toast.success("Uploaded Successfully", {
            id: toastId
        });
        setLoading(false);
    };

    const maxSize = 20971520; // 20MB
    return (


        <DropzoneComp
            minSize={0}
            maxSize={maxSize}

            // 1
            onDrop={onDrop} >

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
                                ? "bg-[#3fa883] text-white animate-pulse"
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