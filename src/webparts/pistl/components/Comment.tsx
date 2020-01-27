import * as React from 'react';
import {ICommentProps} from './ICommentProps';
import styles from './Pistl.module.scss';

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

export default class Comment extends React.Component<ICommentProps, {showModal:boolean}> {

  
    constructor(props)
    {  
      super(props);  

      this.state = {
        showModal:false
      }
      
      this._showModal = this._showModal.bind(this);
      this._closeModal = this._closeModal.bind(this);
    }  
  
    private _showModal = (): void => {
      this.setState({ showModal: true });
    };
  
    private _closeModal = (): void => {
      this.setState({ showModal: false });
    };
    public render(): React.ReactElement<ICommentProps> 
    {
      return (
          <div className={ styles.artefact }>
              <div className={ styles.artefactAuthorGroup }>
                <img className={ styles.artefactAuthorIcon } src = {require('../user.png')}></img>
                <div className={ styles.artefactAuthor }>{this.props.author}</div>
              </div>

              <div className={ styles.artefactDescMarginBottom  } onClick={this._showModal}>{this.props.text.substr(0,5) + '[...]'}</div>

              <Modal
                isOpen={this.state.showModal}
                onDismiss={this._closeModal}
                containerClassName={styles.container}
                isBlocking={false}
              >
                <div className={contentStyles.header}>
                  <span >Comment</span>
                  <IconButton
                    styles={iconButtonStyles}
                    iconProps={{ iconName: 'Cancel' }}
                    ariaLabel="Close popup modal"
                    onClick={this._closeModal as any}
                  />
                </div>
                <div  className={contentStyles.body}>
                  <p>
                  {this.props.text}
                  </p>
                </div>
              </Modal>
          </div>
      );
    }
  
}

  