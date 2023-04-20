export interface Page {
    object:           string;
    id:               string;
    created_time:     Date;
    last_edited_time: Date;
    created_by:       TedBy;
    last_edited_by:   TedBy;
    cover:            Cover | null;
    icon:             null;
    parent:           Parent;
    archived:         boolean;
    properties:       Properties;
    url:              string;
}

export interface Cover {
    type:     string;
    external: External;
}

export interface External {
    url: string;
}

export interface TedBy {
    object: string;
    id:     string;
}

export interface Parent {
    type:        string;
    database_id: string;
}

export interface Properties {
    Authors:             Authors;
    Categories:          Authors;
    "Short Description": ShortDescription;
    "Publish Date":      PublishDate;
    Slug:                ShortDescription;
    Published:           Published;
    Title:               Title;
}

export interface Authors {
    id:       string;
    type:     string;
    relation: Relation[];
    has_more: boolean;
}

export interface Relation {
    id: string;
}

export interface PublishDate {
    id:   string;
    type: string;
    date: null;
}

export interface Published {
    id:       string;
    type:     string;
    checkbox: boolean;
}

export interface ShortDescription {
    id:        string;
    type:      string;
    rich_text: RichText[];
}

export interface RichText {
    type:        string;
    text:        Text;
    annotations: Annotations;
    plain_text:  string;
    href:        null;
}

export interface Annotations {
    bold:          boolean;
    italic:        boolean;
    strikethrough: boolean;
    underline:     boolean;
    code:          boolean;
    color:         string;
}

export interface Text {
    content: string;
    link:    null;
}

export interface Title {
    id:    string;
    type:  string;
    title: RichText[];
}

export interface TableOfContentItems {
    type: string,
    text: string,
    id: string
}

export interface FAQ {
    question: string | null,
    answer: string | null
}