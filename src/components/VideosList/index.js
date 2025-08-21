import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import ThemeContext from '../../ThemeContext'

class VideoList extends Component {
  render() {
    const {VideoData} = this.props
    const {id, channel, thumbnailUrl, publishedAt, title, viewCount} = VideoData
    const {name} = channel
    const profileImageUrl = channel.profile_image_url
    return (
      <ThemeContext.Consumer>
        {value => {
          const {mode} = value
          const styling = mode === 'Dark-Mode' ? 'Dark_Mode_VideoList' : ''
          return (
            <Link className="LinkStyle" to={`/videos/${id}`}>
              <li className={`VideoListContainer ${styling}`}>
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  className="ThumbnailImg"
                />
                <div className="flexRow">
                  <img
                    src={profileImageUrl}
                    alt="channel"
                    className="channelLogo"
                  />
                  <div className="contentContainer">
                    <p className="title">{title}</p>
                    <p className="channelName">{name}</p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '8px',
                      }}
                    >
                      <p className="viewCount">{viewCount} views</p>
                      <p className="publishedAt">
                        <span className="dot">•</span>
                        {publishedAt}
                      </p>
                    </div>
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

export default VideoList
