document.addEventListener('DOMContentLoaded', () => {
    fetch("https://unpkg.com/world-atlas@1/world/50m.json")
        .then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`);
                return;
            }
            response.json().then(worlddata => {
                console.log(worlddata)
            })
        });
});