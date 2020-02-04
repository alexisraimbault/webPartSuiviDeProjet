import * as React from 'react';
import {ICommentListProps} from './ICommentListProps';
import Comment from './Comment';
import styles from './Pistl.module.scss';

const logo = require('../user.png');

export default class CommentList extends React.Component<ICommentListProps, {
  /**boolean to toggle the comments*/
  showComments : boolean}> {
    constructor(props)
    {  
      super(props);  
      this.state = {showComments: true};
    }  
    
    /**
     * render the list of comments of an artefact passed on props.
     */
    public render(): React.ReactElement<ICommentListProps> 
    {
        var comments = this.props.comments.map((item) => (
            <Comment author = {item.author} text = {item.text}/>
        ));
      return (
          <div>
              
              
              {this.state.showComments ? 
                comments
              :
                null
              }  
          </div>
      );
    }
}

  