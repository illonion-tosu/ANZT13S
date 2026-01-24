const textareaEl = document.getElementById("textarea")
let teamStats = []
async function submit() {
    const textareaElValue = textareaEl.value
    const textAreaElValueSplit = textareaElValue.split("\n")
    for (let i = 0; i < textAreaElValueSplit.length; i++) {
        const textAreaElValueSplitSplit = textAreaElValueSplit[i].split("\t")
        const teamStat = {
            "team_name": textAreaElValueSplitSplit[0],
            "team_seed": Number(textAreaElValueSplitSplit[1]),
            "player1-name": textAreaElValueSplitSplit[2],
            "player1-rank": Number(textAreaElValueSplitSplit[3]),
            "player2-name": textAreaElValueSplitSplit[4],
            "player2-rank": Number(textAreaElValueSplitSplit[5]),
            "aim1-score": Number(textAreaElValueSplitSplit[6]),
            "aim1-rank": Number(textAreaElValueSplitSplit[7]),
            "aim2-score": Number(textAreaElValueSplitSplit[8]),
            "aim2-rank": Number(textAreaElValueSplitSplit[9]),
            "aim3-score": Number(textAreaElValueSplitSplit[10]),
            "aim3-rank": Number(textAreaElValueSplitSplit[11]),
            "tap1-score": Number(textAreaElValueSplitSplit[12]),
            "tap1-rank": Number(textAreaElValueSplitSplit[13]),
            "tap2-score": Number(textAreaElValueSplitSplit[14]),
            "tap2-rank": Number(textAreaElValueSplitSplit[15]),
            "tap3-score": Number(textAreaElValueSplitSplit[16]),
            "tap3-rank": Number(textAreaElValueSplitSplit[17]),
            "ctl1-score": Number(textAreaElValueSplitSplit[18]),
            "ctl1-rank": Number(textAreaElValueSplitSplit[19]),
            "ctl2-score": Number(textAreaElValueSplitSplit[20]),
            "ctl2-rank": Number(textAreaElValueSplitSplit[21]),
            "ctl3-score": Number(textAreaElValueSplitSplit[22]),
            "ctl3-rank": Number(textAreaElValueSplitSplit[23]),
            "gim1-score": Number(textAreaElValueSplitSplit[24]),
            "gim1-rank": Number(textAreaElValueSplitSplit[25]),
            "gim2-score": Number(textAreaElValueSplitSplit[26]),
            "gim2-rank": Number(textAreaElValueSplitSplit[27])
        }
        teamStats.push(teamStat)
    }

    const jsonString = JSON.stringify(teamStats, null, 4)
    const blob = new Blob([jsonString], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "teams-seed-reveal.json"
    link.click()
}