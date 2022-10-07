import React, { useState, ChangeEvent, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";

interface Purchase {
  name: string;
  amount: number;
  date: string;
  index: number;
}

const Home: NextPage = () => {
  const [purchaseName, setPurchaseName] = useState<string>("");
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [purchaseDate, setPurchaseDate] = useState<string>("");

  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const [sortedPurchases, setSortedPurchases] = useState<Purchase[]>([]);

  function byDate(a: Purchase, b: Purchase) {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  }

  useEffect(() => {
    const dateSortedPurchases = purchases.sort(byDate);

    setSortedPurchases(dateSortedPurchases);
  }, [purchases]);

  const handleChangePurchaseName = (e: ChangeEvent<HTMLInputElement>) => {
    setPurchaseName(e.target.value);
  };

  const handleChangePurchaseAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setPurchaseAmount(parseFloat(e.target.value));
  };

  const handleChangePurchaseDate = (e: ChangeEvent<HTMLInputElement>) => {
    setPurchaseDate(e.target.value);
  };

  const resetForm = () => {
    setPurchaseName("");
    setPurchaseAmount(0);
    setPurchaseDate("");
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
      /*     // date comes out automatically formatted as yyyy/mm/dd and
      // isn't consistent with the input format
      let splitDate = purchaseDate.split("-");
      let month = splitDate[1];
      let day = splitDate[2];
      let year = splitDate[0];
      let formattedDate = `${month}-${day}-${year}`;
*/
      setPurchases((prevPurchases) => [
        ...prevPurchases,
        {
          name: purchaseName,
          amount: purchaseAmount,
          date: purchaseDate,
          index: index,
        },
      ]);

      resetForm();
    }
  };

  const removeFromPurchases = (purchaseIndex: number) => {
    setPurchases(
      purchases.filter((purchase) => purchase.index !== purchaseIndex)
    );
  };

  const faviconImageUrl: string =
    "https://images.unsplash.com/photo-1572859704906-ab0716da285f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80";

  return (
    <>
      <Head>
        <title> ¿ Where did my money go ?</title>
        <meta name="description" content="Home page for content" />
        <link rel="icon" href={faviconImageUrl} />
      </Head>
      <NavBar />

      <main className={styles.main}>
        <form onSubmit={submitPurchase} className={styles.purchaseForm}>
          <div className={styles.formInputsDiv}>
            <div className={styles.formControl}>
              <label htmlFor="purchase-name-input">Purchase Name</label>
              <input
                id="purchase-name-input"
                className={styles.purchaseInput}
                placeholder="Purchase Name"
                type="text"
                onChange={handleChangePurchaseName}
                name="Purchase name"
                role="textbox"
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
                name="Purchase amount"
                role="textbox"
              />
            </div>

            <div className={styles.formControl}>
              <label htmlFor="purchase-date-input"> Purchase Date</label>
              <input
                id="purchase-date-input"
                className={styles.purchaseInput}
                onChange={handleChangePurchaseDate}
                value={purchaseDate}
                type="date"
                name="Purchase date"
                role="textbox"
              />
            </div>

            <div className={styles.formControl}>
              <label htmlFor="purchase-category-selector">
                {" "}
                Purchase Category
              </label>

              <select
                className={styles.purchaseInput}
                id="purchase-category-selector"
                name="Purchase category"
                role="select"
              >
                <option value="food">Food</option>
                <option value="housing">Housing</option>
                <option value="transportation">Transportation</option>
              </select>
            </div>
          </div>

          <button type="submit" className={styles.submitPurchaseButton}>
            {" "}
            Submit Purchase
          </button>
        </form>{" "}
        <div className={styles.purchasesList} aria-live="assertive">
          {purchases.length > 0 ? (
            <>
              {purchases.map((purchase) => (
                <div
                  tabIndex={0}
                  key={purchase.index}
                  className={styles.purchaseTile}
                >
                  <span className={styles.purchaseInfo}>
                    <span className={styles.purchaseTileDateSpan}>
                      <p>
                        {" "}
                        <b>{purchase.date}</b>
                      </p>
                    </span>

                    <span className={styles.purchaseTilePurchasesSpan}>
                      <p>
                        {" "}
                        <b>Purchase Name:</b> {purchase.name}
                      </p>
                    </span>

                    <span className={styles.purchaseTileAmountSpan}>
                      <p>
                        {" "}
                        <b>Purchase Amount:</b> ${purchase.amount}
                      </p>
                    </span>
                  </span>

                  <button
                    onClick={() => removeFromPurchases(purchase.index)}
                    className={styles.purchaseTileButton}
                    aria-label="Delete purchase button."
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
    </>
  );
};

export default Home;
