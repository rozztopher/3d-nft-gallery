"use client";
import { useDispatch } from "react-redux";
import { setAddress, setNfts } from "@/state/userSlice";
import axios from "axios";

const ConnectWallet = () => {
  const dispatch = useDispatch();

  const getNFTs = (address) => {
    const endpoint = `https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/getNFTsForOwner?owner=${process.env.NEXT_PUBLIC_TEST_ADDRESS}&withMetadata=true&pageSize=100`
    axios.get(endpoint).then((res) => {
      console.log(res.data.ownedNfts)
      dispatch(setNfts(res.data.ownedNfts))
    });
  }

  const handleMetamask = async () => {
    const provider = window.ethereum;
    if (typeof provider !== undefined) {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          dispatch(setAddress(accounts[0]))
          getNFTs(accounts[0])
        })
        .catch((err) => {
          console.log(err);
          return;
        });
      window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(setAddress(accounts[0]))
        getNFTs(accounts[0])
      });
    } else {
      alert("Please install wallet");
    }
  };

  const buttonStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: "1rem",
    borderRadius: "5px",
    backgroundColor: "#5d5bbc",
    color: "#FFFFFF",
    cursor: "pointer"
  }

  return (
      <div style={buttonStyle} onClick={handleMetamask}>Connect Wallet</div>
  );
};

export default ConnectWallet;
