import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import MovieSearch from './components/MovieSearch';

import configureStore from './redux/store';
import Navbar from './components/Navbar';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Navbar/> 
      <Switch>
        <Route exact path="/" component={MovieSearch} />
        <Route exact path="/movie-list" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);


