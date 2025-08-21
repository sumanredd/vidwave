import {Component} from 'react'
import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import VideoList from '../VideosList'
import ThemeContext from '../../ThemeContext'

class Videos extends Component {
  state = {isBanner: true, VideosData: [], isLoading: true, Search: ''}

  searchValue = ''

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const url = 'https://apis.ccbp.in/videos/all?search='
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedVideosData = data.videos.map(each => ({
        channel: each.channel,
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        publishedAt: each.published_at,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({VideosData: updatedVideosData, isLoading: false})
    }
  }

  removeBanner = () => {
    this.setState({isBanner: false})
  }

  onSearch = event => {
    this.searchValue = event.target.value
  }

  onSearchBtn = () => {
    this.setState({Search: this.searchValue})
  }

  render() {
    const getCookies = Cookies.get('jwt_token')
    if (getCookies === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {mode} = value
          const styling = mode === 'Dark-Mode' ? 'Dark_Mode_Videos' : ''
          const {isBanner, VideosData, isLoading, Search} = this.state
          const filteredData = VideosData.filter(each =>
            each.title
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(Search.toLowerCase().replace(/\s/g, '')),
          )
          const isSearchValid = filteredData.length === 0

          return (
            <>
              {isLoading ? (
                <div className={`loader-container ${styling}`}>
                  <Loader type="ThreeDots" color="red" height="50" width="50" />
                </div>
              ) : (
                <div className="VideosBannerWrapper">
                  {isBanner && (
                    <div className="display VideosBannerAndContent">
                      <div style={{padding: '10px'}}>
                        <img
                          className="VideosBannerLogoImg"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="Nxt Watch Logo"
                        />
                        <p className="VideosBannerPara">
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <button className="VideosBannerBtn" type="button">
                          Get It Now
                        </button>
                      </div>
                      <img
                        className="BannerImg"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
                        alt="Banner Background"
                      />
                      <p onClick={this.removeBanner} className="X">
                        X
                      </p>
                    </div>
                  )}

                  <div className={`VideosContainer ${styling}`}>
                    <div
                      style={{
                        marginTop: '15px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <input
                        type="search"
                        className="VideosSearch"
                        placeholder="Search"
                        onChange={this.onSearch}
                      />
                      <button
                        type="button"
                        onClick={this.onSearchBtn}
                        className="searchIconContainer"
                      >
                        <FaSearch className="searchIcon" />
                      </button>
                    </div>

                    {isSearchValid ? (
                      <div className="noVideosContainer">
                        <img
                          alt="no videos"
                          className="noVideos"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                        />
                        <p className="noVideosText">No Search Results Found</p>
                      </div>
                    ) : (
                      <div>
                        <ul className="VideosUL">
                          {filteredData.map(eachVideo => (
                            <VideoList
                              VideoData={eachVideo}
                              key={eachVideo.id}
                            />
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Videos
