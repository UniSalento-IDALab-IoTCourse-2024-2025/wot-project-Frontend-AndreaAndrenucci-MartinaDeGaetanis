export default function extractObjectKeys(json, keysToKeep = []) {
    const entries = Object.entries(json || {})
        .filter(([key]) => keysToKeep.includes(key))
        .filter(([_, value]) => value !== null);
    
        return entries;
}