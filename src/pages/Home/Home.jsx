import { useState } from 'react';

import { Header } from '../../components/Header/Header';
import { ItemList } from '../../components/ItemList/ItemList';

import background from '../../assets/img/background.png';

import './styles.css';

export const Home = () => {

  const [user, setUser] = useState('');                     // Estado para input do usuário
  const [currentUser, setCurrentUser] = useState(null);     // Estado para dados do usuário buscado
  const [repos, setRepos] = useState(null);                 // Estado para lista de repositórios

  // Função para buscar dados do GitHub
  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);  // Busca dados do usuário
    const newUser = await userData.json();                   // Converte resposta para JSON

    if (newUser.name) {                                      // Se o usuário existe (tem nome)
      const { login, avatar_url, name, bio } = newUser;      // Extrai campos relevantes
      setCurrentUser({ login, avatar_url, name, bio });      // Atualiza estado do usuário

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`); // Busca repositórios
      const newRepos = await reposData.json();               // Converte resposta para JSON

      if (newRepos.length) {                                 // Se tem repositórios
        setRepos(newRepos);                                  // Atualiza estado dos repositórios
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className='content'>
        <img src={background} className='background' alt="Ícone do GitHub" />
        <div className='infos'>
          <div>
            <div className='search'>
              <input
                name='user'
                value={user}                                // Valor do input vinculado ao estado user
                onChange={event => setUser(event.target.value)} // Atualiza estado user ao digitar
                placeholder='@username' />
              <button onClick={handleGetData}>Buscar</button>  {/* Botão para buscar dados */}
            </div>
            {currentUser?.name ? (                            // Se usuário atual existe, mostra perfil
              <>
                <div className='profile'>
                  <img src={currentUser.avatar_url} alt='imagem de perfil' /> 
                  <div>
                    <h3>{currentUser.name}</h3>             
                    <span>{currentUser.login}</span>        
                    <p>{currentUser.bio}</p>                  
                  </div>
                </div>
                <hr />
              </>
            ) : null}
            {repos?.length ? (                                // Se tem repositórios, mostra lista
              <div>
                <h4 className='repos'>Repositórios</h4>
                {repos.map(repo => (
                  <ItemList
                    key={repo.id}                            // Key única para cada repositório
                    title={repo.name}                        
                    link={repo.html_url}                    
                    description={repo.description}           
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}                                 
