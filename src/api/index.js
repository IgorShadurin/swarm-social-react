import arweave from './arweaveSetup';
//import {currentUnixTime, getAppName} from './utils';

export const getWalletAddress = async wallet => arweave.wallets.jwkToAddress(wallet);

export const getAllPortfolioTransactions = async walletAddress => {
    const query = {
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'from',
            expr2: walletAddress
        }/*,
        expr2: {
            op: 'equals',
            expr1: 'App-Name',
            expr2: getAppName()
        }*/
    };

    const txids = await arweave.arql(query);
    const transactions = await Promise.all(txids.map(txid => arweave.transactions.get(txid)));

    console.log(transactions);
    return transactions;
};

export const addTransaction = async (transactionData, wallet) => {
    return false;
};

export const uploadFile = async (content, name, size, wallet) => {
    const transaction = await arweave.createTransaction({data: content}, wallet);
    //transaction.addTag('App-Name', getAppName());
    transaction.addTag('name', name);
    transaction.addTag('size', size);

    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);

    return true;
};


// https://github.com/ArweaveTeam/weavemail/blob/7633024c36d2fd6e0b1507cb526e1ae6de43d86e/crypto.js
export const   encryptFile= async (content, subject, pub_key) =>{
    var content_encoder = new TextEncoder();
    var newFormat = JSON.stringify({ 'subject': subject, 'body': content })
    var mail_buf = content_encoder.encode(newFormat)
    //var key_buf = await generate_random_bytes(256)
    var array = new Uint8Array(256);
    var key_buf=window.crypto.getRandomValues(array);

    // Encrypt data segments
    var encrypted_mail = await arweave.crypto.encrypt(mail_buf, key_buf)
    var encrypted_key =
        await window.crypto.subtle.encrypt(
            {
                name: 'RSA-OAEP'
            },
            pub_key,
            key_buf
        );

    // Concatenate and return them
    return arweave.utils.concatBuffers([encrypted_key, encrypted_mail])
};

async function decrypt_mail (enc_data, key) {
    var enc_key = new Uint8Array(enc_data.slice(0, 512))
    var enc_mail = new Uint8Array(enc_data.slice(512))

    var symmetric_key = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, key, enc_key)

    return arweave.crypto.decrypt(enc_mail, symmetric_key)
}
