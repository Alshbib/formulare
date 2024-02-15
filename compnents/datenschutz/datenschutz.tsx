// 
"use client"
import React from 'react';
import { DatenschutzStoryblok } from 'component-types-sb';
import { renderRichText, storyblokEditable } from '@storyblok/react';

export default function Datenschutz({ blok }: { blok: DatenschutzStoryblok }) {

  var text = renderRichText(blok.text);

  return (
    <div {...storyblokEditable(blok)} style={styles.container}>
      <h1 style={styles.heading}>Datenschutzbestimmungen</h1>
      <p style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus velit.
        ...
      </p>
      <div dangerouslySetInnerHTML={{ __html: text }} style={styles.richText}></div>
    </div>
  );
}

const styles = {
  container: {
    // Add your container styles here
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    // Add your heading styles here
    color: '#333',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  paragraph: {
    // Add your paragraph styles here
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  richText: {
    // Add your rich text styles here
    marginTop: '10px',
  },
};