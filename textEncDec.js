const crypto = require('crypto');

function generateIV() {
    return crypto.randomBytes(16);
}

function generateKey() {
    return crypto.randomBytes(32); 
}

function encrypt(text, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encryptedText, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const key = generateKey();
const iv = generateIV();
const text = 'Hello, world!';

const encryptedText = encrypt(text, key, iv);
const decryptedText = decrypt(encryptedText, key, iv);

console.log('Original text:', text);
console.log('Encrypted text:', encryptedText);
console.log('Decrypted text:', decryptedText);
