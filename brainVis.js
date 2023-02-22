function drawBrain() {
    brainVis.background(200)

    var brain = randomCreature.brain
    var nodeSize = 40
    var gap = 10
    var leftMargin = 10
    var geneLength = gridSize.brainX - leftMargin - nodeSize
    var y = {
        input: 100,
        hidden: 200,
        output: 300,
    }

    brainVis.fill(0)
    brainVis.textSize(25)
    brainVis.text('Click a creature to see its brain', 10, 40)
    brainVis.textSize(20)
    for (var i = 0; i < inputNumber; i++) {
        brainVis.fill(255, 0, 0)
        brainVis.strokeWeight(0)
        brainVis.rect(i * (nodeSize + gap) + leftMargin, y.input, nodeSize, nodeSize)
        brainVis.fill(0)
        brainVis.text(constants.geneNames[i], i * (nodeSize + gap) + leftMargin, y.input - 10)
        if (brain.inputNeurons[i]) {
            brainVis.text(
                brain.inputNeurons[i].value.toString().substring(0, 4),
                i * (nodeSize + gap) + leftMargin,
                y.input + nodeSize
            )
        }
    }

    for (var i = 0; i < hiddenNumber; i++) {
        brainVis.fill(0, 0, 255)
        brainVis.strokeWeight(0)
        brainVis.rect(i * (nodeSize + gap) + leftMargin, y.hidden, nodeSize, nodeSize)
    }

    for (var i = 0; i < outputNumber; i++) {
        brainVis.fill(0, 255, 0)
        brainVis.strokeWeight(0)
        brainVis.rect(i * (nodeSize + gap) + leftMargin, y.output, nodeSize, nodeSize)
        brainVis.fill(0)
        brainVis.text(constants.outputNames[i], i * (nodeSize + gap) + leftMargin, y.output + nodeSize + 20)
        if (brain.outputNeurons[i]) {
            brainVis.text(
                brain.outputNeurons[i].value.toString().substring(0, 4),
                i * (nodeSize + gap) + leftMargin,
                y.output + nodeSize + 40
            )
        }
    }

    for (var i = 0; i < brain.genes.length; i++) {
        var gene = brain.genes[i]
        var incomeNeuron = gene.incomeNeuron
        var incomeNeuronType = gene.incomeNeuronType
        var outcomeNeuron = gene.outcomeNeuron
        var weight = gene.weight

        if (incomeNeuronType == 0) {
            brainVis.fill(0)
            brainVis.strokeWeight(1)
            brainVis.stroke(255, 0, 0)
            brainVis.line(
                incomeNeuron * (nodeSize + gap) + leftMargin + nodeSize / 2,
                y.input + nodeSize,
                outcomeNeuron * (nodeSize + gap) + leftMargin + nodeSize / 2,
                y.hidden
            )
            brainVis.fill(0)
            brainVis.strokeWeight(0)
            // brainVis.text(weight.toFixed(2), incomeNeuron * (nodeSize + gap) + leftMargin, y.input + nodeSize + 20)
        } else if (incomeNeuronType == 1) {
            brainVis.fill(0, 255, 0)
            brainVis.strokeWeight(1)
            brainVis.stroke(0, 255, 0)
            brainVis.line(
                incomeNeuron * (nodeSize + gap) + leftMargin + nodeSize / 2,
                y.hidden + nodeSize,
                outcomeNeuron * (nodeSize + gap) + leftMargin + nodeSize / 2,
                y.output
            )
            brainVis.fill(0)
            brainVis.strokeWeight(0)
            // brainVis.text(weight.toFixed(2), outcomeNeuron * (nodeSize + gap) + leftMargin, y.hidden + nodeSize + 50)
        }
    }
    brainVis.text(brain.toString(), leftMargin, 400, 400, 100)

    for(var i = 0; i < brain.genes.length; i++) {
        var gene = brain.genes[i]
        var r = parseInt(gene.code.substring(0, 2), 16)
        var g = parseInt(gene.code.substring(2, 4), 16)
        var b = parseInt(gene.code.substring(4, 6), 16)
        var col = color(r, g, b)
        brainVis.fill(col)
        brainVis.stroke(col)
        brainVis.rect(leftMargin + i * (geneLength / brain.genes.length), 500 , geneLength / brain.genes.length, 50)
    }

    image(brainVis, 0, 0)
}

function mouseClicked() {
    var x = Math.floor((mouseX - gridSize.brainX) / creatureSize)
    var y = Math.floor(mouseY / creatureSize)
    var index = x + y * (sim.width / creatureSize)
    var cell = grid[index]
    if (typeof cell == 'object') {
        randomCreature = cell
    }
}