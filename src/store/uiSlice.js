import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeSection: 'hero',
    menuOpen: false,
    theme: 'dark',
    skillFilter: 'All',
    projectFilter: 'All',
    cursorVariant: 'default', // default | hover | text
  },
  reducers: {
    setActiveSection: (state, action) => { state.activeSection = action.payload },
    setMenuOpen: (state, action) => { state.menuOpen = action.payload },
    toggleMenu: (state) => { state.menuOpen = !state.menuOpen },
    toggleTheme: (state) => { state.theme = state.theme === 'dark' ? 'light' : 'dark' },
    setSkillFilter: (state, action) => { state.skillFilter = action.payload },
    setProjectFilter: (state, action) => { state.projectFilter = action.payload },
    setCursorVariant: (state, action) => { state.cursorVariant = action.payload },
  },
})

export const {
  setActiveSection, setMenuOpen, toggleMenu,
  toggleTheme, setSkillFilter, setProjectFilter, setCursorVariant,
} = uiSlice.actions

export default uiSlice.reducer
