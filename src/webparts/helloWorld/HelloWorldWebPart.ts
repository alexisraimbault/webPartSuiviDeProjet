import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import styles from './components/HelloWorld.module.scss';
import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
/*
//see https://itnext.io/a-memo-on-how-to-implement-azure-ad-authentication-using-react-and-net-core-2-0-3fe9bfdf9f36

import { runWithAdal } from 'react-adal';
import { authContext } from '../../../config/adalConfig';

const DO_NOT_LOGIN = false;

runWithAdal(
    authContext
);*/

import * as Msal from 'msal';

var msalConfig = {
  auth: {
      clientId: "92607b4e-4514-49c3-a6bd-2e6f64dbd0af",
      authority: "https://login.microsoftonline.com/6494460e-8600-4edc-850f-528e8faad290",
      redirectURI: "https://localhost:4321/temp/workbench.html"
  },
  cache: {
      storeAuthStateInCookie: true
  }
};

var myMSALObj = new Msal.UserAgentApplication(msalConfig);

var requestObj = {
  scopes: ["user.read"]
};

export interface IHelloWorldWebPartProps {
    description: string;
    test: string;
    test1: boolean;
    test2: string;
    test3: boolean;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  
  public componentWillMount() : void {
    console.log("window href : " + window.location.href);
    if ( !myMSALObj.getAccount())  // if we have no user
    {
      myMSALObj.loginPopup(requestObj).then((loginResponse) => 
      {
        console.log("conection établie !!!!!!!!!!!!!");
      }).catch((error) => 
      {
        console.log("conection error : " + error);
      });
    } else 
    {
      console.log("already conected in");
    }
  }

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${ styles.helloWorld }">
      <div class="${ styles.container }">
        <div class="${ styles.row }">
          <div class="${ styles.column }">
            <span class="${ styles.title }">Welcome to SharePoint!</span>
            <p class="${ styles.subTitle }">Customize SharePoint experiences using web parts.</p>
            <p class="${ styles.description }">${escape(this.properties.description)}</p>
            <p class="${ styles.description }">Loading from : ${this.context.pageContext.web.title}</p>
            <p class="${ styles.description }">User display name : ${this.context.pageContext.user.displayName}</p>
            <p class="${ styles.description }">User login name : ${this.context.pageContext.user.loginName}</p>
            <p class="${ styles.description }">User email : ${this.context.pageContext.user.email}</p>
            <a href="https://aka.ms/spfx" class="${ styles.button }">
              <span class="${ styles.label }">Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div>`;
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
                label: 'Description'
              }),
              PropertyPaneTextField('test', {
                label: 'Multi-line Text Field',
                multiline: true
              }),
              PropertyPaneCheckbox('test1', {
                text: 'Checkbox'
              }),
              PropertyPaneDropdown('test2', {
                label: 'Dropdown',
                options: [
                  { key: '1', text: 'One' },
                  { key: '2', text: 'Two' },
                  { key: '3', text: 'Three' },
                  { key: '4', text: 'Four' }
                ]}),
              PropertyPaneToggle('test3', {
                label: 'Toggle',
                onText: 'On',
                offText: 'Off'
              })
            ]
            }
          ]
        }
      ]
    };
  }
}
