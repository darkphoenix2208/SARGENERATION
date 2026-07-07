/**
 * mlService.js — API client for the Python ML backend.
 *
 * All calls include a short timeout and fall back to null/empty on failure
 * so the frontend degrades gracefully when the backend isn't running.
 */

const API_BASE = '/api';   // proxied by Vite to http://localhost:5001

async function fetchJSON(path, timeoutMs = 5000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(`${API_BASE}${path}`, {
            signal: controller.signal,
            headers: { 'Accept': 'application/json' },
        });
        clearTimeout(timer);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        clearTimeout(timer);
        return null;
    }
}

/** Check if backend is reachable and model is trained */
export async function checkHealth() {
    const data = await fetchJSON('/health');
    return data ? { online: true, modelTrained: data.modelTrained } : { online: false, modelTrained: false };
}

/** Global model metrics (accuracy, precision, recall, confusion matrix, etc.) */
export async function getModelStats() {
    return await fetchJSON('/model-stats');
}

/** ML-flagged cases */
export async function getCases() {
    return await fetchJSON('/cases');
}

/** Generate SAR for a specific case */
export async function generateSAR(caseId) {
    return await fetchJSON(`/generate-sar/${caseId}`);
}

/** Risk score distribution for charts */
export async function getRiskDistribution() {
    return await fetchJSON('/risk-distribution');
}
