async function getDatabase() {
    const response = await fetch('/api');
    const json  = await response.json();
    console.log(json);

    root = document.getElementById('homies')


    for (item of json) {
        
        const flex_item = document.createElement('div')
        
        const image64 = document.createElement('img')
        const time = document.createElement('div')

        flex_item.className = "flex-item";

        //time.textContent = "the homie " + item.name + " on " + item.time
        image64.src = item.image64

        flex_item.append(image64)
        root.append(flex_item)
        
    }
    document.body.append(root)

}

getDatabase();