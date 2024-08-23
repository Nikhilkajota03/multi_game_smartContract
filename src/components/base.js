import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "./components/Button";
import "./App.css";

const NETWORK_ID = '2221';

function App() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [val, setVal] = useState(null);

    const toastObj = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const checkExtension = async () => {
        if (window.ethereum === undefined) {
            toast.info("No Wallet Detected!", toastObj);
            return false;
        }
        await initializeProviderAndSigner();
        return true;
    };

    const initializeProviderAndSigner = async () => {
        let _provider = new ethers.providers.Web3Provider(window.ethereum);
        let _signer = _provider.getSigner(0);
        setProvider(_provider);
        setSigner(_signer);
    };

    const checkNetwork = async (networkId) => {
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        return currentChainId === ethers.utils.hexlify(parseInt(networkId));
    };

    const connectWallet = async () => {
        if (await checkExtension() && await checkNetwork(NETWORK_ID)) {
            const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setSelectedAddress(selectedAddress);
            setIsWalletConnected(true);

            window.ethereum.on("accountsChanged", ([newAddress]) => {
                toast(`Account Changed to ${newAddress}`, toastObj);
                setSelectedAddress(newAddress);
            });
            return;
        }
        toast(`Connect to Network Name: Kava EVM Testnet
        New RPC URL: https://evm.testnet.kava.io
        Chain ID: 2221
        Currency Symbol: KAVA
        Explorer URL: https://explorer.testnet.kava.io`, toastObj);
    };

    useEffect(() => {
        if (isWalletConnected) {
            toast("Wallet Connected Successfully!", toastObj);
        }
    }, [isWalletConnected]);

    return (
        <div className="main">
            <Header />
            {!isWalletConnected ?
                <>
                    <Summary />
                    <Button title="Connect Wallet" func={connectWallet} />
                    <ToastContainer />
                </>
                :
                <>
                    <Detail />
                    {val === null ? "loading" : <Value val={val.toString().toUpperCase()} />}
                    <br />
                    <div className="btns"></div>
                </>
            }
        </div>
    );
}

export default App;
