class Neuron {
    constructor() {
        this.in = []
        this.out = []
        this.value = 0
        this.deactive = false
    }

    calculate() {
        var sum = 0
        for (var i = 0; i < this.in.length; i++) {
            sum += this.in[i].neuron.value * this.in[i].weight
        }
        this.value = this.activate(sum)
    }

    activationFunction(input, type) {
        switch (type) {
            case 'sigmoid':
                return 1 / (1 + Math.exp(-input))
            case 'tanh':
                return Math.tanh(input)
            default:
                return this.sigmoid(input)
        }
    }

    activate(input) {
        return this.activationFunction(input, 'sigmoid')
    }
    
    deactivate() {
        this.deactive = true
    }
}
