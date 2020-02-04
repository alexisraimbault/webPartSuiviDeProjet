export interface IArtefactProps {
/** name of the artefact */
    name: string;
/** type of the artefact */
    type: string;
/** author of the artefact */
    author: string;
/** state of the artefact */
    state: string;
/** id of the artefact */
    id: number;
/** comment list of the artefact */
    comments : Array<{author:string, text:string}>;
/** description of the artefact */
    desc:string;
/** function to move an artefact */
    moveFunction : Function;
/** function for adding a comment to an artefact */
    addCommentFunction : Function;
}
  