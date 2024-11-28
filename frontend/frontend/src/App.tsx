import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { Provider } from 'react-redux';
import reduxStore from './store/redux.store';

import './App.css'
import ToastContainer from './components/toast/ToastContainer';

function App() {

  return (
    <Provider store={reduxStore}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App;
