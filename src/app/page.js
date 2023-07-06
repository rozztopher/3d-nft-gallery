"use client";
import styles from "./page.module.css";
import ConnectWallet from "@/components/connect/ConnectWallet";
import Experience from "@/components/experience/Experience";
import { useSelector } from "react-redux";

export default function Home() {
  const address = useSelector((state) => state.user.address);

  return (
    <main className={styles.main}>
      {address && <Experience />}
      {!address && <ConnectWallet />}
    </main>
  );
}
