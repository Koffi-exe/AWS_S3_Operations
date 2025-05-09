import { S3Client, GetObjectCommand, S3ServiceException, NoSuchKey } from '@aws-sdk/client-s3'
import 'dotenv/config'
import { writeFileSync } from 'fs'

export const s3_get_object = async ({bucketName, objectKey}) => {

    const client = new S3Client({})

    try {
        const response = await client.send(
            new GetObjectCommand(
                {
                    Bucket: bucketName,
                    Key: objectKey
                }
            )
        )

        // console.log("Response:", response)

        const arr = await response.Body.transformToByteArray()  
        console.log("Array:", arr)
        writeFileSync('img.jpg', Buffer.from(arr))
    }catch (error) {
       if(error instanceof NoSuchKey){
        console.error(`Error: No such key ${objectKey} in bucket ${bucketName}`)
       }
       else if (error instanceof S3ServiceException){
        console.error(`Error: errorName:${error.name}, errorMessage:${error.message}`)
       }
    }
}

s3_get_object({bucketName:'nodeserver-test', objectKey:'login_bg.jpg'})