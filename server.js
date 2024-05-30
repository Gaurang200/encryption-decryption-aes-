const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generateIV() {
    return crypto.randomBytes(16);
}

function generateKey() {
    
    return crypto.randomBytes(32); 

}

function encryptBuffer(buffer, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return encrypted;
}

function decryptBuffer(buffer, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return decrypted;
}

function encryptImage(inputPath, outputPath, key, iv) {
    const inputBuffer = fs.readFileSync(inputPath);
    const encryptedBuffer = encryptBuffer(inputBuffer, key, iv);
    fs.writeFileSync(outputPath, encryptedBuffer);
}

function decryptImage(inputPath, outputPath, key, iv) {
    const inputBuffer = fs.readFileSync(inputPath);
    const decryptedBuffer = decryptBuffer(inputBuffer, key, iv);
    fs.writeFileSync(outputPath, decryptedBuffer);
}

const key = generateKey();
const iv = generateIV();
const inputImagePath = path.join('Fortnite-Save-The-World.png');
const encryptedImagePath = path.join(__dirname, 'encrypted-image.enc');
const decryptedImagePath = path.join(__dirname, 'decrypted-image.jpg');

encryptImage(inputImagePath, encryptedImagePath, key, iv);

decryptImage(encryptedImagePath, decryptedImagePath, key, iv);

console.log('Encryption and decryption complete. Check the output files.');
