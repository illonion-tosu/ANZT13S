import { findBeatmap, loadBeatmaps } from "../_shared/core/beatmaps.js"
import { toggleStarContainers, renderStars } from "../_shared/core/stars.js"
import { getCookie } from "../_shared/core/utils.js"
import { createTosuWsSocket } from "../_shared/core/websocket.js"

const roundNameEl = document.getElementById("round-name")
let allBeatmaps = []
Promise.all([loadBeatmaps()]).then(([beatmaps]) => {
    // Load beatmaps
    allBeatmaps = beatmaps.beatmaps
    roundNameEl.textContent = `// ${beatmaps.roundName} gameplay`
})

// Image
const nowPlayingCategoryEl = document.getElementById("now-playing-category")
// Now Playing Metadata
const nowPlayingBackgroundEl = document.getElementById("now-playing-background")
const nowPlayingArtistEl = document.getElementById("now-playing-artist")
const nowPlayingTitleEl = document.getElementById("now-playing-title")
const nowPlayingVersionEl = document.getElementById("now-playing-version")
const nowPlayingMapperEl = document.getElementById("now-playing-mapper")
// Now Playing Stats
const nowPlayingCsNumberEl = document.getElementById("now-playing-cs-number")
const nowPlayingOdNumberEl = document.getElementById("now-playing-od-number")
const nowPlayingArNumberEl = document.getElementById("now-playing-ar-number")
const nowPlayingSrNumberEl = document.getElementById("now-playing-sr-number")
// Now Playing Categories
const nowPlayingStatsEl = document.getElementById("now-playing-stats")
const nowPlayingMetadataEl = document.getElementById("now-playing-metadata")
const nowPlayingMappedByEl = document.getElementById("now-playing-mapped-by")
let mapId, mapChecksum, foundMapInMappool = false

// Socket
const socket = createTosuWsSocket()
socket.onmessage = event => {
    const data = JSON.parse(event.data)
    console.log(data)

    if (mapId !== data.beatmap.id || mapChecksum !== data.beatmap.checksum) {
        mapId = data.beatmap.id
        mapChecksum = data.beatmap.checksum
        foundMapInMappool = false

        // Metadata
        nowPlayingBackgroundEl.style.backgroundImage = `url("https://assets.ppy.sh/beatmaps/${data.beatmap.set}/covers/cover.jpg")`
        nowPlayingArtistEl.textContent = data.beatmap.artist
        nowPlayingTitleEl.textContent = data.beatmap.title
        nowPlayingVersionEl.textContent = `[${data.beatmap.version}]`
        nowPlayingMapperEl.textContent = data.beatmap.mapper

        const currentMap = findBeatmap(mapId)
        if (currentMap) {
            foundMapInMappool = true

            // Stats
            nowPlayingCsNumberEl.textContent = currentMap.diff_size
            nowPlayingOdNumberEl.textContent = currentMap.diff_overall
            nowPlayingArNumberEl.textContent = currentMap.diff_approach
            nowPlayingSrNumberEl.textContent = currentMap.difficultyrating

            // Image
            nowPlayingCategoryEl.style.opacity = 1
            nowPlayingCategoryEl.setAttribute("src", `../_shared/assets/category-images/${currentMap.mod}${currentMap.order}.png`)

            // Adjust positions of other elements
            nowPlayingStatsEl.style.top = "76px"
            nowPlayingMetadataEl.style.top = "54px"
            nowPlayingMappedByEl.style.top = "79px"
        } else {
            // Image
            nowPlayingCategoryEl.style.opacity = 0

            // Adjust position of other elements
            nowPlayingStatsEl.style.top = `${(144 - nowPlayingStatsEl.clientHeight) / 2}px`
            nowPlayingMetadataEl.style.top = `${(144 - nowPlayingMetadataEl.clientHeight) / 2}px`
            nowPlayingMappedByEl.style.top = `${(144 - nowPlayingMappedByEl.clientHeight) / 2}px`
        }
    }

    if (foundMapInMappool) {
        nowPlayingCsNumberEl.textContent = data.beatmap.stats.cs.converted.toFixed(1)
        nowPlayingOdNumberEl.textContent = data.beatmap.stats.od.converted.toFixed(1)
        nowPlayingArNumberEl.textContent = data.beatmap.stats.ar.converted.toFixed(1)
        nowPlayingSrNumberEl.textContent = data.beatmap.stats.stars.total.toFixed(2)
    }
}

// Team Name Elements
const teamRedNameEl = document.getElementById("team-red-name")
const teamBlueNameEl = document.getElementById("team-blue-name")

// Team star containers
const redTeamStarContainerEl = document.getElementById("red-team-star-container")
const blueTeamStarContainerEl = document.getElementById("blue-team-star-container")

let currentTeamRedName, currentTeamBlueName, previousTeamRedName, previousTeamBlueName
setInterval(() => {
    // Set team name information
    currentTeamRedName = getCookie("currentTeamRedName")
    currentTeamBlueName = getCookie("currentTeamBlueName")

    if (currentTeamRedName !== previousTeamRedName) {
        previousTeamRedName = currentTeamRedName
        teamRedNameEl.textContent = currentTeamRedName
    }
    if (currentTeamBlueName !== previousTeamBlueName) {
        previousTeamBlueName = currentTeamBlueName
        teamBlueNameEl.textContent = currentTeamBlueName
    }

    // Toggle and render stars
    toggleStarContainers(redTeamStarContainerEl, blueTeamStarContainerEl)
    renderStars(redTeamStarContainerEl, blueTeamStarContainerEl)
}, 200)