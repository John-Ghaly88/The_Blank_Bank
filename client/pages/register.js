import IntroSideContainer from "../components/IntroSideContainer";
import styles from "../styles/RegisterLogin.module.scss";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneRegex =
    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

  const validateInfo = () => {
    if (!emailRegex.test(email)) {
      showModal(
        "Invalid email",
        "Please make sure you entered a valid email and try again"
      );
      return false;
    } else if (!email.endsWith("giu-uni.de")) {
      showModal(
        "Invalid GIU email",
        "Please make sure you entered a valid GIU email and try again (must contain giu-uni.de)"
      );
      return false;
    } else if (id.length < 7) {
      showModal(
        "Invalid ID",
        "Please make sure ID is atleast 7 characters long"
      );
      return false;
    } else if (username.length < 1) {
      showModal("Invalid username", "Please make sure username is not empty");
      return false;
    } else if (name.length < 1) {
      showModal("Invalid name", "Please make sure name is not empty");
      return false;
    } else if (!phoneRegex.test(phone)) {
      showModal(
        "Invalid phone",
        "Please make sure you entered a valid phone and try again (Ex: +201001234567)"
      );
      return false;
    } else if (password.length < 7) {
      showModal(
        "Invalid password",
        "Please make sure password is atleast 7 characters long"
      );
      return false;
    } else if (password != passwordConfirm) {
      showModal("Passwords don't match", "Please make sure passwords match");
      return false;
    }

    return true;
  };

  const sendSignUpRequest = async () => {
    showLoadingModal();
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        name,
        email,
        id,
        username,
        phone,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("jwt", JSON.stringify(token));
      router.replace("/");
    } catch (e) {
      if (e.response.data.message) {
        showModal("Error", e.response.data.message);
      } else {
        showModal("Error", "An unknown error has occured, please try again");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirm_password") {
      setPasswordConfirm(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "id") {
      setId(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className={`${styles.parentContainer}`}>
      <IntroSideContainer forSignIn={false} />

      <div className={styles.loginButtonContainer}>
        <div
          className={`${styles.loginButton} unselectable`}
          onClick={() => {
            if (validateInfo()) {
              sendSignUpRequest();
            }
          }}
        >
          Sign up
        </div>
      </div>

      <div className={styles.rightContainer}>
        <h1 className={styles.signInTitle}>Sign up</h1>

        <Form className={styles.form} onSubmit={handleSubmit}>
          <FormGroup>
            <Label className={styles.label} for="email">
              GIU Email
            </Label>

            <Input
              className={styles.input}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              GIU ID
            </Label>

            <Input
              className={styles.input}
              type="text"
              name="id"
              id="id"
              placeholder="Enter your ID"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              Username
            </Label>

            <Input
              className={styles.input}
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              Name
            </Label>

            <Input
              className={styles.input}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              Phone
            </Label>

            <Input
              className={styles.input}
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your phone"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              Password
            </Label>

            <Input
              className={styles.input}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              Confirm Password
            </Label>

            <Input
              className={styles.input}
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Re-enter your password"
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
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
}
