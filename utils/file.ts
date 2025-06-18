export { BlobToBase64, BlobToFile, FileToBlob, UriToBlob, UriToFile };

function BlobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
}

function FileToBlob(file: File): Blob {
  return new Blob([file], { type: file.type });
}

async function UriToFile(uri: string, fileName: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

async function UriToBlob(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(`Failed to fetch URI: ${uri}`);
  }
  return await response.blob();
}

async function BlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
