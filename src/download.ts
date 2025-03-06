import { downloadContentFromMessage, MediaDownloadOptions } from './downloadContent';
import * as fs from 'fs';
import { DownloadableMessage, MediaType } from './Types';

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Usage: node download.js <mediaKey> <directPath> <mediaType>');
  process.exit(1);
}

if ([ 'image', 'video', 'audio', 'document' ].indexOf(args[2]) === -1) {
  console.error('Invalid mediaType. Must be one of: image, video, audio, document');
  process.exit(1);
}

const [mediaKey, directPath, mediaType ] = args;

if (!mediaKey || !directPath || !mediaType) {
  console.error('Both mediaKey and directPath are required.');
  process.exit(1);
}

const message: DownloadableMessage = {
  mediaKey: Buffer.from(mediaKey, 'base64'),
  directPath: directPath,
};

const options: MediaDownloadOptions = {
  startByte: 0,
  options: {}
};

const outputFilePath = './output.file';

downloadContentFromMessage(message, mediaType as MediaType, options)
  .then((stream: NodeJS.ReadableStream) => {
    const writeStream = fs.createWriteStream(outputFilePath);
    stream.pipe(writeStream);
    writeStream.on('finish', () => {
      console.log('Download complete');
    });
  })
  .catch((err: Error) => {
    console.error('Error downloading content:', err);
  });
