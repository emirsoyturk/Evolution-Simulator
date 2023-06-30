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

    createCanvas(gridSize.x, gridSize.x)
    sim = createGraphics(gridSize.x, gridSize.y)
    chart = createGraphics(gridSize.x, gridSize.y)
    frameRate(60)
    for (var i = 0; i < (gridSize.x * gridSize.y) / (creatureSize * creatureSize); i++) {
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
    if(currentPane == 'simulation') {
        drawSim()
    }
    else if(currentPane == 'graph') {
        drawChart()
    }
}
