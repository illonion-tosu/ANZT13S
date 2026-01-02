import { loadShowcaseBeatmaps, findShowcaseBeatmap } from "../_shared/core/beatmaps.js"

// Load beatmaps
const showcaseRoundTextEl = document.getElementById("showcase-round-text")
let allShowcaseBeatmaps = []
Promise.all([loadShowcaseBeatmaps()]).then(([showcaseBeatmaps]) => {
    allShowcaseBeatmaps = showcaseBeatmaps.beatmaps
    showcaseRoundTextEl.textContent = `// ${showcaseBeatmaps.roundName} Showcase`
})