# 🧮 Calculator Demo

A fullstack calculator application with a React frontend and a Go backend, designed using clean architecture and modern engineering practices.

---

## ✨ Features

* Basic operations:

  * ADD
  * SUBTRACT
  * MULTIPLY
  * DIVIDE
* Advanced operations:

  * EXPONENT
  * SQRT
  * PERCENTAGE
* Intuitive calculator-style UI (inspired by the Windows calculator)
* Input validation and error handling
* Responsive design (mobile-friendly)
* Backend-ready API integration
* Unit tests for frontend and backend

---

## 🏗️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Vitest + React Testing Library

### Backend

* Go
* Gin
* Wire (Dependency Injection)
* OpenTelemetry (observability scaffold)

---

## 📁 Project Structure

```bash
calculator-demo/
  calculator-web/   # React frontend
  calculator-back/  # Go backend
```

---

## ⚙️ Getting Started

### 📦 Install dependencies

From the repository root:

```bash
npm install --prefix calculator-web
```

---

## ▶️ Running the Application

### Frontend

```bash
npm run dev --prefix calculator-web
```

Then open:
👉 http://localhost:5173

---

### Backend (optional)

```bash
cd calculator-back
go run .
```

Backend will run on:
👉 http://localhost:8080

---

## 🧠 How It Works

The calculator follows a familiar layout inspired by the Windows calculator, providing an intuitive and user-friendly experience.

* Display area for showing results and feedback
* Inputs for entering numeric values
* Operation selector (ADD, SUBTRACT, MULTIPLY, etc.)
* A single action button to perform the calculation
* Clear result output

This design ensures users can quickly perform calculations without a learning curve.

---

## 🧪 Example Usage

### Input

```json
{
  "operation": "ADD",
  "a": 12,
  "b": 8
}
```

### Output

```json
{
  "result": 20
}
```

---

## 🖥️ UI Example (Calculator Flow)

1. Enter `12` in **First number**
2. Enter `8` in **Second number**
3. Select **ADD**
4. Click **Calculate**

👉 Result displayed: **20**

---

## ⚠️ Error Handling

The application handles common errors:

* Invalid input (non-numeric values)
* Division by zero
* Invalid operations

---

## 🧪 Running Tests

### Frontend

```bash
npm run test --prefix calculator-web
```

### Backend

```bash
go test ./...
```

---

## 🔧 Future Improvements

* Add Docker support
* Improve UI with a component library
* Add API health checks
* Enhance observability with OpenTelemetry dashboards
* Add CI/CD pipeline

---

## 📌 Notes

* The frontend can run independently using local calculation logic
* Backend integration is optional but supported
* Designed as a demo project for clean architecture and fullstack practices

---

## 🤝 Contributing

Feel free to fork and improve the project.
