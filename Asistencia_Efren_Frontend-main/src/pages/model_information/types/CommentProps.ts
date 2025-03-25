export type CommentProps = {
    description: string
    autor: string
    date: string
    funtionParent: (isReply:boolean) => void
};