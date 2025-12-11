import mongodb, { MongoClient } from 'mongodb';
import fsp from 'fs/promises';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), 'backend', '.env') });

async function uploadFilesToGridFS() {
    const client = await MongoClient.connect(process.env.MONGO_URI);

    const filepath = fileURLToPath(import.meta.url);
    const dir = path.join((path.dirname(filepath)), '..', '../canciones');

    console.log(dir);

    const files = await fsp.readdir(dir);

    console.log(`Archivos encontrados: ${files.length}`);

    if (files.length === 0) {
        console.log("No hay archivos para subir a GridFS");
        client.close();
        return;
    }

    const db = client.db('musica');
    const bucket = new mongodb.GridFSBucket(db, { bucketName: 'cancionesBucket' });

    for (let i = 0; i < files.length; i++) {

        await new Promise((resolve, reject) => {
            fs.createReadStream(path.join(dir, files[i]))
            .pipe(bucket.openUploadStream(files[i]))
            .on('finish', () => {
                console.log(`Archivo ${files[i]} subido`);
                resolve();
            })
            .on('error', reject);
        })
        
    }
    client.close();
    console.log("Archivos subidos")
}

uploadFilesToGridFS();