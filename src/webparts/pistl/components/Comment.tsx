import * as React from 'react';
import {ICommentProps} from './ICommentProps';
import styles from './Pistl.module.scss';

const logo = require('../user.png');

export default class Comment extends React.Component<ICommentProps, {}> {
    constructor(props)
    {  
      super(props);  
    } 

    public render(): React.ReactElement<ICommentProps> 
    {
      return (
          <div className={ styles.artefact }>
              <div className={ styles.artefactAuthorGroup }>
                <img className={ styles.artefactAuthorIcon } src = {require('../user.png')}></img>
                <div className={ styles.artefactAuthor }>{this.props.author}</div>
              </div>
              <div className={ styles.artefactAuthor }>{this.props.text}</div>
          </div>
      );
    }
  
}

  