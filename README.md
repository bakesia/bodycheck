# BodyCheck AI

> **AI 기반 개인 체형 분석 및 코디 추천 서비스**

사용자의 체형 분석과 스타일 무드 인식을 통해 최적의 코디를 제안하는 스마트 패션 추천 AI

---

## 기술 스택

### Frontend

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Zustand / Context API
- **HTTP Client**: Axios

### Backend

- **Framework**: FastAPI (Python)
- **Database**: MySQL (or PostgreSQL)
- **Infrastructure**: AWS EC2 (Ubuntu 22.04)

### AI Model

- **Body Analysis**: SMPL (Skinned Multi-Person Linear model)
- **Style Matching**: CLIP (Contrastive Language-Image Pre-training)

---

## 주요 기능

1. **[Mode 1] Mood-based Styling**: 사용자의 전신 사진과 원하는 스타일 키워드(태그)를 결합하여 최적의 코디 이미지 생성 및 추천
2. **[Mode 2] Closet Mix-match**: 사용자가 소지한 의류 사진을 업로드하면, AI가 체형에 맞춰 기존 옷과의 믹스매치 스타일 제안

---

## 🚀 Quick Start

- **[배포 주소]** - [bodycheck-alpha.vercel.app/](https://bodycheck-alpha.vercel.app/)
