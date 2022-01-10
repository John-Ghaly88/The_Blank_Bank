import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import styles from "../styles/newTransfer.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import Arrow from "../assets/arrow.png";
import { useRouter } from "next/router";
import axios from "../services/apiService";

const Transfer = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [transferType, setTransferType] = useState("internal");
  const [accountId, setAccountId] = useState(props.accounts[0]._id);
  const [recepientAccountNum, setRecepientAccountNum] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [message, setMessage] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [isDissmissable, setIsDissmissable] = useState(true);

  const router = useRouter();

  const showModal = (title, text) => {
    setModalTitle(title);
    setModalText(text);
    setIsDissmissable(true);
    setModalOpen(true);
  };

  const showLoadingModal = () => {
    setModalTitle("Loading");
    setModalText("");
    setIsDissmissable(false);
    setModalOpen(true);
  };

  const validateInfo = () => {
    if (recepientAccountNum.length < 12) {
      showModal(
        "Invalid recepient account number",
        "Please make sure you entered a valid 12 digit account number"
      );
      return false;
    } else if (transferType === "external" && amount > 50) {
      showModal(
        "Amount exceeds maximum",
        "External transfers are limited to $50 per transfer"
      );
      return false;
    } else if (amount <= 0) {
      showModal(
        "Invalid amount",
        "Please make sure you entered a valid amount"
      );
      return false;
    } else if (message.length === 0) {
      showModal("Invalid message", "Please enter a message");
      return false;
    }

    return true;
  };

  const sendTransferRequest = async () => {
    showLoadingModal();
    if (transferType === "internal") {
      try {
        const res = await axios.post(
          `http://localhost:3001/transactions/${accountId}/transfers`,
          {
            receiverAccountNumber: recepientAccountNum,
            amount,
            description: message,
          }
        );
        if (res.data?.status == 401) {
          localStorage.removeItem("jwt");
        }
        router.replace("/");
      } catch (e) {
        if (e.response.data.message) {
          showModal("Error", e.response.data.message);
        } else {
          showModal("Error", "An unknown error has occured, please try again");
        }
      }
    } else {
      try {
        const res = await axios.post(
          `http://localhost:3001/external/transferout/${accountId}`,
          {
            receiverAccountNumber: recepientAccountNum,
            amount,
            description: message,
          }
        );
        if (res.data?.status == 401) {
          localStorage.removeItem("jwt");
        }
        router.replace("/");
      } catch (e) {
        if (e.response.data.message) {
          showModal("Error", e.response.data.message);
        } else {
          showModal("Error", "An unknown error has occured, please try again");
        }
      }
    }
  };

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "recepient") {
      setRecepientAccountNum(value);
    } else if (name === "amount") {
      setAmount(+value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div>
        <Label className={styles.label}>
          {" "}
          Type of transfer (External transfers deduct an additional $5 fee)
        </Label>
        <div>
          <Button
            onClick={() => {
              setTransferType("internal");
            }}
            outline={transferType !== "internal"}
            color="secondary"
          >
            {" "}
            Internal{" "}
          </Button>{" "}
          &nbsp; &nbsp; &nbsp;
          <Button
            outline={transferType !== "external"}
            onClick={() => {
              setTransferType("external");
            }}
            color="secondary"
          >
            {" "}
            External{" "}
          </Button>{" "}
        </div>
        <br />

        <Label className={styles.label}> Account to transfer from </Label>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret outline color="secondary">
            {props.accounts.find((value) => value._id === accountId).accountNo}
          </DropdownToggle>
          <DropdownMenu>
            {props.accounts.map((value) => {
              return (
                <DropdownItem
                  onClick={() => setAccountId(value._id)}
                  key={value._id}
                >
                  {" "}
                  {value.accountNo}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <br />

        <Label className={styles.label}> Recepient account </Label>
        <Input
          className={styles.input}
          type="text"
          name="recepient"
          id="Recepient"
          placeholder="Enter his/her account number"
          value={recepientAccountNum}
          maxLength={12}
          onChange={handleChange}
        />
        <br />

        <Label className={styles.label}> Amount </Label>
        <Input
          className={styles.input}
          type="number"
          name="amount"
          id="Amount"
          placeholder="Enter the amount"
          onChange={handleChange}
        />
        <br />

        <Label className={styles.label}> Message </Label>
        <Input
          className={styles.input}
          type="text"
          name="message"
          id="Message"
          placeholder="Enter a brief message"
          onChange={handleChange}
        />
      </div>

      <div className={styles.rightViewContainer}>
        <div className={styles.summaryContainer}>
          {accountId && (
            <div className={styles.summaryItemContainer}>
              <p className={styles.accountNumberText}>
                {
                  props.accounts.find((value) => value._id === accountId)
                    .accountNo
                }
              </p>
              {amount ? (
                <p className={styles.deductText}>{`- $${
                  amount + (transferType === "external" ? 5 : 0)
                }`}</p>
              ) : undefined}
            </div>
          )}
          {accountId && recepientAccountNum && (
            <>
              <div className={styles.arrow}>
                <Image src={Arrow} alt="right facing arrow" />
              </div>
              <div className={styles.summaryItemContainer}>
                {" "}
                <p className={styles.accountNumberText}>
                  {recepientAccountNum}
                </p>
                {amount ? (
                  <p className={styles.increaseText}>{`+ $${amount}`}</p>
                ) : undefined}
              </div>
            </>
          )}
        </div>
      </div>
      <div
        onClick={() => {
          if (validateInfo()) {
            sendTransferRequest();
          }
        }}
        className={styles.SendButtonContainer}
      >
        <div className={`${styles.SendButton} unselectable`}>Send</div>
      </div>
      <Modal isOpen={modalOpen} centered auto>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalBody>{modalText}</ModalBody>
        {isDissmissable && (
          <ModalFooter>
            <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>
              Dismiss
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </div>
  );
};

export default Transfer;
