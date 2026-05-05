const fs = require('fs');
const path = require('path');
const { MongoClient, GridFSBucket } = require('mongodb');
const { loadEnv } = require('./load_env');

async function uploadFiles() {
  loadEnv();

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;

  if (!uri || !dbName) {
    throw new Error("Missing MONGODB_URI or MONGODB_DB_NAME in .env");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: "fs" });

    const folderPath = __dirname; // Carpeta actual
    const files = fs.readdirSync(folderPath);

    // Filtrar solo PDF, DOCX y TXT
    const targetFiles = files.filter(file =>
      [".pdf", ".docx", ".txt"].includes(path.extname(file).toLowerCase())
    );

    if (targetFiles.length === 0) {
      console.log("No files found to upload.");
      return;
    }

    for (const file of targetFiles) {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);

      // Extraer nombre y autor de la sintaxis "nombre - autor.ext"
      const baseName = path.basename(file, path.extname(file));
      const [name, author] = baseName.split(" - ").map(str => str.trim());

      const metadata = {
        name: name || "Unknow",
        author: author || "Unknow",
        size: `${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
        date: new Date().toISOString()
      };

      console.log(`Uploading file....: ${file} (Name: ${metadata.name}, Author: ${metadata.author})`);

      await new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(file, { metadata });
        const readStream = fs.createReadStream(filePath);

        readStream.on("error", reject);
        uploadStream.on("error", reject);
        uploadStream.on("finish", () => {
          console.log(`File: ${file} uploaded correctly`);
          resolve();
        });

        readStream.pipe(uploadStream);
      });
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

uploadFiles();
