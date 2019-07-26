namespace SpriteKind {
    export const Bomb = SpriteKind.create()
    export const Explosion = SpriteKind.create()
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
    public static readonly explodingBomb = img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 c c c c c c c c c c c 1 1 1
        1 c c 1 1 1 1 1 1 1 1 1 c c 1 1
        1 c 1 1 1 1 1 1 1 1 1 1 1 c 1 1
        1 c 1 1 1 1 1 1 1 1 1 1 1 c c 1
        1 c 1 1 1 1 1 1 1 1 1 1 1 1 c 1
        1 c 1 1 1 1 1 1 1 1 1 1 1 1 1 c
        1 c 1 1 1 1 1 1 1 1 1 1 1 1 1 c
        1 c 1 1 1 1 1 1 1 1 1 1 1 1 1 c
        1 c 1 1 1 1 1 1 1 1 1 1 1 1 1 c
        1 c 1 1 1 1 1 1 1 1 1 1 1 1 1 c
        1 c 1 1 1 1 1 1 1 1 1 1 1 1 1 c
        1 c 1 1 1 1 1 1 1 1 1 1 1 1 c 1
        1 c c 1 1 1 1 1 1 1 1 1 1 c 1 1
        1 1 c c c c c c c c c c c c 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
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
        this.radius = 1
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
          this.bomb.destroy()
          this.explosion.delete()
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

    decreaseCountdown(decrease: number) {
        this.countDown -= decrease
        if (this.countDown <= 0) {
            this.explosion = new Explosion(this.radius, this.bomb.x, this.bomb.y)
            this.bomb.setImage(ArmedBomb.explodingBomb)
            this.status = 'exploding'
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
  arm: Sprite[]
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
        this.tip = sprites.create(ExplosionArm.explosionUpTipImage, SpriteKind.Explosion)
        break
      case 2:
        this.tip = sprites.create(ExplosionArm.explosionRightTipImage, SpriteKind.Explosion)
        break
      case 3:
        this.tip = sprites.create(ExplosionArm.explosionBottomTipImage, SpriteKind.Explosion)
        break
      case 4:
        this.tip = sprites.create(ExplosionArm.explosionLeftTipImage, SpriteKind.Explosion)
        break
    }

    this.tip.setPosition(x, y)
  }

  delete() {
    this.tip.destroy()
  }
}

class Explosion {
  arms: ExplosionArm[]

  constructor(radius: number, x: number, y: number) {
    this.arms = [
      new ExplosionArm(radius, x, y-16, 1),
      new ExplosionArm(radius, x+16, y, 2),
      new ExplosionArm(radius, x, y+16, 3),
      new ExplosionArm(radius, x-16, y, 4)
    ]
  }

  delete(){
    for (let arm of this.arms) {
      arm.delete()
    }
    this.arms = null
  }

}

let bombs: ArmedBomb[] = []
let nbAvailableBombs = 0
let hero: Sprite = null

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (nbAvailableBombs > 0) {
        nbAvailableBombs = nbAvailableBombs - 1
        let bomb = sprites.create(ArmedBomb.largeBombImage, SpriteKind.Bomb)
        let armedBomb = new ArmedBomb(bomb);
        bombs.insertAt(0, armedBomb)
    }
})

game.onUpdateInterval(10, function () {
    for (let i = 0; i < bombs.length; i++) {
        let armedBomb = bombs[i]
        armedBomb.tick()
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
controller.moveSprite(hero, 200, 200)
nbAvailableBombs = 2
