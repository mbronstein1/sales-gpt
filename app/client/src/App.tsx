import './App.css';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { Toaster } from './components/Toaster';

function App() {
  const element = useRoutes(routes);

  return (
    <>
      {element}
      <Toaster />
    </>
  );
}

export default App;
