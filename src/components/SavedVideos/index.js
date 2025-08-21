import {Component} from 'react'
import './index.css'
import {FaFire} from 'react-icons/fa'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../NavBar'
import SavedVideosList from '../SavedVideosList'
import ThemeContext from '../../ThemeContext'
import Header from '../Header'

class SavedVideos extends Component {
  render() {
    const getCookies = Cookies.get('jwt_token')
    if (getCookies === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {mode, savedList} = value
          const styling = mode === 'Dark-Mode' ? 'Dark_Mode_Trending' : ''
          return (
            <>
              <Header />
              <div className="TrendingFlex">
                <Navbar />
                <div className="VideosWrapperSaved">
                  <div className={`VideosContainerSaved ${styling}`}>
                    <h1 className="TrendingText">
                      <span style={{color: 'red'}}>
                        <FaFire />
                      </span>{' '}
                      Saved Videos
                    </h1>
                    <div>
                      {savedList.length === 0 ? (
                        <div className="noVideosContainer">
                          <img
                            alt="no saved videos"
                            className="noVideos"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                          />
                          <p className="noVideosText">No Saved Videos Found</p>
                        </div>
                      ) : (
                        <ul className="VideosULSaved">
                          {savedList.map(eachVideo => (
                            <SavedVideosList
                              VideoData={eachVideo}
                              key={eachVideo.id}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default SavedVideos
