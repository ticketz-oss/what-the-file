# What The File

**Downloads and decrypts files from WhatsApp**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Description

`what-the-file` is a TypeScript library designed to download and decrypt files from WhatsApp. This library provides a simple and effective way to handle WhatsApp files, making it easy to integrate into your projects.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install `what-the-file` using npm or yarn:

```bash
npm install what-the-file
# or
yarn add what-the-file
```

## Usage

Here is a basic example of how to use `what-the-file` to download and decrypt a file from WhatsApp in a React component:

```jsx
import React, { useState } from 'react';
import { downloadAndDecryptFile } from 'what-the-file';

const WhatsAppFileDownloader = () => {
  const [directPath, setDirectPath] = useState('');
  const [mediaKey, setMediaKey] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    try {
      const file = await downloadAndDecryptFile({ directPath, mediaKey, mediaType });
      setDecryptedFile(file);
      setError(null);
    } catch (err) {
      setError('Failed to download or decrypt the file.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>WhatsApp File Downloader</h1>
      <input
        type="text"
        value={directPath}
        onChange={(e) => setDirectPath(e.target.value)}
        placeholder="Enter direct path"
      />
      <input
        type="text"
        value={mediaKey}
        onChange={(e) => setMediaKey(e.target.value)}
        placeholder="Enter media key"
      />
      <input
        type="text"
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
        placeholder="Enter media type"
      />
      <button onClick={handleDownload}>Download File</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {decryptedFile && (
        <div>
          <h2>File Downloaded and Decrypted</h2>
          <a href={URL.createObjectURL(decryptedFile)} download="decrypted_file">
            Download Decrypted File
          </a>
        </div>
      )}
    </div>
  );
};

export default WhatsAppFileDownloader;
```

## API

### `downloadAndDecryptFile(params: { directPath: string, mediaKey: string, mediaType: string }): Promise<File>`

- **Parameters:**
  - `directPath` (string): The direct path of the file to download.
  - `mediaKey` (string): The media key for decryption.
  - `mediaType` (string): The type of media.
- **Returns:** A promise that resolves to the decrypted file.

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn how you can help.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
