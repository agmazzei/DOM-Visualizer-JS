function generateDomTree(rootDOM){
    let content = '';
    let contador = 1;

    function domToLists(currentNode,contador){
        let actual = "<ul><li>";
        actual += `<h3 class=h3-${contador.toString()}>${currentNode.nodeName}</h3>`;
        contador++;  

        if(currentNode.childNodes){
            for (child of currentNode.childNodes)
                actual += domToLists(child,contador);
        }
        return actual + "</li></ul>";
    }

    content = domToLists(rootDOM,contador);
    return content;
}
function addColors(container){

    let h = container.getElementsByTagName("h3");
    
    let pattern = /\d+/g;
    let current;
    let max = 1;
    // Averiguar los niveles de anidacion 
    for (element of h) {
        current = parseInt(element.className.match(pattern)[1])
        if(current > max) max = current;
    }

    // Usar agrupamiento por clases y colorear por clase
    let sheets = [];
    for(let i=1; i<=max; i++){
        let h3s = document.getElementsByClassName(`h3-${i}`);
        let color = createColor(max);
        for (h3 of h3s)
            h3.style.background = color;
    }
}

function createColor(cant){
    //AGREGAR ALTOS CONTRASTES
    let saltos = Math.round(360 / cant);    

    let h,s,v;
    s = "100%";
    v = "100%";
    return  '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();



}

const btn = document.getElementById("btn");

btn.addEventListener("click",() => {

    const htmlString = document.getElementById("htmlentry").value;
    const box = document.getElementById("dom-tree");
    const node = new DOMParser().parseFromString(htmlString, "text/html");
    box.innerHTML = generateDomTree(node.childNodes[1]);
    box.style.display = "block";
    addColors(box);
});





    














    

    



