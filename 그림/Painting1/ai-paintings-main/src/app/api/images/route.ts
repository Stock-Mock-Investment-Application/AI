import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
    const { 
      message,                     
      imgSize,
      imgStyle,
      imgQuality
    } = await req.json();
    const prompt = `Generate an image that describes the following recipe: ${message}. Remove text that is not allowed by your safety system if any.`;
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt.substring(0, Math.min(prompt.length, 1000)),
        size: imgSize,
        quality: imgQuality,
        style: imgStyle, // Only for dall-e-3
        response_format: "b64_json",
        n: 1,
    });

    return new Response(JSON.stringify(response.data[0].b64_json))
}