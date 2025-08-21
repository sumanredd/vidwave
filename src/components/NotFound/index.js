import {Component} from 'react'
import './index.css'
// import ThemeContext from '../../ThemeContext'

class NotFound extends Component {
  render() {
    return (
      <div className="notFoundContainer">
        <img
          alt="Not Found"
          className="notFound"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        />
      </div>
    )
  }
}

export default NotFound
