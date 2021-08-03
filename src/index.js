import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import MovieSearch from './components/MovieSearch';

import configureStore from './redux/store';
import Navbar from './components/Navbar';

ReactDOM.render(
  <Provider store={configureStore()}>
    <HashRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={MovieSearch} />
        <Route path="/movie-list" component={App} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);