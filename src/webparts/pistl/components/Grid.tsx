import * as React from 'react';
import styles from './Pistl.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import Artefact from './Artefact';
import {IGridProps} from './IGridProps';
import Popup from './Popup';


export default class Grid extends React.Component<IGridProps, {newList : Array<{author:string, name:string, type:string, id: number}>, resolvedList : Array<{author:string, name:string, type:string, id: number}>, activeList : Array<{author:string, name:string, type:string, id: number}>, closedList : Array<{author:string, name:string, type:string, id: number}>}> {

    constructor(props)
    {  
      super(props);  
      this.state = {
      newList : [{name:'artefact1', type:'bug', author:'Alexis', id: 1}, {name:'artefact2', type:'bug', author:'Alexis', id: 2}],
      resolvedList : [{name:'artefact1', type:'bug', author:'Alexis', id: 3}, {name:'artefact2', type:'bug', author:'Alexis', id: 4}],
      activeList : [{name:'artefact1', type:'bug', author:'Alexis', id: 5}, {name:'artefact2', type:'bug', author:'Alexis', id: 6}],
      closedList : [{name:'artefact1', type:'bug', author:'Alexis', id: 7}, {name:'artefact2', type:'bug', author:'Alexis', id: 8}]}

      this.changeList = this.changeList.bind(this);
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
                                this.setState({activeList : tmpTo});
                                break;
                            case 'resolved' : 
                                var tmpTo = [...this.state.resolvedList];
                                tmpTo.push(tmpArtefact);
                                this.setState({resolvedList : tmpTo});
                                break;
                            case 'closed' : 
                                var tmpTo = [...this.state.closedList];
                                tmpTo.push(tmpArtefact);
                                this.setState({closedList : tmpTo});
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
                                    this.setState({newList : tmpTo});
                                    break;
                                case 'resolved' : 
                                    var tmpTo = [...this.state.resolvedList];
                                    tmpTo.push(tmpArtefact);
                                    this.setState({resolvedList : tmpTo});
                                    break;
                                case 'closed' : 
                                    var tmpTo = [...this.state.closedList];
                                    tmpTo.push(tmpArtefact);
                                    this.setState({closedList : tmpTo});
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
                                        this.setState({activeList : tmpTo});
                                        break;
                                    case 'new' : 
                                        var tmpTo = [...this.state.newList];
                                        tmpTo.push(tmpArtefact);
                                        this.setState({newList : tmpTo});
                                        break;
                                    case 'closed' : 
                                        var tmpTo = [...this.state.closedList];
                                        tmpTo.push(tmpArtefact);
                                        this.setState({closedList : tmpTo});
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
                                            this.setState({activeList : tmpTo});
                                            break;
                                        case 'resolved' : 
                                            var tmpTo = [...this.state.resolvedList];
                                            tmpTo.push(tmpArtefact);
                                            this.setState({resolvedList : tmpTo});
                                            break;
                                        case 'new' : 
                                            var tmpTo = [...this.state.newList];
                                            tmpTo.push(tmpArtefact);
                                            this.setState({newList : tmpTo});
                                            break;
                                    }
                                }
                            }
                            break;
        }
    }

    
  public render(): React.ReactElement<IGridProps> {
    return (

        <div className={ styles.row }>
        <div className={ styles.column }>
            <span className={ styles.title }>New</span>
           {this.state.newList.map((item) => (
                <Artefact author = {item.author} type = {item.type} name = {item.name} state = "new" id = {item.id} moveFunction = {this.changeList.bind(this)}/>
            ))}
        </div>
        <div className={ styles.column }>
            <span className={ styles.title }>Active</span>
            {this.state.activeList.map((item) => (
                <Artefact author = {item.author} type = {item.type} name = {item.name} state = "active" id = {item.id} moveFunction = {this.changeList.bind(this)}/>
            ))}
        </div>
        <div className={ styles.column }>
            <span className={ styles.title }>Resolved</span>
            {this.state.resolvedList.map((item) => (
                <Artefact author = {item.author} type = {item.type} name = {item.name} state = "resolved" id = {item.id} moveFunction = {this.changeList.bind(this)}/>
            ))}
        </div>
        <div className={ styles.column }>
            <span className={ styles.title }>Closed</span>
            {this.state.closedList.map((item) => (
                <Artefact author = {item.author} type = {item.type} name = {item.name} state = "closed" id = {item.id} moveFunction = {this.changeList.bind(this)}/>
            ))}
        </div>
        </div>
        
    );
  }
}
