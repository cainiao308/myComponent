import React from 'react';
import { storiesOf } from '@storybook/react';
import { action  } from '@storybook/addon-actions';
import Tabs  from './Tabs';
import TabItem from './TabItem'




storiesOf('Tabs', module)
.addParameters({
    info:{
        inline:true
    }
})
  .add('Tabs', () => (
      <>
      <Tabs defaultIndex={2} onSelect={(n)=>{console.log(n)}}>
        <TabItem label="选项卡1" index={0} >选项卡1</TabItem>
        <TabItem label="选项卡2" index={1} disabled>选项卡2</TabItem>
        <TabItem label="选项卡3" index={2}>选项卡3</TabItem>
    </Tabs>
      </>
  ))
  .add('选项卡样式的Tab', () => (
      <>
     <>
      <Tabs defaultIndex={2} onSelect={(n)=>{console.log(n)}}>
        <TabItem label="选项卡1" index={0} >选项卡1</TabItem>
        <TabItem label="选项卡2" index={1} disabled>选项卡2</TabItem>
        <TabItem label="选项卡3" index={2}>选项卡3</TabItem>
    </Tabs>
      </>
    </>
  ))
  .add('自定义选项卡样式' , ()=>(
    <>
    <Tabs defaultIndex={2} onSelect={(n)=>{console.log(n)}}>
      <TabItem label="选项卡1" index={0} >选项卡1</TabItem>
      <TabItem label="选项卡2" index={1} disabled>选项卡2</TabItem>
      <TabItem label="选项卡3" index={2}>选项卡3</TabItem>
  </Tabs>
    </>
  ));