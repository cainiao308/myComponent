import React from 'react';

import './styles/index.scss';
import Button  , {ButtonType , ButtonSize}from './components/Button/Button'
import Alert , {AlertType} from './components/Alert/Alert'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Button btnType={ButtonType.Default} onClick={(e)=>{alert(e.target)}}>Hello</Button>
      <Button disabled>Disable Button</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
      <Button  href="https://www.baidu.com" btnType={ButtonType.Link}>Baidu Link</Button>
      <Button  disabled href="https://www.baidu.com" btnType={ButtonType.Link}>Disable Link</Button>
      <Alert type={AlertType.Warning}  message="警告" closable title="hahahaha" />
      </header>
    </div>
  );
}

export default App;
