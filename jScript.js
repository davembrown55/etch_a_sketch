let gridSize;
let container = document.querySelector('#gridContainer');
let containerStyle = window.getComputedStyle(container);


let parentWidth = window.innerWidth; // Width of the window (parent of container)
let parentHeight = window.innerHeight; // height of the window (parent of container)

let parentValue = parentWidth < parentHeight ? parentWidth : parentHeight;

// Pick up here tomorrow


let containerWidth = parentValue.endsWith('%') ? 
                     parseFloat((parentValue) / 100 * 90) :
                     parseInt(containerStyle.width, 10);

container.style.width = `${containerWidth}`;


// Set container width to be either 90% of container width or height. Depending on which is smaller. 
// So then the all the grid will fit on screen




// accurate container width to assist with accurate girid Cell size
// let containerWidth = containerStyle.width.endsWith('%') ?   
//                      parseFloat((containerStyle.width) / 100 * parentWidth) :
//                      parseInt(containerStyle.width, 10);



let gridSetBtn = document.querySelector('.gridSizeBtn');
let usrInput = document.querySelector('.usrGridInput');

const getGridSize = gridSetBtn.addEventListener('click', () => {
    //get user input and create grid
    const gridSize = usrInput.value;  
    makeGrid(gridSize);    
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr`;
    // execute hover functionality
    let gridCell = document.querySelectorAll('.gridCell');
    hoverColor(gridCell);
    // reset input
    usrInput.value = '';
})

function hoverColor (gridCell) {gridCell.forEach(cell => {
        cell.addEventListener('mouseover' , () => {
            cell.style.backgroundColor = 'red';
        })
    })
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
        divGrid.style.backgroundColor = `black`;
        divGrid.style.boxSizing = `border-box`;
        divGrid.style.border = `1px solid white`;
        container.style.padding = `${cellWidth}px 0`;

        container.appendChild(divGrid);

    }
}


