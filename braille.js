"use strict";

const OUTHEIGHT = 20;
const OUTWIDTH = 2 * OUTHEIGHT;
const HEIGHT = 3 * OUTHEIGHT;
const WIDTH = 2 * OUTWIDTH;
const BRAILLE = [
  "⠀", "⠁", "⠂", "⠃", "⠄", "⠅", "⠆", "⠇", "⠈", "⠉", "⠊", "⠋", "⠌", "⠍", "⠎", "⠏",
  "⠐", "⠑", "⠒", "⠓", "⠔", "⠕", "⠖", "⠗", "⠘", "⠙", "⠚", "⠛", "⠜", "⠝", "⠞", "⠟",
  "⠠", "⠡", "⠢", "⠣", "⠤", "⠥", "⠦", "⠧", "⠨", "⠩", "⠪", "⠫", "⠬", "⠭", "⠮", "⠯",
  "⠰", "⠱", "⠲", "⠳", "⠴", "⠵", "⠶", "⠷", "⠸", "⠹", "⠺", "⠻", "⠼", "⠽", "⠾", "⠿",
];

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

function renderFunction(board, fun, frame) {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = fun(x, y, frame) ? true : null;
    }
  }
  return render(board);
}

function fun(x, y, frame) {
  const l = HEIGHT / 3;
  const m1 = Math.abs(y+frame) % l;
  const m2 = Math.abs(y-frame) % l;
  return x == m1 ||
    x == m2 ||
    x/2 == m1 + l/2 ||
    x/2 == m2 + l/2 ||
    x == m1 + 3*l ||
    x == m2 + 3*l;
}

const br = document.getElementById("braille");
let frame = HEIGHT;
const interval = setInterval(() => {
  br.innerHTML = renderFunction(board, fun, frame++);
}, 50);
