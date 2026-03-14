import './App.css'
import { About } from './components/about'
import { Container } from './components/container'
import { Header } from './components/header'
import { HeroSection } from './components/heroSection'

function App() {
  return (
    <div className="w-full bg-[#ce7d3b]">
      <Container>
        <Header/>
        <HeroSection/>
      </Container>
      <About/>
    </div>
  )
}

export default App
