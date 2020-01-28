export interface IArtefactProps {
    name: string;
    type: string;
    author: string;
    state: string;
    id: number;
    comments : Array<{author:string, text:string}>;
    desc:string;
    moveFunction : Function;
    addCommentFunction : Function;
}
  