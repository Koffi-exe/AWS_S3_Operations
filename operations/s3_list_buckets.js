import { ListBucketsCommand, paginateListBuckets, S3Client } from "@aws-sdk/client-s3";
import 'dotenv/config';


const buckets = [];
var owner = null;
// Dont panic just look through the AWS documentation for the S3Client and ListBucketsCommand to understand what is going on here.
const main = async () => {
    
    const s3Client = new S3Client({
        // region: "us-east-1",
        // credentials: {
        //     accessKeyId: process.env.accessKeyId,
        //     secretAccessKey: process.env.secretAccessKey
        // },
        /// the env is set such that the credentials are automatically picked up from the environment variables
    });

    try {
        const paginator = paginateListBuckets({ client: s3Client }, {});
        for await (const page of paginator) {
            console.log("Page:", page);
            if (!owner) {
                owner = page.Owner.DisplayName;
            }
            buckets.push(page.Buckets);
        }
        console.log("Buckets:", buckets);
        console.log("Owner:", owner);
    } catch (error) {
        console.error("Error listing buckets:", error.message);
    }
}

main();

// Uncomment the following code to list buckets without pagination

// const listBuckets = async () => {
//     try {
//         const command = new ListBucketsCommand({});
//         const response = await s3Client.send(command);
//         console.log("Buckets:", response.Buckets);
//     } catch (error) {
//         console.error("Error listing buckets:", error);
//     }
// }
// listBuckets();