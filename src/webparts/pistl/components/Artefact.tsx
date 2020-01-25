import * as React from 'react';
import styles from './Pistl.module.scss';
import {IArtefactProps} from './IArtefactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Popup from './Popup'

export default class Artefact extends React.Component<IArtefactProps, {showPopup : boolean, selectState:string, oldState:string}> {

  constructor(props)
  {  
    super(props);  
    this.state = {showPopup: false,
                  selectState : escape(this.props.state),
                  oldState :  escape(this.props.state)};  
      
    this.handleChange = this.handleChange.bind(this);
  }  

  togglePopup(id) 
  {  
    console.log("test : togglePopup");
    if(this.state.showPopup && (this.state.oldState != this.state.selectState))
    {
      this.props.moveFunction(this.props.id, this.state.oldState, this.state.selectState);
      this.setState({oldState : this.state.selectState});
    }
    if(!this.state.showPopup)
    {
      this.setState({selectState : this.props.state, oldState : this.props.state});
    }
    this.setState({  
          showPopup: !this.state.showPopup 
    });
    
  }

  handleChange(event) 
  {  
    this.setState({  
      selectState: event.target.value
    });  
  }


  public render(): React.ReactElement<IArtefactProps> 
  {
    return (
        <div className={ styles.artefact }>
            <div className={ styles.artefactName }>{escape(this.props.name)}</div>
            <div className={ styles.artefactName }>{escape(this.props.author)}</div>
            <div className={ styles.artefactType }>{escape(this.props.type)}</div>
            <div className={ styles.artefactType }>{this.props.id}</div>
            <button onClick={this.togglePopup.bind(this)}> Click To Launch Popup</button>

            {this.state.showPopup ?  
            <select value={this.state.selectState} onChange={this.handleChange.bind(this)}>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            : null  
            }  
        </div>
    );
  }
}
