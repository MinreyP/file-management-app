import './App.css'
import useBoundStore from './states/boundStore'
import FileArea from './components/FileArea/FileArea'
import DisplayArea from './components/DisplayArea/DisplayArea'
import Modal from './components/Modal/Modal'

function App() {
  const isModal = useBoundStore(state => state.modal.isShow);

  return (
    <>
      <FileArea />
      <DisplayArea />
      {isModal && <Modal />}
    </>
  )
}

export default App
