import keythereum from 'keythereum';
import crypto from 'crypto';
import EthereumTx from 'ethereumjs-tx';
import Web3 from 'web3';

export const NETWORK_MAIN = 1;
export const NETWORK_ROPSTEN = 3;
export const NETWORK_RINKEBY = 4;

export default class InviteWallet {
    constructor(rpcUrl, networkId = 4) {
        this.networkContracts = {
            // rinkeby
            4: '0xe2381f2a4a178da08a73ff183c39ca140588a3a2',
        };
        this.contractAddress = this.networkContracts[networkId];
        this.ABI = [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "toUserId",
                        "type": "uint256"
                    },
                    {
                        "name": "message",
                        "type": "string"
                    }
                ],
                "name": "addMessage",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "toAddress",
                        "type": "address"
                    }
                ],
                "name": "addNotification",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "invite",
                        "type": "string"
                    },
                    {
                        "name": "wallet",
                        "type": "address"
                    },
                    {
                        "name": "walletFileHash",
                        "type": "string"
                    }
                ],
                "name": "createInvite",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "invite",
                        "type": "string"
                    },
                    {
                        "name": "username",
                        "type": "string"
                    }
                ],
                "name": "register",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "newWallet",
                        "type": "address"
                    }
                ],
                "name": "resetWallet",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "username",
                        "type": "string"
                    },
                    {
                        "name": "walletFileHash",
                        "type": "string"
                    }
                ],
                "name": "saveUser",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "hash",
                        "type": "string"
                    }
                ],
                "name": "setHash",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "username",
                        "type": "string"
                    }
                ],
                "name": "setUsername",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "hash",
                        "type": "string"
                    }
                ],
                "name": "setWalletFileHash",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "username",
                        "type": "string"
                    }
                ],
                "name": "getAddressByUsername",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "username",
                        "type": "string"
                    }
                ],
                "name": "getHashByUsername",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "getHashByWallet",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "fromUserId",
                        "type": "string"
                    },
                    {
                        "name": "toUserId",
                        "type": "string"
                    }
                ],
                "name": "getMessages",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getMyUsername",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "fromAddress",
                        "type": "address"
                    },
                    {
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "getNotification",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "fromAddress",
                        "type": "address"
                    }
                ],
                "name": "getNotificationsCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    }
                ],
                "name": "getUsername",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "username",
                        "type": "string"
                    }
                ],
                "name": "getWalletByUsername",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "messageId",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "Messages",
                "outputs": [
                    {
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "name": "fromUserId",
                        "type": "uint256"
                    },
                    {
                        "name": "toUserId",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "Notifications",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "v",
                        "type": "uint256"
                    }
                ],
                "name": "uintToString",
                "outputs": [
                    {
                        "name": "str",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "userId",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "UsersInfo",
                "outputs": [
                    {
                        "name": "SwarmHash",
                        "type": "string"
                    },
                    {
                        "name": "SwarmType",
                        "type": "uint32"
                    },
                    {
                        "name": "Username",
                        "type": "string"
                    },
                    {
                        "name": "Wallet",
                        "type": "address"
                    },
                    {
                        "name": "WalletFileHash",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "Wallets",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ];
        this.web3 = new Web3(rpcUrl);
        this.fromAddress = '';
        this.privateKey = '';
    }

    setAccount(fromAddress, privateKey) {
        this.fromAddress = fromAddress;
        this.privateKey = new Buffer(privateKey, 'hex');

        return true;
    }

    isAccountExists() {
        return this.fromAddress.length > 0 && this.privateKey.length > 0;
    }

    createWallet(password = null) {
        return new Promise((resolve, reject) => {
            const dk = keythereum.create();
            if (!password) {
                password = InviteWallet.randomString(10);
            }

            const options = {
                kdf: "pbkdf2",
                cipher: "aes-128-ctr",
                kdfparams: {
                    c: 262144,
                    dklen: 32,
                    prf: "hmac-sha256"
                }
            };

            keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options, keyObject => {
                resolve({
                    data: keyObject,
                    privateKey: dk.privateKey.toString('hex'),
                    password
                });
            });
        });
    }

    changeWalletPassword(keyObject, oldPassword, newPassword) {
        return new Promise((resolve, reject) => {
            this.validate(keyObject, oldPassword)
                .then(privateKey => {
                    const options = {
                        kdf: "pbkdf2",
                        cipher: "aes-128-ctr",
                        kdfparams: {
                            c: 262144,
                            dklen: 32,
                            prf: "hmac-sha256"
                        }
                    };

                    //console.log(newPassword, privateKey, keyObject.crypto.kdfparams.salt, keyObject.crypto.cipherparams.iv);
                    keythereum.dump(newPassword, privateKey, keyObject.crypto.kdfparams.salt, keyObject.crypto.cipherparams.iv, options, keyObject => {
                        resolve({
                            data: keyObject,
                            privateKey: privateKey.toString('hex'),
                        });
                    });
                });
        });
    }

    /**
     *
     * @param keyObject
     * @param password
     * @returns {Promise<string>}
     */
    validate(keyObject, password) {
        return new Promise((resolve, reject) => {
            keythereum.recover(password, keyObject, data => {
                if (data instanceof Error) {
                    reject(data);
                } else {
                    resolve(data.toString('hex'));
                }
            });
        });
    }

    /**
     *
     * @param length
     * @returns {string}
     */
    static randomString(length) {
        return crypto.randomBytes(length).toString('hex');
    }

    static parseInvite(invite) {
        if (invite.length <= 42) {
            throw new Error('Incorrect invite size');
        }

        const address = invite.slice(0, 42);
        const password = invite.slice(42);

        return {
            address,
            password
        };
    }

    static createInviteFromData(address, password) {
        return 'http://prototype.beefree.me/#' + address + password;
    }

    getContract(fromAddress = this.fromAddress) {
        return this.web3.eth.Contract(this.ABI, this.contractAddress, {from: fromAddress});
    }

    /**
     * Generate transaction with 0 or (value - estimateGas) Ether
     * @param to
     * @param balanceEther
     * @param data
     * @returns {Promise<number>}
     */
    getTransactionData(to, balanceEther, data) {
        let result = {
            from: this.fromAddress,
            to: this.contractAddress,
            value: this.web3.utils.toWei(balanceEther, 'ether'),
            chainId: 4,
            data
        };
        return this.web3.eth.getTransactionCount(this.fromAddress)
            .then(nonce => {
                result.nonce = nonce;

                return this.web3.eth.getGasPrice();
            })
            .then(gasPrice => {
                result.gasPrice = gasPrice;

                console.log('Check estimate gas');
                console.log(result);
                return this.web3.eth.estimateGas(result);
            })
            .then(estimateGas => {
                // estimateGas is just a number, not wei
                // add +10%
                console.log('estimate gas old: ' + estimateGas);
                estimateGas = Math.round(estimateGas + estimateGas * 0.2);
                //estimateGas = 250000;
                console.log('estimate gas new: ' + estimateGas);
                const estimateGasBN = this.web3.utils.toBN(estimateGas);
                const gasPriceBN = this.web3.utils.toBN(result.gasPrice);
                const valueBN = this.web3.utils.toBN(result.value);
                const totalGasBN = gasPriceBN.mul(estimateGasBN);
                let resultValue = Number(balanceEther) === 0 ? 0 : valueBN.sub(totalGasBN);
                if (resultValue.negative) {
                    throw new Error('Too low balance');
                }

                //result.value = this.web3.utils.toHex(resultValue);
                result.value = resultValue;
                //result.nonce = this.web3.utils.toHex(result.nonce);
                //result.gasPrice = this.web3.utils.toHex(gasPriceBN);
                //result.gasLimit = this.web3.utils.toHex(estimateGasBN);
                result.gasPrice = gasPriceBN;
                result.gasLimit = estimateGasBN;

                console.log(result);

                return result;
            });
    }

    getTransaction(method, value = 0, ...params) {
        const contract = this.getContract();
        if (contract) {
            return contract.methods[method](...params);
        } else {
            return null;
        }
    }

    getTransactionABI(method, value = 0, ...params) {
        const transaction = this.getTransaction(method, value, ...params);
        if (transaction) {
            return transaction.encodeABI();
        } else {
            return null;
        }
    }

    sendTransaction(method, value = 0, ...params) {
        console.log('sendTransaction');
        console.log(params);
        const dataF = this.getTransactionABI(method, value, ...params);
        if (!dataF) {
            return new Promise((resolve, reject) => {
                reject('Empty data. Check Ethereum address and private key');
            });
        }

        return this.getTransactionData(this.contractAddress, value, dataF)
            .then(rawTx => {
                const tx = new EthereumTx(rawTx);
                tx.sign(this.privateKey);
                let serializedTx = tx.serialize();
                serializedTx = '0x' + serializedTx.toString('hex');
                //console.log(serializedTx);

                return new Promise((resolve, reject) => {
                    this.web3.eth.sendSignedTransaction(serializedTx)
                        .once('transactionHash', function (hash) {
                            console.log(hash);
                            /*console.log('wait 20 secs');
                            setTimeout(() => {
                                resolve(hash);
                            }, 20000);*/

                        })
                        .on('receipt', function (receipt) {
                            console.log(receipt);
                        })
                        .on('confirmation', function (confNumber, receipt) {
                            console.log(confNumber, receipt);
                        })
                        .on('error', function (error, receipt) {
                            console.log(error);
                            console.log(receipt);
                            if (receipt) {
                                resolve(receipt);
                            } else {
                                reject(error);
                            }
                        });
                });
            });
    }

    createInvite(invite, toAddress, fileHash, balance = '0.01') {
        return this.sendTransaction('createInvite', balance, invite, toAddress, fileHash);
    }

    register(invite, username) {
        return this.sendTransaction('register', '0', invite, username);
    }

    resetWallet(newWallet) {
        return this.web3.eth.getBalance(this.fromAddress)
            .then(balance => this.web3.utils.fromWei(balance, 'ether'))
            .then(balance => this.sendTransaction('resetWallet', balance, newWallet));
    }

    setHash(hash) {
        return this.sendTransaction('setHash', '0', hash);
    }

    setWalletFileHash(hash) {
        return this.sendTransaction('setWalletFileHash', '0', hash);
    }

    setUsername(username) {
        return this.sendTransaction('setUsername', '0', username);
    }

    saveUser(username, swarmWalletHash) {
        return this.sendTransaction('saveUser', '0', username, swarmWalletHash);
    }

    addNotification(username, swarmWalletHash) {
        return this.sendTransaction('saveUser', '0', username, swarmWalletHash);
    }

    getUserInfo(userId) {
        return this.getTransaction('UsersInfo', 0, Number(userId)).call();
    }

    getUserIdByAddress(address) {
        return this.getTransaction('Wallets', 0, address).call()
            .then(userId => Number(userId));
    }

    getWalletHashByAddress(address) {
        return this.getUserIdByAddress(address)
            .then(userId => this.getTransaction('UsersInfo', 0, userId).call())
            .then(data => data.WalletFileHash);
    }

    getHashByAddress(address) {
        return this.getUserIdByAddress(address)
            .then(userId => this.getTransaction('UsersInfo', 0, userId).call())
            .then(data => data.SwarmHash);
    }

    getBalance(address = this.fromAddress) {
        return this.web3.eth.getBalance(address)
            .then(balance => this.web3.utils.fromWei(balance, 'ether'));
    }

    getAddressByUsername(username) {
        return this.getTransaction('getAddressByUsername', 0, username).call();
    }

    getUsername(address) {
        return this.getTransaction('getUsername', 0, address).call();
    }

    getHashByUsername(username) {
        return this.getTransaction('getHashByUsername', 0, username).call();
    }

    findUser(username) {
        return this.getAddressByUsername(username)
            .then(address => {
                const addr = address === '0x0000000000000000000000000000000000000000' || !address ? null : address;
                if (addr) {
                    return this.getUserIdByAddress(address)
                        .then(userId => {
                            userId = Number(userId);
                            if (userId) {
                                return this.getTransaction('UsersInfo', 0, userId).call()
                                    .then(data => {
                                        data.userId = userId;

                                        return data;
                                    });
                            } else {
                                return null;
                            }
                        });
                } else {
                    return null;
                }
            });
    }

    addMessage(toUserId, message) {
        return this.sendTransaction('addMessage', '0', Number(toUserId), message);
    }

    getMessages(fromUserId, toUserId) {
        return this.getTransaction('getMessages', 0, Math.min(fromUserId, toUserId).toString(), Math.max(fromUserId, toUserId).toString()).call();
    }

    getMessage(id) {
        return this.getTransaction('Messages', 0, id).call();
    }
}
