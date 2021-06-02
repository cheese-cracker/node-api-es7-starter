import AWS from 'aws-sdk'

import {SERVER_CONFIG} from '../../config/SERVER_CONFIG'

AWS.config = new AWS.Config({
  accessKeyId: SERVER_CONFIG.S3_KEY,
  secretAccessKey: SERVER_CONFIG.S3_SECRET,
  region: SERVER_CONFIG.BUCKET_REGION
});

// Creating a S3 instance
const s3 = new AWS.S3();

// Retrieving the bucket name from env variable
const Bucket = SERVER_CONFIG.BUCKET_NAME;

// GET URL Generator
function generateGetUrl(Key) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket,
      Key,
      Expires: 120 // 2 minutes
    };
    // Note operation in this case is getObject
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        // If there is no errors we will send back the pre-signed GET URL
        resolve(url);
      }
    });
  });
}

// PUT URL Generator
function generatePutUrl(Key, ContentType) {
  return new Promise((resolve, reject) => {
    // Note Bucket is retrieved from the env variable above.
    const params = { Bucket, Key, ContentType };
    // Note operation in this case is putObject
    s3.getSignedUrl('putObject', params, function(err, url) {
      if (err) {
        reject(err);
      }
      // If there is no errors we can send back the pre-signed PUT URL
      resolve(url);
    });
  });
}

// Finally, we export the methods so we can use it in our main application.
export {
    generateGetUrl,
    generatePutUrl
};
