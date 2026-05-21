import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const uploadForm = new FormData();
    uploadForm.append('reqtype', 'fileupload');
    uploadForm.append('fileToUpload', file);

    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: uploadForm
    });

    const text = (await response.text()).trim();

    if (!response.ok || !text.startsWith('http')) {
      return NextResponse.json({ error: text || 'Catbox upload failed.' }, { status: 502 });
    }

    return NextResponse.json({ url: text });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
