class Gene {
    constructor(gene) {
        this.code = gene || this.genRanHex(10)
        this.init()
    }

    init() {
        this.deactivate = false
        this.incomeNeuronType = parseInt(this.code.substring(0, 1), 16) % 2
        this.incomeNeuron =
            parseInt(this.code.substring(1, 3), 16) % (this.incomeNeuronType == 0 ? inputNumber : hiddenNumber)
        this.outcomeNeuronType = this.incomeNeuronType == 0 ? 0 : 1
        if (this.outcomeNeuronType == 0) {
            this.outcomeNeuron = parseInt(this.code.substring(4, 6), 16) % hiddenNumber
        } else {
            this.outcomeNeuron = parseInt(this.code.substring(4, 6), 16) % outputNumber
        }

        this.weight = parseInt(this.code.substring(6, 10), 16) / 32700 - 1 + 0.0001
    }

    clone() {
        let clone = new Gene(this.code)
        if (Math.random() < constants.mutationRate) {
            clone.mutate()
        }

        return clone
    }

    mutate() {
        let mutation = this.genRanHex(1)
        let mutationIndex = Math.floor(Math.random() * 10)
        this.code = this.code.substring(0, mutationIndex) + mutation + this.code.substring(mutationIndex + 1)
        this.init()
    }

    genRanHex(size) {
        return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    }

    toString() {
        return this.code
    }
}
