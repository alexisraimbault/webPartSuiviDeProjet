import * as React from 'react';
import styles from './Pistl.module.scss';
import { IPistlProps } from './IPistlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Grid from './Grid';


export default class Pistl extends React.Component<IPistlProps, {}> {
  /**
   * render the Pistl component.
   */
  public render(): React.ReactElement<IPistlProps> {
    return (
      <div className={ styles.pistl }>
        <div className={ styles.container }>
          <Grid></Grid>
        </div>
      </div>
    );
  }
}
