import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import AddContact from './components/AddContact';
import Contacts from './components/Contacts';

function App() {
  return (
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
  );
}

export default App;
