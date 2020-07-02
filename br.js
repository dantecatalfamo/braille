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
let r2 = 10;
let r3 = 20;
let r4 = 30;
let r5 = 40;
function fun(x, y) {
  const offset = HEIGHT / 2;
  return Math.pow(x-offset, 2) + Math.pow(y-offset, 2) == Math.pow(r, 2) ||
    Math.pow(x-offset, 2) + Math.pow(y-offset, 2) == Math.pow(r2, 2) ||
    Math.pow(x-offset, 2) + Math.pow(y-offset, 2) == Math.pow(r3, 2) ||
    Math.pow(x-offset, 2) + Math.pow(y-offset, 2) == Math.pow(r4, 2) ||
    Math.pow(x-offset, 2) + Math.pow(y-offset, 2) == Math.pow(r5, 2);
  // return x == y || x == HEIGHT - y;
}

const interval = setInterval(() => {
  r++;
  r2++;
  r3++;
  r4++;
  r5++;
  if (r > 50) r = 0;
  if (r2 > 50) r2 = 0;
  if (r3 > 50) r3 = 0;
  if (r4 > 50) r4 = 0;
  if (r5 > 50) r5 = 0;

  br.innerHTML = renderFunction(board, fun);
}, 100);
