import React, { useState, useEffect } from 'react'

import './styles.css'

import { Card } from '../../components/Card'

export function Home() {
  const [personName, setPersonName] = useState('')
  const [people, setPeople] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })

  function clearInput() {
    document.querySelector('#person-input').value = ''
  }

  function handleAddPerson() {
    const newPerson = {
      name: personName,
      time: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    setPeople((prevState) => [...prevState, newPerson])

    clearInput()
  }

  useEffect(() => {
    fetch('https://api.github.com/users/matheus-lincon')
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      })
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div className='wrapper'>
          <strong>{user.name}</strong>
          <div className='user-image'>
            <img src={user.avatar} alt={user.name} />
          </div>
        </div>
      </header>

      <input
        onChange={(e) => setPersonName(e.target.value)}
        type='text'
        name='person-input'
        id='person-input'
        placeholder='Digite um nome...'
      />

      <button onClick={handleAddPerson} className='button' id='add-person'>
        Adicionar
      </button>

      {people.map(({ name, time }, key) => (
        <Card key={key} name={name} time={time} />
      ))}
    </div>
  )
}
