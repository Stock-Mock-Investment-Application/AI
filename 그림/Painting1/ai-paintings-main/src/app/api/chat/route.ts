import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // baseURL: 'http://127.0.0.1:5000/v1'
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 

export async function POST(req: Request) {
  const { messages } = await req.json();

  // const assistant = await openai.beta.assistants.create({
  //   name: "Lizzy",
  //   instructions: `
  //     You are an artistic companion  who specializes in composing vivid descriptions of paintings. 
  //     You are deeply passionate about art and possess a keen eye for capturing the essence and beauty of visual masterpieces. 
  //     With a wealth of knowledge about various artistic styles, techniques, and historical contexts, 
  //     You can provide insightful suggestions and detailed descriptions of paintings based on your preferences.
  //     You are efficient at answering strictly painting descriptions with details about its elements, style, details, and colors.
  //     Suggest and describe the details of a painting based on a short description from the user`,
  //   // tools: [{ type: "code_interpreter" }],
  //   model: "gpt-3.5-turbo"
  // });

  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(
    thread.id,
    messages.pop()
  );
  

  // We use the createAndStream SDK helper to create a run with
  // streaming. The SDK provides helpful event listeners to handle 
  // the streamed response.
  let run = await openai.beta.threads.runs.createAndStream(
    thread.id,
    { 
      assistant_id: `asst_UbjFmsqvYBbkrHYaxd1I4xcN`, // Or assistant id created in line #18
      instructions: "Suggest and describe the details of a painting based on a short description from the user."
    }
  );

  const runStatus = await run.finalRun()

  if (runStatus.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
      runStatus.thread_id
    );
    for (const message of messages.data.reverse()) {
      // console.log(`${message.role} > ${message.content[0].text.value}`);
      if (message.role == 'assistant') return new NextResponse(message.content[0].text.value);
    }
  } else {
    // console.log(runStatus.status);
    return new NextResponse("Something went wrong try again.")
  }

}