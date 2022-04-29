export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string; //object?
  boardId: string; //object?
  columnId: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[];
}

export interface IBoard {
  id: string;
  title: string;
  columns?: IColumn[]
}

export interface AppState {
  boards: IBoard[]
}

//////////////////////////////////////


interface IThumbnailSettings {
  url: string;
  width?: number;
  height?: number;
}

export interface IId {
  'kind': string,
  'videoId': string,
  'channelId': string,
  'playlistId': string
}

interface ISnippet {
  publishedAt: string;
  channelId?: string;
  title: string;
  description?: string;
  thumbnails: {
    default: IThumbnailSettings;
    medium?: IThumbnailSettings;
    high: IThumbnailSettings;
    standard?: IThumbnailSettings;
    maxres?: IThumbnailSettings;
  };
  channelTitle?: string;
  tags?: string[];
  categoryId?: string;
  liveBroadcastContent?: string;
  localized?: {
    title: string;
    description: string;
  };
  defaultAudioLanguage?: string;
}

export interface CardState {
  kind?: string;
  etag?: string;
  id?: string | IId;
  snippet: ISnippet;
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string
  };
}

export interface UsersState {
  email: string,
  token: string
}

export interface UserCardState {
  title: string,
  description?: string,
  imgLink: string,
  videoLink: string
}

export interface AppState {
  cards: CardState[],
  userCards: UserCardState[],
  users: UsersState[]
}
