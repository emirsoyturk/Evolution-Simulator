function drawSim() {
    sim.background(200)

    for (var i = 0; i < walls.length; i++) {
        walls[i].show()
    }

    for (var i = 0; i < creatures.length; i++) {
        if (!training) {
            creatures[i].update()
        }
        sim.strokeWeight(1)
        creatures[i].show()
    }

    fitnessFunctions[constants.fitnessFunction].draw()

    image(sim, 0, 0)
}

async function train(epoch) {
    training = true
    for (var i = 0; i < epoch; i++) {
        nextGeneration(true)
        if (i != epoch - 1 || playing) {
            for (var j = 0; j < newGenerationFrameCount; j++) {
                for (var k = 0; k < creatures.length; k++) {
                    creatures[k].update()
                }
                if (j == newGenerationFrameCount - 1) {
                    for (var k = 0; k < creatures.length; k++) {
                        creatures[k].show()
                    }
                }
            }
        }
        randomCreature = creatures[Math.floor(Math.random() * creatures.length)]
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2)
        })
    }
    training = false
}

function nextGeneration(auto = false) {
    generation++
    document.getElementById('generation').innerHTML = generation

    var newCreatures = []
    var fitnessSum = 0
    var dead = 0
    var killed = 0

    for (var i = 0; i < creatures.length; i++) {
        var fitness = creatures[i].fitness()
        if (fitness > 0.8) {
            fitnessSum += fitness
            let clone = creatures[i].clone(creatures[i].brain.genes)
            newCreatures.push(clone)
        } else if (fitness == -1) {
            if (creatures[i].killed) {
                killed++
            } else {
                dead++
            }
        }
    }

    for (var i = 0; i < (gridSize.x * gridSize.y) / (creatureSize * creatureSize); i++) {
        grid[i] = false
    }

    for (var i = 0; i < walls.length; i++) {
        walls[i].fill()
    }

    var diff = creatureNumber - newCreatures.length
    if (newCreatures.length > 0) {
        for (var i = 0; i < diff; i++) {
            var parent1 = newCreatures[Math.floor(Math.random() * newCreatures.length)]
            var parent2 = newCreatures[Math.floor(Math.random() * newCreatures.length)]
            var child = parent1.crossover(parent2)
            newCreatures.push(child)
        }
    } else {
        for (var i = 0; i < creatureNumber; i++) {
            newCreatures.push(new Creature())
        }
    }
    if (creatures.length > 0) {
        simResults.push({
            generation: generation,
            fitnessSum: fitnessSum,
            dead: dead,
            killed: killed,
            total: creatures.length,
        })
    }
    if (onlyCrossingover) {
        creatures = []
        for (var i = 0; i < creatureNumber; i++) {
            var parent1 = newCreatures[Math.floor(Math.random() * newCreatures.length)]
            var parent2 = newCreatures[Math.floor(Math.random() * newCreatures.length)]
            var child = parent1.crossover(parent2)
            creatures.push(child)
        }
    } else {
        creatures = newCreatures
    }
    randomCreature = creatures[Math.floor(Math.random() * creatures.length)]
}

function addWall(x, y, width, height) {
    x = x || Math.floor((Math.random() * gridSize.x) / creatureSize) * creatureSize
    y = y || Math.floor((Math.random() * gridSize.y) / creatureSize) * creatureSize
    width = width || Math.floor((Math.random() * 100 + 10) / creatureSize) * creatureSize
    height = height || Math.floor((Math.random() * 100 + 10) / creatureSize) * creatureSize

    walls.push({
        x: x,
        y: y,
        width: width,
        height: height,
        show: function () {
            sim.fill(0)
            sim.stroke(0)
            sim.rect(this.x, this.y, this.width, this.height)
        },
        fill: function () {
            for (var i = 0; i < width; i += creatureSize) {
                for (var j = 0; j < height; j += creatureSize) {
                    var index =
                        Math.floor((x + i) / creatureSize) +
                        Math.floor((y + j) / creatureSize) * (sim.width / creatureSize)
                    grid[index] = true
                }
            }
        },
    })
}