namespace SpriteKind {
    export const Bomb = SpriteKind.create()
    export const Explosion = SpriteKind.create()
    export const Corpse = SpriteKind.create()
}

class ArmedBomb {
  public static readonly smallBombImage = img`
          . . . . . . . . 2 2 . . . . . .
          . . . . . . . c 4 4 . . . . . .
          . . . c c c c c 4 c f f . . . .
          . . c c f f f c c c c f f f . .
          . . c f f f f c c f c d c f . .
          . c c f f f f f f f c d d f f .
          . c f f f f f f f f f c c f f .
          . c f f f f f f f f f f f f f .
          . c f f f f f f f f f f f f f .
          . c f f f f f f f f f f f f f .
          . c f f f f f f f f f f f f f .
          . c c f f f f f f f f f f c . .
          . . c c f f f f f f f f c f . .
          . . . c c f f f f f c c c . . .
          . . . . . c c c c c f . . . . .
          . . . . . . . . . . . . . . . .
  `
  public static readonly largeBombImage = img`
        . . . . . . . . 2 2 . . . . . .
        . . c c c c c c 4 4 f f f . . .
        . c c f f f f c 4 c f f f f . .
        . c f f f f f c c c c f f f . .
        c c f f f f f c c f c d c f f .
        c f f f f f f f f f c d d f f .
        c f f f f f f f f f f c c f f f
        c f f f f f f f f f f f f f f f
        c f f f f f f f f f f f f f f f
        c f f f f f f f f f f f f f f f
        c f f f f f f f f f f f f f f f
        c f f f f f f f f f f f f f c f
        c c f f f f f f f f f f f f c .
        . c c f f f f f f f f c c c . .
        . . c c c f f f f f f f c c . .
        . . . . c c c c c c . . . . . .
    `
    bomb: Sprite
    explosion: Explosion
    countDown: number
    status: string
    currentImage: string
    radius: number
    explosionBurstTime: number

    constructor(bomb: Sprite) {
        this.bomb = bomb
        this.countDown = 3000
        this.explosionBurstTime = 200
        this.status = 'armed'
        this.currentImage = 'large'
        this.radius = 2
    }

    hasBombId(id: number): boolean {
      return this.bomb.id == id
    }

    tick() {
      if (this.status == 'armed') {
        if (this.countDown % 100 == 0) {
          this.switchImage()
        }
        this.decreaseCountdown(10)
      } else if (this.status == 'exploding') {
        this.explosionBurstTime -= 10
        if (this.explosionBurstTime <= 0) {
          this.status = 'exploded'
        }
      }
    }

    switchImage() {
      if (this.currentImage == 'large') {
        this.currentImage = 'small'
        this.bomb.setImage(ArmedBomb.smallBombImage)
      } else {
        this.currentImage = 'large'
        this.bomb.setImage(ArmedBomb.largeBombImage)
      }
    }

    explode() {
      this.explosion = new Explosion(this.radius, this.bomb.x, this.bomb.y)
      this.bomb.destroy()
      this.status = 'exploding'
    }

    decreaseCountdown(decrease: number) {
        this.countDown -= decrease
        if (this.countDown <= 0) {
          this.explode()
        }
    }

    hasExploded(): boolean {
        return this.status == 'exploded'
    }
}

class ExplosionArm {
  public static readonly explosionHorizontalPartImage = img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        d d d d d d d d d d d d d d d d
        d d d d d d d d d d d d d d d d
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
        4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
        d d d d d d d d d d d d d d d d
        d d d d d d d d d d d d d d d d
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
  `

  public static readonly explosionVerticalPartImage = img`
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
        1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
  `

  public static readonly explosionBottomTipImage = img`
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 4 2 2 2 2 4 4 4 d d 1
          1 1 d d d 4 2 2 2 2 4 d d d 1 1
          . 1 1 1 d 4 4 4 4 4 4 d 1 1 1 .
          . . 1 1 d d d 4 4 d d d 1 . . .
          . . . 1 1 1 d 4 4 d 1 1 1 . . .
          . . . . 1 1 1 d d 1 1 . . . . .
          . . . . . . 1 1 1 1 . . . . . .
      `
  public static readonly explosionUpTipImage = img`
          . . . . . . 1 1 1 1 . . . . . .
          . . . . 1 1 1 d d 1 1 . . . . .
          . . . 1 1 1 d 4 4 d 1 1 1 . . .
          . . 1 1 d d d 4 4 d d d 1 . . .
          . 1 1 1 d 4 4 4 4 4 4 d 1 1 1 .
          1 1 d d d 4 2 2 2 2 4 d d d 1 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
          1 d d 4 4 4 2 2 2 2 4 4 4 d d 1
      `

  public static readonly explosionRightTipImage = img`
        1 1 1 1 1 1 1 1 1 1 1 . . . . .
        d d d d d d d d d d 1 1 . . . .
        d d d d d d d d d d d 1 . . . .
        4 4 4 4 4 4 4 4 4 4 d 1 1 1 . .
        4 4 4 4 4 4 4 4 4 4 d d d 1 . .
        2 2 2 2 2 2 2 2 2 2 4 4 d 1 1 .
        2 2 2 2 2 2 2 2 2 2 2 4 4 d 1 1
        2 2 2 2 2 2 2 2 2 2 2 4 4 4 d 1
        2 2 2 2 2 2 2 2 2 2 2 4 4 4 d 1
        2 2 2 2 2 2 2 2 2 2 2 4 4 d 1 1
        2 2 2 2 2 2 2 2 2 2 4 4 d 1 1 .
        4 4 4 4 4 4 4 4 4 4 4 d 1 1 . .
        4 4 4 4 4 4 4 4 4 d d d 1 1 . .
        d d d d d d d d d d 1 1 1 . . .
        d d d d d d d d d 1 1 . . . . .
        1 1 1 1 1 1 1 1 1 1 1 . . . . .
  `

  public static readonly explosionLeftTipImage = img`
        . . . . . . 1 1 1 1 1 1 1 1 1 1
        . . . . . 1 1 d d d d d d d d d
        . . . . 1 1 d d d d d d d d d d
        . . 1 1 1 1 d 4 4 4 4 4 4 4 4 4
        . . 1 1 d d d 4 4 4 4 4 4 4 4 4
        . 1 1 d d 4 4 4 2 2 2 2 2 2 2 2
        1 1 d d 4 4 2 2 2 2 2 2 2 2 2 2
        1 d d 4 4 2 2 2 2 2 2 2 2 2 2 2
        1 d d 4 4 2 2 2 2 2 2 2 2 2 2 2
        1 1 d d 4 4 2 2 2 2 2 2 2 2 2 2
        . 1 1 d d 4 4 2 2 2 2 2 2 2 2 2
        . . 1 1 d d 4 4 4 4 4 4 4 4 4 4
        . . . 1 1 d d d 4 4 4 4 4 4 4 4
        . . . . 1 1 1 d d d d d d d d d
        . . . . . . 1 1 d d d d d d d d
        . . . . . . 1 1 1 1 1 1 1 1 1 1
  `
  tip: Sprite
  /*
  directions:
    1 - up
    2 - right
    3 - down
    4 - left
  (numbers to be able to use switch case)
  */
  constructor(length: number, x: number, y: number, direction: number) {
    switch(direction) {
      case 1:
        for (let i = 0; i < length - 1; i++ ) {
          let explosionPart = sprites.create(ExplosionArm.explosionVerticalPartImage, SpriteKind.Explosion)
          explosionPart.setPosition(x, y - (16 * i))
          explosionPart.lifespan = 200
        }
        this.tip = sprites.create(ExplosionArm.explosionUpTipImage, SpriteKind.Explosion)
        this.tip.setPosition(x, y - (16 * (length-1)))
        this.tip.lifespan = 200
        break
      case 2:
        for (let i = 0; i < length - 1; i++ ) {
          let explosionPart = sprites.create(ExplosionArm.explosionHorizontalPartImage, SpriteKind.Explosion)
          explosionPart.setPosition(x + (16 * i), y)
          explosionPart.lifespan = 200
        }
        this.tip = sprites.create(ExplosionArm.explosionRightTipImage, SpriteKind.Explosion)
        this.tip.setPosition(x + (16 * (length-1)), y)
        this.tip.lifespan = 200
        break
      case 3:
        for (let i = 0; i < length - 1; i++ ) {
          let explosionPart = sprites.create(ExplosionArm.explosionVerticalPartImage, SpriteKind.Explosion)
          explosionPart.setPosition(x, y + (16 * i))
          explosionPart.lifespan = 200
        }
        this.tip = sprites.create(ExplosionArm.explosionBottomTipImage, SpriteKind.Explosion)
        this.tip.setPosition(x, y + (16 * (length-1)))
        this.tip.lifespan = 200
        break
      case 4:
        for (let i = 0; i < length - 1; i++ ) {
          let explosionPart = sprites.create(ExplosionArm.explosionHorizontalPartImage, SpriteKind.Explosion)
          explosionPart.setPosition(x - (16 * i), y)
          explosionPart.lifespan = 200
        }
        this.tip = sprites.create(ExplosionArm.explosionLeftTipImage, SpriteKind.Explosion)
        this.tip.setPosition(x - (16 * (length-1)), y)
        this.tip.lifespan = 200
        break
    }

  }
}

class Explosion {
  public static readonly explosionImage = img`
    1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
    d d d 4 4 2 2 2 2 2 2 4 4 d d d
    d d d 4 4 2 2 2 2 2 2 4 4 d d d
    4 4 4 4 4 2 2 2 2 2 2 4 4 4 4 4
    4 4 4 4 4 2 2 2 2 2 2 4 4 4 4 4
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 1 1 1 1 2 2 2 2 2 2
    2 2 2 2 1 2 2 2 2 2 2 1 2 2 2 2
    2 2 2 2 1 2 2 2 2 2 2 1 2 2 2 2
    2 2 2 2 1 2 2 2 2 2 2 1 2 2 2 2
    2 2 2 2 2 2 1 1 1 1 2 2 2 2 2 2
    4 4 4 4 4 2 2 2 2 2 2 4 4 4 4 4
    4 4 4 4 4 2 2 2 2 2 2 4 4 4 4 4
    d d d 4 4 2 2 2 2 2 2 4 4 d d d
    d d d 4 4 2 2 2 2 2 2 4 4 d d d
    1 d d 4 4 2 2 2 2 2 2 4 4 d d 1
  `
  arms: ExplosionArm[]
  core: Sprite

  constructor(radius: number, x: number, y: number) {
    this.arms = [
      new ExplosionArm(radius, x, y-16, 1),
      new ExplosionArm(radius, x+16, y, 2),
      new ExplosionArm(radius, x, y+16, 3),
      new ExplosionArm(radius, x-16, y, 4)
    ]
    this.core = sprites.create(Explosion.explosionImage, SpriteKind.Explosion)
    this.core.setPosition(x,y)
    this.core.lifespan = 200
  }
}

let bombs: ArmedBomb[] = []
let nbAvailableBombs = 2
let hero: Sprite = null

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nbAvailableBombs > 0) {
        nbAvailableBombs = nbAvailableBombs - 1
        let bomb = sprites.create(ArmedBomb.largeBombImage, SpriteKind.Bomb)
        let armedBomb = new ArmedBomb(bomb);
        bombs.insertAt(0, armedBomb)
    }
})

function alignPlayerWithHorizontalGrid(player: Sprite) {
    for (let position = player.x - 3; position < player.x + 3; position++) {
        if (position % 16 == 0) {
            player.setPosition(position, player.y)
        }
    }
}

function alignPlayerWithVerticalGrid(player: Sprite) {
    for (let position = player.y - 3; position < player.y + 3; position++) {
        if (position % 16 == 0) {
            player.setPosition(player.x, position)
        }
    }
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
  hero.setImage(PLAYER_BACK_IMAGE)
  alignPlayerWithHorizontalGrid(hero)
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
  hero.setImage(PLAYER_FRONT_IMAGE)
  alignPlayerWithHorizontalGrid(hero)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
  hero.setImage(PLAYER_RIGHT_IMAGE)
  alignPlayerWithVerticalGrid(hero)
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
  hero.setImage(PLAYER_LEFT_IMAGE)
  alignPlayerWithVerticalGrid(hero)
})

game.onUpdateInterval(10, function () {
    for (let i = bombs.length; i > 0; i--) {
        let armedBomb = bombs[i - 1]
        armedBomb.tick()
        if (armedBomb.hasExploded()) {
            bombs.removeAt(i-1)
            nbAvailableBombs = nbAvailableBombs + 1
        }
    }
})

sprites.onCreated(SpriteKind.Bomb, function (sprite) {
    sprite.setPosition(hero.x, hero.y)
    sprite.z = hero.z - 1
})

sprites.onOverlap(SpriteKind.Bomb, SpriteKind.Explosion, function (bombSprite, explosion) {
  for (let bomb of bombs) {
    if (bomb.hasBombId(bombSprite.id)) {
      bomb.explode()
    }
  }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Explosion, function (player, explosion) {
  player.setKind(SpriteKind.Corpse)
  player.setImage(img`
    . . . . . . d d d d d . . . . .
    . . . d d d d 1 1 1 d d d . . .
    . . d d 1 1 1 1 1 1 1 1 d d . .
    . . d 1 1 1 1 1 1 1 1 1 1 d . .
    . . d 1 1 1 1 1 1 1 1 1 1 d d .
    . d d 1 1 1 f 1 1 1 f 1 1 1 d .
    . d 1 1 1 1 1 1 1 1 1 1 1 1 d d
    . d 1 1 1 1 1 1 1 1 1 1 1 1 1 d
    . d 1 1 1 1 1 1 1 1 1 1 1 1 1 d
    d d 1 1 1 1 1 1 f f 1 1 1 1 1 d
    d 1 1 1 1 1 1 1 f f 1 1 1 1 1 d
    d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d
    d 1 1 1 1 1 1 1 d 1 1 1 1 1 1 d
    d 1 d d d 1 1 d d d d 1 d 1 1 d
    d d d . d d d d . . d d d d d d
    d d . . . d d . . . . d . . d d
  `)
})
const PLAYER_FRONT_IMAGE = img`
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
`
const PLAYER_BACK_IMAGE = img`
    . . . . . . f f f f . . . . . .
    . . . . f f e e e e f f . . . .
    . . . f e e e f f e e e f . . .
    . . f f f f f 2 2 f f f f f . .
    . . f f e 2 e 2 2 e 2 e f f . .
    . . f e 2 f 2 f f 2 f 2 e f . .
    . . f f f 2 2 e e 2 2 f f f . .
    . f f e f 2 f e e f 2 f e f f .
    . f e e f f e e e e f e e e f .
    . . f e e e e e e e e e e f . .
    . . . f e e e e e e e e f . . .
    . . e 4 f f f f f f f f 4 e . .
    . . 4 d f 2 2 2 2 2 2 f d 4 . .
    . . 4 4 f 4 4 4 4 4 4 f 4 4 . .
    . . . . . f f f f f f . . . . .
    . . . . . f f . . f f . . . . .
`

const PLAYER_RIGHT_IMAGE = img`
    . . . . . . . . . . . . . . . .
    . . . . . f f f f f f . . . . .
    . . . f f e e e e f 2 f . . . .
    . . f f e e e e f 2 2 2 f . . .
    . . f e e e f f e e e e f . . .
    . . f f f f e e 2 2 2 2 e f . .
    . . f e 2 2 2 f f f f e 2 f . .
    . f f f f f f f e e e f f f . .
    . f f e 4 4 e b f 4 4 e e f . .
    . f e e 4 d 4 1 f d d e f . . .
    . . f e e e e e d d d f . . . .
    . . . . f 4 d d e 4 e f . . . .
    . . . . f e d d e 2 2 f . . . .
    . . . f f f e e f 5 5 f f . . .
    . . . f f f f f f f f f f . . .
    . . . . f f . . . f f f . . . .
`

const PLAYER_LEFT_IMAGE = img`
    . . . . . . . . . . . . . . . .
    . . . . f f f f f f . . . . . .
    . . . f 2 f e e e e f f . . . .
    . . f 2 2 2 f e e e e f f . . .
    . . f e e e e f f e e e f . . .
    . f e 2 2 2 2 e e f f f f . . .
    . f 2 e f f f f 2 2 2 e f . . .
    . f f f e e e f f f f f f f . .
    . f e e 4 4 f b e 4 4 e f f . .
    . . f e d d f 1 4 d 4 e e f . .
    . . . f d d d e e e e e f . . .
    . . . f e 4 e d d 4 f . . . . .
    . . . f 2 2 e d d e f . . . . .
    . . f f 5 5 f e e f f f . . . .
    . . f f f f f f f f f f . . . .
    . . . f f f . . . f f . . . . .
`
scene.setBackgroundColor(6)
hero = sprites.create(PLAYER_FRONT_IMAGE, SpriteKind.Player)
controller.moveSprite(hero, 200, 200)
hero.setFlag(SpriteFlag.StayInScreen, true)
