import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

interface Story {
  pages: { text: string; imageUrl: string }[]
}

function generateImageUrl(text: string): string {
  const encodedText = encodeURIComponent(text);
  const style = "cartoon,colorful,children's book illustration";
  return `https://image.pollinations.ai/prompt/${encodedText}?style=${style}&width=800&height=600`;
}

export async function generateStory(
  storyOutline: string,
  setLoadingProgress: (progress: { current: number; total: number }) => void
): Promise<Story> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`You are a creative children's story writer. Create a short story based on the following outline, divided into 6 pages. Each page should be a short paragraph suitable for generating a cartoon image: ${storyOutline}`);
    const storyText = result.response.text();
    const storyPages = storyText.split('\n\n').filter(page => page.trim() !== '');

    if (storyPages.length === 0) {
      throw new Error("Failed to generate story text");
    }

    setLoadingProgress({ current: 0, total: storyPages.length });

    const storyWithImages = await Promise.all(storyPages.map(async (pageText, index) => {
      setLoadingProgress({ current: index + 1, total: storyPages.length });
      const imageUrl = generateImageUrl(pageText);
      // Simulate image loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { text: pageText, imageUrl };
    }));

    return { pages: storyWithImages };
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error(`Failed to generate story: ${error.message}`);
  }
}