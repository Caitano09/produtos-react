/*npm install -g json-server
 json-server --watch "db.json" --port 3001 */
import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Sobre from './Sobre'
import Home from './Home'
import Produtos from './Produtos'

function App() {

  return (
    <Router>
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container'>
            <div className='navbar-header'>
              <a href='/' className='navbar-brand'>
                Gerenciador de Produtos
              </a>
            </div>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'><Link to='/' className='nav-link' >Home</Link></li>
              <li className='nav-item'><Link to='/produtos' className='nav-link' >Produtos</Link></li>
              <li className='nav-item'><Link to='/sobre' className='nav-link' >Sobre</Link></li>
            </ul>
          </div>
        </nav>
        <div className='container'>
          <Route exact path='/' component={Home}/>
          <Route path='/produtos' component={(props)=> {
            return (<Produtos 
              {...props}              
            />)
          }}/>
          <Route exact path='/sobre' component={Sobre}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
