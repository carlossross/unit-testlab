# Unit TestLab

A focused repository to practice **real-world unit testing** in modern Angular.

## 🎯 Purpose

This repo is intentionally built as a lab to test common frontend concerns that appear in production code:
- HTTP behavior and interception
- Routing and navigation rules
- Auth flows via guards
- Reactive forms logic (sync + async validation)

The goal is to write tests that are:
- Fast
- Deterministic
- Easy to read and maintain

## 🧪 What is covered

- **Guards**
  - Access rules and navigation outcomes
- **HTTP interceptors**
  - Request/response modification, error handling
- **Routing**
  - Route config expectations and navigation behavior
- **Reactive Forms**
  - Form validity, async validators, edge cases

## 🧠 Testing approach

- Prefer **isolated unit tests** where possible (pure functions / class logic)
- Use Angular TestBed only when it provides real value (DI, templates, integration points)
- Avoid over-testing implementation details (assert behavior over internals)

## 🛠 Tech Stack

- Angular
- TypeScript
- Jasmine/Karma or Jest (depending on configuration)

## ▶️ Run tests

```bash
npm install
npm test
