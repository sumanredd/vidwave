import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import ThemeContext from '../../ThemeContext'

class TrendingList extends Component {
  render() {
    const {VideoData} = this.props
    const {id, thumbnailUrl, title, viewCount} = VideoData
    return (
      <ThemeContext.Consumer>
        {value => {
          const {mode} = value
          const styling = mode === 'Dark-Mode' ? 'Dark_Mode_Gaming' : ''
          return (
            <Link className="LinkStyleTrending" to={`/videos/${id}`}>
              <li className={`VideoListContainerGaming ${styling}`}>
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  className="ThumbnailImgGaming"
                />
                <h1 className="titleGaming">{title}</h1>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <p className="viewsCountText">{viewCount}</p>
                  <p className="watching">Watching Worldwide</p>
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
