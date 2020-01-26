import * as React from 'react';
import styles from './Pistl.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import Artefact from './Artefact';
import {IGridProps} from './IGridProps';
import {PrimaryButton } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import Popup from './Popup';


export default class Grid extends React.Component<IGridProps, {currentPage:number, maxPages:number,newList : Array<{author:string, name:string, type:string, id: number}>, resolvedList : Array<{author:string, name:string, type:string, id: number}>, activeList : Array<{author:string, name:string, type:string, id: number}>, closedList : Array<{author:string, name:string, type:string, id: number}>}> {

    constructor(props)
    {  
        super(props);  
        this.state = {
        currentPage : 0,
        maxPages :1,
        newList : [{name:'artefact1', type:'bug', author:'Alexis', id: 1}, {name:'artefact2', type:'task', author:'Alexis', id: 2}],
        resolvedList : [{name:'artefact3', type:'bug', author:'Alexis', id: 3}, {name:'artefact4', type:'task', author:'Alexis', id: 4}],
        activeList : [{name:'artefact5', type:'bug', author:'Alexis', id: 5}, {name:'artefact6', type:'task', author:'Alexis', id: 6}],
        closedList : [{name:'artefact7', type:'bug', author:'Alexis', id: 7}, {name:'artefact8', type:'task', author:'Alexis', id: 8}]}

        this.changeList = this.changeList.bind(this);
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
                        console.log('test move function : found !');
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
        var newMaxPages = Math.ceil(Math.max(this.state.newList.length, this.state.activeList.length, this.state.resolvedList.length, this.state.closedList.length)/4.0);
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
    var renderNewList = this.state.newList.slice(Math.min((this.state.currentPage)*4, this.state.newList.length), Math.min(((this.state.currentPage+1)*4), this.state.newList.length)).map((item) => (
        <Artefact author = {item.author} type = {item.type} name = {item.name} state = "new" id = {item.id} moveFunction = {this.changeList.bind(this)}/>
    ));

    var renderActiveList = this.state.activeList.slice(Math.min((this.state.currentPage)*4, this.state.activeList.length), Math.min(((this.state.currentPage+1)*4), this.state.activeList.length)).map((item) => (
        <Artefact author = {item.author} type = {item.type} name = {item.name} state = "active" id = {item.id} moveFunction = {this.changeList.bind(this)}/>
    ));

    var renderResolvedList = this.state.resolvedList.slice(Math.min((this.state.currentPage)*4, this.state.resolvedList.length), Math.min(((this.state.currentPage+1)*4), this.state.resolvedList.length)).map((item) => (
        <Artefact author = {item.author} type = {item.type} name = {item.name} state = "resolved" id = {item.id} moveFunction = {this.changeList.bind(this)}/>
    ));

    var renderClosedList = this.state.closedList.slice(Math.min((this.state.currentPage)*4, this.state.closedList.length), Math.min(((this.state.currentPage+1)*4), this.state.closedList.length)).map((item) => (
        <Artefact author = {item.author} type = {item.type} name = {item.name} state = "closed" id = {item.id} moveFunction = {this.changeList.bind(this)}/>
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
                    <PrimaryButton text='<<' onClick={this.nextPage.bind(this)} />
                    <div className={ styles.paginationText }> page {this.state.currentPage + 1}/{this.state.maxPages}</div>
                    <PrimaryButton text='>>' onClick={this.prevPage.bind(this)} />
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
