import * as React from 'react';
import { Version } from '@microsoft/sp-core-library';


import * as Msal from 'msal';


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


class ApiCalls{

    /**
     * returns all the artefacts of the project.
     * @param projectId the id of the project selected 
     */
    public getWorkItems(projectId)
    {
        var headers = new Headers();
        var bearer = "Bearer " + accessToken;
        headers.append("Authorization", bearer);
        var options = {
            method: "POST",
            headers: headers,
            "query": "Select [System.Id], [System.Title], [System.State] From WorkItems"
        };
        var graphEndpoint = "https://dev.azure.com/expertime/"+projectId+"/_apis/wit/wiql?api-version=5.1";

        fetch(graphEndpoint, options)
            .then((response) =>{
            response.text().then((data) =>{
                console.log("réponse :" + data);
            });
        });
    }

    /**
     * creates an artefact in the project
     * @param projectId id of the project
     * @param type type of the artefact(bug,task,etc...)
     * @param title the title of the artefact
     */
    public createWorkItem(projectId, type, title)
    {
        var headers = new Headers();
        var bearer = "Bearer " + accessToken;
        headers.append("Authorization", bearer);
        var options = {
            method: "POST",
            headers: headers,
            op: "add",
            path: "/fields/System.Title",
            from: null,
            value: title
        };
        var graphEndpoint = "https://dev.azure.com/expertime/"+projectId+"/_apis/wit/workitems/"+type+"?api-version=5.1";

        fetch(graphEndpoint, options)
            .then((response) =>{
            response.text().then((data) =>{
                console.log("réponse :" + data);
            });
        });
    }

    /**
     * delete an artefact of the project
     * @param projectId id of the project
     * @param itemId id of the artefact to delete 
     */
    public deleteWorkItem(projectId, itemId)
    {
        var headers = new Headers();
        var bearer = "Bearer " + accessToken;
        headers.append("Authorization", bearer);
        var options = {
            method: "DELETE",
            headers: headers
        };
        var graphEndpoint = "https://dev.azure.com/expertime/"+projectId+"/_apis/wit/workitems/"+itemId+"?api-version=5.1";

        fetch(graphEndpoint, options)
            .then((response) =>{
            response.text().then((data) =>{
                console.log("réponse :" + data);
            });
        });
    }

    /**
     * add a comment to an artefact
     * @param projectId id of the project
     * @param itemId id of the artefact to add a comment
     * @param text content of the comment
     */
    public addComment(projectId, itemId, text)
    {
        var headers = new Headers();
        var bearer = "Bearer " + accessToken;
        headers.append("Authorization", bearer);
        var options = {
            method: "POST",
            headers: headers,
            text: text
        };
        var graphEndpoint = "https://dev.azure.com/expertime/"+projectId+"/_apis/wit/workitems/"+itemId+"/comments?api-version=5.1-preview.3";

        fetch(graphEndpoint, options)
            .then((response) =>{
            response.text().then((data) =>{
                console.log("réponse :" + data);
            });
        });
    }

    /**
     * return all possible transitions for the artefact
     * @param itemId id of the artefact
     */
    public getWorkItemPossibleTransitions( itemId)
    {
        var headers = new Headers();
        var bearer = "Bearer " + accessToken;
        headers.append("Authorization", bearer);
        var options = {
            method: "GET",
            headers: headers
        };
        var graphEndpoint = "https://dev.azure.com/expertime/_apis/wit/workitemtransitions?ids="+itemId+"&api-version=5.1-preview.1"

        fetch(graphEndpoint, options)
            .then((response) =>{
            response.text().then((data) =>{
                console.log("réponse :" + data);
            });
        });
    }

    /**
     * pass a transition to an artefact in the project
     * @param projectId id of the project
     * @param itemId id of the artefact
     * @param transitionId id of the transition
     */
    public editWorkItemState(projectId, itemId, transitionId)
    {
        var headers = new Headers();
        var bearer = "Bearer " + accessToken;
        headers.append("Authorization", bearer);
        var options = {
            method: "PATCH",
            headers: headers,
            op:"transition",
            id:transitionId
        };
        var graphEndpoint = "https://dev.azure.com/expertime/"+projectId+"/_apis/wit/workitems/"+itemId+"?api-version=5.1-preview.1"

        fetch(graphEndpoint, options)
            .then((response) =>{
            response.text().then((data) =>{
                console.log("réponse :" + data);
            });
        });
    }

    /**
     * restore the API token for the authentification
     */
    public getToken()
    {
        
          if(window.location.href.search("id_token")>=0)
          {
            window.close();
          }
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
        }
    }
}
