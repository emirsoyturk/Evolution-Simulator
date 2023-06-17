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
    
    var barSizeX = gridSize.x / total - gap
    var barSizeY = gridSize.y
    for (var i = start; i < end; i++) {
        var normalizedPatient = (simResults[i].dead / simResults[i].total) * 100
        var normalizedAlive = (simResults[i].fitnessSum / simResults[i].total) * 100
        var normalizedKilled = (simResults[i].killed / simResults[i].total) * 100
        var normalizedDead = 100 - normalizedPatient - normalizedAlive - normalizedKilled
        var x = (i - start) * barSizeX + gap
        chart.strokeWeight(0)
        chart.stroke(255)
        chart.fill(230, 100, 40)
        chart.rect(x, 0, barSizeX, (normalizedPatient / 100) * barSizeY)
        chart.fill(200, 200, 200)
        chart.rect(
            x,
            (normalizedPatient / 100) * barSizeY,
            barSizeX,
            (normalizedDead / 100) * barSizeY
        )
        chart.fill(255, 0, 0)
        chart.rect(
            x,
            ((normalizedPatient + normalizedDead) / 100) * barSizeY,
            barSizeX,
            (normalizedKilled / 100) * barSizeY
        )
        chart.fill(40, 40, 255)
        chart.rect(
            x,
            ((normalizedPatient + normalizedDead + normalizedKilled) / 100) * barSizeY,
            barSizeX,
            (normalizedAlive / 100) * barSizeY
        )
    }

    image(chart, 0, 0)
}