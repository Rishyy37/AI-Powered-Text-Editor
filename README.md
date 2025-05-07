# 🎚️ AI Powered Text Editor

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
git clone https://github.com/your-username/AI-powered-text-editor.git
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

## 🧠 Technical Overview
### 🔧 Technical Architecture
* Frontend: React + Bootstrap for UI and interactions
* Backend: Node.js + Express for API requests and caching
* Mistral AI: Used for tone adjustment (mistral-small)
* Cache: node-cache with 5-minute TTL
* Persistence: localStorage for saved text

Trade-offs:

* No database used (lightweight app)
* Chose tone scale (0–100) for flexibility over fixed presets

### 🔁 State Management (Undo/Redo)

* text, toneLevel, pendingTone, sliderValue: main states
* history: stores previous text/tone (for undo)
* future: stores undone states (for redo)

Actions:

* Undo: Restores from history, pushes current to future
* Redo: Re-applies next item in future
* Reset: Clears text and tone, saves current to history
* Go : Executes the message retrieval based on the tone.

### ⚠️ Error & Edge Case Handling
Frontend
* Alerts if text is empty on tone adjust/reset
* Disables undo/redo buttons when not possible
* Shows loading spinner while waiting for Mistral
* Displays error messages on failure

Backend
* Validates text and toneLevel
* Caches responses for repeated inputs
* Gracefully returns error if Mistral API fails


### Demo Video

Loom video link : https://www.loom.com/share/b3f5c68ae8f246609bb356debb02ae73?sid=4926f698-6d6d-40d3-8e08-5b9719ae0210


