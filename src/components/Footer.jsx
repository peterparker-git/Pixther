import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <footer>
      <p>© {new Date().getFullYear()} Pixter App — All rights reserved.</p>
      <p className="creator">Created by <span className="creator-name">Harihara Sudan PS</span></p>
         <div className="footer-links">
        <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">API Source</a>
      </div>
    </footer>
  )
}

export default Footer 
