import { computed, signal } from '@angular/core';

export function createCounter() {
  const count = signal(0);

  const isEven = computed(() => count() % 2 === 0);

  function increment() {
    count.update((v) => v + 1);
  }

  function decrement() {
    count.update((v) => v - 1);
  }

  return {
    count,
    isEven,
    increment,
    decrement,
  };
}
