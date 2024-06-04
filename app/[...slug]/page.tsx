import { ISbStoriesParams, getStoryblokApi, storyblokEditable } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

export async function fetchData(slug) {
  const sbParams: ISbStoriesParams = { version: "draft", cv: new Date().getTime() };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/` + slug, sbParams);
}

export default async function Home({ params }) {
  const { data } = await fetchData(params.slug.join('/'));

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  )
}
