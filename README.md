# AI

방법1) 직접 이미지 자료 다운 받아서 GAN으로 학습시키기 
현재 주어진 개발시간 (3-4주) 안에 하기에는 시간, 노력이 많이 든다 
또, 학습 시킬만한 환경이 중요한데, 노트북으로는 어렵고 구글 코랩에서 서버를 대여하거나 하는 정도로 해야지 제대로 학습시킬 수 있다. 
지금 상황에서는 직접 학습을 시키는 것보다는, 이미 학습되어있는 모델을 가져다가 쓰는 것이 더 좋아보임. 

방법2)  imageCraft
실행 가능. API Key가 필요함. 
무료로 사용할 수 있는 다른 버전 알아보기 

가상 환경 생성 및 활성화 
python3 -m venv venv 
source venv/Scripts/activate 
cd 폴더명
pip install -r requirements.txt
streamlit run app.py

