class Creature {
    constructor(isCloned) {
        this.alive = true
        this.isCloned = isCloned || false
        let randomX, randomY
        do{
            randomX = Math.floor(random(sim.width) / creatureSize) * creatureSize
            randomY = Math.floor(random(sim.height) / creatureSize) * creatureSize
        }while(grid[randomX / creatureSize + ((randomY / creatureSize) * sim.width) / creatureSize] == true)
        
        this.x = randomX
        this.y = randomY
        this.lastX = this.x
        this.lastY = this.y
        grid[this.x / creatureSize + ((this.y / creatureSize) * sim.width) / creatureSize] = this
        this.r = creatureSize
        this.killed = false
        let outputFunctions = [this.moveRight, this.moveLeft, this.moveUp, this.moveDown, this.die, this.kill, this.stay]
        this.brain = new Brain(outputFunctions, this)
        this.assignColor()
    }

    fitness() {
        var fitnessMethod = constants.fitnessFunction

        if(!this.alive)
        {
            return -1
        }
        return fitnessFunctions[fitnessMethod].calculate(this)
    }

    clone(genes) {
        let clone = new Creature(true)
        clone.brain = this.brain.clone(clone, genes)
        clone.assignColor()
        return clone
    }

    crossover(partner) {
        var crossGenes = []
        for (var i = 0; i < this.brain.genes.length; i++) {
            if (Math.random() < 0.5) {
                crossGenes.push(this.brain.genes[i])
            } else {
                crossGenes.push(partner.brain.genes[i])
            }
        }
        var child = this.clone(crossGenes)
        return child
    }

    update() {
        if (!this.alive) {
            return
        }

        grid[this.x / creatureSize + ((this.y / creatureSize) * sim.width) / creatureSize] = false
        var input = this.input()

        this.brain.decide(input)
        this.lastX = this.x
        this.lastY = this.y
        grid[this.x / creatureSize + ((this.y / creatureSize) * sim.width) / creatureSize] = this
    }

    input() {
        var locationX = (this.x / creatureSize / (sim.width / creatureSize)) * 2 - 1
        var locationY = (this.y / creatureSize / (sim.height / creatureSize)) * 2 - 1

        var lastMoveX = (this.x - this.lastX) / this.r
        var lastMoveY = (this.y - this.lastY) / this.r
        var BR = this.checkBlock('right') ? 1 : 0
        var BL = this.checkBlock('left') ? 1 : 0
        var BU = this.checkBlock('up') ? 1 : 0
        var BD = this.checkBlock('down') ? 1 : 0
        var BRU = this.checkBlock('rightUp') ? 1 : 0
        var BRD = this.checkBlock('rightDown') ? 1 : 0
        var BLU = this.checkBlock('leftUp') ? 1 : 0
        var BLD = this.checkBlock('leftDown') ? 1 : 0

        return [
            locationX,
            locationY,
            BR,
            BL,
            BU,
            BD,
            BRU,
            BRD,
            BLU,
            BLD,
        ]
    }

    assignColor() {
        let colorStr = ''
        for (var i = 0; i < this.brain.genes.length; i++) {
            let gene = this.brain.genes[i]
            colorStr += gene.toString(16).substring(0, 4)
        }
        let r = parseInt(colorStr.substring(0, colorStr.length / 3), 16) % 255
        let g = parseInt(colorStr.substring(colorStr.length / 3, colorStr.length / 2), 16) % 255
        let b = parseInt(colorStr.substring(colorStr.length / 2, colorStr.length), 16) % 255
        this.color = color(r, g, b)
    }

    checkCollision() {
        if (this.x < 0) {
            this.x = 0
        }
        if (this.x > sim.width - this.r) {
            this.x = sim.width - this.r
        }
        if (this.y < 0) {
            this.y = 0
        }
        if (this.y > sim.height - this.r) {
            this.y = sim.height - this.r
        }
    }

    moveRight() {
        if(!this.checkBlock('right')) {
            this.x += this.r
        }
    }

    moveLeft() {
        if(!this.checkBlock('left')) {
            this.x -= this.r
        }
    }

    moveUp() {
        if(!this.checkBlock('up')) {
            this.y -= this.r
        }
    }

    moveDown() {
        if(!this.checkBlock('down')) {
            this.y += this.r
        }        
    }

    moveRandom() {
        let random = Math.floor(Math.random() * 4)
        switch (random) {
            case 0:
                this.moveRight(true)
                break
            case 1:
                this.moveLeft(true)
                break
            case 2:
                this.moveUp(true)
                break
            case 3:
                this.moveDown(true)
                break
        }
    }

    stay() {
        // do nothing
    }

    produce() {
        let clone = this.clone()
        creatures.push(clone)
    }

    kill() {
        var left = this.checkBlock('left')
        var right = this.checkBlock('right')
        var up = this.checkBlock('up')
        var down = this.checkBlock('down')
        var neighbors = [left, right, up, down]
        for (var i = 0; i < neighbors.length; i++) {
            if (neighbors[i] && neighbors[i].alive) {
                var random = Math.random()
                if(random < 0.25) {
                    this.die()
                }
                else if(random < 0.5) {
                    neighbors[i].die()
                }
                else if(random < 0.75) {
                    this.produce()
                }
                else {
                    neighbors[i].produce()
                }
                neighbors[i].killed = true
                break;
            }
        }
    }

    die() {
        grid[this.x / creatureSize + ((this.y / creatureSize) * sim.width) / creatureSize] = false
        this.alive = false
    }

    checkBlock(direction) {
        var index = 0
        switch (direction) {
            case 'right':
                index = this.x / creatureSize + 1 + ((this.y / creatureSize) * sim.width) / creatureSize
                break
            case 'left':
                index = this.x / creatureSize - 1 + ((this.y / creatureSize) * sim.width) / creatureSize
                break
            case 'up':
                index = this.x / creatureSize + ((this.y / creatureSize - 1) * sim.width) / creatureSize
                break
            case 'down':
                index = this.x / creatureSize + ((this.y / creatureSize + 1) * sim.width) / creatureSize
                break
            case 'rightUp':
                index = this.x / creatureSize + 1 + ((this.y / creatureSize - 1) * sim.width) / creatureSize
                break
            case 'rightDown':
                index = this.x / creatureSize + 1 + ((this.y / creatureSize + 1) * sim.width) / creatureSize
                break
            case 'leftUp':
                index = this.x / creatureSize - 1 + ((this.y / creatureSize - 1) * sim.width) / creatureSize
                break
            case 'leftDown':
                index = this.x / creatureSize - 1 + ((this.y / creatureSize + 1) * sim.width) / creatureSize
                break
        }
        return grid[index]
    }

    show() {
        if (!this.alive) {
            return
        }
        sim.fill(this.color)
        sim.square(this.x, this.y, creatureSize)
    }
}
