import { MongoClient, ObjectId, Binary } from 'mongodb';
import fs from 'fs';
import path from 'path';

// Configuración
const uri = 'mongodb+srv://USUARIO:CONTRASEÑA@TUCLUSTER.mongodb.net/MSAUDIODATASERVICE?retryWrites=true&w=majority';
const folderPath = path.join(process.env.USERPROFILE || '', 'Music'); // Carpeta de música por defecto
const chunkSize = 261120;

const client = new MongoClient(uri);

async function subirAudios() {
  await client.connect();
  const db = client.db('MSAUDIODATASERVICE');
  const filesCol = db.collection('fs.files');
  const chunksCol = db.collection('fs.chunks');

  const archivos = fs.readdirSync(folderPath).filter(f => f.endsWith('.mp3'));

  let total = archivos.length;
  let contador = 0;

  for (const nombre of archivos) {
    contador++;
    console.log(`📤 Procesando (${contador}/${total}): ${nombre}...`);

    const ruta = path.join(folderPath, nombre);
    const buffer = fs.readFileSync(ruta);

    if (buffer.length === 0) {
      console.warn(`⚠️ Archivo vacío omitido: ${nombre}`);
      continue;
    }

    const baseName = path.basename(nombre, '.mp3');
    const partes = baseName.split(' - ');
    const titulo = partes[0] || 'Sin título';
    const artista = partes[1] || 'Desconocido';

    const fileId = new ObjectId();
    const doc = {
      _id: fileId,
      filename: nombre,
      length: buffer.length,
      chunkSize,
      uploadDate: new Date(),
      metadata: { title: titulo, artist: artista, formato: 'mp3' }
    };

    await filesCol.insertOne(doc);

    for (let i = 0; i < buffer.length; i += chunkSize) {
      const fragmento = buffer.slice(i, i + chunkSize);
      await chunksCol.insertOne({
        files_id: fileId,
        n: i / chunkSize,
        data: new Binary(fragmento)
      });
    }

    console.log(`✅ Guardado: ${nombre}`);
  }

  await client.close();
}

subirAudios();