import React from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from './components/table';
import Fetch from './components/fetch';



function App() {

  return (
    <div>
      <li>
        <Link to='/post'>POST</Link>
      </li>
      <Route path='/post'>
        <div>
          <Table/>

        </div>
      </Route>
    </div>
  )
}

export default App;
