function drawBrain() {
    brainVis.background(200)

    var brain = randomCreature.brain
    var gap = 10
    var nodeSize = brainVis.width / (Math.max(inputNumber, Math.max(hiddenNumber, outputNumber)) + gap / 2)
    var leftMargin = 10
    var geneLength = gridSize.brainX - leftMargin - nodeSize
    var y = {
        input: brainVis.height / 8,
        hidden: brainVis.height / 4,
        output: (brainVis.height) / 2.7,
    }

    brainVis.fill(0)
    brainVis.textSize(nodeSize * 0.6)
    brainVis.text('Click a creature to see its brain', 10, nodeSize)
    brainVis.textSize(nodeSize / 2)
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
        brainVis.text(constants.outputNames[i], i * (nodeSize + gap) + leftMargin, y.output + nodeSize + nodeSize / 2)
        if (brain.outputNeurons[i]) {
            brainVis.text(
                brain.outputNeurons[i].value.toString().substring(0, 4),
                i * (nodeSize + gap) + leftMargin,
                y.output + nodeSize
            )
        }
    }

    for (var i = 0; i < brain.genes.length; i++) {
        var gene = brain.genes[i]
        var incomeNeuron = gene.incomeNeuron
        var incomeNeuronType = gene.incomeNeuronType
        var outcomeNeuron = gene.outcomeNeuron

        if (incomeNeuronType == 0) {
            brainVis.fill(0)
            brainVis.strokeWeight(1)
            brainVis.stroke(200, 40, 40)
            brainVis.line(
                incomeNeuron * (nodeSize + gap) + leftMargin + nodeSize / 2,
                y.input + nodeSize,
                outcomeNeuron * (nodeSize + gap) + leftMargin + nodeSize / 2,
                y.hidden
            )
            brainVis.fill(0)
            brainVis.strokeWeight(0)
        } else if (incomeNeuronType == 1) {
            brainVis.fill(0)
            brainVis.strokeWeight(1)
            brainVis.stroke(40, 200, 40)
            brainVis.line(
                incomeNeuron * (nodeSize + gap) + leftMargin + nodeSize / 2,
                y.hidden + nodeSize,
                outcomeNeuron * (nodeSize + gap) + leftMargin + nodeSize / 2,
                y.output
            )
            brainVis.fill(0)
            brainVis.strokeWeight(0)
        }
    }
    // brainVis.text(brain.toString(), leftMargin, 400, 400, 100)

    for(var i = 0; i < brain.genes.length; i++) {
        var gene = brain.genes[i]
        var r = parseInt(gene.code.substring(0, 2), 16)
        var g = parseInt(gene.code.substring(2, 4), 16)
        var b = parseInt(gene.code.substring(4, 6), 16)
        var col = color(r, g, b)
        brainVis.fill(col)
        brainVis.stroke(col)
        brainVis.rect(leftMargin + i * (geneLength / brain.genes.length), 400 , geneLength / brain.genes.length, 50)
    }

    stroke(0);
    strokeWeight(4);
    rect(0, 0, gridSize.brainX, gridSize.brainY);
    image(brainVis, 0, 0)
}
