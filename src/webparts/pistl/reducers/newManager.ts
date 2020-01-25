const newReducer = (state = [{name:'artefact1', type:'bug', author:'Alexis'}, {name:'artefact1', type:'bug', author:'Alexis'}], action) =>
{
    switch(action.type)
    {
        case 'ADD':
            return state.push(action.payload);
        case 'REMOVE':
            return state.splice(state.indexOf(action.payload), 1);
        default: // need this for default case
            return state 
    }
}

export default newReducer;