import { PageStoryblok } from "component-types-sb";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const Page = ({ blok }: { blok: PageStoryblok }) => (
  <main {...storyblokEditable(blok)} className="text-center mt-4">
    <h1>
      {(blok) ? blok.Headline : ''}
    </h1>

    {blok && blok.body && blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;