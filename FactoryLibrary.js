class ProducerTestMachine {
    #id
    #coordinate
    #direction
    #toMachineId

    #toProduce

    constructor(id, coordinate, direction, toMachineId, toProduce) {
        this.#id = id
        this.#coordinate = coordinate
        this.#direction = direction
        this.#toMachineId = toMachineId

        this.#toProduce = toProduce
    }

    updateTick(deltaState) {
        let to = deltaState[this.#toMachineId]
        if (!to) deltaState[this.#toMachineId] = []
        deltaState[this.#toMachineId].push(this.#toProduce)
    }
}

class ConsoleOutputTestMachine {
    #id
    #coordinate
    #direction

    constructor(id, coordinate, direction) {
        this.#id = id
        this.#coordinate = coordinate
        this.#direction = direction
    }

    updateTick(deltaState) {
        let toLog = deltaState[this.#id]
        if (toLog) console.log(toLog)
    }
}

class Belt {
    #id
    #coordinate
    #direction
    #toMachineId

    #content

    constructor(id, coordinate, direction, toMachineId) {
        this.#id = id
        this.#coordinate = coordinate
        this.#direction = direction
        this.#toMachineId = toMachineId

        this.#content = {}
    }

    updateTick(deltaState) {
        if (this.#content) {
            let to = deltaState[this.#toMachineId]
            if (!to) deltaState[this.#toMachineId] = []
            deltaState[this.#toMachineId].push(this.#content)
        }
        let self = deltaState[this.#id]
        if (self) this.#content = self
    }
}

class AddMachine {
    #id
    #coordinate
    #direction
    #toMachineId

    #contents = []

    constructor(id, coordinate, direction, toMachineId) {
        this.#id = id
        this.#coordinate = coordinate
        this.#direction = direction
        this.#toMachineId = toMachineId
    }

    updateTick(deltaState) {
        let self = deltaState[this.#id]
        if (self) this.#contents.push(self)

        if (this.#contents.length !== 2) {
            return
        }
        const sum = this.#contents[0] + this.#contents[1]
        let to = deltaState[this.#toMachineId]
        if (!to) deltaState[this.#toMachineId] = []
        deltaState[this.#toMachineId].push(sum)

        this.#contents = []
    }
}

class Coordinate2D {
    #x
    #y
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }
}

class Direction {
    static NORTH = 0
    static NORTHEAST = 45
    static EAST = 90
    static SOUTHEAST = 135
    static SOUTH = 180
    static SOUTHWEST = 225
    static WEST = 270
    static NORTHWEST = 315
}