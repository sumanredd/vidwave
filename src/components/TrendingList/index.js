import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import ThemeContext from '../../ThemeContext'

class TrendingList extends Component {
  render() {
    const {VideoData} = this.props
    const {id, channel, thumbnailUrl, publishedAt, title, viewCount} = VideoData
    const {name} = channel
    return (
      <ThemeContext.Consumer>
        {value => {
          const {mode} = value
          const styling = mode === 'Dark-Mode' ? 'Dark_Mode_Trending' : ''
          return (
            <Link className="LinkStyleTrending" to={`/videos/${id}`}>
              <li className={`VideoListContainerTrending ${styling}`}>
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  className="ThumbnailImgTrending"
                />

                <div className="contentContainerTrending">
                  <p className="titleTrending">{title}</p>
                  <p className="channelNameTrending">{name}</p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '8px',
                    }}
                  >
                    <p className="viewCountTrending">{viewCount} views</p>
                    <p className="publishedAtTrending">
                      <span className="dotTrending">•</span>
                      {publishedAt}
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default TrendingList
