import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import 'dotenv/config';

const s3Client = new S3Client({
    // region: "us-east-1",
    // credentials: {
    //     accessKeyId: process.env.accessKeyId,
    //     secretAccessKey: process.env.secretAccessKey,
    // },
})

async function getObjectUrl(key){
    const command = new GetObjectCommand({
        Bucket: 'nodeserver-test',
        Key: key,
    });
    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.log('tsi:'+ url);
        return url;
    } catch (err) {
        console.error(err);
    }
}


getObjectUrl('login_bg.jpg')