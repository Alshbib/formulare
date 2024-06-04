"use client"
import { useState, useEffect } from 'react';
import { FormDataStoryblok } from 'component-types-sb';
import { storyblokEditable } from '@storyblok/react';

export default function FormData({ blok }: { blok: FormDataStoryblok }) {
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spaceId = '270765';
        const storyblokResponse = await fetch('https://mapi.storyblok.com/v1/spaces/270765/stories/', {
          headers: {
            'Authorization': process.env.STORYBLOK_API_KEY,
          },
        });

        const storyData = await storyblokResponse.json();
        setStoryData(storyData);
      } catch (error) {
        console.error('Error fetching data from Storyblok:', error);
      }
    };

    fetchData();
  }, [blok._uid]);

  return (
    <div {...storyblokEditable(blok)}>
        <div className="contact-form-container">
        <div className="contact-form">
      <form className="container">
        <h2>Kontaktanfragen</h2>
        <p>Name: {blok.name}</p>
        <p>Email: {blok.email}</p>
        <p>Phone: {blok.phone}</p>
        <p>Message: {blok.message}</p>
      </form>
    </div>
    </div>
    </div>

  );
}

