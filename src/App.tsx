import React from 'react';

import './styles/index.scss';
import Button  , {ButtonType , ButtonSize}from './components/Button/Button'
import Alert , {AlertType} from './components/Alert/Alert'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex="0"  onSelect={(n)=>{console.log(n)}}> 
            <MenuItem >cool link</MenuItem> 
            <MenuItem  disabled>cool link 2</MenuItem>
            <SubMenu title="sub">
              <MenuItem >cool link 4</MenuItem> 
              <MenuItem >cool link 5</MenuItem> 
            </SubMenu>
            <MenuItem >cool link 3</MenuItem>
        </Menu>
      <Button btnType={ButtonType.Default} onClick={(e)=>{alert(e.target)}}>Hello</Button>
      <Button disabled>Disable Button</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
      <Button  href="https://www.baidu.com" btnType={ButtonType.Link}>Baidu Link</Button>
      <Button  disabled href="https://www.baidu.com" btnType={ButtonType.Link}>Disable Link</Button>
      <Alert type={AlertType.Default}  message="警告" closable title="hahahaha" onClose={(e)=>{}}/>
      </header>
    </div>
  );
}

export default App;
