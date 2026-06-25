// frontend/js/storage.js

/**
 * Simple wrapper for localStorage used in the experiment
 * Keeps all client-side persistence logic in one place
 */

export function saveItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error("Error saving to localStorage:", err);
    }
}

export function getItem(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (err) {
        console.error("Error reading from localStorage:", err);
        return null;
    }
}

export function removeItem(key) {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error("Error removing from localStorage:", err);
    }
}

export function clearStorage() {
    try {
        localStorage.clear();
    } catch (err) {
        console.error("Error clearing localStorage:", err);
    }
}