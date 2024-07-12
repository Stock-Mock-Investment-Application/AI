"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const {
    messages,
    isLoading,
    append,
  } = useChat({ api: 'api/chat' });

  const availableThemes = ["nature's harmony", "urban exploration", "emotional journey", "fantasy realm", "historical moments", "abstract exploration", "cultural diversity", "surreal diversity", "surreal dreamscape", "environmental awareness", "inner self-expression"];
  // Dalle-3
  const availableImgSizes = {
    SM: "1024x1024",
    MD: "1792x1024",
    LG: "1024x1792"
  };

  // Dalle-3 only
  const availableImgStyles = {
    Vivid: "vivid",
    Natural: "natural"
  }

  const availableImgQualities = {
    HD: "hd",
    Standard: "standard"
  };

  // Include in the prompt
  const availableAspectRatios = {
    Square: "1:1",
    Standard: "4:3",
    Widescreen: "16:9",
    Classic: "3:2",
    MediumFormat: "5:4"
  };

  const [theme, setTheme] = useState(availableThemes[0])
  const [imgSize, setImgSize] = useState(availableImgSizes.SM);
  const [aspectRatio, setAspectRatio] = useState(availableAspectRatios.Widescreen);
  const [imgStyle, setImgStyle] = useState(availableImgStyles.Natural);
  const [imgQuality, setImgQuality] = useState(availableImgQualities.Standard);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleImgSize = (e:any) => {
    setImgSize(e.target.value);
  };

  const handleAspectRatio = (e:any) => {
      setAspectRatio(e.target.value);
  };

  const handleImgStyle = (e:any) => {
    setImgStyle(e.target.value);
  };

  const handleTheme = (choice: string) => {
    setTheme(choice);
  }

  const handleImgQuality = (e:any) => {
    setImgQuality(e.target.value);
  }


  const handleClickSubmit = () => {
    append({ role: "user", content: `Create a painting description for an image with an aspect ratio of ${aspectRatio}. It should also have ${theme} theme.` }, { options: { body: {temperature: '0.5'}}})
  }



  const messagesContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (imageIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          </div>
        </div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="card w-full h-screen max-w-[768px] py-24 mx-auto stretch">
        <div className="overflow-scroll">
          <img src={`data:image/jpeg;base64,${image}`} className="w-full h-full"/>
        </div>
        <textarea
          className="mt-4 w-full text-white bg-slate-800 h-64 p-8 shadow rounded"
          value={messages[messages.length - 1].content}
          readOnly
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen max-w-[968px] py-12 mx-auto stretch">
      <div className="p-4">
        <div className="container mx-auto prose lg:prose-lg xl:prose-xl text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Generate Paintings</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Choose a theme for a painting you would like generated.
            </p>
          </div>
          <div className="flex flex-col gap-8 md:flex-row lg:gap-16">
            <div>
                <h3 className="underline py-4 text-left">Themes</h3>
                <ul className="flex gap-4 flex-wrap" id="topic">
                    {availableThemes.map((mTheme, index) => (
                        <li 
                          onClick={() => handleTheme(mTheme)}
                          className={`params-select ${ mTheme === theme ? 'border-green-600' : '' }`}
                          key={index}>{mTheme}</li>
                    ))}
                </ul>
            </div>
             
            <div className="w-full">
              <h3 className="underline py-4 text-left">Parameters</h3>
              <div className="form-input-container">
                <label htmlFor="imgSize">Image Size:</label>
                <select id="imgSize" value={imgSize} onChange={handleImgSize} className="form-input">
                  {Object.entries(availableImgSizes).map(([key, value]) => (
                    <option key={key} value={value}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="form-input-container">
                <label htmlFor="imgSize">Aspect Ratio:</label>
                <select id="imgSize" value={aspectRatio} onChange={handleAspectRatio} className="form-input">
                  {Object.entries(availableAspectRatios).map(([key, value]) => (
                    <option key={key} value={value}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="form-input-container">
                <label htmlFor="imgSize">Style:</label>
                <select id="imgSize" value={imgStyle} onChange={handleImgStyle} className="form-input">
                  {Object.entries(availableImgStyles).map(([key, value]) => (
                    <option key={key} value={value}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="form-input-container">
                <label htmlFor="imgSize">Quality:</label>
                <select id="imgSize" value={imgQuality} onChange={handleImgQuality} className="form-input">
                  {Object.entries(availableImgQualities).map(([key, value]) => (
                    <option key={key} value={value}>{key}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto mb-8 w-full" ref={messagesContainerRef}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-green-700 p-3 m-2 rounded-lg"
                : "bg-slate-700 p-3 m-2 rounded-lg"
            }`}
          >
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-end pr-4">
            <span className="animate-bounce">...</span>
          </div>
        )}

      </div>
      <div className="fixed bottom-4 w-full max-w-[768px]">
        <div className="flex flex-col justify-center mb-2 items-center">
          {messages.length == 0 && (
            <button
              className="bg-blue-500 p-2 text-white rounded shadow-xl"
              disabled={isLoading}
              onClick={handleClickSubmit}>
              Generate painting description
            </button>
          )}
          {messages.length == 2 && !isLoading && (
            <button
              className="bg-blue-500 p-2 text-white rounded shadow-xl"
              disabled={isLoading}
              onClick={async () => {
                setImageIsLoading(true);
                const response = await fetch("api/images", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    message: messages[messages.length - 1].content,
                    imgSize,
                    imgStyle,
                    aspectRatio,
                    imgQuality
                  }),
                });
                const data = await response.json();
                setImage(data);
                setImageIsLoading(false);
              }}
            >
              Generate image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
