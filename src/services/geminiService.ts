/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const stabilityApiKey = import.meta.env.VITE_STABILITY_API_KEY || '';
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

async function imageToBase64(imageUrl: string): Promise<string> {
  if (imageUrl.startsWith('data:')) {
    return imageUrl.split(',')[1];
  }
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Generate a random color for the placeholder
function getRandomColor(): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#ABEBC6',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Create a simple SVG placeholder image
function createPlaceholderImage(text: string): string {
  const bgColor = getRandomColor().substring(1);
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
      <rect width="512" height="512" fill="#${bgColor}"/>
      <text x="256" y="180" font-size="24" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">
        🎨 Virtual Try-On Demo
      </text>
      <text x="256" y="250" font-size="16" fill="white" text-anchor="middle" font-family="Arial" word-spacing="2">
        <tspan x="256" dy="20">${text.substring(0, 50)}</tspan>
      </text>
      <text x="256" y="420" font-size="12" fill="rgba(255,255,255,0.7)" text-anchor="middle" font-family="Arial">
        Demo Mode • Get Stability AI key for real images
      </text>
    </svg>
  `;
  
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
}

async function generateImageWithStabilityAI(prompt: string): Promise<string> {
  if (!stabilityApiKey || stabilityApiKey === 'sk-') {
    // Use placeholder mode instead
    console.log('Stability AI key not set - using demo mode');
    return createPlaceholderImage(`🎨 Virtual Try-On Demo\n\n${prompt}\n\nTo enable real image generation, add your Stability AI API key to .env.local`);
  }

  try {
    const response = await fetch(
      'https://api.stability.ai/v1/generate',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${stabilityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          steps: 50,
          cfgScale: 7,
          width: 512,
          height: 512,
          samples: 1,
          sampler: 'k_dpmpp_2m',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message ||
          `Stability AI API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    if (data.artifacts && data.artifacts[0]) {
      const imageBase64 = data.artifacts[0].base64;
      return `data:image/png;base64,${imageBase64}`;
    }

    throw new Error('No image generated in response');
  } catch (error: any) {
    console.error('Stability AI error:', error);
    throw error;
  }
}

export async function generateVirtualTryOnImage(
  _baseImage: string,
  garmentFile: File,
  backgroundPrompt: string
): Promise<string> {
  try {
    // Create a detailed prompt for the virtual try-on
    const fileName = garmentFile.name.replace(/\.[^/.]+$/, '');
    const prompt = `Professional fashion model wearing ${fileName}. High-end fashion photography. ` +
      `Clear view of the outfit. ${backgroundPrompt || 'white studio background'}. ` +
      `High quality, professional product photography, 8k, detailed, sharp focus.`;

    return await generateImageWithStabilityAI(prompt);
  } catch (error: any) {
    console.error('Virtual try-on generation failed:', error);
    throw new Error(error.message || 'Failed to generate virtual try-on image');
  }
}

export async function generatePoseVariation(
  _baseImage: string,
  poseInstruction: string,
  backgroundPrompt: string
): Promise<string> {
  try {
    // Extract pose description and create detailed prompt
    const prompt = `Professional fashion model in pose: ${poseInstruction}. ` +
      `High-end fashion photography. Clear, detailed view. ` +
      `${backgroundPrompt || 'elegant studio setting'}. ` +
      `High quality professional photography, 8k, sharp focus, well-lit.`;

    return await generateImageWithStabilityAI(prompt);
  } catch (error: any) {
    console.error('Pose variation generation failed:', error);
    throw new Error(error.message || 'Failed to generate pose variation');
  }
}

export async function editImageWithPrompt(
  _baseImage: string,
  prompt: string
): Promise<string> {
  try {
    // Create an edit prompt
    const editPrompt = `Fashion photograph with modification: ${prompt}. ` +
      `Professional quality, high-end styling. ` +
      `Clear, detailed view. 8k, sharp focus, well-lit, studio quality.`;

    return await generateImageWithStabilityAI(editPrompt);
  } catch (error: any) {
    console.error('Image editing failed:', error);
    throw new Error(error.message || 'Failed to edit image');
  }
}
