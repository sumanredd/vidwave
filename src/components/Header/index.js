import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {FaMoon, FaSun} from 'react-icons/fa'
import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'
import ThemeContext from '../../ThemeContext'
import './index.css'

class Header extends Component {
  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.push('/login')
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {mode, toggleMode} = value
          const styling = mode === 'Dark-Mode' ? 'Dark_Mode' : ''
          const ontoggleMode = () => {
            toggleMode()
          }

          return (
            <div className={`HeaderContainer ${styling}`}>
              <img
                className={`HeaderImg ${styling}`}
                src={
                  styling !== ''
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="Header Logo"
              />
              <div style={{display: 'flex', alignItems: 'center'}}>
                {styling !== '' ? (
                  <FaSun onClick={ontoggleMode} className="moonLogo" />
                ) : (
                  <FaMoon onClick={ontoggleMode} className="moonLogo" />
                )}

                <img
                  alt="profile"
                  className="profileImg"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                />

                <button
                  onClick={this.onLogout}
                  className="HeaderBtn"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
