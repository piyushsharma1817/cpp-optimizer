# C++ Optimizer

A static analysis tool for C++ competitive programming solutions. Paste a solution that passes on LeetCode/Codeforces, and get feedback on space/time optimizations and common bug patterns — explained in plain language using an LLM layer on top of rule-based detection.

## Why I built this

While solving DSA problems, I kept hitting the same bugs repeatedly: `if` vs `while` in shrinking-window logic, off-by-one errors in binary search, missing `return` statements in recursion. I also noticed I'd sometimes pass a problem with a working-but-unnecessarily-heavy solution (e.g., using a vector where a single variable would do). I built this tool to catch both categories — and to better understand my own recurring mistakes.

## How it works

1. A custom rule engine scans submitted C++ code for specific patterns (unnecessary data structures, binary search boundary risks, single-use helper functions, etc.)
2. Detected findings (structured JSON) are passed to Gemini, which generates a friendly, plain-language explanation and fix suggestion
3. Results render in a Monaco-based code editor UI with inline findings

The detection logic is entirely rule-based and written from scratch — the LLM is used only for explanation generation, not detection, keeping the core logic transparent and debuggable.

## Tech stack
- Frontend: React, Vite, Monaco Editor
- Backend: Node.js, Express
- AI: Google Gemini API (gemini-3.5-flash)
- Deployment: Vercel (frontend), Render (backend)

## Live demo
- Frontend: https://cpp-optimizer-client.vercel.app
- (Note: backend is on Render's free tier — first request may take 30-50s to wake up)

## Current rules implemented
- Unnecessary vector used only for max/min tracking
- Binary search integer overflow risk (mid computation)
- Single-use helper functions

## Planned (roadmap)
- Redundant sorting/recomputation detection
- Recursive memoization gap detection
- 2D DP table space optimization (rolling array suggestion)
- Linked list pointer-vs-value swap detection
- Personal "weakness tracker" dashboard showing which bugs recur most often per user

## Setup
\`\`\`bash
# Backend
cd server
npm install
# add GEMINI_API_KEY to .env
node index.js

# Frontend
cd client
npm install
npm run dev
\`\`\`