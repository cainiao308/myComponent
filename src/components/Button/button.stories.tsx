import React from 'react';
import { storiesOf } from '@storybook/react';
import { action  } from '@storybook/addon-actions';
import Button  , {ButtonType } from './Button';




storiesOf('Button', module)
.addParameters({
    info:{
        inline:true
    }
})
  .add('普通的按钮', () => <Button btnType={ButtonType.Default} onClick={(e)=>{alert(e.target)}}>Hello</Button>)
  .add('不同样式的', () => (
      <>
    <Button btnType={ButtonType.Primary} onClick={action('sss')}>Primary</Button>
    <Button btnType={ButtonType.Danger} onClick={action('ddd')}>Danger</Button>
    </>
  ));