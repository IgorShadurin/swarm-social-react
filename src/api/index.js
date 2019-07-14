import arweave from './arweaveSetup';

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
            op: 'equals',
            expr1: 'weave-type',
            expr2: 'post'
        }
    };

    const txids = await arweave.arql(query);
    const transactions = await Promise.all(txids.map(txid => arweave.transactions.get(txid)));

    console.log(transactions);
    return transactions;
};

export const createPost = async (description, attachments, wallet) => {
    if (typeof wallet === "string") {
        wallet = JSON.parse(wallet);
    }

    console.log(wallet);
    const data = {
        description,
        attachments
    };
    const transaction = await arweave.createTransaction({
        data: JSON.stringify(data)
    }, wallet);
    transaction.addTag('weave-type', 'post');

    await arweave.transactions.sign(transaction, wallet);
    const result = await arweave.transactions.post(transaction);
    console.log(result);

    return data;
};

export const uploadFile = async (content, name, size, wallet) => {
    const transaction = await arweave.createTransaction({data: content}, wallet);
    transaction.addTag('name', name);
    transaction.addTag('size', size);

    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);

    return true;
};

export default {createPost, getPosts};
