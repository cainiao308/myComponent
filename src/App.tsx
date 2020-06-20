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
  const [inProp, setInProp] = useState([{name:"cai",age:20},{name:"li",age:30}]);
  return (
    <div>
      {
        inProp.map(item=>{
          return (
            <>
            <p>{item.name}</p>
            <p>{item.age}</p>
            </>
          )
       
        })
      }
      <button type="button" onClick={() => setInProp(pre=>{
        return pre.map(item=>{
          if(item.age===20){
            item.age = 100
            return item
          }else{
            return item
          }
        })
      })}>
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
      <hr/>
      <Upload 
        action="http://127.0.0.1:5000/upload" 
        onProgress={(per)=>{console.log(per)}} 
        onSucess={(data , file)=>{console.log(data)}}
        onError = {(err,file)=>{console.log(err)}}
        // beforeUpload={(file)=>{
        //   // if(Math.round(file.size /1024)> 50000){
        //   //   alert('bbb')
        //   //   return false
        //   // }else{
        //   //   return true
        //   // }
        //   const newFile = new File([file] , 'test_new_name' , {type:file.type})
        //   return Promise.resolve(newFile)
        // }}
      />
      
    </div>
  );
}

export default App;
