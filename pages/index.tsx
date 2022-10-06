import React, { useState, ChangeEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [purchaseName, setPurchaseName] = useState<string>("");
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);

  const [purchases, setPurchases] = useState<
    { name: string; amount: number; index: number }[]
  >([]);

  const handleChangePurchaseName = (e: ChangeEvent<HTMLInputElement>) => {
    setPurchaseName(e.target.value);
  };

  const handleChangePurchaseAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setPurchaseAmount(parseFloat(e.target.value));
  };

  const submitPurchase = (e: any) => {
    e.preventDefault();

    setPurchases((prevPurchases) => [
      ...prevPurchases,
      {
        name: purchaseName,
        amount: purchaseAmount,
        index: purchases.length + 1,
      },
    ]);
  };

  const removeFromPurchases = (purchaseIndex: number) => {
    setPurchases(
      purchases.filter((purchase) => purchase.index !== purchaseIndex)
    );
  };

  const faviconImageUrl: string =
    "https://images.unsplash.com/photo-1572859704906-ab0716da285f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80";

  return (
    <div className={styles.container}>
      <Head>
        <title>Where did my money go ?</title>
        <meta name="description" content="Home page for content" />
        <link rel="icon" href={faviconImageUrl} />
      </Head>

      <main className={styles.main}>
        <h1>Where did my money go?</h1>
        <form onSubmit={submitPurchase} style={{ display: "grid" }}>
          <label htmlFor="purchase-name-input">Purchase Name</label>
          <input
            id="purchase-name-input"
            className={styles.purchaseInput}
            placeholder="Purchase Name"
            type="text"
            onChange={handleChangePurchaseName}
            aria-label="Purchase name input"
          />
          <label htmlFor="purchase-amount-input"> Purchase Amount</label>
          <input
            id="purchase-amount-input"
            className={styles.purchaseInput}
            placeholder="Purchase Amount"
            type="number"
            step=".01"
            onChange={handleChangePurchaseAmount}
            aria-label="Purchase amount input"
          />
          <button type="submit"> Submit Purchase</button>
        </form>
        <div className={styles.purchasesList}>
          {purchases.length > 0 ? (
            <>
              {purchases.map((purchase, index) => (
                <div key={index} className={styles.purchaseTile}>
                  <button onClick={() => removeFromPurchases(index)}>X</button>
                  <p>
                    {" "}
                    <u>Purchase:</u> {purchase.name}
                  </p>
                  <p>
                    {" "}
                    <u>Amount:</u> ${purchase.amount}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <>No purchases in the system</>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
