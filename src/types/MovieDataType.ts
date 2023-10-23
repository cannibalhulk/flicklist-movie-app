type Image = {
    id: string;
    width: number;
    height: number;
    url: string;
    caption: CaptionType;
    __typename: string;
};

type CaptionType = {
    plainText: string,
    __typename: string
}

type TitleType = {
    text: string;
    id: string;
    isSeries: boolean;
    isEpisode: boolean;
    __typename: string;
};

type TitleText = {
    text: string;
    __typename: string;
};

type YearRange = {
    year: number;
    endYear: null | number;
    __typename: string;
};

type ReleaseDate = {
    day: number;
    month: number;
    year: number;
    __typename: string;
};

export type MovieDataType = {
    _id: string;
    id: string;
    primaryImage: Image;
    titleType: TitleType;
    titleText: TitleText;
    originalTitleText: TitleText;
    releaseYear: YearRange;
    releaseDate: ReleaseDate;
};
