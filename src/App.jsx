import './App.css';
import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
// import Favorites from './components/Favorites'
import { useGlobalContext } from './context';

function App() {
  const {showModal} = useGlobalContext()
  return (
    <main>
      <Search />
      <Meals />
      {showModal && <Modal />}
    </main>
  )
}

export default App;
