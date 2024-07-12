⭐ 실행 

npm install 
npm run dev 

---

⭐ 원리 
CNN (Convolutional Neural Network)

- 학습 데이터 
웹 크롤링으로 얻은 대규모 이미지 데이터 

---

⭐ 패키지 
Segmind NPM :  Segmind의 클라우드 플랫폼에서 최신 모델을 사용하여 이미지를 생성할 수 있는 패키지
애플리케이션, 웹사이트 또는 프로젝트에 이미지 생성 기능을 쉽게 통합가능 
https://github.com/segmind/segmind-npm


sdxl.generate({
  prompt: "a panda on a chair", // 생성할 이미지 설명
  style: "base", // 이미지 스타일
  samples: 1, // 생성할 샘플 수
  scheduler: "UniPC", // 스케줄러 유형
  num_inference_steps: 25, // 디노이징 단계 수
  guidance_scale: 8, // 분류기 자유 지도의 스케일
  strength: 0.2, // 변환 강도
  high_noise_fraction: 0.8, // 각 전문가에게 실행할 추론 단계의 비율
  seed: "468685", // 이미지 생성을 위한 시드
  img_width: 1024, // 이미지 너비
  img_height: 1024, // 이미지 높이
  refiner: true, // 이미지 품질 개선
  base64: false, // 출력 이미지의 Base64 인코딩
}).then((response) => {
    // 생성된 이미지를 처리하는 부분
    console.log(response.data);
});
