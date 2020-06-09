import React from 'react';

import './styles/index.scss';
import Button  , {ButtonType , ButtonSize}from './components/Button/Button'
import Alert , {AlertType} from './components/Alert/Alert'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import Tab from './components/Tabs/Tabs'
import TabItem from './components/Tabs/TabItem'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon/icon'
library.add(fas)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex="0"  mode="vertical" onSelect={(n)=>{console.log(n)}}> 
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
      <hr/>
      <Tab defaultIndex={2} onSelect={(n)=>{console.log(n)}}>
        <TabItem label="选项卡1" index={0} ><Button disabled>Disable Button</Button></TabItem>
        <TabItem label="选项卡2" index={1} disabled>this is card 2</TabItem>
        <TabItem label="选项卡3" index={2}><Alert type={AlertType.Default}  message="警告" closable title="hahahaha" onClose={(e)=>{}}/></TabItem>
      </Tab>
      <Icon icon="coffee" theme="danger"/>
      </header>
    </div>
  );
}

export default App;
