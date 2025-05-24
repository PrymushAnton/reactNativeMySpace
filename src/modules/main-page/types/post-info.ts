export interface IPostProps  {
    id?: number, 
    name: string,
    avatar: string,
    text: string,
    hashtags?: string[],
    photo?: string[],
    likes: number,
    views: number,
    onRefresh?: () => void;
}
