# 🎚️ Tone Slider Text Tool

A web-based application that allows users to adjust the **tone of text** between **casual** and **formal** using a **slider interface** powered by the **Mistral AI API**. Features include real-time tone transformation, undo/redo capabilities, reset functionality, error handling, and persistent local storage.

---

## 🛠️ Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Frontend     | React, CSS (Bootstrap) |
| Backend      | Node.js, Express         |
| AI API       | [Mistral Small](https://docs.mistral.ai) |
| Storage      | Local Storage             |

---

## 🔧 Setup Instructions

### 📁 Clone Repository

```bash
git clone https://github.com/your-username/tone-slider-tool.git
cd tone-slider-tool
```

### 🖼️ Frontend Setup

```bash
cd frontend
npm install
npm i bootstrap
npm run dev
```

### 🧠 Backend Setup

```bash
cd backend
npm install
node index.js
```
### 🔑 Environment Variables

Create a .env file inside the backedn/ directory

```ini
MISTRAL_API_KEY = your_mistral_api_key
PORT = 3001
```

### How to Use

1. Enter or paste your text in the left editor panel.

2. Use the slider on the right to set tone (0 = casual, 100 = formal).

3. Click Go to apply tone transformation via Mistral API.

4. Use Undo or Redo to move through revision history.

5. Click Reset to clear all content and history.

6. On refresh, your text and history remain intact.
