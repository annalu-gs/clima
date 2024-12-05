import nuvem from './assets/nuvens.svg'
import sol from './assets/el-sol.svg'
import solEntreNuvens from './assets/solEnuvens.svg'
import chuva from '/src/assets/chuva.svg'
import luaEntreNuvens from './assets/luaNuvens.svg'
import lua from './assets/lua.svg'
import './App.css'
import Pesquisar from './components/pesquisar.jsx'

function App() {
  
async function coneccaoAPI(){

  const appid = 'e501c220d99c639ceb361b8bbb041e39';

  try{
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + barraPesquisa.value + "&units=metric&appid=" + appid + "&lang=pt_br", {
      method: 'POST'
    })

    if(!response.ok){
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
  
    const data = response.json()
    console.log({data})
  
    return data;

  } catch (error) {
    console.error("Erro de conecção com API: ", erro.message)
    alert("Não foi possível se conectar com a API, Verifique sua conexão com a internet")
  }
}


async function MostrarDados(){

  if(barraPesquisa.value == ''){
    return alert("Campo vazio. Por favor, preencha com um nome de uma cidade")
  }

  const data = await coneccaoAPI(barraPesquisa)

  const barraPesquisaInput = barraPesquisa.value
  console.log(barraPesquisaInput)

  iconAPI.display = "flex"

  cidade.innerText = data.name + ", " + data.sys.country
  temperatura.innerText = Math.round(data.main.temp) + '°'
  tipo.innerText = data.weather[0].description
  iconAPI.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
  max.innerText = "Máx: " + Math.round(data.main.temp_max) + '°'
  min.innerText = "Min: " + Math.round(data.main.temp_min) + '°'
  humidade.innerText = "Humidade: " + data.main.humidity + "%"
  vento.innerText = "Velocidade do vento: " + data.wind.speed + " km/h"
  explicacao.innerText = " "

  iconClima()

}

async function iconClima(){

  const data = await coneccaoAPI(barraPesquisa)
  const body = document.body

  if(data.weather[0].description == "nuvens dispersas" || data.weather[0].description == "nublado" || data.weather[0].description == "trovoadas"){
    body.style.background = "linear-gradient(150deg,#daf8ff 0%, #CACACA 100%)"
    imagemBackground.style.backgroundImage = `url(${nuvem})`

  }else if(data.weather[0].description == "céu limpo"){

    if(data.weather[0].icon == "01d"){
      body.style.background = "linear-gradient(150deg,#daf8ff 0%, #e9e3cf 35%, #ffc388 100%)"
      imagemBackground.style.backgroundImage = `url(${sol})`
    }else{
      body.style.background = "linear-gradient(150deg,#6D92CA 10%, #DAF8FF 90%)"
      imagemBackground.style.backgroundImage = `url(${lua})`
    }

  }else if(data.weather[0].description == "algumas nuvens"){

    if(data.weather[0].icon == "02d"){
      body.style.background = "linear-gradient(150deg,#daf8ff 0%, #e7e7e7 100%)"
      imagemBackground.style.backgroundImage = `url(${solEntreNuvens})`
    }else{
      body.style.background = "linear-gradient(150deg,#daf8ff 0%, #CFCFCF 100%)"
      imagemBackground.style.backgroundImage = `url(${luaEntreNuvens})`
    }

  }else if(data.weather[0].description == "chuva moderada" || data.weather[0].description == "chuva leve" || data.weather[0].description == "chuva forte" || data.weather[0].description == "chuva" || data.weather[0].description == "chuva de forte intensidade" || data.weather[0].description == "chuvisco de intensidade luminosa"){
    body.style.background = "linear-gradient(150deg,#daf8ff 0%, #6CB0B5 100%)"
    imagemBackground.style.backgroundImage = `url(${chuva})`
  
  }else if(data.weather[0].description == "fumaça"){
  body.style.background = "linear-gradient(150deg,#daf8ff 0%, #e7e7e7 100%)"
  imagemBackground.style.backgroundImage = `url("")`
}
} 

  return (
    <>
     <div id="imagemBackground" style={{
       backgroundImage: `url("")`,
       backgroundRepeat: 'no-repeat',
       backgroundSize: '300px',
       backgroundPosition: 'bottom right',
       position: 'absolute',
       bottom: 0,
       right: 0,
       width: '500px',
       height: '500px'
     }}></div>

    
    <Pesquisar funcao={MostrarDados}/>
    

    <div id='resultado'>
      
      <p id='cidade'><span></span></p>

      <div className='clima'>
      <p><span id='temperatura'></span></p>
      <p id='teste'></p>
      <p id='explicacao'>Confira o clima de hoje em alguma cidade...</p>
      <span>
        <img 
          src="https://media.giphy.com/media/JEBhwXKovOVV7C8VOI/giphy.gif?cid=790b76119saaqzs8rautjczyw8ouvyle6vw8o0n6s38qnedk&ep=v1_stickers_search&rid=giphy.gif&ct=s" id='iconAPI'
          alt='icone de clima'/></span>
      </div>

      <p><span id='tipo'></span></p>
      <div className='outros'>
      <p><span id='max'></span></p>
      <p><span id='min'></span></p>
      </div>
      <div className='outros'>
      <p><span id='humidade'></span></p>
      <p><span id='vento'></span></p>
      </div>
    </div>
    </>
  )
}

export default App
