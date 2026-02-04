import React, { useRef, useState } from 'react'
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import { Button } from 'antd'

const UploadPage = async () => {
    const [filesToUpload, setFilesToUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef(null)

    const resetFileInput = () => {
        inputRef.current.value = null;
    };

    const uploadFile = async () => {
        if (filesToUpload == null)
            alert("must select file to upload")
        else {
        }
    }

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                onChange={(e) => setFilesToUpload((e.target).files)}
                className="
                text-sm 
                text-grey-500
                file:mr-5 file:py-2 file:px-6
                file:border-0  file:rounded-md
                file:text-sm file:font-medium
                file:bg-blue-100 file:text-blue-700
                file:h-10
                file:transition
                hover:file:cursor-pointer
                hover:file:bg-blue-200
                hover:file:text-blue-700
                rounded-md
                h-10
                w-96                         
                pr-2
                TitleFont" />

            <Button type="primary" onClick={uploadFile}>
                <div>
                    <FiUpload></FiUpload>
                    <span>Upload</span>
                </div>
            </Button>
        </div>
    )
}

export default UploadPage;