import React from 'react';


function LoginBox() {
    return (
      <div className="login-container">
        <h2>Member Login</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="actions">
            <button type="submit">Login</button>
            <div className="links">
              <a href="#">New User?</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
  

  
export default LoginBox;