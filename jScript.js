let gridSize;
let container = document.querySelector('#gridContainer');
let containerStyle = window.getComputedStyle(container);


let parentWidth = window.innerWidth; // Width of the window (parent of container)
let parentHeight = window.innerHeight; // height of the window (parent of container)

// Set gridContainer width to either 90% of screen height, or width. Depending on which is smaller, so that grid always fits on screen
let parentValue = parentWidth < parentHeight ? parentWidth : parentHeight;
let containerWidth = parentValue / 100 * 90;
container.style.width = `${containerWidth}`;


let gridSetBtn = document.querySelector('.gridSizeBtn');
let usrInput = document.querySelector('.usrGridInput');
let inputArea = document.querySelector('.inputDiv');

// ***** Next: reset button that refreshes the page (appears top right when grid created)
// ***** squares get darker in colour / lighter in colour when hovered over.

gridSetBtn.addEventListener('click', () => {
    //get user input and create grid
    let gridSize = usrInput.value;  
    usrInput.value = '';
    getGridsize(gridSize);

})
//Works when enter is pressed too
usrInput.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
        let gridSize = usrInput.value;  
        usrInput.value = '';
        getGridsize(gridSize);  
  }  
});

function getGridsize (gridSize) {
    if (parseInt(gridSize, 10) > 0 && parseInt(gridSize, 10) <= 100 ) {
        makeGrid(gridSize);    
        container.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;
        container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr`;
        // execute hover functionality
        let gridCell = document.querySelectorAll('.gridCell');
        hoverColor(gridCell);

        inputArea.style.display = 'none';
    } else {
        alert('Please enter a number between 0 & 100');
        gridSize = null;
    }
}


function hoverColor (gridCell) {
    gridCell.forEach(cell => {
        cell.addEventListener('mouseover' , () => {
            let currentBGColor = cell.style.backgroundColor;
            // console.log(currentBGColor);
            if (currentBGColor === 'rgb(255,255,255)') {
            cell.style.backgroundColor = 'rgb(200,200,200)';
            } else { 
                cellRGB = parseInt(currentBGColor.slice(4,7), 10);
                // console.log(cellRGB);
                // console.log(currentBGColor);
                newCellRGB = cellRGB - 25;
                
                cell.style.backgroundColor = `rgb(${newCellRGB},${newCellRGB},${newCellRGB})`;
            }
        })})
}

// create  grid based on desired amount of cells. Cell size determined by sixe of both screen and grid container div.
function makeGrid (num) {
    let fullGrid = num * num;

    for (i=1; i<=fullGrid; i++) {
        let divGrid = document.createElement('div');
        // divGrid.classList.add(`gridCell_${i}`)
        divGrid.classList.add(`gridCell`)

        let cellWidth = containerWidth / num;

        divGrid.style.width = `${cellWidth}px`;
        divGrid.style.height = `${cellWidth}px`;
        divGrid.style.backgroundColor = `rgb(255,255,255)`;
        divGrid.style.boxSizing = `border-box`;
        divGrid.style.border = `1px solid darkgray`;
        container.style.padding = `${cellWidth / 2}px 0`;

        container.appendChild(divGrid);

    }
}



// For working out gridContainer width when set with css 90% of parent width.
// accurate container width to assist with accurate grid Cell size
// let containerWidth = containerStyle.width.endsWith('%') ?   
//                      parseFloat((containerStyle.width) / 100 * parentWidth) :
//                      parseInt(containerStyle.width, 10);



