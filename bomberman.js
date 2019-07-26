namespace SpriteKind {
    export const Bomb = SpriteKind.create()
}

class ArmedBomb {
    bomb: Sprite
    countDown: number
    status: string

    constructor(bomb: Sprite) {
        this.bomb = bomb
        this.countDown = 3000
        this.status = 'armed'
    }

    decreaseCountdown(decrease: number) {
        this.countDown -= decrease
        if (this.countDown <= 0) {
            this.bomb.destroy()
            this.status = 'exploded'
        }
    }

    hasExploded(): boolean {
        return this.status == 'exploded'
    }
}

let bombs: ArmedBomb[] = []
let nbAvailableBombs = 0
let hero: Sprite = null

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nbAvailableBombs > 0) {
        nbAvailableBombs = nbAvailableBombs - 1
        let bomb = sprites.create(img`
            . . . . . . . e c 7 . . . . . .
            . . . . e e e c 7 7 e e . . . .
            . . c e e e e c 7 e 2 2 e e . .
            . c e e e e e c 6 e e 2 2 2 e .
            . c e e e 2 e c c 2 4 5 4 2 e .
            c e e e 2 2 2 2 2 2 4 5 5 2 2 e
            c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
            . e e e 2 2 2 2 2 2 2 2 2 4 e .
            . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
            . . 2 e e 2 2 2 2 2 4 4 2 e . .
            . . . 2 2 e e 4 4 4 2 e e . . .
            . . . . . 2 2 e e e e . . . . .
        `, SpriteKind.Bomb)
        let armedBomb = new ArmedBomb(bomb);
        bombs.insertAt(0, armedBomb)
    }
})

game.onUpdateInterval(100, function () {
    for (let i = 0; i < bombs.length; i++) {
        let armedBomb = bombs[i]
        armedBomb.decreaseCountdown(100)
        if (armedBomb.hasExploded()) {
            bombs.removeAt(i)
            nbAvailableBombs = nbAvailableBombs + 1
        }
    }
})
sprites.onCreated(SpriteKind.Bomb, function (sprite) {
    sprite.setPosition(hero.x, hero.y)
    sprite.z = hero.z - 1
})

scene.setBackgroundColor(6)
hero = sprites.create(img`
    . . . . . . f f f f . . . . . .
    . . . . f f f 2 2 f f f . . . .
    . . . f f f 2 2 2 2 f f f . . .
    . . f f f e e e e e e f f f . .
    . . f f e 2 2 2 2 2 2 e e f . .
    . . f e 2 f f f f f f 2 e f . .
    . . f f f f e e e e f f f f . .
    . f f e f b f 4 4 f b f e f f .
    . f e e 4 1 f d d f 1 4 e e f .
    . . f e e d d d d d d e e f . .
    . . . f e e 4 4 4 4 e e f . . .
    . . e 4 f 2 2 2 2 2 2 f 4 e . .
    . . 4 d f 2 2 2 2 2 2 f d 4 . .
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
    . . . . . f f f f f f . . . . .
    . . . . . f f . . f f . . . . .
`, SpriteKind.Player)
controller.moveSprite(hero, 100, 100)
nbAvailableBombs = 2
