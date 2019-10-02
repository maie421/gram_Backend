export const COMMENT_FRAGMENT  = `
    fragment CommentParts on comments{
        id 
        text
        user{
            username
        }
    }
`;
