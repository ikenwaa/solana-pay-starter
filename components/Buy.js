import React, { useState, useMemo } from "react";
import { Keypair, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { InfinitySpin } from "react-loader-spinner";
import IPFSDownload from "./IpfsDownload";

export default function Buy({ itemID }){
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    // Generate public key that will be used to identify the order
    const orderID = useMemo(() => Keypair.generate().publicKey, []);

    const [paid, setPaid] = useState(null);
    const [loading, setLoading] = useState(false)

    // useMemo() computes the values if the dependecies change
    const order = useMemo(
        () => ({
            buyer: publicKey.toString(),
            orderID: orderID.toString(),
            itemID: itemID,
        }),
        [publicKey, orderID, itemID]
    );

    // Fetch transaction object from the server
    const processTransaction = async () => {
        setLoading(true);
        const txResponse = await fetch("../api/createTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order)
        });
        const txData = await txResponse.json();

        // Create a transaction object
        const tx = Transaction.from(Buffer.from(txData.transaction, "base64"));
        console.log("Tx data is", tx);

        // Attempt to send the transaction
        try {
            // Send the transaction to the network
            const txHash = await sendTransaction(tx, connection);
            console.log(`Transaction sent: https://solscan.io/tx/${txHash}?cluster=devnet`);
            setPaid(true);
        } catch (err){
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    if (!publicKey) {
        return (
            <div>
                <p>You need to connect your wallet to buy cool stuffs.</p>
            </div>
        );
    }

    if(loading){
        return <InfinitySpin color="yellow" />
    }

    return (
        <div>
            {paid ? (
                <IPFSDownload filename="storage_boxes.zip" hash="QmRcNVdvrCBkLTpLNMjz3iuu7Z79y1X8ihyVqvzquPqZDF" cta="Download images" />
            ) : (
                <button disabled={loading} className="buy-button" onClick={processTransaction}>
                    Buy now 💰
                </button>
            )}
        </div>
    );
}