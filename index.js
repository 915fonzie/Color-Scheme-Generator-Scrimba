const colorChosen = document.getElementById('seed-color')
const schemeChosen = document.getElementById('color-scheme')
const schemeForm = document.querySelector('form')
const colorsContainer = document.getElementById('colors-container')
const colorChosenWrapper = document.getElementById('seed-color-wrapper')

/* 
didn't like original style of the input so created a wrapper to be able to add styles;
this line sets the initial color of the wrapper to whatever the input defaults to.
 */
colorChosenWrapper.style.backgroundColor = colorChosen.value

colorChosen.addEventListener('change', function () {
    //this code is to set the color of the wrapper to chosen color
    colorChosenWrapper.style.backgroundColor = colorChosen.value
})

document.addEventListener('click', function (e) {
    //this code is used to copy the hex codes and copy to persons clipboard
    if (e.target.closest('.colors')) {
        const hexKey = e.target.closest(".colors").children[1].textContent
        navigator.clipboard.writeText(hexKey)
        e.target.closest('.colors').children[2].textContent = `Copied: ${hexKey}`
    }
})

document.addEventListener('mouseout', function (e) {
    //this code is used to reset the popup text asking you to copy the hex code
    if (e.target.closest('.colors')) {
        e.target.closest(".colors").children[2].textContent = "Copy Hex Code"
    }
})

schemeForm.addEventListener("submit", function (e) {
    e.preventDefault()
    fetchColorScheme() //separated the fetch into its own function to use multiple times
})

function fetchColorScheme() {
    //the api doesn't use the '#' symbol when fetching so had to remove that from original value
    let seedColor = colorChosen.value.slice(1, colorChosen.value.length)

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeChosen.value}&count=5`)
        .then(response => response.json())
        .then(data => renderColorScheme(data.colors))
}

//separated this into it's own function to not cludder the fetch function
function renderColorScheme(colorsArr) {
    const html = colorsArr.map(color => {
        return `
                <div class="colors tooltip">
                    <div style="background-color: ${color.hex.value};"></div>
                    <p>${color.hex.value}</p>
                    <span class="tooltiptext">Copy Hex Code</span>
                </div>
        `
    }).join('')

    colorsContainer.innerHTML = html
}
//running the function on load to populate the color scheme generator with default colors
fetchColorScheme()