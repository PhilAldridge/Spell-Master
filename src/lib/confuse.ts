export default function getJumbledWords(word:string): string[] {
    let results: string[] = [];
    const mixUps = [
        doubleGen('l'),doubleGen('t'),doubleGen('o'),doubleGen('n'), doubleGen('m'), doubleGen('p'),
        switchOrderGen('i','e'), switchOrderGen('a','e'), switchOrderGen('a','i'),switchOrderGen('u','r'),switchOrderGen('r','i'),switchOrderGen('t','e'),
        switchLetterGen('g','j'), switchLetterGen('d','t'),switchLetterGen('c','k'),switchLetterGen('ck','c'),switchLetterGen('k','g'),switchLetterGen('s','c'),
        switchLetterGen('red','rd'),switchLetterGen('er','eir'), switchLetterGen('ou','o'),switchLetterGen('ight','ite'), switchLetterGen('ight','te'), switchLetterGen('a','ar'),
        removeLetter
    ]
    for(let i=0; i<5; i++){
        let result = word;
        while(result === word) {
            result = mixUps[Math.floor(Math.random()*mixUps.length)](word);
            result = mixUps[Math.floor(Math.random()*mixUps.length)](result);
        }
        results.push(result)
    }
    return results;
}

const doubleGen = (l:string) => {return function doubledLetters(word:string):string {
    const wordSplit = word.split(l).filter(str=>str!=='');
    return wordSplit[0] + wordSplit.slice(1).map(str=>{if(Math.random()>0.6){
       return l+str
    } else {
       return l + l+ str
    }}).join('');
}}

const switchOrderGen = (letter1:string, letter2:string)=>{ return function switchLetterOrder(word:string):string {
    if(word.includes(letter1+letter2)) {
        return word.replace(letter1+letter2,letter2+letter1)
    } else{
        return word.replace(letter2+letter1,letter1+letter2)
    }
}}

const switchLetterGen = (letter1:string, letter2:string) => {return function switchLetters(word:string):string {
    let result = '';
    for(let i=0;i<word.length;i++){
        if(word[i]!== letter1 && word[i]!==letter2) {
            result += word[i];
        } else {
            if(Math.random()>0.5) {
                result+= letter1
            } else {
                result+= letter2
            }
        }
    }
    return result
}}

function removeLetter(word:string):string {
    var pos = Math.floor(Math.random()*(word.length-2))+1
    return word.substring(0,pos) + word.substring(pos+1);
}