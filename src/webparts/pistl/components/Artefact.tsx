import * as React from 'react';
import styles from './Pistl.module.scss';
import {IArtefactProps} from './IArtefactProps';
import CommentList from './CommentList';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Checkbox,
  DefaultButton,
  Modal,
  IDragOptions,
  IconButton
} from 'office-ui-fabric-react';
import { Button} from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';


import Popup from './Popup'

const logo = require('../user.png');
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch'
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px'
    }
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: {
        margin: '14px 0'
      },
      'p:first-child': {
        marginTop: 0
      },
      'p:last-child': {
        marginBottom: 0
      }
    }
  }
});

const iconButtonStyles = mergeStyleSets({
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px'
  },
  rootHovered: {
    color: theme.palette.neutralDark
  }
});

export default class Artefact extends React.Component<IArtefactProps, {showModal:boolean, showPopup : boolean, selectState:string, oldState:string, newCommentText : string}> {

  
  constructor(props)
  {  
    super(props);  
    this.state = {showPopup: false,
                  showModal:false,
                  selectState : escape(this.props.state),
                  oldState :  escape(this.props.state), 
                  newCommentText : ''};  
      
    this.handleChange = this.handleChange.bind(this);
    this.changeInputComment = this.changeInputComment.bind(this);
    this.addComment = this.addComment.bind(this);
    this._showModal = this._showModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }  

  private _showModal = (): void => {
    this.setState({ showModal: true });
  };

  private _closeModal = (): void => {
    this.setState({ showModal: false });
  };

  addComment()
  {
    if(this.state.newCommentText != '')
      this.props.addCommentFunction(this.props.id, this.state.oldState, {author:"Alexis", text:this.state.newCommentText});
    this.setState({newCommentText:''});
  }

  togglePopup(id) 
  { 
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

  changeInputComment(value) 
  { 
    console.log("test : " + value);
    this.setState({  
      newCommentText: value
    });  
  }


  public render(): React.ReactElement<IArtefactProps> 
  {
    return (
        <div className={ styles.artefact }>
            
            
            {this.state.showPopup ?  
            <div>
              <div className={ styles.artefactTop }>
                <div className={ styles.artefactName }>{this.props.name}</div>
                <div className={ styles.artefactType }>{escape(this.props.type)}</div>
              </div>
              <div className={ styles.artefactId }>#{this.props.id}</div>
              <div className={ styles.artefactAuthorGroup }>
                <img className={ styles.artefactAuthorIcon } src = {require('../user.png')}></img>
                <div className={ styles.artefactAuthor }>{this.props.author}</div>
              </div>
              <div className={ styles.artefactDescMarginBottom  } onClick={this._showModal}>{this.props.desc.substr(0,5) + '[...]'}</div>

              <Modal
                isOpen={this.state.showModal}
                onDismiss={this._closeModal}
                containerClassName={styles.container}
                isBlocking={false}
              >
                <div className={contentStyles.header}>
                  <span >Description</span>
                  <IconButton
                    styles={iconButtonStyles}
                    iconProps={{ iconName: 'Cancel' }}
                    ariaLabel="Close popup modal"
                    onClick={this._closeModal as any}
                  />
                </div>
                <div  className={contentStyles.body}>
                  <p>
                  {this.props.desc}
                  </p>
                </div>
              </Modal>

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
              <CommentList comments = {this.props.comments}/>
              <div className={styles.newCommentTextField}>
                <TextField onChanged={this.changeInputComment.bind(this) } placeholder="new comment..." />
              </div>
              <div className={styles.center_margin_top}>
                <Button text='Add...' onClick={this.addComment.bind(this)} /> 
              </div>
              <div className={styles.center_margin_top}>
                <Button text='Save...' onClick={this.togglePopup.bind(this)} />
              </div>
            </div>
            :<div>
              <div className={ styles.artefactTop }>
                <div className={ styles.artefactName }>{this.props.name}</div>
                <div className={ styles.artefactType }>{escape(this.props.type)}</div>
              </div>
              <div className={ styles.artefactId }>#{this.props.id}</div>
              <div className={ styles.artefactAuthorGroup }>
                <img className={ styles.artefactAuthorIcon } src = {require('../user.png')}></img>
                <div className={ styles.artefactAuthor }>{this.props.author}</div>
              </div>
              <div className={ styles.artefactDesc } onClick={this._showModal}>{this.props.desc.substr(0,5) + '[...]'}</div>

              <Modal
                isOpen={this.state.showModal}
                onDismiss={this._closeModal}
                containerClassName={styles.container}
                isBlocking={false}
              >
                <div className={contentStyles.header}>
                  <span >Description</span>
                  <IconButton
                    styles={iconButtonStyles}
                    iconProps={{ iconName: 'Cancel' }}
                    ariaLabel="Close popup modal"
                    onClick={this._closeModal as any}
                  />
                </div>
                <div  className={contentStyles.body}>
                  <p>
                  {this.props.desc}
                  </p>
                </div>
              </Modal>
              <CommentList comments = {this.props.comments}/>
              <div className={styles.center_margin_top}> 
                <Button text='Edit...' onClick={this.togglePopup.bind(this)} /> 
              </div>
            </div>
            }  
        </div>
    );
  }
}
