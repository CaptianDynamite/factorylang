class Machine {
    #id
    #boundingBox
    #inputs
    #outputs
    constructor(id, boundingBox, inputs, outputs) {
        this.#id = id
        this.#boundingBox = boundingBox
        this.#inputs = inputs
        this.#outputs = outputs
    }
    updateTick(deltaState, runOnInput) {
        for (const input of this.#inputs) {
            input.updateTick(deltaState)
        }
        for (const output of this.#inputs) {
            output.updateTick(deltaState)
        }
    }

    #allInputsReady() {
        return this.#inputs.reduce((accumulator, next) => accumulator && next.hasInputReady())
    }

    #allOutputsReady() {
        return this.#outputs.reduce((accumulator, next) => accumulator && next.acceptingOutput())
    }
}
class Input {
    #id
    #relativeCoordinate
    #direction
    #contents = null
    constructor(id, relativeCoordinate, direction) {
        this.#id = id
        this.#relativeCoordinate = relativeCoordinate
        this.#direction = direction
    }

    updateTick(deltaState) {
        if (!this.hasInputReady()) {
            const item = deltaState[this.#id]
            if (item) {
                this.#contents = item
            } else {
                this.#contents = null
            }
        }
    }

    hasInputReady() {
        return this.#contents !== null
    }
}
class Output {
    #id
    #relativeCoordinate
    #direction
    #connectedMachine
    #contents = null
    constructor(id, relativeCoordinate, direction) {
        this.#id = id
        this.#relativeCoordinate = relativeCoordinate
        this.#direction = direction
    }

    updateTick(deltaState) {
        if (this.acceptingOutput()) {
            deltaState[this.#connectedMachine] = this.#contents
            this.#contents = null
        }
    }

    acceptingOutput() {
        return this.#contents === null
    }

    setOutputItem(item) {
        this.#contents = item
    }
}

class Coordinate2D {
    #x
    #y
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }
}

class BoundingBox {
    #northwestCorner
    #southeastCorner
    constructor(northwestCorner, southeastCorner) {
        this.#northwestCorner = northwestCorner
        this.#southeastCorner = southeastCorner
    }
}

class Direction {
    static NORTH = 0
    static EAST = 90
    static SOUTH = 180
    static WEST = 270
}