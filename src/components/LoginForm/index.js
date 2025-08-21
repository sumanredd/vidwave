import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {isShow: false, username: '', password: '', showErrorMsg: ''}

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  onSubmitEvent = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const loginCredintials = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(loginCredintials),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showErrorMsg: data.error_msg})
    }
  }

  onShowPassword = () => {
    this.setState(prevState => ({isShow: !prevState.isShow}))
  }

  render() {
    const {isShow, showErrorMsg} = this.state
    return (
      <div className="LoginContainer">
        <div className="LoginCard">
          <div className="LoginImgContainer">
            <img
              className="LoginImg"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="Login"
            />
          </div>

          <form onSubmit={this.onSubmitEvent}>
            <div className="UsernameContainer">
              <label htmlFor="username" className="LoginLabel">
                Username
              </label>
              <br />
              <input
                onChange={this.username}
                autoComplete="off"
                id="username"
                type="text"
                className="LoginInput"
              />
            </div>

            <div>
              <label htmlFor="password" className="LoginLabel">
                Password
              </label>
              <br />
              {isShow ? (
                <input
                  onChange={this.password}
                  autoComplete="off"
                  id="password"
                  type="text"
                  className="LoginInput"
                />
              ) : (
                <input
                  onChange={this.password}
                  autoComplete="off"
                  id="password"
                  type="password"
                  className="LoginInput"
                />
              )}
            </div>
            <div
              style={{display: 'flex', alignItems: 'center', marginTop: '5px'}}
            >
              <input
                onClick={this.onShowPassword}
                id="showPass"
                type="checkbox"
              />
              <label className="showPassLabel" htmlFor="showPass">
                Show Password
              </label>
            </div>

            <div>
              <button type="submit" className="LoginButton">
                Login
              </button>
              <p className="errorMsg">{showErrorMsg}</p>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
