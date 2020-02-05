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

/*
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
    });*/

export interface IPistlWebPartProps {
  description: string;
}

export default class PistlWebPart extends BaseClientSideWebPart<IPistlWebPartProps> {

  /**
   * render the webPart component
   */
  public render(): void {
    const element: React.ReactElement<IPistlProps> = React.createElement(
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
