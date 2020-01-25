import * as React from 'react';
import styles from './Pistl.module.scss';
import { IPistlProps } from './IPistlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Grid from './Grid';


export default class Pistl extends React.Component<IPistlProps, {}> {
  public render(): React.ReactElement<IPistlProps> {
    return (
      <div className={ styles.pistl }>
        <div className={ styles.container }>
          <Grid></Grid>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
