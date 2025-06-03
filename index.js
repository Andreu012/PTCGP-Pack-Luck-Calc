//initialize field content
export const fields = [
    { id: "pack_quantity", label: "How many packs have you opened?" },
    { id: "wonder_pick_quantity", label: "How many Wonder Picks have you done?" },
    
    { id: "2_diamond_quantity", label: "How many 2-diamond cards?" },
    { id: "3_diamond_quantity", label: "How many 3-diamond cards?" },
    { id: "4_diamond_quantity", label: "How many 4-diamond cards?" },
    { id: "1_star_gold_quantity", label: "How many 1-star gold cards?" },
    { id: "2_star_gold_quantity", label: "How many 2-star gold cards?" },
    { id: "3_star_gold_quantity", label: "How many 3-star gold cards?" },
    { id: "1_star_shiny_quantity", label: "How many 1-star shiny cards?" },
    { id: "2_star_shiny_quantity", label: "How many 2-star shiny cards?" },
    { id: "crown_quantity", label: "How many crown cards?" },
    ];

const container = document.getElementById("fields");

fields.forEach(({ id, label }) => {

    const fieldWrapper = document.createElement('div');
    fieldWrapper.classList.add('field-pair');

    const currLabel = document.createElement('label');
    currLabel.setAttribute('for', id);
    currLabel.textContent = label;
    if (id === "pack_quantity") {
        const subheader = document.createElement('p');
        subheader.textContent = "Click the 'i' icon for instructions on how to find your stats."
        subheader.style.width = "33vw"
        subheader.style.fontSize = "0.75em";
        subheader.style.fontStyle = "italic"
        fieldWrapper.appendChild(subheader);
    }
    if (id === "wonder_pick_quantity") {
        const subheader = document.createElement('p');
        subheader.textContent = "This assumes you have a 1 in 5 chance to either get a 1-star gold or a 4-star diamond card."
        subheader.style.width = "33vw"
        subheader.style.fontSize = "0.75em";
        subheader.style.fontStyle = "italic"
        fieldWrapper.appendChild(subheader);
    }

    const inputElement = document.createElement('input');
    inputElement.type = 'number';
    inputElement.id = id;
    inputElement.name = id;
    inputElement.min = 0;

    if (id !== "pack_quantity" && id !== "wonder_pick_quantity") {
        const img = document.createElement("img");
        img.src = `images/${id.substring(0,id.indexOf("_quantity"))}.png`;
        img.alt = id; 

        const size = 32 * (isNaN(id.split('_')[0]) ? 1 : parseInt(id.split('_')[0]));
        img.style.width = `${size}px`;

        fieldWrapper.appendChild(img);
    }
    
    fieldWrapper.appendChild(currLabel);
    fieldWrapper.appendChild(inputElement);
    container.appendChild(fieldWrapper);
});

//background toggle function
const toggle = document.getElementById("check");
const bgDiv = document.getElementById("backgroundImage");
const cBTN = document.getElementById("calculate-btn");
const resultsModal = document.getElementById('results-modal');
function updatebg() {
    
    if (toggle.checked) {
        bgDiv.style.backgroundImage = 'url("images/ultraball_background_opaque.png")'
        bgDiv.style.opacity = '100%';
        bgDiv.style.filter = "brightness(50%)"
        document.body.style.color = 'white';

        infoIcon.src = "images/black_i_on_white.png";

        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.color = 'white';
        resultsModal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        resultsModal.style.color = 'white';

        cBTN.style.backgroundColor = 'white'
        cBTN.style.color = 'black';
    } else {
        bgDiv.style.backgroundImage = 'url("images/pokeball_background_opaque.png")'
        bgDiv.style.opacity = '32%';
        document.body.style.fontWeight = 'bold';
        bgDiv.style.filter = "brightness(75%)"
        document.body.style.color = 'black';
        
        infoIcon.src = "images/white_i_on_black.png";    
        
        modal.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        modal.style.color = 'black';
        resultsModal.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        resultsModal.style.color = 'black';
        cBTN.style.backgroundColor = 'black'
        cBTN.style.color = 'white';

    }
}

updatebg();
toggle.addEventListener("change",updatebg);

document.addEventListener('DOMContentLoaded', () => {
    const infoIcon = document.getElementById('infoIcon');
    const modal = document.getElementById('modal');
    let modalOpen = false;

    infoIcon.addEventListener('click', () => {
        modalOpen = !modalOpen;
        modal.style.display = modalOpen ? 'block' : 'none';
    });
    
});
const closeResultsBtn = document.getElementById('close-results-modal');

closeResultsBtn.addEventListener('click', () => {
    resultsModal.style.display = 'none';
});
