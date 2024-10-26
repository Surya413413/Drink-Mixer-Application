import {Component} from 'react'

import Loader from 'react-js-loader'
import {BsSearch} from 'react-icons/bs'

import HomeItems from '../HomeItems'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    dataDrinks: [],
    apiStatus: apiStatusConstants.initial,
    search: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getDataDrinks()
  }

  getDataDrinks = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {search} = this.state
    const apiUrl =
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'

    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const filterData = data.drinks
        ? data.drinks.map(each => ({
            id: each.idDrink,
            name: each.strAlcoholic,
            img: each.strImageSource,
            drink: each.strDrink,
            drinkTumb: each.strDrinkThumb,
            glass: each.strGlass,
          }))
        : []
      this.setState({
        dataDrinks: filterData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChnageSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickButton = () => {
    this.setState(
      prevState => ({search: prevState.searchInput}),
      this.getDataDrinks,
    )
  }

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#ffffff" height="50" weight="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <h1>error page </h1>
    </div>
  )

  renderSearchDrinks = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <p>search your favorite cocktail</p>
        <input
          type="search"
          onChange={this.onChnageSearch}
          value={searchInput}
          placeHolder="searching..."
        />
        <button type="button" onClick={this.onClickButton}>
          <BsSearch />
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {dataDrinks} = this.state

    return (
      <>
        <h1 className="text">Cocktails</h1>
        <ul className="unorder-container">
          {dataDrinks.map(each => (
            <HomeItems homeDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="all-container-success">{this.renderSearchDrinks()}</div>
        {this.renderFinalView()}
      </>
    )
  }
}

export default HomeRoute
