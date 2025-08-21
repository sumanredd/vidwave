import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Navbar from '../NavBar'
import Videos from '../Videos'
import './index.css'

class Home extends Component {
  render() {
    const getCookies = Cookies.get('jwt_token')
    if (getCookies === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="HomeFlex">
          <Navbar />
          <div className="VideosWrapper">
            <Videos />
          </div>
        </div>
      </>
    )
  }
}
export default Home
