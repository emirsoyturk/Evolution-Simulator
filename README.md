<div align="center">
<style>
    img {
  border-radius: 50%;
}
    </style>
  <a href="https://github.com/Volthai7us/Evolution-Simulator/">
    <img className="" src="https://avatars.githubusercontent.com/u/72819472?v=4" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">Evolution Simulator</h3>

  <p align="center">
    This is a simple evolution simulator.
    <br /> <br />
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">How to Use</a></li>
    <ul>
        <li><a href="#general">General</a></li>
        <li><a href="#canvas">Canvas</a></li>
        <li><a href="#extra-controls">Extra Controls</a></li>
    </ul>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
<br />

## Getting Started

This is a simple evolution simulator. It is a work in progress, and is not yet complete. It is written in Javascript, and uses the p5.js library.<br/>
Demo: https://evolution-sim.netlify.com/

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Volthai7us/Evolution-Simulator/
   ```
2. Move to project folder
   ```sh
   cd Evoluation-Simulator
   ```

## How it works

- ### General
  - Click play to start the simulation.
  - Click pause to pause the simulation.
  - Click next to run the simulation for one generation.
  - Click reset to reset the simulation.
- ### Default Settings
  - The simulation starts with a population of 1000 creatures.
  - Each creature has a brain, which is a neural network.
  - The brain has 6 inputs, and 5 outputs. (These can be changed in the code)
  - The inputs are the location of the creature, left block, right block, top block, and bottom block.
  - The outputs are the direction the creature should move, left, right, up, down, or die.
  - The brain is initialized with random weights and biases.
- ### Canvas
  - The canvas splits 3 parts.
  - The top right part is the simulation.
  - The top left part is the creature's brain.
  - The bottom part is the chart of the population over time.
  - The orange area in chart is how many creatures are died in the generation.
  - The blue area in chart is how many creatures produced a child.
  - The gray area in chart is how many creatures did not produce a child.
- ### Extra Controls
  - Click a creature to see its brain.
  - Select fitness function from the dropdown menu.
  - Click the "Add Wall" button to add a wall to the simulation.
  - The "Safe Zone" slider controls the size of the safe zone.
  - The "Brain Size" slider controls the size of the brain.
  - The "Gene Number" slider controls the number of genes.
  - The "Threshold" slider controls the decision threshold.

<!-- CONTACT -->

## Contact

Emir Soyturk - emirsytrk@gmail.com

You can find the README Template via link.
https://github.com/othneildrew/Best-README-Template/blob/master/BLANK_README.md
