import { Provider } from 'react-redux';
import store from './redux/store';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AddContact from './components/AddContact';
import Contacts from './components/Contacts';
import { Redirect } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1 className="text-3xl font-semibold text-center p-5 border-b-2">
          Contact Manager
        </h1>
        <Switch>
          <Route path="/addcontact" component={AddContact} />
          <Route path="/contacts" component={Contacts} />
          <Redirect from="/" to="/contacts" />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
