import React, { useState } from "react";
import Transactions from "./Transactions";
import AccountsTable from "./AccountsTable";
import NavigatibleView from "./NavigatibleView";
import Transfer from "./Transfer";

const AccountsView = (props) => {
  const [currentView, setCurrentView] = useState("Accounts");
  const [previousView, setPreviousView] = useState("");

  const handleTransferSelect = (accounts) => {
    setViews({
      ...views,
      Transfer: <Transfer accounts={accounts} />,
    });
    setPreviousView("Accounts");
    setCurrentView("Transfer");
  };

  const handleTransactionSelect = (id) => {
    setViews({
      ...views,
      Transactions: <Transactions id={id} />,
    });
    setPreviousView("Accounts");
    setCurrentView("Transactions");
  };

  const handlePrevSelect = () => {
    switch (previousView) {
      case "Accounts":
        setCurrentView("Accounts");
        setPreviousView("");
    }
  };

  const [views, setViews] = useState({
    Accounts: (
      <AccountsTable
        handleTransactionSelect={handleTransactionSelect}
        handleTransferSelect={handleTransferSelect}
      />
    ),
  });

  return (
    <>
      <NavigatibleView
        views={views}
        current={currentView}
        previous={previousView}
        handlePrevSelect={handlePrevSelect}
      />
    </>
  );
};
export default AccountsView;
