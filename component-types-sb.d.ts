import { StoryblokStory } from 'storyblok-generate-ts'

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface DatenschutzStoryblok {
  text?: RichtextStoryblok;
  _uid: string;
  component: "datenschutz";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
    id?: string;
    cached_url?: string;
    anchor?: string;
    linktype?: "story";
    story?: {
      name: string;
      created_at?: string;
      published_at?: string;
      id: number;
      uuid: string;
      content?: {
        [k: string]: any;
      };
      slug: string;
      full_slug: string;
      sort_by_date?: null | string;
      position?: number;
      tag_list?: string[];
      is_startpage?: boolean;
      parent_id?: null | number;
      meta_data?: null | {
        [k: string]: any;
      };
      group_id?: string;
      first_published_at?: string;
      release_id?: null | number;
      lang?: string;
      path?: null | string;
      alternates?: any[];
      default_full_slug?: null | string;
      translated_slugs?: null | any[];
      [k: string]: any;
    };
    [k: string]: any;
  }
  | {
    url?: string;
    cached_url?: string;
    anchor?: string;
    linktype?: "asset" | "url";
    [k: string]: any;
  }
  | {
    email?: string;
    linktype?: "email";
    [k: string]: any;
  };

export interface FormStoryblok {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  _uid: string;
  component: "form";
  [k: string]: any;
}

export interface FormDataStoryblok {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  _uid: string;
  component: "formData";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (DatenschutzStoryblok | FormStoryblok | FormDataStoryblok | PageStoryblok)[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}
