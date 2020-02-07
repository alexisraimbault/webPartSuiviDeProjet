import * as React from 'react';
import styles from './Pistl.module.scss';
import { IPistlProps } from './IPistlProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Grid from './Grid';
import * as Msal from 'msal';

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

export default class Pistl extends React.Component<IPistlProps, { 
  /** boolean to togle offline/online mode */
  offlineMode: boolean, 
  /** boolean to toggle the modal on/off */
  showModal: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      offlineMode: false,
      showModal: false
    };
  }

  /**
   * update the boolean showModal props to true
   */
  private _showModal = (): void => {
    this.setState({ showModal: true });
  }

  /**
   * update the boolean showModal props to false
   */
  private _closeModal = (): void => {
    this.setState({ showModal: false });
  }

  /**
   * try to connect to the API
   */
  public componentWillMount() {


    const accessTokenRequest = {
      scopes: ['https://app.vssps.visualstudio.com/user_impersonation']
    };

    var accessToken;

    var msalConfig = {
      auth: {
        clientId: "7b4572a6-5b1a-4a70-85b1-5503236612f0",
        authority: "https://login.microsoftonline.com/6494460e-8600-4edc-850f-528e8faad290",
        redirectURI: "https://expertime365.sharepoint.com/_layouts/15/workbench.aspx"//change to https://localhost:4321/temp/workbench.html for local testing
      },
      cache: {
        storeAuthStateInCookie: true
      }
    };

    var myMSALObj = new Msal.UserAgentApplication(msalConfig);

    var requestObj = {
      scopes: ["user.read"]
    };
    if (window.location.href.search("id_token") >= 0) {
      window.close();
    }
    if (!myMSALObj.getAccount() && !(window.location.href.search("id_token") >= 0)) { // if we have no user
      myMSALObj.loginPopup(requestObj).then((loginResponse) => {
        console.log("connexion établie !!!!!!!!!!!!!");
        //
        myMSALObj.acquireTokenSilent(accessTokenRequest).then((accessTokenResponse) => {
          // Acquire token silent success
          // Call API with token
          accessToken = accessTokenResponse.accessToken;
          console.log("token successfully acquired");
        }).catch((error) => {
          //Acquire token silent failure, and send an interactive request
          if (error.errorMessage.indexOf("interaction_required") !== -1) {
            myMSALObj.acquireTokenPopup(accessTokenRequest).then((accessTokenResponse2) => {
              // Acquire token interactive success
            }).catch((error2) => {
              this.setState({ offlineMode: true });
              // Acquire token interactive failure
              console.log(error2);
            });
          }
          this.setState({ offlineMode: true });
          this._showModal();
          console.log(error);
        });
        //
      }).catch((error) => {
        this.setState({ offlineMode: true });
        console.log("connection error : " + error);
      });
    } else {
      console.log("already connected");
      //
      myMSALObj.acquireTokenSilent(accessTokenRequest).then((accessTokenResponse) => {
        // Acquire token silent success
        // Call API with token
        accessToken = accessTokenResponse.accessToken;
        console.log("token successfully acquired");
      }).catch((error) => {
        //Acquire token silent failure, and send an interactive request
        if (error.errorMessage.indexOf("interaction_required") !== -1) {
          myMSALObj.acquireTokenPopup(accessTokenRequest).then((accessTokenResponse2) => {
            // Acquire token interactive success
          }).catch((error2) => {
            // Acquire token interactive failure
            console.log(error2);
          });
        }
        console.log("test");
        this.setState({ offlineMode: true });
        this._showModal();
        console.log(error);
      });

    }
  }

  /**
   * render the component Pistl
   */
  public render(): React.ReactElement<IPistlProps> {
    return (
      <div className={styles.pistl}>
        <div className={styles.container}>
          <Grid offlineMode={this.state.offlineMode}></Grid>
          <Modal
            isOpen={this.state.showModal}
            onDismiss={this._closeModal}
            containerClassName={styles.container}
            isBlocking={false}
          >
            <div className={contentStyles.header}>
              <span >Error</span>
              <IconButton
                styles={iconButtonStyles}
                iconProps={{ iconName: 'Cancel' }}
                ariaLabel="Close popup modal"
                onClick={this._closeModal as any}
              />
            </div>
            <div className={contentStyles.body}>
              <p>
                API not answering as expected ! Going offline mode ...
                  </p>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
