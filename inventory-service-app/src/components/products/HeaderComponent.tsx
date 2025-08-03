import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-dark bg-dark'>
           {/* Chỗ href kia mình sẽ cung cấp một cái link bất kỳ mà mình muốn, thường là link home */}
          <a className="navbar-brand" href="#">Product Management</a>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent