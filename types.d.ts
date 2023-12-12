type word = {
    word:string
    commonMistakes?: string[]
}

type wsWord = {
    word:string
    clean:string
    path: coord[]
}

type coord = {
    x:number,
    y:number
}