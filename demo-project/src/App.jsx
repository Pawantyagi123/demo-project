import './App.css'
import APIDashboard from './components/apiDashboard/APIDashboard'
import Header from './components/header/Header'
import { useTheme } from './context/ThemeContext'

function App() {
const {theme} = useTheme()

  return (
    <div className={`${theme === "light" ? "bg-white" : "bg-gray-900"} w-100 h-[100vh] p-4`}>
    <Header/>
   <APIDashboard/>
    </div>
  )
}

export default App
