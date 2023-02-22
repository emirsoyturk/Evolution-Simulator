let creatures = []
let walls = []
let grid = []
let simResults = []
let gridSize,
    geneNumber,
    hiddenNumber,
    creatureNumber,
    creatureSize,
    inputNumber,
    outputNumber,
    frameCount,
    generation = 0,
    newGenerationFrameCount,
    epoch,
    randomCreature,
    fitnessFunction,
    fitnessFunctions,
    onlyCrossingover,
    wallNumber,
    training = false,
    playing = false,
    auto = false

var sim, chart, brainVis

function setup() {
    gridSize = constants.gridSize
    geneNumber = constants.geneNumber
    hiddenNumber = constants.hiddenNumber
    creatureNumber = constants.creatureNumber
    creatureSize = constants.creatureSize
    inputNumber = constants.inputNumber
    outputNumber = constants.outputNumber
    frameCount = constants.frameCount
    newGenerationFrameCount = constants.newGenerationFrameCount
    epoch = constants.epoch
    fitnessFunction = constants.fitnessFunction
    onlyCrossingover = constants.onlyCrossingover
    wallNumber = constants.wallNumber
    fitnessFunctions = constants.fitnessFunctions
    for (var key in fitnessFunctions) {
        var name = fitnessFunctions[key].name
        var select = document.getElementById('fitnessFunctionSelect')
        var option = document.createElement('option')
        option.text = name
        option.value = name
        select.add(option)
    }

    createCanvas(gridSize.x, gridSize.y)
    sim = createGraphics(gridSize.simX, gridSize.simY)
    chart = createGraphics(gridSize.chartX, gridSize.chartY)
    brainVis = createGraphics(gridSize.brainX, gridSize.brainY)
    frameRate(60)
    for (var i = 0; i < (gridSize.simX * gridSize.simY) / (creatureSize * creatureSize); i++) {
        grid.push(null)
    }

    for (var i = 0; i < wallNumber; i++) {
        addWall()
    }

    train(1)
}

function draw() {
    if(playing) {
        train(1)
    }
    drawSim()
    drawChart()
    drawBrain()
}


document.getElementById('playButton').addEventListener('click', () => {
    playing = !playing
    training = playing

    if (playing) {
        document.getElementById('playButton').innerHTML = 'Stop'
    } else {
        document.getElementById('playButton').innerHTML = 'Play'
    }
})

document.getElementById('resetButton').addEventListener('click', () => {
    gridSize = constants.gridSize
    geneNumber = constants.geneNumber
    hiddenNumber = constants.hiddenNumber
    creatureNumber = constants.creatureNumber
    creatureSize = constants.creatureSize
    inputNumber = constants.inputNumber
    outputNumber = constants.outputNumber
    frameCount = constants.frameCount
    newGenerationFrameCount = constants.newGenerationFrameCount
    epoch = constants.epoch
    onlyCrossingover = constants.onlyCrossingover
    wallNumber = constants.wallNumber
    fitnessFunctions = constants.fitnessFunctions
    generation = 0
    document.getElementById('generation').innerHTML = generation
    creatures = []
    walls = []
    grid = []
    simResults = []
    for (var i = 0; i < (gridSize.simX * gridSize.simY) / (creatureSize * creatureSize); i++) {
        grid.push(false)
    }
    console.log((gridSize.simX * gridSize.simY) / (creatureSize * creatureSize))
    for (var i = 0; i < wallNumber; i++) {
        addWall()
    }
    for(var i = 0; i < creatureNumber; i++) {
        creatures.push(new Creature())
    }

    randomCreature = creatures[Math.floor(Math.random() * creatures.length)]

    train(epoch)
})

document.getElementById('nextButton').addEventListener('click', () => {
    train(1)
})

document.getElementById('addWallButton').addEventListener('click', () => {
    addWall()
})

document.getElementById('safeZoneSliderX').addEventListener('input', () => {
    safeZoneSliderX = document.getElementById('safeZoneSliderX')
    safeZone.x = parseInt(safeZoneSliderX.value)
    safeZone.x = Math.max(safeZoneSliderX.min, Math.min(safeZone.x, safeZoneSliderX.max))
})

document.getElementById('safeZoneSliderY').addEventListener('input', () => {
    safeZoneSliderY = document.getElementById('safeZoneSliderY')
    safeZone.y = parseInt(safeZoneSliderY.value)
    safeZone.y = Math.max(safeZoneSliderY.min, Math.min(safeZone.y, safeZoneSliderY.max))
})

document.getElementById('decisionThresholdSlider').addEventListener('input', () => {
    constants.decisionThreshold = document.getElementById('decisionThresholdSlider').value / 100
    document.getElementById('decisionThreshold').innerHTML = 'Threshold ' + constants.decisionThreshold
})

document.getElementById('geneNumberSlider').addEventListener('input', () => {
    constants.geneNumber = document.getElementById('geneNumberSlider').value
    document.getElementById('geneNumber').innerHTML = 'Gene Number ' + constants.geneNumber
})

document.getElementById('brainSizeSlider').addEventListener('input', () => {
    constants.hiddenNumber = document.getElementById('brainSizeSlider').value
    document.getElementById('brainSize').innerHTML = 'Brain ' + constants.hiddenNumber
})

document.getElementById('mutationRateSlider').addEventListener('input', () => {
    constants.mutationRate = document.getElementById('mutationRateSlider').value / 1000
    document.getElementById('mutationRate').innerHTML = 'Mutation: ' + constants.mutationRate
})

document.getElementById('ySlider').addEventListener('input', () => {
    safeZoneOffset.y = parseInt(document.getElementById('ySlider').value)
    document.getElementById('y').innerHTML = 'Y: ' + safeZoneOffset.y
})

document.getElementById('xSlider').addEventListener('input', () => {
    safeZoneOffset.x = parseInt(document.getElementById('xSlider').value)
    document.getElementById('x').innerHTML = 'X: ' + safeZoneOffset.x
})