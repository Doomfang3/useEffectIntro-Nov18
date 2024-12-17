import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import CharacterDetailsPage from './pages/CharacterDetailsPage'

function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [characters, setCharacters] = useState([])
  const [needRefresh, setNeedRefresh] = useState(false)

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character')
      if (response.ok) {
        const charactersData = await response.json()
        console.log(charactersData)
        setCharacters(charactersData.results)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log('Use effect ran')
  })

  useEffect(() => {
    console.log('Mounting')
    console.log({ count2 })
    fetchCharacters()

    const intervalId = setInterval(() => {
      console.log('Tick')
    }, 1000)

    setInterval(() => {
      setNeedRefresh(true)
    }, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    console.log({ count })
  }, [count])

  useEffect(() => {
    if (needRefresh) {
      fetchCharacters()
      setNeedRefresh(false)
    }
  }, [needRefresh])

  useEffect(() => {}, [])

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <div>
                <a href='https://vite.dev' target='_blank'>
                  <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank'>
                  <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className='card'>
                <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
                <p>
                  Edit <code>src/App.jsx</code> and save to test HMR
                </p>
                <button onClick={() => setCount2(count => count + 1)}>count2 is {count2}</button>
              </div>
              <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
              {characters.map(currentCharacter => (
                <Fragment key={currentCharacter.id}>
                  <Link to={`/characters/${currentCharacter.id}`}>{currentCharacter.name}</Link>
                  <p>Another one</p>
                </Fragment>
              ))}
            </>
          }
        />

        <Route path='/characters/:charId' element={<CharacterDetailsPage />} />
      </Routes>
    </>
  )
}

export default App
