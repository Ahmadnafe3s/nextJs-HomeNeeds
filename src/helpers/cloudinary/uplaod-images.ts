import axios from "axios"
import toast from "react-hot-toast"

const upload_image = async (Image: File) => {

    try {

        const formData = new FormData()

        formData.append('file', Image) // file is important here

        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!)

        formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME!)

        let response = axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_API! + '/upload', formData)

        return response

    } catch (error: any) {
        throw error
    }

}


export default upload_image