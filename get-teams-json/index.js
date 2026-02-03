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
            "player1-id": Number(textAreaElValueSplitSplit[2]),
            "player2-id": Number(textAreaElValueSplitSplit[3]),
            "player1-name": textAreaElValueSplitSplit[4],
            "player1-rank": Number(textAreaElValueSplitSplit[5]),
            "player2-name": textAreaElValueSplitSplit[6],
            "player2-rank": Number(textAreaElValueSplitSplit[7]),
            "aim1-score": Number(textAreaElValueSplitSplit[8]),
            "aim1-rank": Number(textAreaElValueSplitSplit[9]),
            "aim2-score": Number(textAreaElValueSplitSplit[10]),
            "aim2-rank": Number(textAreaElValueSplitSplit[11]),
            "aim3-score": Number(textAreaElValueSplitSplit[12]),
            "aim3-rank": Number(textAreaElValueSplitSplit[13]),
            "tap1-score": Number(textAreaElValueSplitSplit[14]),
            "tap1-rank": Number(textAreaElValueSplitSplit[15]),
            "tap2-score": Number(textAreaElValueSplitSplit[16]),
            "tap2-rank": Number(textAreaElValueSplitSplit[17]),
            "tap3-score": Number(textAreaElValueSplitSplit[18]),
            "tap3-rank": Number(textAreaElValueSplitSplit[19]),
            "ctl1-score": Number(textAreaElValueSplitSplit[20]),
            "ctl1-rank": Number(textAreaElValueSplitSplit[21]),
            "ctl2-score": Number(textAreaElValueSplitSplit[22]),
            "ctl2-rank": Number(textAreaElValueSplitSplit[23]),
            "ctl3-score": Number(textAreaElValueSplitSplit[24]),
            "ctl3-rank": Number(textAreaElValueSplitSplit[25]),
            "gim1-score": Number(textAreaElValueSplitSplit[26]),
            "gim1-rank": Number(textAreaElValueSplitSplit[27]),
            "gim2-score": Number(textAreaElValueSplitSplit[28]),
            "gim2-rank": Number(textAreaElValueSplitSplit[29])
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