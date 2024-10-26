import {Link} from 'react-router-dom'

import './index.css'

const HomeItems = props => {
  const {homeDetails} = props
  const {id, name, img, drink, drinkTumb, glass} = homeDetails
  return (
    <>
      <li className="list-container">
        <img src={drinkTumb} className="image" />
        <h1 className="heading-drink">{drink}</h1>
        <p>{glass}</p>
        <p>{name}</p>
        <Link to="/">
          <button type="button" className="button-details">
            Details
          </button>
        </Link>
      </li>
    </>
  )
}

export default HomeItems
