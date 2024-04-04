function script(){
    //Define o Index e o Link da API inicial, e cria a variavel que armazena a ultima direção clicada; 
    let fetchLink = 'https://api.themoviedb.org/3/movie/2?api_key=e7cadc1cedffc92c23e6176622d0bf4d'
    let index = 2;
    let lastDirection;
// =====================================

// Faz a primeira atualização da página 
    updateScreen();

// Define os inputs, da Seta direita, esquerda e IMG
    const rightArrow = document.getElementById("rightArrow");
    const leftArrow = document.getElementById("leftArrow");
    const img = document.getElementById("movieImage");

    rightArrow.addEventListener("click",()=>changeLinkIndex("right"));
    leftArrow.addEventListener("click",()=>changeLinkIndex("left"));
// =====================================

// Muda o link da Api quando clicado na seta;
    async function changeLinkIndex(direction){
        lastDirection = direction;
        if(index===0 && direction==="right"){index+=1}else if(index==2 && direction=="left"){}else{
            direction==="right"? index += 1:index -= 1;}        
            fetchLink = 'https://api.themoviedb.org/3/movie/' + index + '?api_key=e7cadc1cedffc92c23e6176622d0bf4d';
       doValidation()
        .then(validation=>{if(!validation){
                if(index!=0){changeLinkIndex(lastDirection)};

            }else{updateScreen();}
        })
// Assim que for true, atualizo a página.        
    }

    async function doValidation(){
        let validation = "";
        await getFetch(fetchLink).then((data)=>{if(data.success==false){validation=false}else{validation=true}})
        return await validation;
    }

// Requisição para a API e conversão para JSON
    async function getFetch(link){
        const response = await fetch(link);
        const data = await response.json();
        console.log(data);
        return data;
    }

//Muda o titulo do filme 
    function changeTitle(json){
        // console.log(json);
        const title = document.querySelector("h1");
        title.textContent = json.original_title;
    }
 
//Muda a informação do filme
    function changeInfo(json){
        const info = document.querySelector("p");
        const infoValue = json.overview;
        const keyInfo = Object.keys(json)[10];
        info.textContent =  keyInfo + ': '+ infoValue //Tentar por isso em uma função
    }

//Muda a imagem de capa do filme
    function changeImg(json){
        const imgSrc = 'https://image.tmdb.org/t/p/w500/' + json.backdrop_path;
        img.src = imgSrc;
    }

//Faz as requisições das 3 ultimas funções acima, atualizando a página. 
    function updateScreen(){
        getFetch(fetchLink).then(data=>{changeInfo(data); changeImg(data); changeTitle(data)});
    }

}