function drawChart() {
    chart.background(200)
    var barSizeX = gridSize.chartX / simResults.length
    var barSizeY = gridSize.chartY
    var gap = 0
    for (var i = 0; i < simResults.length; i++) {
        var normalizedPatient = (simResults[i].dead / simResults[i].total) * 100
        var normalizedAlive = (simResults[i].fitnessSum / simResults[i].total) * 100
        var normalizedKilled = (simResults[i].killed / simResults[i].total) * 100
        var normalizedDead = 100 - normalizedPatient - normalizedAlive - normalizedKilled
        chart.strokeWeight(0)
        chart.fill(230, 100, 40)
        chart.rect(i * barSizeX + gap, 0, barSizeX, (normalizedPatient / 100) * barSizeY)
        chart.fill(200, 200, 200)
        chart.rect(
            i * barSizeX + gap,
            (normalizedPatient / 100) * barSizeY,
            barSizeX,
            (normalizedDead / 100) * barSizeY
        )
        chart.fill(255, 0, 0)
        chart.rect(
            i * barSizeX + gap,
            ((normalizedPatient + normalizedDead) / 100) * barSizeY,
            barSizeX,
            (normalizedKilled / 100) * barSizeY
        )
        chart.fill(40, 40, 255)
        chart.rect(
            i * barSizeX + gap,
            ((normalizedPatient + normalizedDead + normalizedKilled) / 100) * barSizeY,
            barSizeX,
            (normalizedAlive / 100) * barSizeY
        )
    }
    image(chart, 0, gridSize.simY)
}