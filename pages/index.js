import React from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import HeadComponent from '../components/Head';

// Constants
const TWITTER_HANDLE = "im_ikenwa";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // Fetch the user's public key (wallet address) from any supported wallet
  const { publicKey } = useWallet();

  const renderNotConnectedContainer = () => (
    <div>
      <img src="https://media.giphy.com/media/fY6aIWIkX0EB4vUyXm/giphy.gif" alt="emoji" width="480"/>

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
    </div>
  )
  
  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header">👟 Welcome to <span>Augustine</span> Sneakerz eShop 👟</p>
          <p className="sub-text">The only sneakerz shop that accepts sh*tcoins for dope sh*t... No CAP 👌</p>
        </header>

        <main>
          {/** Render the "Connected" button if publicKey exists */}
          {publicKey ? 'Connected!' : renderNotConnectedContainer()}
        </main>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
          <p className="footer-text">Built by&nbsp;
          <a
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`@${TWITTER_HANDLE}`}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
