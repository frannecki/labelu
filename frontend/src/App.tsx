import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import DatasetListView from './pages/dataset';
import LabelingView from './pages/labeling'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Route path="/dataset" component={ DatasetListView } />
        <Route path="/labeling" component={ LabelingView } />
      </BrowserRouter>
    </>
  );
}

export default App;
