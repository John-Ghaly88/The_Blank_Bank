import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import DialogBox from "../components/DialogBox";
import AccountsTable from "../components/AccountsTable";
import Transactions from "../components/Transactions";
import NavigatibleView from "../components/NavigatibleView";
import AccountsView from "../components/AccountsView";

const SignOutDialog = (props) => {
  const signOutOptions = [
    { key: 0, label: "yes", action: props.handleConfirmation },
    { key: 1, label: "no", action: () => props.setVisible(false) },
  ];
  return (
    props.visible && (
      <DialogBox
        message="are you sure you want to sign out?"
        options={signOutOptions}
      />
    )
  );
};

const Dashboard = (props) => {
  const signOut = () => {
    localStorage.removeItem("jwt");
    router.replace("/");
  };

  const router = useRouter();
  const [viewSignOutDialog, setViewSignOutDialog] = useState(false);

  const navbarOptions = [
    { key: 0, label: "Accounts", action: null, selected: true },
    {
      key: 1,
      label: "Sign Out",
      action: () => setViewSignOutDialog(true),
      selected: false,
    },
  ];

  return (
    <>
      <SignOutDialog
        visible={viewSignOutDialog}
        setVisible={setViewSignOutDialog}
        handleConfirmation={signOut}
      />
      <NavBar title="Dashboard" options={navbarOptions} />
      <AccountsView />
    </>
  );
};

export default Dashboard;
