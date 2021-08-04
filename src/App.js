import configureStore from './redux/store';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import MovieSearch from './components/MovieSearch';
import UserMovieList from './components/UserMovieList';

const App = () => {
  return (
    <Provider store={configureStore()}>
      <HashRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={MovieSearch} />
          <Route path="/movie-list" component={UserMovieList} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
