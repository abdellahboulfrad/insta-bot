const env = require('../config/env');

class DedupStore {
  constructor() {
    this.store = new Map();
    setInterval(() => this.cleanup(), 60 * 1000).unref();
  }

  has(key) {
    const expiresAt = this.store.get(key);
    if (!expiresAt) return false;

    if (Date.now() > expiresAt) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  set(key) {
    this.store.set(key, Date.now() + env.dedupTtlMs);
  }

  cleanup() {
    const now = Date.now();
    for (const [key, expiresAt] of this.store.entries()) {
      if (now > expiresAt) {
        this.store.delete(key);
      }
    }
  }
}

module.exports = new DedupStore();
