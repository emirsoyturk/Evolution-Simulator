var widthCalc = Math.min(Math.floor((window.innerWidth * 0.7) / 10) * 10, 1000);
var heightCalc = Math.floor((window.innerHeight * 0.7) / 10) * 10;
var safeZoneOffset = {
  x: 0,
  y: 0,
};
var safeZone = {
  x: widthCalc * 0.2,
  y: widthCalc * 0.2,
};
var constants = {
  geneNumber: 20,
  hiddenNumber: 6,
  creatureNumber: 100,
  wallNumber: 0,
  creatureSize: Math.floor((widthCalc * 0.01) / 2) * 2,
  inputNumber: 6,
  outputNumber: 5,
  frameCount: 0,
  mutationRate: 0.05,
  fitnessFunction: "left",

  onlyCrossingover: false,
  oneChoice: false,
  newGenerationFrameCount: 200,
  decisionThreshold: 0.4,
  gridSize: {
    x: widthCalc * 1,
    y: widthCalc * 0.6,
    brainX: widthCalc * 0.3,
    brainY: widthCalc * 0.6,
  },
  geneNames: [
    "LocX",
    "LocY",
    "BR",
    "BL",
    "BT",
    "BB",
    "LMX",
    "LMY",
    "BRU",
    "BRD",
    "BLU",
    "BLD",
  ],
  outputNames: ["MR", "ML", "MU", "MD", "Die", "Kill", "ST", "R"],
  fitnessFunctions: {
    left: {
      name: "left",
      draw: () => {
        sim.strokeWeight(0);
        sim.fill(0, 200, 0, 120);
        sim.rect(0, 0, safeZone.x, gridSize.y);
      },
      calculate: (creature) => (creature.x < safeZone.x ? 1 : 0),
    },
    draw: {
        name: "draw",
        draw: () => {
          sim.strokeWeight(0);
          sim.fill(0, 200, 0, 120);
          sim.rect(safeZoneOffset.x, safeZoneOffset.y, safeZone.x, safeZone.y);
        },
        calculate: (creature) => {
          return creature.x > safeZoneOffset.x &&
            creature.x < safeZoneOffset.x + safeZone.x &&
            creature.y > safeZoneOffset.y &&
            creature.y < safeZoneOffset.y + safeZone.y
            ? 1
            : 0;
        },
      },
    center: {
      name: "center",
      draw: () => {
        sim.strokeWeight(0);
        sim.fill(0, 200, 0, 120);
        sim.rect(
          gridSize.x / 2 - safeZone.x / 2,
          gridSize.y / 2 - safeZone.y / 2,
          safeZone.x,
          safeZone.y
        );
      },
      calculate: (creature) =>
        creature.x > sim.width / 2 - safeZone.x / 2 &&
        creature.x < sim.width / 2 + safeZone.x / 2 &&
        creature.y > sim.height / 2 - safeZone.y / 2 &&
        creature.y < sim.height / 2 + safeZone.y / 2
          ? 1
          : 0,
    },
    top: {
      name: "top",
      draw: () => {
        sim.strokeWeight(0);
        sim.fill(0, 200, 0, 120);
        sim.rect(0, 0, gridSize.x, safeZone.y);
      },
      calculate: (creature) => (creature.y < safeZone.y ? 1 : 0),
    },
    bottom: {
      name: "bottom",
      draw: () => {
        sim.strokeWeight(0);
        sim.fill(0, 200, 0, 120);
        sim.rect(0, gridSize.y - safeZone.y, gridSize.x, safeZone.y);
      },
      calculate: (creature) => (creature.y > sim.height - safeZone.y ? 1 : 0),
    },
    right: {
      name: "right",
      draw: () => {
        sim.strokeWeight(0);
        sim.fill(0, 200, 0, 120);
        sim.rect(gridSize.x - safeZone.x, 0, safeZone.x, gridSize.y);
      },
      calculate: (creature) => (creature.x > sim.width - safeZone.x ? 1 : 0),
    },
    leftTop: {
      name: "leftTop",
      draw: () => {
        sim.strokeWeight(0);
        sim.fill(0, 200, 0, 120);
        sim.rect(0, 0, safeZone.x, safeZone.y);
      },
      calculate: (creature) =>
        creature.x < safeZone.x && creature.y < safeZone.y ? 1 : 0,
    },
    rightTop: {
      name: "rightTop",
      draw: () => {
        sim.strokeWeight(0);
        sim.fill(0, 200, 0, 120);
        sim.rect(gridSize.x - safeZone.x, 0, safeZone.x, safeZone.y);
      },
      calculate: (creature) =>
        creature.x > sim.width - safeZone.x && creature.y < safeZone.y ? 1 : 0,
    },
    leftBottom: {
      name: "leftBottom",
      draw: () => {
        sim.strokeWeight(0);
        sim.fill(0, 200, 0, 120);
        sim.rect(0, gridSize.y - safeZone.y, safeZone.x, safeZone.y);
      },
      calculate: (creature) =>
        creature.x < safeZone.x && creature.y > sim.height - safeZone.y ? 1 : 0,
    },
    rightBottom: {
      name: "rightBottom",
      draw: () => {
        sim.strokeWeight(0);
        sim.fill(0, 200, 0, 120);
        sim.rect(
          gridSize.x - safeZone.x,
          gridSize.y - safeZone.y,
          safeZone.x,
          safeZone.y
        );
      },
      calculate: (creature) =>
        creature.x > sim.width - safeZone.x && creature.y > sim.height - safeZone.y
          ? 1
          : 0,
    },
    // circle: {
    //   name: "circle",
    //   draw: () => {
    //     sim.strokeWeight(0);
    //     sim.fill(0, 200, 0, 120);
    //     sim.ellipse(gridSize.x / 2, gridSize.y / 2, safeZone.x, safeZone.x);
    //   },
    //   calculate: (creature) =>
    //     Math.pow(creature.x - sim.width / 2, 2) +
    //       Math.pow(creature.y - sim.height / 2, 2) <
    //     Math.pow(safeZone.x / 2, 2)
    //       ? 1
    //       : 0,
    // },
  },
};
