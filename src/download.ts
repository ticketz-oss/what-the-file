
import { downloadContentFromMessage, MediaDownloadOptions } from './downloadContent';
import * as fs from 'fs';
import { DownloadableMessage } from './Types';

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node download.js <mediaKey> <directPath>');
  process.exit(1);
}

const [mediaKey, directPath] = args;

if (!mediaKey || !directPath) {
  console.error('Both mediaKey and directPath are required.');
  process.exit(1);
}

const message: DownloadableMessage = {
  mediaKey: Buffer.from(mediaKey, 'base64'),
  directPath: directPath,
};

const type = 'image'; // or 'video', 'audio', 'document'
const options: MediaDownloadOptions = {
  startByte: 0,
  options: {}
};

const outputFilePath = './output.file';

downloadContentFromMessage(message, type, options)
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
