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

  const resetForm = () => {
    setPurchaseName("");
    setPurchaseAmount(0);
  };

  const submitPurchase = (e: any) => {
    e.preventDefault();

    if (purchaseName === "" && purchaseAmount === 0) {
      alert("Please fill all input fields");
      return;
    } else if (purchaseName === "") {
      alert("Please fill purchase name input field");
    } else if (purchaseAmount === 0 || null || undefined) {
      alert("Please fill purchase amount input field");
    } else {
      let index = purchases.length + 1;

      setPurchases((prevPurchases) => [
        ...prevPurchases,
        {
          name: purchaseName,
          amount: purchaseAmount,
          index: index,
        },
      ]);

      resetForm();
    }
  };

  const removeFromPurchases = (purchaseIndex: number) => {
    console.log(purchaseIndex);
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
        <form
          onSubmit={submitPurchase}
          style={{ display: "grid", gap: "1rem" }}
        >
          <div className={styles.formInputsDiv}>
            <div className={styles.formControl}>
              <label htmlFor="purchase-name-input">Purchase Name</label>
              <input
                id="purchase-name-input"
                className={styles.purchaseInput}
                placeholder="Purchase Name"
                type="text"
                onChange={handleChangePurchaseName}
                aria-label="Purchase name input."
                value={purchaseName}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="purchase-amount-input"> Purchase Amount</label>
              <input
                id="purchase-amount-input"
                className={styles.purchaseInput}
                placeholder="Purchase Amount"
                value={purchaseAmount}
                type="number"
                step=".01"
                onChange={handleChangePurchaseAmount}
                aria-label="Purchase amount input."
              />
            </div>
          </div>

          <button type="submit" className={styles.submitPurchaseButton}>
            {" "}
            Submit Purchase
          </button>
        </form>
        <div className={styles.purchasesList} aria-live="assertive">
          {purchases.length > 0 ? (
            <>
              {purchases.map((purchase) => (
                <div key={purchase.index} className={styles.purchaseTile}>
                  <span className={styles.purchaseTileDecorSpan}></span>
                  <span className={styles.purchaseTilePurchasesSpan}>
                    <p>
                      {" "}
                      <u>Purchase:</u> {purchase.name}
                    </p>
                  </span>
                  <span className={styles.purchaseTileAmountSpan}>
                    <p>
                      {" "}
                      <u>Amount:</u> ${purchase.amount}
                    </p>
                  </span>

                  <button
                    onClick={() => removeFromPurchases(purchase.index)}
                    className={styles.purchaseTileButton}
                    aria-label="Delete purchase."
                  >
                    X
                  </button>
                </div>
              ))}
            </>
          ) : (
            <>No purchases in the system</>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
