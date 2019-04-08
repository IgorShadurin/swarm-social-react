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
            4: '0xecfe6466c90c276ea740677c647146b4e99a2de1',
        };
        this.contractAddress = this.networkContracts[networkId];
        this.ABI = [
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
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
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
            throw 'Incorrect invite size';
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

                return this.web3.eth.estimateGas(result);
            })
            .then(estimateGas => {
                // estimateGas is just a number, not wei
                // add +10%
                estimateGas = Math.round(estimateGas + estimateGas * 0.1);
                const estimateGasBN = this.web3.utils.toBN(estimateGas);
                const gasPriceBN = this.web3.utils.toBN(result.gasPrice);
                const valueBN = this.web3.utils.toBN(result.value);
                const totalGasBN = gasPriceBN.mul(estimateGasBN);
                let resultValue = Number(balanceEther) === 0 ? 0 : valueBN.sub(totalGasBN);
                if (resultValue.negative) {
                    throw 'Too low balance';
                }

                result.value = this.web3.utils.toHex(resultValue);
                result.nonce = this.web3.utils.toHex(result.nonce);
                result.gasPrice = this.web3.utils.toHex(gasPriceBN);
                result.gasLimit = this.web3.utils.toHex(estimateGasBN);

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
                            //console.log(hash);
                        })
                        .on('receipt', function (receipt) {
                            console.log(receipt);
                        })
                        .on('confirmation', function (confNumber, receipt) {
                            console.log(confNumber, receipt);
                        })
                        .on('error', function (error, receipt) {
                            if (receipt) {
                                resolve(receipt);
                            } else {
                                reject(error);
                            }
                        });
                });
            });
    }

    createInvite(invite, toAddress, fileHash, balance = '0.001') {
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

    setUsername(username) {
        return this.sendTransaction('setUsername', '0', username);
    }

    getWalletHashByAddress(address) {
        return this.getTransaction('Wallets', 0, address).call()
            .then(userId => this.getTransaction('UsersInfo', 0, userId).call())
            .then(data => data.WalletFileHash);
    }

    getBalance(address = this.fromAddress) {
        return this.web3.eth.getBalance(address)
            .then(balance => this.web3.utils.fromWei(balance, 'ether'));
    }
}
