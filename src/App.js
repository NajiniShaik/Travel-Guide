import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

class App extends Component {
  state = {
    travelPlacesList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.packages.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.name,
        imageUrl: eachObj.image_url,
        description: eachObj.description,
      }))

      this.setState({travelPlacesList: updatedData, isLoading: false})
    }
  }

  renderEmptyView = () => (
    <div data-testid="loader" className="loader-card">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderList = () => {
    const {travelPlacesList} = this.state
    return (
      <ul className="travel-list">
        {travelPlacesList.map(eachPlace => (
          <li className="travel-place-detailed-card" key={eachPlace.id}>
            <img
              src={eachPlace.imageUrl}
              alt={eachPlace.name}
              className="img"
            />
            <div className="card">
              <h1 className="place-name">{eachPlace.name}</h1>
              <p className="place-description">{eachPlace.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg-container">
        <div className="detailed-container">
          <h1 className="main-heading">Travel Guide</h1>
          {isLoading ? this.renderEmptyView() : this.renderList()}
        </div>
      </div>
    )
  }
}

export default App
