import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CharacterDetailsPage = () => {
  const { charId } = useParams()

  const [character, setCharacter] = useState({})

  const fetchOneCharacter = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${charId}`)
      if (response.ok) {
        const characterData = await response.json()
        console.log(characterData)
        setCharacter(characterData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOneCharacter()
  }, [])

  return (
    <>
      <h1>{character.name}</h1>
      <p>{character.species}</p>
    </>
  )
}

export default CharacterDetailsPage
