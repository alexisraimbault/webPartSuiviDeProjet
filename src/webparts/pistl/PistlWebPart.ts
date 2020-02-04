import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PistlWebPartStrings';
import Pistl from './components/Pistl';
import { IPistlProps } from './components/IPistlProps';

import * as Msal from 'msal';

import allReducers from './reducers/index';

/**
 * Authorisation
 */
const accessTokenRequest = {
  scopes: ['https://app.vssps.visualstudio.com/user_impersonation']
};

var accessToken;

/**
 * MSAL config settings
 */
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
if(window.location.href.search("id_token")>=0)
{
  window.close();
}
/**
 * acquire the user logins to connect to a Microsoft account
 */
if ( !myMSALObj.getAccount() && !(window.location.href.search("id_token")>=0)) { // if we have no user
  myMSALObj.loginPopup(requestObj).then((loginResponse) => {
    console.log("connexion établie !!!!!!!!!!!!!");
    //
    myMSALObj.acquireTokenSilent(accessTokenRequest).then((accessTokenResponse) =>{
      // Acquire token silent success
      // Call API with token
      accessToken = accessTokenResponse.accessToken;
      console.log("token successfully acquired");
    }).catch((error) =>{
        //Acquire token silent failure, and send an interactive request
        if (error.errorMessage.indexOf("interaction_required") !== -1) {
          myMSALObj.acquireTokenPopup(accessTokenRequest).then((accessTokenResponse2) =>{
                // Acquire token interactive success
            }).catch((error2) =>{
                // Acquire token interactive failure
                console.log(error2);
            });
        }
        console.log(error);
    });
    //
  }).catch((error) => {
    console.log("connection error : " + error);
  });
} else {
  console.log("already connected");
   //
   myMSALObj.acquireTokenSilent(accessTokenRequest).then((accessTokenResponse) =>{
    // Acquire token silent success
    // Call API with token
    accessToken = accessTokenResponse.accessToken;
    console.log("token successfully acquired");
  }).catch((error) =>{
      //Acquire token silent failure, and send an interactive request
      if (error.errorMessage.indexOf("interaction_required") !== -1) {
        myMSALObj.acquireTokenPopup(accessTokenRequest).then((accessTokenResponse2) => {
              // Acquire token interactive success
          }).catch((error2) =>{
              // Acquire token interactive failure
              console.log(error2);
          });
      }
      console.log(error);
  });

  //

 
  
  //
}

var headers = new Headers();
var bearer = "Bearer " + accessToken;
headers.append("Authorization", bearer);
var options = {
     method: "GET",
     headers: headers
};
var graphEndpoint = "https://dev.azure.com/expertime/_apis/projects?api-version=5.1";

fetch(graphEndpoint, options)
    .then((response) =>{
      response.text().then((data) =>{
          console.log("réponse :" + data);
      });
    });

export interface IPistlWebPartProps {
  description: string;
}

export default class PistlWebPart extends BaseClientSideWebPart<IPistlWebPartProps> {

  /**
   * render the webPart for the sharepoint
   */
  public render(): void {
    const element: React.ReactElement<IPistlProps > = React.createElement(
      Pistl,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
