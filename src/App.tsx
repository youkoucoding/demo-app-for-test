import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

const apiUrl = import.meta.env.VITE_API_URL;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchUrl = async () => {
      const res = await fetch(`${apiUrl}/helloworld`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: 'lucas' }),
      });
      const data = await res.text();
      setMessage(data);
    };
    fetchUrl();
  }, []);

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>message from api: {message}</p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
