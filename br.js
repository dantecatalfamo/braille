"use strict";

const OUTWIDTH = 80;
const OUTHEIGHT = 40;
const WIDTH = 2 * OUTWIDTH;
const HEIGHT = 3 * OUTHEIGHT;
const BRAILLE = [
  "⠀", "⠁", "⠂", "⠃", "⠄", "⠅", "⠆", "⠇", "⠈", "⠉", "⠊", "⠋", "⠌", "⠍", "⠎", "⠏",
  "⠐", "⠑", "⠒", "⠓", "⠔", "⠕", "⠖", "⠗", "⠘", "⠙", "⠚", "⠛", "⠜", "⠝", "⠞", "⠟",
  "⠠", "⠡", "⠢", "⠣", "⠤", "⠥", "⠦", "⠧", "⠨", "⠩", "⠪", "⠫", "⠬", "⠭", "⠮", "⠯",
  "⠰", "⠱", "⠲", "⠳", "⠴", "⠵", "⠶", "⠷", "⠸", "⠹", "⠺", "⠻", "⠼", "⠽", "⠾", "⠿",
];

const br = document.getElementById("br");

let board = new Array(HEIGHT);
for (let i = 0; i < HEIGHT; i++) {
  board[i] = new Array(WIDTH);
}

function render(board) {
  const out = new Array(OUTHEIGHT);
  for (let i = 0; i < OUTHEIGHT; i++) {
    out[i] = new Array(OUTWIDTH);
  }
  for (let y = 0; y < HEIGHT; y += 3) {
    for (let x = 0; x < WIDTH; x += 2) {
      let outx = x/2;
      let outy = y/3;
      let tl = board[y][x] ? 1 : 0;
      let ml = board[y+1][x] ? 1 : 0;
      let bl = board[y+2][x] ? 1 : 0;
      let tr = board[y][x+1] ? 1 : 0;
      let mr = board[y+1][x+1] ? 1 : 0;
      let br = board[y+2][x+1] ? 1 : 0;
      let idx = tl*1 + ml*2 +  bl*4 + tr*8 + mr*16 + br*32;
      let char = BRAILLE[idx];
      out[outy][outx] = char;
    }
  }
  return out.reduce((a, r) => a + r.reduce((a2, c) => a2 + c) + "\n", "");
}

function renderFunction(board, fun) {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = fun(x, y) ? true : null;
    }
  }
  return render(board);
}

let r = 0;
function fun(x, y) {
  return (x+r) % 6 == (y+r) % 10;
}

const interval = setInterval(() => {
  r++;
  br.innerHTML = renderFunction(board, fun);
}, 100);
