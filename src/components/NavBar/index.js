import {Component} from 'react'
import {IoMdHome} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {withRouter} from 'react-router-dom'
import {RiMenuAddFill} from 'react-icons/ri'
import './index.css'
import ThemeContext from '../../ThemeContext'

class Navbar extends Component {
  home = () => {
    const {history} = this.props
    history.replace('/')
  }

  trending = () => {
    const {history} = this.props
    history.replace('/trending')
  }

  gaming = () => {
    const {history} = this.props
    history.replace('/gaming')
  }

  save = () => {
    const {history} = this.props
    history.replace('/saved-videos')
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {mode} = value
          const styling = mode === 'Dark-Mode' ? 'Dark_Mode_Navbar' : ''

          return (
            <div className={`NavbarContainer ${styling}`}>
              <ul className="NavbarUl">
                <li onClick={this.home} className={`NavbarLi ${styling}`}>
                  <IoMdHome className="NavbarIcons" /> Home
                </li>
                <li onClick={this.trending} className={`NavbarLi ${styling}`}>
                  <FaFire className="NavbarIcons" /> Trending
                </li>
                <li onClick={this.gaming} className={`NavbarLi ${styling}`}>
                  <SiYoutubegaming className="NavbarIcons" /> Gaming
                </li>
                <li onClick={this.save} className={`NavbarLi ${styling}`}>
                  <RiMenuAddFill className="NavbarIcons" /> Saved Videos
                </li>
              </ul>

              <div className="contactUsSection">
                <p className="contactUsHeading">contact Us</p>
                <div>
                  <img
                    className="contactUsImg"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                  <img
                    className="contactUsImg"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <img
                    className="contactUsImg"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default withRouter(Navbar)
