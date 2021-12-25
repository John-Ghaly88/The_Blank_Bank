import LoadingIcons from "react-loading-icons";
import IntroSideContainer from "../components/IntroSideContainer";
import styles from "../styles/RegisterLogin.module.scss";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";
import { userLogin } from "../services/login";
import { useRouter } from "next/router";

/*

After login do this: 
localStorage.setItem("jwt", JSON.stringify(token));  
router.replace("/");

*/

const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    if (!validateEmail(email)) {
      setErrorMsg("please enter a valid email");
      return;
    }

    if (!password) {
      setErrorMsg("password can't be empty");
      return;
    }

    const loginRes = userLogin({ email, password });
    setLoading(true);

    loginRes.then((res) => {
      setLoading(false);
      if (!res.success) {
        console.log(res.msg);
        setErrorMsg(res.msg);
      } else {
        router.replace("/");
      }
    });
  };
  return (
    <div className={`${styles.parentContainer}`}>
      <IntroSideContainer forSignIn={true} />

      <div className={styles.loginButtonContainer} onClick={handleSubmit}>
        <div className={`${styles.loginButton} unselectable`}>Sign in</div>
      </div>

      <div className={styles.rightContainer}>
        <h1 className={styles.signInTitle}>Sign in</h1>

        <Form className={styles.form} onSubmit={handleSubmit}>
          <FormGroup>
            <Label className={styles.label} for="email">
              Email
            </Label>
            <Input
              className={styles.input}
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <h6 className={styles.loginErrorMessage}>{errorMsg}</h6>
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="password">
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
            {loading && <LoadingIcons.ThreeDots stroke="#113311" />}
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
