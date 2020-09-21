import { id, key } from './id';
import React from 'react';

function Fetch() {
  function Post() {
    const MyJson = JSON.stringify('reqBody')
    console.log(MyJson)
    fetch(`https://loogia.tech/api/v0/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Loogia-App-Id': id,
        'X-Loogia-API-Key': key
      },
      mode: 'cors',
      body: MyJson
    })
      .then(res => {
        console.log(res.json)
        return res.json()
      })
      .catch(error => console.log(error.body))
  }
  function toBody(){
    
  }
  return (
    <button onClick={() => {
      Post();
    }}>
      <b>POST</b>
    </button>
  )
}


export default Fetch;