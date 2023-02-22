function drawChart() {
    chart.background(200)
    var gap = 0
    var max = 300
    var start = Math.max(0, simResults.length - max)
    var end = simResults.length
    var total = end - start
    if(!document.getElementById('optimizeGraph').checked){
        start = 0;
        end = simResults.length;
        total = end - start
    }
    
    var barSizeX = gridSize.chartX / total
    var barSizeY = gridSize.chartY
    for (var i = start; i < end; i++) {
        var normalizedPatient = (simResults[i].dead / simResults[i].total) * 100
        var normalizedAlive = (simResults[i].fitnessSum / simResults[i].total) * 100
        var normalizedKilled = (simResults[i].killed / simResults[i].total) * 100
        var normalizedDead = 100 - normalizedPatient - normalizedAlive - normalizedKilled
        chart.strokeWeight(0)
        chart.fill(230, 100, 40)
        chart.rect((i - start) * barSizeX + gap, 0, barSizeX, (normalizedPatient / 100) * barSizeY)
        chart.fill(200, 200, 200)
        chart.rect(
            (i - start) * barSizeX + gap,
            (normalizedPatient / 100) * barSizeY,
            barSizeX,
            (normalizedDead / 100) * barSizeY
        )
        chart.fill(255, 0, 0)
        chart.rect(
            (i - start) * barSizeX + gap,
            ((normalizedPatient + normalizedDead) / 100) * barSizeY,
            barSizeX,
            (normalizedKilled / 100) * barSizeY
        )
        chart.fill(40, 40, 255)
        chart.rect(
            (i - start) * barSizeX + gap,
            ((normalizedPatient + normalizedDead + normalizedKilled) / 100) * barSizeY,
            barSizeX,
            (normalizedAlive / 100) * barSizeY
        )
    }
    chart.strokeWeight(4)
    chart.stroke(0)
    chart.line(0, 0, gridSize.chartX, 0)
    image(chart, 0, gridSize.simY)
}