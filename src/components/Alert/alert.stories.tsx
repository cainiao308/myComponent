import React from 'react';
import { storiesOf } from '@storybook/react';
import { action  } from '@storybook/addon-actions';
import Alert ,{AlertType}  from './Alert';




storiesOf('Alert', module)
.addParameters({
    info:{
        inline:true
    }
})
  .add('Alert', () => <Alert type={AlertType.Default}  message="警告" closable  onClose={(e)=>{}}/>)
  .add('不同样式的Alert', () => (
      <>
    <Alert type={AlertType.Sucess}  message="this is success" closable  onClose={(e)=>{}}/>
    <Alert type={AlertType.Default}  message="this is default" closable  onClose={(e)=>{}}/>
    <Alert type={AlertType.Danger}  message="this is danger" closable  onClose={(e)=>{}}/>
    <Alert type={AlertType.Warning}  message="this is waring" closable  onClose={(e)=>{}}/>
    </>
  ))
  .add('添加描述的Alert' , ()=>(
      <>
      <Alert type={AlertType.Default}  message="this is waring" closable  onClose={(e)=>{}} title="标题"/>
      </>
  ));