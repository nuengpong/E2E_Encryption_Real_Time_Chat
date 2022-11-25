const RSA_ALGORITHM_NAME = 'RSA-OAEP';
const RSA_KEY_FORMAT = 'spki';
const JWT_KEY_FORMAT = 'pkcs8';

const { fromByteArray, toByteArray } = require('base64-js');

const { subtle } = require('node:crypto').webcrypto

const params = {
    name: RSA_ALGORITHM_NAME,
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: 'SHA-256',
};

const decodeBase64PublicKey = async (base64Encoded) => {
  const params = {
      name: RSA_ALGORITHM_NAME,
      hash: 'SHA-256'
  };

  const bytes = toByteArray(base64Encoded);
  return await subtle
      .importKey(RSA_PB_KEY_FORMAT, bytes, params, true, ['encrypt']
  );
}

const decodeBase64PrivateKey = async (base64Encoded) => {
  const params = {
      name: RSA_ALGORITHM_NAME,
      hash: 'SHA-256'
  };

  const bytes = toByteArray(base64Encoded);
  return await subtle
      .importKey(RSA_PV_KEY_FORMAT, bytes, params, true, ['decrypt']
  );
}

const encrypt = async (text, publicKey) => {
  const data = new TextEncoder().encode(text);
  return await subtle.encrypt(
      { name: RSA_ALGORITHM_NAME },
      publicKey,
      data
  ).then( (encrypted) => {
      const encoded = fromByteArray(new Uint8Array(encrypted));
      return encoded;
  });
}

const decrypt = async (base64Encoded) => {
  const params = {
      name: RSA_ALGORITHM_NAME
  };

  const bytes = toByteArray(base64Encoded);
  return await subtle.decrypt(params, this.encryptionKeys.privateKey, bytes)
      .then( (decrypted) => {
      const text = new TextDecoder('utf-8').decode(decrypted);
      return text;
      });
}

const message = 'message';

const generateKey = async () => {
    const key =  await subtle
      .generateKey(params, true, ['encrypt', 'decrypt']);

      console.log(key);

      console.log(message);
      const encryptMassage = await encrypt(message, key.publicKey);
      console.log(encryptMassage); 
      const decryptMassage = await encrypt(message, key.publicKey);
      console.log(decryptMassage); 

      const exportedBytes = await subtle
      .exportKey(RSA_KEY_FORMAT, key.publicKey);

      console.log(exportedBytes);

      const base64PublicKey = fromByteArray(new Uint8Array(exportedBytes));
      console.log(base64PublicKey);
      console.log(base64PublicKey.length);

      const importedBytes = await subtle
      .exportKey(JWT_KEY_FORMAT, key.privateKey);

      console.log(importedBytes);

      const base64PrivateKey = fromByteArray(new Uint8Array(importedBytes));
      console.log(base64PrivateKey);
      console.log(base64PrivateKey.length);

}

generateKey();

  /**
   * Stores base64 encoded public key.
   */
//     const exportedBytes = await window
//       .crypto
//       .subtle
//       .exportKey(RSA_KEY_FORMAT, this.encryptionKeys.publicKey);

//       this.base64PublicKey = fromByteArray(new Uint8Array(exportedBytes));
//   }