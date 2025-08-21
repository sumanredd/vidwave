import React from 'react'

const ThemeContext = React.createContext({
  mode: 'Light-Mode',
  savedList: [],
  onAddSavedList: () => {},
  toggleMode: () => {},
})

export default ThemeContext
