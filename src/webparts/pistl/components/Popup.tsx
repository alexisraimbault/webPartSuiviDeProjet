import * as React from 'react';
import styles from './Pistl.module.scss';
import {IPopupProps} from './IPopupProps';

class Popup extends React.Component<IPopupProps, {}>  {  
  render(): React.ReactElement<IPopupProps> {  
return (  
<div className='popup'>  
<div className='popup\_inner'>  
</div>  
</div>  
);  
}  
}  

export default Popup;