import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header-container">
    <div>
      {' '}
      <Link to="/">
        <h1>The Cocktail DB</h1>
      </Link>
    </div>
    <ul className="links-font">
      <li className="list-items">
        <Link to="/" className="home-link">
          Home
        </Link>

        <Link to="/contact" className="home-link">
          Contact Us
        </Link>
      </li>
    </ul>
  </div>
)

export default Header
