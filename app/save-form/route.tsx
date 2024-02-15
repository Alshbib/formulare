import { NextResponse } from "next/server";

export async function POST(req: any) {
  const body = await req.json();

  const { name, email, phone, message } = body;
  console.log('Form Data:', { name, email, phone, message });

  try {
    const uniqueName = `Story_${Date.now()}`;

    const componentName = 'formData';
    const componentSchema = {
      name: { type: 'text', pos: 0 },
      email: { type: 'text', pos: 1 },
      phone: { type: 'text', pos: 2 },
      message: { type: 'text', pos: 3 },
    };

    const createComponentResponse = await fetch(`https://mapi.storyblok.com/v1/spaces/270765/components/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.STORYBLOK_API_KEY,
      },
      body: JSON.stringify({
        component: {
          name: componentName,
          display_name: componentName,
          schema: componentSchema,
          is_root: false,
          is_nestable: true,
        },
      }),
    });

    console.log('Storyblok Component creation response:', createComponentResponse);


    const storyblokResponse = await fetch('https://mapi.storyblok.com/v1/spaces/270765/stories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.STORYBLOK_API_KEY,
      },
      body: JSON.stringify({
        story: {
          name: uniqueName,
          slug: uniqueName.toLowerCase().replace(/\s+/g, '-'),
          content: {
            component: componentName,
            name: name,
            email: email,
            phone: phone,
            message: message,
          },
        },
        publish: 1,
      }),
    });

    console.log('Storyblok API response:', storyblokResponse);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Error posting data to Storyblok API:', error);
    return NextResponse.json({}, { status: 500 });
  }
}

