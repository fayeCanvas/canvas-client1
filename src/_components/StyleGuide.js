import React from 'react';
import {Button} from 'antd'

class StyleGuide extends React.Component {

  render() {
    return (
      <div className='page-wrapper'>
        <div>
          <p className='label'>Heaedings</p>
          <h1>Heading-1</h1>
          <h2>Heading-2</h2>
          <h3>Heading-3</h3>
          <h4>Heading-4</h4>
        </div>
        <div>
          <p className='label'>paragraph styles</p>
          <p> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        </div>
        <div>
          <p className='label'>Buttons</p>
          <Button className='button-primary'>Primary Button</Button><br/>
          <Button>Secondary Button </Button><br/>
          <Button>Tertiary Button</Button><br/>
        </div>
      </div>
    )
  }
}



export default StyleGuide;
