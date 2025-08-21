import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import Login from './components/LoginForm'
import SavedVideos from './components/SavedVideos'
import Gaming from './components/Gaming'
import Individual from './components/IndividualVideos'
import NotFound from './components/NotFound'
import Trending from './components/Trending'
import ThemeContext from './ThemeContext'
import Home from './components/Home'

class App extends Component {
  state = {mode: 'Light-Mode', savedList: []}

  toggleMode = () => {
    this.setState(prevState => ({
      mode: prevState.mode === 'Dark-Mode' ? 'Light-Mode' : 'Dark-Mode',
    }))
  }

  onAddSavedList = SavedVideoData => {
    this.setState(prevState => {
      const alreadySaved = prevState.savedList.some(
        each => each.id === SavedVideoData.id,
      )
      if (alreadySaved) {
        return null
      }
      return {
        savedList: [...prevState.savedList, SavedVideoData],
      }
    })
  }

  render() {
    const {mode, savedList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          mode,
          toggleMode: this.toggleMode,
          savedList,
          onAddSavedList: this.onAddSavedList,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/trending" component={Trending} />
            <Route exact path="/gaming" component={Gaming} />
            <Route exact path="/videos/:id" component={Individual} />
            <Route exact path="/saved-videos" component={SavedVideos} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </ThemeContext.Provider>
    )
  }
}

export default App
