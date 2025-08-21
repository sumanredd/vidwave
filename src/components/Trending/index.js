import {Component} from 'react'
import './index.css'
import {FaFire} from 'react-icons/fa'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navbar from '../NavBar'
import ThemeContext from '../../ThemeContext'
import Header from '../Header'
import TrendingList from '../TrendingList'

class Trending extends Component {
  state = {TrendingVideosData: [], isLoadingTrending: true}

  componentDidMount() {
    this.getTrendingData()
  }

  getTrendingData = async () => {
    const url = 'https://apis.ccbp.in/videos/trending'
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
      this.setState({
        TrendingVideosData: updatedVideosData,
        isLoadingTrending: false,
      })
    }
  }

  render() {
    const getCookies = Cookies.get('jwt_token')
    if (getCookies === undefined) {
      return <Redirect to="/login" />
    }
    const {TrendingVideosData, isLoadingTrending} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {mode} = value
          const styling = mode === 'Dark-Mode' ? 'Dark_Mode_Trending' : ''
          return (
            <>
              <Header />
              <div className="TrendingFlex">
                <Navbar />
                {isLoadingTrending ? (
                  <div className={`loader-containerTrending ${styling}`}>
                    <Loader
                      type="ThreeDots"
                      color="red"
                      height="50"
                      width="50"
                    />
                  </div>
                ) : (
                  <div className="VideosWrapperTrending">
                    <div className={`VideosContainerTrending ${styling}`}>
                      <h1 className="TrendingText">
                        <span style={{color: 'red'}}>
                          <FaFire />
                        </span>{' '}
                        Trending
                      </h1>
                      <div>
                        <ul className="VideosULTrending">
                          {TrendingVideosData.map(eachVideo => (
                            <TrendingList
                              VideoData={eachVideo}
                              key={eachVideo.id}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Trending
