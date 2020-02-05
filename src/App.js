import React, { useState, useEffect } from 'react';
// API importing
import api from './services/api';

// Style imports
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

// Page elements imports (according to componentization)
import DevItem from './components/DevItem/index'
import DevForm from './components/DevForm/index'

// Component - Isolated block of HTML, CSS and JS that doesn't interfere on the rest of the application
// Propriety - Infos that a father component passes on to a child component
// State - Infos mantained by the component (remember: imutability)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    } 

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

    // const [counter, setCounter] = useState(0);

    // function incrementCounter() {
    //   setCounter(counter + 1);
    // }

    // <>
    //   <Header title='Dashboard'/>
    //   <Header title='Pipipi'/>
    //   <Header title='Popopo'/>

    //   <h1>Contador: {counter}</h1>
    //   <button onClick={incrementCounter}>Incrementar</button>
    // </>