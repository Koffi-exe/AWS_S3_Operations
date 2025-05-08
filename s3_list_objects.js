import { S3Client, S3ServiceException, paginateListObjectsV2 } from "@aws-sdk/client-s3";
import 'dotenv/config';

export const listObjects = async ({bucketName, pageSize}) => {
    const client = new S3Client({});

    const objects = [];
    try {
        const paginator = paginateListObjectsV2({client, pageSize},{Bucket: bucketName});
        for await (const page of paginator) {
            console.log("Page:", page);
           // objects.push(page.Contents);
        }
    } catch (error) {
        if(error instanceof S3ServiceException && error.name === 'NoSuchBucket') {
            console.error(`Bucket ${bucketName} does not exist.`);
        }
        else if (error instanceof S3ServiceException) {
            console.error(`Error listing objects: ${error.message}`);
        } else {
            console.error(`Unexpected error: ${error.message}`);
        }
    }
}
listObjects({bucketName:'nodeserver-test', pageSize:10});