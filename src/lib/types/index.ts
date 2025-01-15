export interface FAQ {
    question: string | null,
    answer: string | null
}

type IdRequest = string | string;
type EmptyObject = Record<string, never>;

export type PersonUserObjectResponse = {
    type: "person"
    person: { email?: string }
    name: string | null
    avatar_url: string | null
    id: IdRequest
    object: "user"
}

export type PartialUserObjectResponse = { id: IdRequest; object: "user" }

export type UserObjectResponse = PersonUserObjectResponse

type LanguageRequest =
  | "bash"
  | "css"
  | "html"
  | "javascript"
  | "json"
  | "markup"
  | "notion formula"
  | "plain text"
  | "powershell"
  | "python"
  | "toml"
  | "typescript"
  | "xml"
  | "yaml"

type SelectColor =
    | "default"
    | "gray"
    | "brown"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red"

type PartialSelectResponse = { id: string; name: string; color: SelectColor }

type DateResponse = {
    start: string
    end: string | null
}
type StringRequest = string

type TextRequest = string

type AnnotationResponse = {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color:
    | "default"
    | "gray"
    | "brown"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red"
    | "gray_background"
    | "brown_background"
    | "orange_background"
    | "yellow_background"
    | "green_background"
    | "blue_background"
    | "purple_background"
    | "pink_background"
    | "red_background"
}

export type TextRichTextItemResponse = {
    type: "text"
    text: { content: string; link: { url: TextRequest } | null }
    annotations: AnnotationResponse
    plain_text: string
    href: string | null
}
export type RichTextItemResponse = TextRichTextItemResponse

export type PageObjectResponse = {
    parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
    properties: Record<
        string,
        | { type: "number"; number: number | null; id: string }
        | { type: "url"; url: string | null; id: string }
        | { type: "select"; select: PartialSelectResponse | null; id: string }
        | {
            type: "multi_select"
            multi_select: Array<PartialSelectResponse>
            id: string
        }
        | { type: "status"; status: PartialSelectResponse | null; id: string }
        | { type: "date"; date: DateResponse | null; id: string }
        | { type: "email"; email: string | null; id: string }
        | { type: "phone_number"; phone_number: string | null; id: string }
        | { type: "checkbox"; checkbox: boolean; id: string }
        | {
            type: "files"
            files: Array<
                | {
                    file: { url: string; expiry_time: string }
                    name: StringRequest
                    type?: "file"
                }
                | {
                    external: { url: TextRequest }
                    name: StringRequest
                    type?: "external"
                }
            >
            id: string
        }
        | {
            type: "created_by"
            created_by: PartialUserObjectResponse | UserObjectResponse
            id: string
        }
        | { type: "created_time"; created_time: string; id: string }
        | {
            type: "last_edited_by"
            last_edited_by: PartialUserObjectResponse | UserObjectResponse
            id: string
        }
        | { type: "last_edited_time"; last_edited_time: string; id: string }
        | { type: "button"; button: Record<string, never>; id: string }
        | {
            type: "unique_id"
            unique_id: { prefix: string | null; number: number | null }
            id: string
        }
        | { type: "title"; title: Array<RichTextItemResponse>; id: string }
        | { type: "rich_text"; rich_text: Array<RichTextItemResponse>; id: string }
        | {
            type: "people"
            people: Array<PartialUserObjectResponse | UserObjectResponse>
            id: string
        }
        | { type: "relation"; relation: Array<{ id: string }>; id: string }
    >
    cover:
    | { type: "external"; external: { url: TextRequest } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
    created_by: PartialUserObjectResponse
    last_edited_by: PartialUserObjectResponse
    object: "page"
    id: string
    created_time: string
    last_edited_time: string
    archived: boolean
    in_trash: boolean
    url: string
    public_url: string | null
}

export type PartialPageObjectResponse = { object: "page"; id: string }


export type PartialDatabaseObjectResponse = {
    object: "database"
    id: string
}

export type DatabaseObjectResponse = {
    title: Array<RichTextItemResponse>
    description: Array<RichTextItemResponse>
    cover:
    | { type: "external"; external: { url: TextRequest } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
    parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
    created_by: PartialUserObjectResponse
    last_edited_by: PartialUserObjectResponse
    is_inline: boolean
    object: "database"
    id: string
    created_time: string
    last_edited_time: string
    archived: boolean
    in_trash: boolean
    url: string
    public_url: string | null
}

export type PartialBlockObjectResponse = { object: "block"; id: string }

type ApiColor =
    | "default"
    | "gray"
    | "brown"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red"
    | "gray_background"
    | "brown_background"
    | "orange_background"
    | "yellow_background"
    | "green_background"
    | "blue_background"
    | "purple_background"
    | "pink_background"
    | "red_background"

export type NumberedListItemBlockObjectResponse = {
    type: "numbered_list_item"
    numbered_list_item: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
    }
    parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
}

export type TableBlockObjectResponse = {
    type: "table"
    table: {
        has_column_header: boolean
        has_row_header: boolean
        table_width: number
    }
    parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
}

export type TableRowBlockObjectResponse = {
    type: "table_row"
    table_row: { cells: Array<Array<RichTextItemResponse>> }
    parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
}


export type BlockObjectResponse = NumberedListItemBlockObjectResponse
    | TableBlockObjectResponse
    | TableRowBlockObjectResponse


export type ListBlockChildrenResponse = {
    type: "block"
    block: EmptyObject
    object: "list"
    next_cursor: string | null
    has_more: boolean
    results: Array<PartialBlockObjectResponse | BlockObjectResponse>
}

export type BulletedListItemBlockObjectResponse = {
    type: "bulleted_list_item"
    bulleted_list_item: {
      rich_text: Array<RichTextItemResponse>
      color: ApiColor
    }
    parent:
      | { type: "database_id"; database_id: string }
      | { type: "page_id"; page_id: string }
      | { type: "block_id"; block_id: string }
      | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
  }
  
  export interface TableOfContentItems {
    type: string,
    text: string,
    id: string
}

export type CodeBlockObjectResponse = {
    type: "code"
    code: {
      rich_text: Array<RichTextItemResponse>
      caption: Array<RichTextItemResponse>
      language: LanguageRequest
    }
    parent:
      | { type: "database_id"; database_id: string }
      | { type: "page_id"; page_id: string }
      | { type: "block_id"; block_id: string }
      | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
  }

  export type EmbedBlockObjectResponse = {
    type: "embed"
    embed: { url: string; caption: Array<RichTextItemResponse> }
    parent:
      | { type: "database_id"; database_id: string }
      | { type: "page_id"; page_id: string }
      | { type: "block_id"; block_id: string }
      | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
  }

  export type Heading1BlockObjectResponse = {
    type: "heading_1"
    heading_1: {
      rich_text: Array<RichTextItemResponse>
      color: ApiColor
      is_toggleable: boolean
    }
    parent:
      | { type: "database_id"; database_id: string }
      | { type: "page_id"; page_id: string }
      | { type: "block_id"; block_id: string }
      | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
  }
  
  export type Heading2BlockObjectResponse = {
    type: "heading_2"
    heading_2: {
      rich_text: Array<RichTextItemResponse>
      color: ApiColor
      is_toggleable: boolean
    }
    parent:
      | { type: "database_id"; database_id: string }
      | { type: "page_id"; page_id: string }
      | { type: "block_id"; block_id: string }
      | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
  }
  
  export type Heading3BlockObjectResponse = {
    type: "heading_3"
    heading_3: {
      rich_text: Array<RichTextItemResponse>
      color: ApiColor
      is_toggleable: boolean
    }
    parent:
      | { type: "database_id"; database_id: string }
      | { type: "page_id"; page_id: string }
      | { type: "block_id"; block_id: string }
      | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
  }

  export type ImageBlockObjectResponse = {
    type: "image"
    image:
      | {
          type: "external"
          external: { url: TextRequest }
          caption: Array<RichTextItemResponse>
        }
      | {
          type: "file"
          file: { url: string; expiry_time: string }
          caption: Array<RichTextItemResponse>
        }
    parent:
      | { type: "database_id"; database_id: string }
      | { type: "page_id"; page_id: string }
      | { type: "block_id"; block_id: string }
      | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
  }

  export type ParagraphBlockObjectResponse = {
    type: "paragraph"
    paragraph: { rich_text: Array<RichTextItemResponse>; color: ApiColor }
    parent:
      | { type: "database_id"; database_id: string }
      | { type: "page_id"; page_id: string }
      | { type: "block_id"; block_id: string }
      | { type: "workspace"; workspace: true }
    object: "block"
    id: string
    created_time: string
    created_by: PartialUserObjectResponse
    last_edited_time: string
    last_edited_by: PartialUserObjectResponse
    has_children: boolean
    archived: boolean
    in_trash: boolean
  }

  export interface Cover {
    type:     string;
    external: External;
}

export interface External {
    url: string;
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

export interface Relation {
    id: string;
}

export interface Authors {
    id:       string;
    type:     string;
    relation: Relation[];
    has_more: boolean;
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

export interface Title {
    id:    string;
    type:  string;
    title: RichText[];
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
