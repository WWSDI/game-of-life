# App Development Plan & Progress
## Bugs
- [x] Speed slider bug: when using slider to change speed, new value doesn't apply unless pause and restart
- [x] Step button: not functioning
- [x] Draw feature: it should behave as such that it fills dead cells and doesn't change live cells
- [ ] Performance issue: refactor the board from an array of boolean value to an array of objects. This can potentially improve performance, particularly when drawing as the game won't have to contruct an array of over 2,000 elements many times over one second.  

## Warnings
- [ ] `<Board>` `useEffect` missing dependancies

## Features to add
- [ ] Mobile-first responsive design
- [ ] Host on Netlify
- [ ] Erase feature
- [ ] Stroke width feature
- [x] Clear board feature
- [ ] Toggle grid: toggle css cell board
- [ ] Stamp feature with preloaded shapes

## Refactor
- [ ] Try to convert `<Board>` `useEffect` into custom hook