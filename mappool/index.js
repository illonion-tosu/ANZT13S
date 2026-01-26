import { loadBeatmaps, findBeatmap } from "../_shared/core/beatmaps.js"

// Load mappool
const roundNameEl = document.getElementById("round-name")
let allBeatmaps = []
Promise.all([loadBeatmaps()]).then(([beatmaps]) => {
    // Load beatmaps
    allBeatmaps = beatmaps.beatmaps
    roundNameEl.textContent = `// ${beatmaps.roundName} mappool`
})