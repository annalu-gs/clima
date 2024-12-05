import lupa from '../assets/search.svg'

function Pesquisar(props){
  return(
    <div id="pesquisar">
      <input 
        className='barraPesquisa' 
        type="text" 
        id="barraPesquisa" 
        placeholder='Pesquise uma cidade...'
      />
      <button id='btnPesquisar' onClick={props.funcao}>
        <img src={lupa} alt="Botão de pesquisa" />
      </button>
    </div>
  )
}

export default Pesquisar;