# 🔄 Expression Notation Converter

> A visual tool for converting between **Infix**, **Postfix**, and **Prefix** notations with step-by-step visualization.

## 📚 About

This project was created for the **Compiler Design Principles** course as part of a Bachelor's degree program. It demonstrates fundamental concepts in expression parsing and notation conversion algorithms.

## ✨ Features

- 🔁 **Bi-directional Conversion**: Convert between Infix ↔️ Postfix ↔️ Prefix notations
- 📊 **Visual Stack Simulation**: Watch the algorithm work in real-time with animated stack operations
- 🎯 **Step-by-Step Breakdown**: Navigate through each conversion step to understand the process
- ✅ **Expression Validation**: Automatic validation with helpful error messages

## 🛠️ Technologies Used

- **React** + **TypeScript** - Modern UI framework with type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations for stack visualization

## 🗂️ Project Structure

```text
src/
├── components/
│   ├── icons/                 # Shared SVG icon components
│   └── layout/                # Header and footer
├── features/
│   └── converter/
│       ├── components/        # Converter-specific UI
│       ├── lib/               # Tokenizing, validation, and algorithms
│       ├── constants.ts       # Operators and precedence rules
│       └── types.ts           # Converter domain types
├── styles/                    # Global theme and styles
├── App.tsx                    # Application composition
└── main.tsx                   # React entry point
```

The converter feature is self-contained: UI components depend on its public
types and orchestration layer, while parsing and conversion logic remain
framework-independent and independently testable.

## 🧮 Algorithms

### Infix → Postfix/Prefix

Uses the **Shunting-yard Algorithm** with two stacks:

- **Output Stack**: Builds the final result
- **Operator Stack**: Manages operator precedence and parentheses

### Postfix/Prefix → Infix

Uses a **Single Stack Algorithm**:

- Processes tokens and combines operands with operators to rebuild infix expressions

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🧪 Test Examples

**Infix:** `A * (B + C / D) - E ^ F`  
**Postfix:** `A B C D / + * E F ^ -`  
**Prefix:** `- * A + B / C D ^ E F`

---

Made with 💻 for Compiler Design Principles course
