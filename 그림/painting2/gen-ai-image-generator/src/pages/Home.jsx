import React, { useState, useEffect } from "react";
import ImageBox from "../components/ImageBox";
import NavBar from "../components/NavBar";
import { fetchImages } from "../services/model-api";
import { getRandom, loaderMessages, promptIdeas } from "../utilities/utils";
import ChooseResults from "../components/ChooseResults";
import RecentResults from "../components/RecentResults";

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [inputFields, setInputFields] = useState(Array(7).fill(""));
  const [radioValue, setRadioValue] = useState("20");
  const [dropDownValue, setDropDownValue] = useState("DDIM");
  const [seedValue, setSeedValue] = useState(17123564234);
  const [loaderMessage, setLoaderMessage] = useState(loaderMessages[0]);

  useEffect(() => {
    const loaderInterval = setInterval(() => {
      setLoaderMessage(getRandom(loaderMessages));
    }, 3000);
    // to avoid memory leak
    return () => {
      clearInterval(loaderInterval);
    };
  }, [loaderMessage]);

  const handleInputChange = (index, event) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = event.target.value;
    setInputFields(newInputFields);
  };

  const handleChange = (event) => {
    if (event.target.name === "radio") {
      setRadioValue(event.target.value);
    } else if (event.target.name === "dropdown") {
      setDropDownValue(event.target.value);
    } else {
      setSeedValue(event.target.value);
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      setShowLoader(true);
      const promptQuery = inputFields.join(" ");

      const imageBlob = await fetchImages(
        promptQuery,
        seedValue,
        dropDownValue,
        radioValue
      );

      const fileReaderInstance = new FileReader();
      // This event will fire when the image Blob is fully loaded and ready to be displayed
      fileReaderInstance.onload = () => {
        let base64data = fileReaderInstance.result;
        setImageResult(base64data);
      };
      // Use the readAsDataURL() method of the FileReader instance to read the image Blob and convert it into a data URL
      fileReaderInstance.readAsDataURL(imageBlob);
      setShowLoader(false);
    } catch (error) {
      // Handle error
      console.error("Error fetching images from API:", error);
      setShowLoader(false);
    }
  };

  const handleSurpriseMe = (e) => {
    const surprisePrompt = getRandom(promptIdeas);
    setInputFields([surprisePrompt, "", "", "", "", "", ""]);
  };

  const handleAvailOptions = (option) => {
    setInputFields([option, "", "", "", "", "", ""]);
  };

  return (
    <div>
      <NavBar />
      <div className="surpriseBox">
        <label>캐릭터 생성</label>
      </div>
      <div className="formBox">
        <div className="formValue">
          <label>화풍 선택 &nbsp;</label>
          <select name="dropdown" value={dropDownValue} onChange={handleChange}>
            <option value="Euler">인물화</option>
            <option value="LMS">건축적</option>
            <option value="Heun">풍경화</option>
            <option value="DDPM">사진</option>
          </select>
        </div>
        <div className="formValue">
          퀄리티 선택 
          <label>
            <input
              type="radio"
              name="radio"
              value="20"
              checked={radioValue === "20"}
              onChange={handleChange}
            />
            저
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              value="30"
              onChange={handleChange}
            />
            중 
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              value="50"
              onChange={handleChange}
            />
            고
          </label>
        </div>
        <div className="formValue">
          <label>&nbsp;</label>
          <input
            type="number"
            name="input"
            value={seedValue}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <div className="customize">
          {inputFields.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e)}
              placeholder={`예시 글 ${index + 1}`}
              className="promptInput"
            />
          ))}
        </div>
        <button onClick={handleSurpriseMe}>키워드 추천</button>
      </div>
      <div>
        <button onClick={handleGenerate}>삽화 생성</button>
      </div>

      {showLoader ? (
        <div style={{ margin: 40 }}>기다려주세요... ⚡️⚡️⚡️</div>
      ) : (
        <>
          <ImageBox promptQuery={inputFields.join(" ")} imageResult={imageResult} />
        </>
      )}
      <ChooseResults onSelect={handleAvailOptions} />
      <RecentResults
        promptQuery={inputFields.join(" ")}
        imageResult={imageResult}
        onSelect={handleAvailOptions}
      />
      <div className="slideShowMessage">{loaderMessage}</div>
      <div className="footer">SSAFY 7조</div>
    </div>
  );
};

export default Home;
