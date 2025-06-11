import { fields } from "./index.js";

function binomialProbability(x, n, p) {
    
    let prob = 0;
    for (let i = 0; i < x; i++) {
        prob += binomialTerm(i, n, p);
    }
    return 1 - prob;
}

function binomialTerm(x, n, p) {
    return combination(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

function combination(n, x) {
    if (x > n) return 0;
    if (x === 0 || x === n) return 1;

    let result = 1;
    for (let i = 1; i <= x; i++) {
        result *= (n - i + 1) / i;
    } // gpt gave me a better formula for combinations, instead of factorial
    return result;
}

const probSlot4 = {
    "2_diamond": 0.89,
    "3_diamond": 0.04952,
    "4_diamond": 0.01666,
    "1_star_gold": 0.02572,
    "2_star_gold": 0.005,
    "3_star_gold": 0.00222,
    "1_star_shiny": 0.00714,
    "2_star_shiny": 0.00333,
    "crown": 0.0004,
};

const probSlot5 = {
    "2_diamond": 0.56,
    "3_diamond": 0.1981,
    "4_diamond": 0.06664,
    "1_star_gold": 0.10288,
    "2_star_gold": 0.02,
    "3_star_gold": 0.00888,
    "1_star_shiny": 0.02857,
    "2_star_shiny": 0.01333,
    "crown": 0.0016,
};
const wonderAdjustments = {
    "1_star_gold": 0,
    "4_diamond": 0,
    "2_diamond": 0,
    "3_diamond": 0
};

//Probability calculations and form submission
document.getElementById("calculate-btn").addEventListener("click", () => {
    
    const packQuantity = document.getElementById('pack_quantity').value.trim();
    const wonderPicks = parseInt(document.getElementById("wonder_pick_quantity").value.trim());

    let isValid = true;
    const formData = {};

    fields.forEach(({id}) => {
        let input = document.getElementById(id); 
        let value = input.value.trim();

        if (value === "" || isNaN(value) || !Number.isInteger(Number(value)) || Number(value) < 0 || (Number(value) > packQuantity*2)) {
              isValid = false;
              input.style.border = "2px solid red";
        } else {
            input.style.border = "";  
            formData[id] = parseInt(value);
        }
    });
    if (!isValid) {
        alert("Enter whole numbers (0 or greater) in all fields. Your pack quantity must be a higher number than any of your individual rarity quantities ");
        return;
    }

    const totalTrials = packQuantity * 2;
    const wonderTrials = Math.floor(wonderPicks / 5);
    const halfWonder = Math.floor(wonderTrials / 2);

    wonderAdjustments["1_star_gold"] = halfWonder;
    wonderAdjustments["4_diamond"] = halfWonder;
    wonderAdjustments["3_diamond"] = halfWonder;

    wonderAdjustments["2_diamond"] += halfWonder * 2;
   
    Object.keys(wonderAdjustments).forEach(id => {
        const key = id + "_quantity";
        if (formData[key] !== undefined) {
            formData[key] -= wonderAdjustments[id];
            if (formData[key] < 0) formData[key] = 0;
        }
    });

    const probabilities = [];
    Object.keys(probSlot4).forEach(id => {
        let observed = formData[id + "_quantity"];

        // Apply Wonder Pick adjustment inline


        const avgP = (probSlot4[id] + probSlot5[id]) / 2;
        const prob = binomialProbability(observed, totalTrials, avgP);
        probabilities.push({
            cardType: id,
            observed,
            probability: prob,
        });
    });

   showResultsModal(probabilities);
   console.log(wonderAdjustments);
console.log(formData);
console.log(probabilities)
});


function toggleResultsModal() {
    const modal = document.getElementById("results-modal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function showResultsModal(probabilities) {
    const container = document.getElementById("results-container");
    container.innerHTML = ""; 
    
    probabilities.forEach(({ cardType, observed, probability }) => {
        const entry = document.createElement("p");
        const formattedProb = (probability * 100).toFixed(3);
        const readableType = cardType.replace(/_/g, " ");
        entry.textContent = `You had approximately a ${formattedProb}% chance of getting ${observed}, ${readableType.replace(/_/g, " ")} cards.\n`;
        if (cardType.includes("shiny")) {
            entry.textContent += " (Assuming that all packs opened had a chance to provide shiny cards)"
        }
        entry.style.padding = "10px"
        container.appendChild(entry);
    });

    toggleResultsModal();
}







