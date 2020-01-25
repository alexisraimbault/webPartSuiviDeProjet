import * as React from 'react';
import styles from './Pistl.module.scss';
import {IArtefactProps} from './IArtefactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { Button} from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
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
      selectState: event.key
    });  
  }


  public render(): React.ReactElement<IArtefactProps> 
  {
    return (
        <div className={ styles.artefact }>
            
            
            {this.state.showPopup ?  
            <div>
              <div className={ styles.artefactTop }>
                <div className={ styles.artefactName }>{escape(this.props.name)}</div>
                <div className={ styles.artefactType }>{escape(this.props.type)}</div>
              </div>
              <div className={ styles.artefactId }>#{this.props.id}</div>
              <div className={ styles.artefactAuthor }>{escape(this.props.author)}</div>
              <Dropdown 
              className={ styles.artefactDropDown }
              label='' 
              defaultSelectedKey={ this.state.selectState } 
              options={ [ { text: 'New',     key: "new" },  
                          { text: 'Active',    key: "active" },  
                          { text: 'Resolved',  key: "resolved" },  
                          { text: 'Closed',   key: "closed" }
                        ] 
              } 
              onChanged={this.handleChange.bind(this) } 
              />
              <Button text='Save...' onClick={this.togglePopup.bind(this)} />
            </div>
            :<div>
              <div className={ styles.artefactTop }>
                <div className={ styles.artefactName }>{escape(this.props.name)}</div>
                <div className={ styles.artefactType }>{escape(this.props.type)}</div>
              </div>
              <div className={ styles.artefactId }>#{this.props.id}</div>
              <div className={ styles.artefactAuthor }>{escape(this.props.author)}</div>
              <Button text='Edit...' onClick={this.togglePopup.bind(this)} /> 
            </div>
            }  
        </div>
    );
  }
}
