"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Form from "./form/form";
import Page from "./page/page";
import FormData from "./formData/formData";
import Datenschutz from "./datenschutz/datenschutz";

storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_API_KEY,
  use: [apiPlugin],

  components: {
    form: Form,
    page: Page,
    formData: FormData,
    datenschutz: Datenschutz
  }
});

export default function StoryblokProvider({ children } : any) {
  return children;
}