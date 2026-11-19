# Expression Notation Converter

An expression notation visualizer built with React and TypeScript for a university compiler course.

**Live demo:** [Open on Vercel](https://expression-notation-converter.vercel.app)

## Overview

Created for the university Compiler Design Principles course to explain conversion between infix, postfix, and prefix notation.

## Features

- Convert in all six directions between infix, postfix, and prefix.
- Inspect validation feedback and step-by-step stack operations.
- Animate the conversion process with Framer Motion.
- Handle identifiers, decimal numbers, binary arithmetic operators, and parentheses.

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS, Framer Motion.

## Run locally

Use Node.js 22.12 or newer and npm.

```sh
git clone https://github.com/ThePrimeShak/expression-notation-converter.git
cd expression-notation-converter
npm ci
npm run dev
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Apply ESLint fixes |
| `npm run format` | Format project files |
| `npm run format:check` | Check formatting |

## Project structure

- `src/features/converter/` — tokenization, validation, algorithms, and feature UI.
- `src/components/` and `src/styles/` — shared layout, icons, and global styling.

## Scope and limitations

Supports binary `+`, `-`, `*`, `/`, and `^`. Unary negative operands and root functions are outside the current grammar. Example: `A * (B + C / D) - E ^ F`.

## Author

Built by [ThePrimeShak](https://github.com/ThePrimeShak) · [LinkedIn](https://www.linkedin.com/in/theprimeshak/).
