import * as React from 'react';
import styles from './Pistl.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import Artefact from './Artefact';
import {IGridProps} from './IGridProps';
import {PrimaryButton } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import Popup from './Popup';

const page_size = 3.0;

export default class Grid extends React.Component<IGridProps, {currentPage:number, maxPages:number,newList : Array<{author:string, desc :string, name:string, type:string, id: number, comments : Array<{author:string, text:string}>}>, resolvedList : Array<{author:string, desc :string, name:string, type:string, id: number, comments : Array<{author:string, text:string}>}>, activeList : Array<{author:string, desc :string, name:string, type:string, id: number, comments : Array<{author:string, text:string}>}>, closedList : Array<{author:string, desc :string, name:string, type:string, id: number, comments : Array<{author:string, text:string}>}>}> {

    constructor(props)
    {  
        super(props);  
        this.state = {
        currentPage : 0,
        maxPages :1,
        newList : [{name:'artefact1', desc:'description de l\'artefact', type:'bug', author:'Alexis', id: 1,comments:[{author:"Alexis", text:"comment"}, {author:"Alexis", text:"comment"}]}, {name:'artefact2', desc:'description de l\'artefact', type:'task', author:'Alexis', id: 2,comments:[{author:"Alexis", text:"comment"}]}],
        resolvedList : [{name:'artefact3', desc:'description de l\'artefact', type:'bug', author:'Alexis', id: 3,comments:[{author:"Alexis", text:"comment"}]}, {name:'artefact4', desc:'description de l\'artefact', type:'task', author:'Alexis', id: 4,comments:[{author:"Alexis", text:"comment"}]}],
        activeList : [{name:'artefact5', desc:'description de l\'artefact', type:'bug', author:'Alexis', id: 5,comments:[{author:"Alexis", text:"comment"}]}, {name:'artefact6', desc:'description de l\'artefact', type:'task', author:'Alexis', id: 6,comments:[{author:"Alexis", text:"comment" }]}],
        closedList : [{name:'artefact7', desc:'description de l\'artefact', type:'bug', author:'Alexis', id: 7,comments:[{author:"Alexis", text:"comment"}]}, {name:'artefact8', desc:'description de l\'artefact', type:'task', author:'Alexis', id: 8,comments:[{author:"Alexis", text:"comment" }]}]}

        this.changeList = this.changeList.bind(this);
        this.addComment = this.addComment.bind(this);
        this.updateMaxPages = this.updateMaxPages.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    } 

    handleChange(event) 
    {  
    this.setState({  
        //TODO
    });  
    }

    addComment(id, from, comment)
    {
        var cpt = 0;
        switch(from)
        {
            case 'new' : 
                for(cpt = 0; cpt< this.state.newList.length; cpt++)
                    {
                        if (this.state.newList[cpt].id == id)
                        {
                            var tmpFrom = [...this.state.newList];
                            tmpFrom[cpt].comments.push(comment);
                            this.setState({newList : tmpFrom});
                        }
                    }
                break;
            case 'active' : 
                for(cpt = 0; cpt< this.state.activeList.length; cpt++)
                {
                    if (this.state.activeList[cpt].id == id)
                    {
                        var tmpFrom = [...this.state.activeList];
                        tmpFrom[cpt].comments.push(comment);
                        this.setState({activeList : tmpFrom});
                    }
                }
                break;
            case 'resolved' : 
                for(cpt = 0; cpt< this.state.resolvedList.length; cpt++)
                {
                    if (this.state.resolvedList[cpt].id == id)
                    {
                        var tmpFrom = [...this.state.resolvedList];
                        tmpFrom[cpt].comments.push(comment);
                        this.setState({resolvedList : tmpFrom});
                    }
                }
                break;
            case 'closed' : 
                for(cpt = 0; cpt< this.state.closedList.length; cpt++)
                {
                    if (this.state.closedList[cpt].id == id)
                    {
                        var tmpFrom = [...this.state.closedList];
                        tmpFrom[cpt].comments.push(comment);
                        this.setState({closedList : tmpFrom});
                    }
                }
                break;
        }
    }

    changeList(id, from, to)
    {
        console.log('test move function : execute');
        var cpt;
        switch(from)
        {
            case 'new' :
                for(cpt = 0; cpt< this.state.newList.length; cpt++)
                {
                    if (this.state.newList[cpt].id == id)
                    {
                        var tmpFrom = [...this.state.newList];
                        var tmpArtefact = tmpFrom.splice(cpt, 1)[0];
                        this.setState({newList : tmpFrom});
                        switch(to)
                        {
                            case 'active' : 
                                var tmpTo = [...this.state.activeList];
                                tmpTo.push(tmpArtefact);
                                this.setState({activeList : tmpTo}, this.updateMaxPages);
                                break;
                            case 'resolved' : 
                                var tmpTo = [...this.state.resolvedList];
                                tmpTo.push(tmpArtefact);
                                this.setState({resolvedList : tmpTo}, this.updateMaxPages);
                                break;
                            case 'closed' : 
                                var tmpTo = [...this.state.closedList];
                                tmpTo.push(tmpArtefact);
                                this.setState({closedList : tmpTo}, this.updateMaxPages);
                                break;
                        }
                    }
                }
                break;
                case 'active' :
                    for(cpt = 0; cpt< this.state.activeList.length; cpt++)
                    {
                        if (this.state.activeList[cpt].id == id)
                        {
                            var tmpFrom = [...this.state.activeList];
                            var tmpArtefact = tmpFrom.splice(cpt, 1)[0];
                            this.setState({activeList : tmpFrom});
    
                            switch(to)
                            {
                                case 'new' : 
                                    var tmpTo = [...this.state.newList];
                                    tmpTo.push(tmpArtefact);
                                    this.setState({newList : tmpTo}, this.updateMaxPages);
                                    break;
                                case 'resolved' : 
                                    var tmpTo = [...this.state.resolvedList];
                                    tmpTo.push(tmpArtefact);
                                    this.setState({resolvedList : tmpTo}, this.updateMaxPages);
                                    break;
                                case 'closed' : 
                                    var tmpTo = [...this.state.closedList];
                                    tmpTo.push(tmpArtefact);
                                    this.setState({closedList : tmpTo}, this.updateMaxPages);
                                    break;
                            }
                        }
                    }
                    break;
                    case 'resolved' :
                        for(cpt = 0; cpt< this.state.resolvedList.length; cpt++)
                        {
                            if (this.state.resolvedList[cpt].id == id)
                            {
                                var tmpFrom = [...this.state.resolvedList];
                                var tmpArtefact = tmpFrom.splice(cpt, 1)[0];
                                this.setState({resolvedList : tmpFrom});
        
                                switch(to)
                                {
                                    case 'active' : 
                                        var tmpTo = [...this.state.activeList];
                                        tmpTo.push(tmpArtefact);
                                        this.setState({activeList : tmpTo}, this.updateMaxPages);
                                        break;
                                    case 'new' : 
                                        var tmpTo = [...this.state.newList];
                                        tmpTo.push(tmpArtefact);
                                        this.setState({newList : tmpTo}, this.updateMaxPages);
                                        break;
                                    case 'closed' : 
                                        var tmpTo = [...this.state.closedList];
                                        tmpTo.push(tmpArtefact);
                                        this.setState({closedList : tmpTo}, this.updateMaxPages);
                                        break;
                                }
                            }
                        }
                        break;
                        case 'closed' :
                            for(cpt = 0; cpt< this.state.closedList.length; cpt++)
                            {
                                if (this.state.closedList[cpt].id == id)
                                {
                                    var tmpFrom = [...this.state.closedList];
                                    var tmpArtefact = tmpFrom.splice(cpt, 1)[0];
                                    this.setState({closedList : tmpFrom});
            
                                    switch(to)
                                    {
                                        case 'active' : 
                                            var tmpTo = [...this.state.activeList];
                                            tmpTo.push(tmpArtefact);
                                            this.setState({activeList : tmpTo}, this.updateMaxPages);
                                            break;
                                        case 'resolved' : 
                                            var tmpTo = [...this.state.resolvedList];
                                            tmpTo.push(tmpArtefact);
                                            this.setState({resolvedList : tmpTo}, this.updateMaxPages);
                                            break;
                                        case 'new' : 
                                            var tmpTo = [...this.state.newList];
                                            tmpTo.push(tmpArtefact);
                                            this.setState({newList : tmpTo}, this.updateMaxPages);
                                            break;
                                    }
                                }
                            }
                            break;
        }
    }

    updateMaxPages()
    {
        var newMaxPages = Math.ceil(Math.max(this.state.newList.length, this.state.activeList.length, this.state.resolvedList.length, this.state.closedList.length)/page_size);
        this.setState({maxPages:newMaxPages});
    }

    nextPage()
    {
        var nexPage = (this.state.currentPage + 1)%this.state.maxPages;
        this.setState({currentPage:nexPage});
    }

    prevPage()
    {
        var prevPage = (this.state.currentPage - 1 + this.state.maxPages)%this.state.maxPages;
        this.setState({currentPage:prevPage});
    }
    
  public render(): React.ReactElement<IGridProps> 
  {
    var renderNewList = this.state.newList.slice(Math.min((this.state.currentPage)*page_size, this.state.newList.length), Math.min(((this.state.currentPage+1)*page_size), this.state.newList.length)).map((item) => (
        <Artefact author = {item.author} type = {item.type} name = {item.name} state = "new" id = {item.id} moveFunction = {this.changeList.bind(this)} desc = {item.desc} comments ={item.comments} addCommentFunction = {this.addComment.bind(this)}/>
    ));

    var renderActiveList = this.state.activeList.slice(Math.min((this.state.currentPage)*page_size, this.state.activeList.length), Math.min(((this.state.currentPage+1)*page_size), this.state.activeList.length)).map((item) => (
        <Artefact author = {item.author} type = {item.type} name = {item.name} state = "active" id = {item.id} moveFunction = {this.changeList.bind(this)} desc = {item.desc} comments ={item.comments} addCommentFunction = {this.addComment.bind(this)}/>
    ));

    var renderResolvedList = this.state.resolvedList.slice(Math.min((this.state.currentPage)*page_size, this.state.resolvedList.length), Math.min(((this.state.currentPage+1)*page_size), this.state.resolvedList.length)).map((item) => (
        <Artefact author = {item.author} type = {item.type} name = {item.name} state = "resolved" id = {item.id} moveFunction = {this.changeList.bind(this)} desc = {item.desc} comments ={item.comments} addCommentFunction = {this.addComment.bind(this)}/>
    ));

    var renderClosedList = this.state.closedList.slice(Math.min((this.state.currentPage)*page_size, this.state.closedList.length), Math.min(((this.state.currentPage+1)*page_size), this.state.closedList.length)).map((item) => (
        <Artefact author = {item.author} type = {item.type} name = {item.name} state = "closed" id = {item.id} moveFunction = {this.changeList.bind(this)} desc = {item.desc} comments ={item.comments} addCommentFunction = {this.addComment.bind(this)}/>
    ));
    return (
        <div>
            <div className={ styles.row }>
                <div className={ styles.column }>
                    <span className={ styles.title }>New</span>
                {renderNewList}
                </div>
                <div className={ styles.column }>
                    <span className={ styles.title }>Active</span>
                    {renderActiveList}
                </div>
                <div className={ styles.column }>
                    <span className={ styles.title }>Resolved</span>
                    {renderResolvedList}
                </div>
                <div className={ styles.column }>
                    <span className={ styles.title }>Closed</span>
                    {renderClosedList}
                </div>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.paginationContainer}>
                    <PrimaryButton text='<<' onClick={this.prevPage.bind(this)} />
                    <div className={ styles.paginationText }> page {this.state.currentPage + 1}/{this.state.maxPages}</div>
                    <PrimaryButton text='>>' onClick={this.nextPage.bind(this)} />
                </div>
                <Dropdown 
                className={ styles.filterDropdown }
                label='' 
                defaultSelectedKey={ "new" } 
                options={ [ { text: 'New',     key: "new" },  
                            { text: 'Active',    key: "active" },  
                            { text: 'Resolved',  key: "resolved" },  
                            { text: 'Closed',   key: "closed" }
                            ] 
                } 
                onChanged={this.handleChange.bind(this) } 
                />
              </div>
        </div>
    );
  }
}
