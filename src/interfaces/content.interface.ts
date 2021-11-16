export type ContentType = 'Audio' | 'Images' | 'LearningPath';

export interface Content {
    type: ContentType;
    title: string;
}
