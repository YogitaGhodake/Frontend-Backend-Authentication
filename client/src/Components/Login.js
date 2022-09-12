import '../../src/App.css';
import { useState } from 'react';
import Axios from 'axios';

var stepTracker2 = 1;

const Registration = (props) => {

  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);



  const register = () => {

    try {
      Axios.post('http://localhost:3001/register', {
        username: usernameReg,
        password: passwordReg,
      }).then((response) => {
        console.log(response, "response-20");

        if (response.data.message) {
          alert("User Registered successfully");
          props.onSuccess(props);
        } else {
          alert("Registration Failed, try different Username and password")
        }

        setUsernameReg('');
        setPasswordReg('');
        setSuccess(true);
      });

    } catch (err) {
      if (!err?.response) {
        setErrMsg('NO Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password.');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      }
    }

  };



  return (
    <div className="login-wrapper">
      <div className="form">
        {/* <h3>Please register your self</h3> */}
        <img src="img/avatar.png" alt="" />
        <h2>REGISTRATION</h2>
        <div className="input-group">

          <input
            type="text"
            onChange={(e) => { setUsernameReg(e.target.value); }}
            value={usernameReg}
            autoComplete="off"
            id="loginUser"
            required />

          <label htmlFor="loginUser">User Name</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            onChange={(e) => { setPasswordReg(e.target.value) }}
            value={passwordReg}
            id="loginPassword"
            required />
          <label htmlFor="loginPassword">Password</label>
        </div>

        <button
          onClick={() => {
            register()

          }}
          className="submit-btn">
          Register
        </button>
      </div>
    </div>

  )

};


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [success, setSuccess] = useState(false);

  const [stepTracker2, setstepTracker2] = useState(1);


  const login = () => {

    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {
      // console.log(response.data.token, "response");
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        // console.log(response, "response==> 26")
        //user logged in
        setLoginStatus(response.data.user.username);
        setUsername("");
        setPassword("");
        setSuccess(true);
        setstepTracker2(3);
        console.log("stepTracker2", stepTracker2)
      }

      Axios.get('http://localhost:3001/allUsers', {
        headers: {
          'x-access-token': response.data.token
        }
      }).then((response) => {

        setAllUsers(response.data.result);
        console.log(response.data.result, "response== 38");
        console.log(allUsers, "==> 39");

      });

    });
  };

  // function setStepTracker2Reg  (data)  {
  //   stepTracker2 = 2;
  //   console.log("stepTracker2 ==> 157", stepTracker2)
  //   alert(stepTracker2);
  // }

  const setStepTracker2Reg = () => {
    setstepTracker2(2);
    console.log("stepTracker2 ==> 157", stepTracker2)
    alert(stepTracker2);
  }


  return (
    <>
    {stepTracker2 == 1 ? (
        <Registration
          onSuccess={() => {
            setStepTracker2Reg()
          }
          } />

      ) : (
        <div className="login-wrapper">
          <div className="form" >
            {stepTracker2 == 2 ? (
              <div className='login-subdiv'>
                <img src="./public/images/avatar.jpg" alt="" />
                <h2>Login</h2>
                <div className="input-group">
                  <input
                    type="text"
                    name="loginUser"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    id="loginUser" required />
                  <label htmlFor="loginUser">User Name</label>
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="loginPassword"
                    id="loginPassword"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required />
                  <label htmlFor="loginPassword">Password</label>
                </div>

                <button
                  onClick={() => {
                    login()
                  }
                  }
                  value="Login"
                  className="submit-btn"
                >
                  Login
                </button>

              </div>
            ) : (
              null
            )}
            {/* <h2> {loginStatus}</h2> */}



            {stepTracker2 == 3 ? (
              <div>
                <h2>Confidential Data</h2>
                <table className="table">

                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Username</th>
                      <th scope="col">Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allUsers.map((user, i) => <tr>

                        <th scope="row">{user.id}</th>
                        <td>{user.username}</td>
                        <td>{user.password}</td>

                      </tr>
                      )}
                  </tbody>
                </table>
                <button className='submit-btn'
                
                onClick={(e) => {
                  setstepTracker2(2);
                }}



                >Clear</button>


              </div>
            ) : (
              null
            )}

          </div>
        </div>
      )}
    </>
  )
}


export default Login;