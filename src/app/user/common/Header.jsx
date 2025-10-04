import React from 'react'
import "./common.scss"
export default function Header() {
  return (
    <div className='header'>
      Header
      <input type='text' className='header__search' placeholder='Search...'/>
      <i className='fa fa-user'></i>
    </div>
  )
}
