
// Convert values Event

document.querySelector("#lbsInput").addEventListener("input", (event) => {
    let lbs = event.target.value;
    document.querySelector("#gramsOutput").innerHTML = (
        lbs / 0.0022046
    ).toFixed(2);
    document.querySelector("#kgOutput").innerHTML = (lbs / 2.2046).toFixed(2);
    document.querySelector("#ozOutput").innerHTML = (lbs * 12).toFixed(2);
});
