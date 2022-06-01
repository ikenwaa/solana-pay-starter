import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import BigNumber from 'bignumber.js'
import products from './products.json'

const sellerAddress = "6d2zjJN7JHbHhX2qdHY4kRkRP7YhTdX6Ca9chpqkPGbR"
const sellerPublicAddress = new PublicKey(sellerAddress);

const createTransaction = async (req, res) => {
    try {
        // Extract the transaction data from the request body.
        const { buyer, orderID, itemID } = req.body;
    }
}
