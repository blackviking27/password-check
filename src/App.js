import PasswordStrength from './components/PasswordStrength';
import GeneratePassword from './components/Generate';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={PasswordStrength}/>
          <Route path='/generatepassword' exact component={GeneratePassword}/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
