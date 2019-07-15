import arweave from './arweaveSetup';
import {Base64} from 'js-base64';

const appName = 'weavez';

export const getWalletAddress = async wallet => arweave.wallets.jwkToAddress(wallet);

export const getPosts = async walletAddress => {
    const query = {
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'from',
            expr2: walletAddress
        },
        expr2: {
            op: 'and',
            expr1: {
                op: 'equals',
                expr1: 'app-name',
                expr2: appName
            },
            expr2: {
                op: 'equals',
                expr1: 'weave-type',
                expr2: 'post'
            }
        }
    };

    // todo order by date
    const txids = await arweave.arql(query);
    let transactions = await Promise.all(txids.map(txid => arweave.transactions.get(txid)));
    transactions = transactions.map(tx => {
        let result = Base64.decode(tx.get('data', {decode: true, string: true}));
        try {
            result = JSON.parse(result);
        } catch (e) {
            result = null;
        }

        console.log(tx);
        console.log(result);

        return result;
    }).filter(item => item != null);

    console.log(transactions);
    return transactions;
};

export const getFriends = async walletAddress => {
    const query = {
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'from',
            expr2: walletAddress
        },
        expr2: {
            op: 'and',
            expr1: {
                op: 'equals',
                expr1: 'app-name',
                expr2: appName
            },
            expr2: {
                op: 'equals',
                expr1: 'weave-type',
                expr2: 'friend'
            }
        }
    };

    const txids = await arweave.arql(query);
    let transactions = await Promise.all(txids.map(txid => arweave.transactions.get(txid)));
    transactions = transactions.map(tx => {
        let result = tx.get('data', {decode: true, string: true});

        console.log(tx);
        console.log(result);

        return result;
    }).filter(item => item != null);

    console.log(transactions);
    return transactions;
};

export const createPost = async (description, attachments, wallet) => {
    if (typeof wallet === "string") {
        wallet = JSON.parse(wallet);
    }

    console.log(wallet);

    // todo store date
    const data = {
        description,
        attachments: []
    };
    console.log(data);
    const transaction = await arweave.createTransaction({
        data: Base64.encode(JSON.stringify(data))
    }, wallet);
    transaction.addTag('weave-type', 'post');
    transaction.addTag('app-name', appName);

    await arweave.transactions.sign(transaction, wallet);
    const result = await arweave.transactions.post(transaction);
    console.log(result);

    return data;
};

export const addFriend = async (friendWallet, wallet) => {
    if (typeof wallet === "string") {
        wallet = JSON.parse(wallet);
    }

    console.log(wallet);
    const transaction = await arweave.createTransaction({
        data: friendWallet
    }, wallet);
    transaction.addTag('weave-type', 'friend');
    transaction.addTag('app-name', appName);

    await arweave.transactions.sign(transaction, wallet);
    const result = await arweave.transactions.post(transaction);
    console.log(result);

    return friendWallet;
};

export const uploadFile = async (content, name, size, wallet) => {
    const transaction = await arweave.createTransaction({data: content}, wallet);
    transaction.addTag('name', name);
    transaction.addTag('size', size);

    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);

    return true;
};

export const sendDonate = async (toWallet, sum, wallet) => {
    if (typeof wallet === "string") {
        wallet = JSON.parse(wallet);
    }

    console.log(toWallet, sum);
    let transaction = await arweave.createTransaction({
        target: toWallet,
        quantity: arweave.ar.arToWinston(sum)
    }, wallet);

    await arweave.transactions.sign(transaction, wallet);
    return await arweave.transactions.post(transaction);
};

export default {createPost, getPosts, addFriend, getFriends, sendDonate};
