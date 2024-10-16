import { ReactElement } from 'react';

import { Header } from './components/layouts/Header';
import { Contents } from './components/layouts/Contents'
import { Footer } from './components/layouts/Footer';
import "../src/scss/Contents.scss";

function App(): ReactElement {
  return (
    <div>
      <Header />
      <div className='CardContainer'>
        <Contents />
      </div>
      <Footer />
    </div>
  )
}

export default App
