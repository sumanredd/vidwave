// eslint-disable-next-line
import {Component, React} from 'react'
import './index.css'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {RiMenuAddFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../NavBar'
import ThemeContext from '../../ThemeContext'
import Header from '../Header'

class Individual extends Component {
  state = {VideoData: {}, isLoading: true, reaction: null}

  componentDidMount() {
    this.getIndividualData()
  }

  toggleLike = () => {
    this.setState(prev => ({
      reaction: prev.reaction === 'like' ? null : 'like',
    }))
  }

  toggleDislike = () => {
    this.setState(prev => ({
      reaction: prev.reaction === 'dislike' ? null : 'dislike',
    }))
  }

  getIndividualData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedVideosData = {
        channel: data.video_details.channel,
        description: data.video_details.description,
        id: data.video_details.id,
        thumbnailUrl: data.video_details.thumbnail_url,
        publishedAt: data.video_details.published_at,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({VideoData: updatedVideosData, isLoading: false})
    }
  }

  render() {
    const getCookies = Cookies.get('jwt_token')
    if (getCookies === undefined) {
      return <Redirect to="/login" />
    }
    const {VideoData, isLoading, reaction} = this.state
    const {
      id,
      description,
      channel,
      // eslint-disable-next-line
      thumbnailUrl,
      publishedAt,
      title,
      viewCount,
      videoUrl,
    } = VideoData

    return (
      <ThemeContext.Consumer>
        {value => {
          const {mode, onAddSavedList, savedList} = value
          const styling = mode === 'Dark-Mode' ? 'Dark_Mode_Individual' : ''
          const isAlreadySaved = savedList.some(
            eachVideo => eachVideo.id === id,
          )

          const onSaved = () => {
            if (!isAlreadySaved) {
              onAddSavedList(VideoData)
            }
          }

          return (
            <>
              <Header />
              <div className="IndividualFlex">
                <div className="display">
                  <Navbar />
                </div>

                {isLoading ? (
                  <div className={`loader-containerTrending ${styling}`}>
                    <Loader
                      type="ThreeDots"
                      color="red"
                      height="50"
                      width="50"
                    />
                  </div>
                ) : (
                  <div className="VideosWrapperIndividual">
                    <div className={`VideosContainerIndividual ${styling}`}>
                      <div className="youtubeStyle">
                        <ReactPlayer
                          url={videoUrl}
                          controls
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <h1 className="IndividualTitle">{title}</h1>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <p className="IndividualViews">{viewCount}</p>
                          <p className="IndividualPublish">
                            <span className="dot">•</span>
                            {publishedAt}
                          </p>
                        </div>

                        <ul className="IndividualUl">
                          <li
                            onClick={this.toggleLike}
                            className={
                              reaction === 'like'
                                ? 'IndividualLiSaved'
                                : 'IndividualLi'
                            }
                          >
                            <span>
                              <AiOutlineLike className="NavbarIcons" />
                            </span>
                            Like
                          </li>

                          <li
                            onClick={this.toggleDislike}
                            className={
                              reaction === 'dislike'
                                ? 'IndividualLiSaved'
                                : 'IndividualLi'
                            }
                          >
                            <span>
                              <AiOutlineDislike className="NavbarIcons" />
                            </span>
                            Dislike
                          </li>

                          {isAlreadySaved ? (
                            <li onClick={onSaved} className="IndividualLiSaved">
                              <span>
                                <RiMenuAddFill className="NavbarIcons" />
                              </span>{' '}
                              Saved
                            </li>
                          ) : (
                            <li onClick={onSaved} className="IndividualLi">
                              <span>
                                <RiMenuAddFill className="NavbarIcons" />
                              </span>{' '}
                              Save
                            </li>
                          )}
                        </ul>
                      </div>

                      <hr className="IndividualHr" />

                      <div
                        style={{
                          gap: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <img
                          className="IndividualProfileImg"
                          src={channel.profile_image_url}
                          alt="profile"
                        />
                        <div>
                          <p className="IndividualchannelName">
                            {channel.name}
                          </p>
                          <p className="IndividualsubscriberCount">
                            {channel.subscriber_count} subscribers
                          </p>
                        </div>
                      </div>
                      <p className="Individualdescription">{description}</p>
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

export default Individual
