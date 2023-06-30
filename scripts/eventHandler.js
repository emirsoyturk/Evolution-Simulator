for (var i = 0; i < document.getElementsByClassName("nextButton").length; i++) {
  document
    .getElementsByClassName("nextButton")
    [i].addEventListener("click", () => {
      train(1);
    });
}
for (
  var i = 0;
  i < document.getElementsByClassName("addWallButton").length;
  i++
) {
  document
    .getElementsByClassName("addWallButton")
    [i].addEventListener("click", () => {
      addWall();
    });
}

for (var i = 0; i < document.getElementsByClassName("playButton").length; i++) {
  document
    .getElementsByClassName("playButton")
    [i].addEventListener("click", () => {
      playing = !playing;
      training = playing;

      if (playing) {
        for (
          var i = 0;
          i < document.getElementsByClassName("playButton").length;
          i++
        ) {
          document.getElementsByClassName("playButton")[i].innerHTML = "Pause";
        }
      } else {
        for (
          var i = 0;
          i < document.getElementsByClassName("playButton").length;
          i++
        ) {
          document.getElementsByClassName("playButton")[i].innerHTML = "Play";
        }
      }
    });
}

for (
  var i = 0;
  i < document.getElementsByClassName("resetButton").length;
  i++
) {
  document
    .getElementsByClassName("resetButton")
    [i].addEventListener("click", () => {
      gridSize = constants.gridSize;
      geneNumber = constants.geneNumber;
      hiddenNumber = constants.hiddenNumber;
      creatureNumber = constants.creatureNumber;
      creatureSize = constants.creatureSize;
      inputNumber = constants.inputNumber;
      outputNumber = constants.outputNumber;
      frameCount = constants.frameCount;
      newGenerationFrameCount = constants.newGenerationFrameCount;
      epoch = constants.epoch;
      onlyCrossingover = constants.onlyCrossingover;
      wallNumber = constants.wallNumber;
      fitnessFunctions = constants.fitnessFunctions;
      generation = 0;
      document.getElementById("generation").innerHTML = generation;
      creatures = [];
      walls = [];
      grid = [];
      simResults = [];
      for (
        var i = 0;
        i < (gridSize.x * gridSize.y) / (creatureSize * creatureSize);
        i++
      ) {
        grid.push(false);
      }
      for (var i = 0; i < wallNumber; i++) {
        addWall();
      }
      for (var i = 0; i < creatureNumber; i++) {
        creatures.push(new Creature());
      }

      randomCreature = creatures[Math.floor(Math.random() * creatures.length)];

      train(epoch);
    });
}

document
  .getElementById("decisionThresholdSlider")
  .addEventListener("input", () => {
    constants.decisionThreshold =
      document.getElementById("decisionThresholdSlider").value / 100;
    document.getElementById("decisionThreshold").innerHTML =
      "Threshold " + constants.decisionThreshold;
  });

document.getElementById("geneNumberSlider").addEventListener("input", () => {
  constants.geneNumber = document.getElementById("geneNumberSlider").value;
  document.getElementById("geneNumber").innerHTML =
    "Gene Number " + constants.geneNumber;
});

document.getElementById("brainSizeSlider").addEventListener("input", () => {
  constants.hiddenNumber = document.getElementById("brainSizeSlider").value;
  document.getElementById("brainSize").innerHTML =
    "Brain " + constants.hiddenNumber;
});

document.getElementById("mutationRateSlider").addEventListener("input", () => {
  constants.mutationRate =
    document.getElementById("mutationRateSlider").value / 1000;
  document.getElementById("mutationRate").innerHTML =
    "Mutation: " + constants.mutationRate;
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 39) {
    train(10);
  } else if (event.keyCode == 37) {
    train(1);
  } else if (event.keyCode == 38) {
    train(100);
  }
});

document
  .getElementById("fitnessFunctionSelect")
  .addEventListener("change", function (event) {
    constants.fitnessFunction = event.target.value;
  });

document
  .getElementById("creatureNumber")
  .addEventListener("change", function (event) {
    constants.creatureNumber = event.target.value;
  });

var hold = false;

document.addEventListener("mousedown", function (event) {
  if (event.target == canvas && constants.fitnessFunction == 'draw') {
    hold = true;
    console.log("mouse down");
    var x = Math.floor(mouseX);
    var y = Math.floor(mouseY);
    safeZone.x = 0;
    safeZone.y = 0;
    safeZoneOffset.x = x;
    safeZoneOffset.y = y;
    event.preventDefault();
  }
});

document.addEventListener("mousemove", function (event) {
  if (hold && constants.fitnessFunction == 'draw') {
    var x = Math.floor(mouseX);
    var y = Math.floor(mouseY);
    safeZone.x = x - safeZoneOffset.x;
    safeZone.y = y - safeZoneOffset.y;
    event.preventDefault();
  }
});

document.addEventListener("mouseup", function (event) {
  hold = false;
});

var navlinks = document.getElementsByClassName("nav-link");
var currentPane = "how";

for (var i = 0; i < navlinks.length; i++) {
  navlinks[i].addEventListener("click", function (event) {
    var main = document.getElementsByTagName("main")[0];
    currentPane = event.target.href.split("#")[1];
    var tabpane = document.getElementById(currentPane);
    if (currentPane == "simulation" || currentPane == "graph") {
      main.parentElement.removeChild(main);
      tabpane.appendChild(main);
    }
  });
}
