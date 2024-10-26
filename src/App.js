import {Switch, Route, BrowserRouter} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import ContactUs from './components/ContactUs'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/contact" component={ContactUs} />
    </Switch>
  </BrowserRouter>
)

export default App
