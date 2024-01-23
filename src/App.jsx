import './App.css'
import useBoundStore from './states/boundStore'
import FileArea from './components/FileArea/FileArea'
import DisplayArea from './components/DisplayArea/DisplayArea'
import Modal from './components/Modal/Modal'
import EditMenu from './components/EditMenu/EditMenu';

function App() {
  const isModal = useBoundStore(state => state.modal.isShow);
  const showEditMenu = useBoundStore(state => state.showMenu);


  return (
    <>
      <FileArea />
      <DisplayArea />
      {showEditMenu && <EditMenu />}
      {isModal && <Modal />}
    </>
  )
}

export default App
