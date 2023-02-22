var widthCalc = Math.min(window.innerWidth * 0.9, 1500)

var constants = {
    geneNumber: 20,
    hiddenNumber: 6,
    creatureNumber: 1000,
    wallNumber: 0,
    creatureSize: 10,
    inputNumber: 6,
    outputNumber: 5,
    frameCount: 0,
    fitnessFunction: 'left',
    safeZone: 300,
    onlyCrossingover: false,
    oneChoice: false,
    newGenerationFrameCount: 200,
    decisionThreshold: 0.4,
    gridSize: {
        x: widthCalc * 0.9,
        y: 1000,
        simX: widthCalc * 0.6,
        simY: 800,
        chartX: widthCalc * 0.9,
        chartY: 200,
        brainX: widthCalc * 0.3,
        brainY: 800,
    },
    geneNames: ['LocX', 'LocY', 'BR', 'BL', 'BT', 'BB', 'LMX', 'LMY', 'BRU', 'BRD', 'BLU', 'BLD'],
    outputNames: ['MR', 'ML', 'MU', 'MD', 'Die', 'Kill', 'ST', 'R'],
    fitnessFunctions: {
        left: {
            name: 'left',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.rect(0, 0, safeZone, gridSize.simY)
            },
            calculate: (creature) => (creature.x < safeZone ? 1 : 0),
        },
        center: {
            name: 'center',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.rect(gridSize.simX / 2 - safeZone / 2, gridSize.simY / 2 - safeZone / 2, safeZone, safeZone)
            },
            calculate: (creature) =>
                creature.x > sim.width / 2 - safeZone / 2 &&
                creature.x < sim.width / 2 + safeZone / 2 &&
                creature.y > sim.height / 2 - safeZone / 2 &&
                creature.y < sim.height / 2 + safeZone / 2
                    ? 1
                    : 0,
        },
        top: {
            name: 'top',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.rect(0, 0, gridSize.simX, safeZone)
            },
            calculate: (creature) => (creature.y < safeZone ? 1 : 0),
        },
        bottom: {
            name: 'bottom',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.rect(0, gridSize.simY - safeZone, gridSize.simX, safeZone)
            },
            calculate: (creature) => (creature.y > sim.height - safeZone ? 1 : 0),
        },
        right: {
            name: 'right',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.rect(gridSize.simX - safeZone, 0, safeZone, gridSize.simY)
            },
            calculate: (creature) => (creature.x > sim.width - safeZone ? 1 : 0),
        },
        leftTop: {
            name: 'leftTop',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.rect(0, 0, safeZone, safeZone)
            },
            calculate: (creature) => (creature.x < safeZone && creature.y < safeZone ? 1 : 0),
        },
        rightTop: {
            name: 'rightTop',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.rect(gridSize.simX - safeZone, 0, safeZone, safeZone)
            },
            calculate: (creature) => (creature.x > sim.width - safeZone && creature.y < safeZone ? 1 : 0),
        },
        leftBottom: {
            name: 'leftBottom',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.rect(0, gridSize.simY - safeZone, safeZone, safeZone)
            },
            calculate: (creature) => (creature.x < safeZone && creature.y > sim.height - safeZone ? 1 : 0),
        },
        rightBottom: {
            name: 'rightBottom',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.rect(gridSize.simX - safeZone, gridSize.simY - safeZone, safeZone, safeZone)
            },
            calculate: (creature) => (creature.x > sim.width - safeZone && creature.y > sim.height - safeZone ? 1 : 0),
        },
        circle: {
            name: 'circle',
            draw: () => {
                sim.strokeWeight(0)
                sim.fill(0, 200, 0, 120)
                sim.ellipse(gridSize.simX / 2, gridSize.simY / 2, safeZone, safeZone)
            },
            calculate: (creature) =>
                Math.pow(creature.x - sim.width / 2, 2) + Math.pow(creature.y - sim.height / 2, 2) <
                Math.pow(safeZone / 2, 2)
                    ? 1
                    : 0,
        },
    },
}
