import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { BodyAvailableDto, BodyRateDto, Rating } from '../dto';
import { WordNotFound } from '../error/word-not-found.error';

@Injectable()
export class WordService {
  private wordList: string[] = [];

  constructor() {
    this.loadWords();
  }

  async loadWords() {
    try {
      const file = readFileSync(join(process.cwd(), './src/word/words.txt'));
      this.wordList = file.toString().split('\n');
    } catch (error) {
      console.log(error.message);
    }
  }

  async random() {
    if (!this.wordList.length) await this.loadWords();
    const Index = Math.floor(Math.random() * this.wordList.length);
    const Word = this.wordList[Index];
    return { Word, Index };
  }

  async available(DTO: BodyAvailableDto) {
    const { Green, Brown, Gray } = DTO;
    if (!this.wordList.length) await this.loadWords();
    const Words = [];
    for (let Word of this.wordList) {
      if (!Word.length) continue;
      if (Gray && this.matchGray(Word, Gray)) continue;
      if (Brown && this.matchBrown(Word, Brown)) continue;
      if (Green && this.notMatchGreen(Word, Green)) continue;
      if (Green && Brown && this.notMatchAll(Word, Green, Brown)) continue;
      Words.push(Word);
    }
    Words.sort();
    return { Words };
  }

  notMatchAll(
    Word: string,
    Green: string[],
    Brown: [string[], string[], string[], string[], string[]],
  ) {
    const All = [];
    let letterG, letterB;
    for (let i = 0; i < 5; i++) {
      letterG = Green[i];
      if (letterG && !All.includes(letterG)) All.push(letterG);
      if (Brown[i].length) {
        for (let j = 0; j < Brown[i].length; j++) {
          letterB = Brown[i][j];
          if (letterB && !All.includes(letterB)) All.push(letterB);
        }
      }
    }
    for (let letter of All) {
      if (!Word.includes(letter)) return true;
    }
    return false;
  }

  matchGray(Word: string, Gray: string[]) {
    for (let letter of Gray) {
      if (Word.includes(letter)) return true;
    }
    return false;
  }

  matchBrown(
    Word: string,
    Brown: [string[], string[], string[], string[], string[]],
  ) {
    let letter;
    for (let i = 0; i < Word.length; i++) {
      letter = Word[i];
      if (Brown[i] && Brown[i].length) {
        if (Brown[i].includes(letter)) return true;
      }
    }
    return false;
  }

  notMatchGreen(Word: string, Green: string[]) {
    for (let i = 0; i < Word.length; i++) {
      if (Green[i]) {
        if (Green[i] != Word[i]) return true;
      }
    }
    return false;
  }

  async rate(DTO: BodyRateDto) {
    const { Guess, Index } = DTO;
    if (!this.wordList.length) await this.loadWords();
    if (!this.wordList.includes(Guess)) {
      throw WordNotFound(Guess);
    }
    let Ratings = [];
    const Word = this.wordList[Index];
    let letterW, letterG;
    for (let i = 0; i < Word.length; i++) {
      letterW = Word[i];
      letterG = Guess[i];
      if (letterG && letterW && letterG === letterW) {
        Ratings.push(Rating.Green);
      } else if (letterG && Word.includes(letterG)) {
        Ratings.push(Rating.Brown);
      } else {
        Ratings.push(Rating.Gray);
      }
    }
    return { Guess, Ratings };
  }
}
