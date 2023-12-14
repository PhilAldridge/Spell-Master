import { ReactElement, useState } from 'react';
import { words } from './words/words';
import './WordSearch.css';
import _ from 'lodash';
import HomeButton from './HomeButton';

const WordSearchGenerator = require("@blex41/word-search");
const wsSize = 10;
let arr: number[][]=[]
for(let i=0;i<10;i++){
  arr.push(new Array(wsSize).fill(0))
}

function WordSearch({handleMenuClick}:{handleMenuClick:(input:string)=>void}) {
  const [correctWords,setCorrectWords] = useState<string[]>();
  const [wordSearch,setWordSearch] = useState<string[][]>(); 
  const [mouseDownPos,setMouseDownPos] = useState<[number,number]>();
  const [mouseOverPos,setMouseOverPos] = useState<[number,number]>();
  const [found, setFound] = useState<number[][]>(arr)
  const [foundWords, setFoundWords] = useState<string[]>([]);

  if(!correctWords) {
    const shuffled = words.map(word=>word.word).sort(() => 0.5 - Math.random());
    setCorrectWords(shuffled);
  }

  if(correctWords && !wordSearch) {

    const options = {
      cols:wsSize, rows:wsSize,
      disabledDirection: ['NW','SW'],
      dictionary: correctWords,
      maxWords: correctWords.length*2,
      backwardsProbability: 0.3,
      upperCase: true,
      diacritics: false
    }

    const ws = new WordSearchGenerator(options);
    setCorrectWords((ws.words as wsWord[]).map(obj=>obj.word))
    setWordSearch(ws.grid)
  }

  let rows: ReactElement[][] = [];
  let selected = _.cloneDeep(found);
  let wordSelected = '';
  if(mouseDownPos && mouseOverPos && wordSearch) {
    const min0 = Math.min(mouseDownPos[0],mouseOverPos[0]);
    const min1 = Math.min(mouseDownPos[1],mouseOverPos[1]);
    const max0 = Math.max(mouseDownPos[0],mouseOverPos[0]);
    const max1 = Math.max(mouseDownPos[1],mouseOverPos[1]);
    if(min0===max0) {
      for(let i=min1; i<=max1;i++){
        selected[min0][i] = 1;
        wordSelected+=wordSearch[min0][i]
      }
    }
    if(min1===max1) {
      for(let i=min0; i<=max0;i++){
        selected[i][min1] = 1;
        wordSelected+=wordSearch[i][min1]
      }
    }
    if((max0-min0)===(max1-min1)) {
      for(let i=0; i<=(max0-min0);i++){
        if(Math.sign(mouseDownPos[0]-mouseOverPos[0])===Math.sign(mouseDownPos[1]-mouseOverPos[1])){
          selected[min0+i][min1+i] = 1;
          wordSelected+=wordSearch[min0+i][min1+i]
        } else {
          selected[max0-i][min1+i] = 1;
          wordSelected+=wordSearch[max0-i][min1+i];
        }
      }
    }
  }

  if(wordSearch) {
    wordSearch.forEach((row,rowIndex)=>{
      const rowElement = row.map((letter,letterIndex)=><div 
            className={'wordsearch-cell selected-'+(selected.length>0&& selected[rowIndex][letterIndex]).toString()}
            onMouseDown={(e)=>handleMouseDown(e,[rowIndex,letterIndex])}
            onTouchStart={(e)=>handleTouchDown(e,[rowIndex,letterIndex])}
            onMouseOver={()=>handleMouseOver([rowIndex,letterIndex])}
            data-row={rowIndex}
            data-letter={letterIndex}
            key={'cell-'+rowIndex+'-'+letterIndex}
          >{letter}</div>)
      rows.push(rowElement)
    })
  }
  return (
    <div 
      className='wordsearch' 
      onMouseUp={handleMouseUp} 
      onTouchMove={(e)=>handleTouchMove(e)}
      onTouchEnd={handleMouseUp}
    >
      {rows.map((row,i)=> {
        return <div className='wordsearch-row' key={'row'+i}>{row}</div>
      })}
      {foundWords.length===correctWords?.length?
        <h2>Congratulations! You found all the words.</h2>
        :
        <>
          <h3>Words to find:</h3>
          <div className='words-to-find'>
            {correctWords&& correctWords.map(word=><div className={'strikethrough-'+(foundWords.includes(word)||foundWords.includes(reverse(word))).toString()}>{word}</div>)}
          </div>
        </>
      }
      <HomeButton handleMenuClick={handleMenuClick} />
    </div>
  )

  function handleMouseOver(coords: [number,number]) {
    if(!mouseDownPos) return;
    setMouseOverPos(coords);
  }

  function handleTouchMove(e: React.TouchEvent) {
    // get the touch element
    const touch = e.touches[0];

    // get the DOM element
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if(!element?.hasAttribute('data-row')|| !element?.hasAttribute('data-letter')) return;
    setMouseOverPos([Number(element.getAttribute('data-row')),Number(element.getAttribute('data-letter'))])
    //console.log(element?.attributes?['data-row'])
  }

  function handleTouchDown(e: React.TouchEvent<HTMLDivElement>,coords:[number,number]) {
    setMouseDownPos(coords)
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>,coords:[number,number]) {
    e.preventDefault();
    setMouseDownPos(coords)
  }

  function handleMouseUp() {
    if(!mouseDownPos || !mouseOverPos) return;
    console.log(wordSelected)
    if(correctWords&& (correctWords.includes(wordSelected.toLowerCase()) || correctWords.includes(reverse(wordSelected).toLowerCase()))){
      selected.forEach((row,i)=>{
        row.forEach((cell,j)=>{
          if(cell === 1) selected[i][j] = 2;
        })
      })
      setFound(selected);
      setFoundWords([...foundWords,wordSelected.toLowerCase()]);
    }
    setMouseDownPos(undefined);
    setMouseOverPos(undefined);
  }
}

function reverse(word:string):string{
  return word.split('').reverse().join('');
}

export default WordSearch