class Brain {
    constructor(outputFunctions, creature, genes) {
        this.genes = []
        this.inputNeurons = []
        this.hiddenNeurons = []
        this.outputNeurons = []
        this.output = outputFunctions
        this.creature = creature

        if (genes) {
            for(var i = 0; i < genes.length; i++) {
                this.genes.push(genes[i].clone())
            }
            this.inputNeurons = []
            this.hiddenNeurons = []
            this.outputNeurons = []
            for (var i = 0; i < inputNumber; i++) {
                this.inputNeurons.push(new Neuron())
            }
            for (var i = 0; i < hiddenNumber; i++) {
                this.hiddenNeurons.push(new Neuron())
            }
            for (var i = 0; i < outputNumber; i++) {
                this.outputNeurons.push(new Neuron())
            }

            this.changeNeurons()
        } else {
            this.init()
            this.changeNeurons()
        }
    }

    init() {
        for (var i = 0; i < inputNumber; i++) {
            this.inputNeurons.push(new Neuron())
        }
        for (var i = 0; i < hiddenNumber; i++) {
            this.hiddenNeurons.push(new Neuron())
        }
        for (var i = 0; i < outputNumber; i++) {
            this.outputNeurons.push(new Neuron())
        }
        for (var i = 0; i < geneNumber; i++) {
            this.addGene(new Gene())
        }
    }

    changeNeurons() {
        for (var i = 0; i < this.genes.length; i++) {
            let gene = this.genes[i]
            var exist = false
            for (var j = 0; j < i; j++) {
                if (
                    this.genes[j].incomeNeuron == gene.incomeNeuron &&
                    this.genes[j].outcomeNeuron == gene.outcomeNeuron &&
                    this.genes[j].incomeNeuronType == gene.incomeNeuronType &&
                    this.genes[j].outcomeNeuronType == gene.outcomeNeuronType
                ) {
                    exist = true
                    gene.deactive = true
                    break
                }
            }
            if (exist) continue
            if (gene.incomeNeuronType == 0) {
                this.inputNeurons[gene.incomeNeuron].out.push({
                    neuron: this.hiddenNeurons[gene.outcomeNeuron],
                    weight: gene.weight,
                    gene: gene,
                })
                this.hiddenNeurons[gene.outcomeNeuron].in.push({
                    neuron: this.inputNeurons[gene.incomeNeuron],
                    weight: gene.weight,
                    gene: gene,
                })
            } else {
                this.hiddenNeurons[gene.incomeNeuron].out.push({
                    neuron: this.outputNeurons[gene.outcomeNeuron],
                    weight: gene.weight,
                    gene: gene,
                })
                this.outputNeurons[gene.outcomeNeuron].in.push({
                    neuron: this.hiddenNeurons[gene.incomeNeuron],
                    weight: gene.weight,
                    gene: gene,
                })
            }
        }

        for (var i = this.inputNeurons.length - 1; i >= 0; i--) {
            if (this.inputNeurons[i].out.length == 0) {
                this.inputNeurons.splice(i, 1)
            }
        }

        for (var i = this.hiddenNeurons.length - 1; i >= 0; i--) {
            if (this.hiddenNeurons[i].out.length == 0) {
                this.hiddenNeurons.splice(i, 1)
            } else if (this.hiddenNeurons[i].in.length == 0) {
                this.hiddenNeurons.splice(i, 1)
            }
        }

        for (var i = this.outputNeurons.length - 1; i >= 0; i--) {
            if (this.outputNeurons[i].in.length == 0) {
                this.outputNeurons.splice(i, 1)
            }
        }
    }

    clone(creature, genes) {
        let clone = new Brain(this.output, creature, genes)
        return clone
    }

    print() {
        console.log('Input Neurons')
        for (var i = 0; i < this.inputNeurons.length; i++) {
            console.log(this.inputNeurons[i])
        }
        console.log('Hidden Neurons')
        for (var i = 0; i < this.hiddenNeurons.length; i++) {
            console.log(this.hiddenNeurons[i])
        }
        console.log('Output Neurons')
        for (var i = 0; i < this.outputNeurons.length; i++) {
            console.log(this.outputNeurons[i])
        }
    }

    decide(input) {
        var oneChoice = constants.oneChoice
        for (var i = 0; i < this.inputNeurons.length; i++) {
            this.inputNeurons[i].value = input[i]
        }
        for (var i = 0; i < this.hiddenNeurons.length; i++) {
            this.hiddenNeurons[i].calculate()
        }
        for (var i = 0; i < this.outputNeurons.length; i++) {
            this.outputNeurons[i].calculate()
        }
        let max = constants.decisionThreshold
        let maxIndex = -1
        if(oneChoice)
        {
            max = 0
        }

        for (var i = 0; i < this.outputNeurons.length; i++) {
            if (this.outputNeurons[i].value > max) {
                if (oneChoice) {
                    max = this.outputNeurons[i].value
                    maxIndex = i
                } else {
                    this.output[i].bind(this.creature)()
                    this.creature.checkCollision()
                }
            }
        }

        if (oneChoice && maxIndex != -1) {
            this.output[maxIndex].bind(this.creature)()
            this.creature.checkCollision()
        }
    }

    addGene(gene) {
        this.genes.push(gene)
    }

    addNeuron(neuron) {
        this.neurons.push(neuron)
    }

    toString() {
        var string = ''
        for (var i = 0; i < this.genes.length; i++) {
            string += this.genes[i].toString() + ' '
        }
        return string
    }
}
