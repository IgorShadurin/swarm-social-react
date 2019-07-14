import {useState} from 'react';
import {getWalletAddress} from '../api';

const useWallet = () => {
    const [walletKey, setWalletKey] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);

    const setWallet = async wallet => {
        setWalletKey(wallet);
        const address = await getWalletAddress(wallet);
        console.log('wallet', address);
        setWalletAddress(address);
    };

    return [{wallet: walletKey, walletAddress}, setWallet];
};

export default useWallet;
