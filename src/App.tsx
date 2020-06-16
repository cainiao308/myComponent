import React , {useState} from 'react';

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
import Input from './components/Input/input'
import AutoComlete , {DataSourcetYPE} from './components/AutoComlete/autoComplete'
import {CSSTransition}  from 'react-transition-group'
import Upload from './components/Upload/upload'

library.add(fas)

interface Lakers {
  age?:number,
}

interface GithubUsers {
  name?:string,
  passtime?:string,
  
}

function App2() {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <CSSTransition in={inProp} timeout={1000} classNames="my-node">
        <div>
          {"I'll receive my-node-* classes"}
        </div>
      </CSSTransition>
      <button type="button" onClick={() => setInProp(!inProp)}>
        Click to Enter
      </button>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex="0"   onSelect={(n)=>{console.log(n)}}> 
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
      <Alert type={AlertType.Default}  message="警告" closable  onClose={(e)=>{}}/>
      <hr/>
      <Tab defaultIndex={2} onSelect={(n)=>{console.log(n)}}>
        <TabItem label="选项卡1" index={0} ><Button disabled>Disable Button</Button></TabItem>
        <TabItem label="选项卡2" index={1} disabled>this is card 2</TabItem>
        <TabItem label="选项卡3" index={2}><Alert type={AlertType.Default}  message="警告" closable title="hahahaha" onClose={(e)=>{}}/></TabItem>
      </Tab>
      <Icon icon="coffee" theme="danger"/>
      <Input placeholder="aaaaaaaaa" defaultValue="hehehe" onChange={(e)=>{console.log(e.target.value)}} />
      <AutoComlete 
        placeholder="auto" 
        fetchSuggretions={(query:string)=>{
          return fetch(`https://api.apiopen.top/getJoke?page=1&count=10&type=video`).then(res=> res.json())
          .then(({result})=>{
             console.log(result)
             return result.map((i:GithubUsers)=>({value:i.name , passtime:i.passtime}))
          })
        }}
        onSelects={(n)=>{console.log(n)}}
        renderOptions = {(item:DataSourcetYPE<GithubUsers>)=>{
          return (
            <>
          <b>{item.value}</b><span>{item.passtime}</span>
          </>
          )
        }}
      />
      </header>
      <Upload />
    </div>
  );
}

export default App;
