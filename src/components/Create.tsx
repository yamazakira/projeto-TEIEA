import React, { useState, useEffect } from 'react';
import useSpeechRecognition from './useSpeechRecognition'; // Adjust path accordingly
import { api } from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  
  // State for the post
  const [post, setPost] = useState<{
    title: string;
    description: string;
    userId: string;
  }>({
    title: '',
    description: '',
    userId: '1',
  });

  ////// RECONHECIMENTO DE VOZ //////
  // Reconhecimento de voz do título
  const {
    text: text1,
    isListening: isListening1,
    startListening: startListening1,
    stopListening: stopListening1,
  } = useSpeechRecognition();

  // Reconhecimento de voz da descrição
  const {
    text: text2,
    isListening: isListening2,
    startListening: startListening2,
    stopListening: stopListening2,
  } = useSpeechRecognition();

  // Sync text1 and text2 with post.title and post.description respectively
  useEffect(() => {
    // Update post state when text1 changes (voice input for title)
    setPost((prevPost) => ({
      ...prevPost,
      title: text1,
    }));

    console.log(post)
  }, [text1]);

  useEffect(() => {
    // Update post state when text2 changes (voice input for description)
    setPost((prevPost) => ({
      ...prevPost,
      description: text2,
    }));

    console.log(post)
  }, [text2]);

  // Handle manual input change for title
  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      title: value,
    }));

    console.log(post)
  };

  // Handle manual input change for description
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      description: value,
    }));

    console.log(post)
  };

  // Fetch users (for the user selection dropdown, if needed)
  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const response = await api.get('/user');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    buscarUsuarios();
  }, []);

  // Handle post submission
  const criarPost = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission default behavior
    navigate('/');
    api.post('post', post)
      .then(() => {
        console.log(post);
        alert('Post created successfully!');
      })
      .catch((error) => {
        console.log('Error creating post:', error);
        alert('Error creating post.');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Criar Postagem</h2>

      <form onSubmit={criarPost}>
        <div id="tituloInput">
          <label htmlFor="tituloInput">Título</label>
          <input
            id="titleInput"
            type="text"
            value={post.title} // Directly use post.title here
            onChange={handleInputChange1}
            placeholder="Digite ou clique no botão abaixo para gravar!"
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button
              type="button"
              onClick={startListening1}
              disabled={isListening1}
              style={{ padding: '10px 20px', marginRight: '10px' }}
            >
              Começar gravação
            </button>
            <button
              type="button"
              onClick={stopListening1}
              disabled={!isListening1}
              style={{ padding: '10px 20px' }}
            >
              Parar gravação
            </button>
          </div>
        </div>

        {/* Second input field */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="speechInput2">Descrição</label>
          <input
            id="speechInput2"
            type="text"
            value={post.description} // Directly use post.description here
            onChange={handleInputChange2}
            placeholder="Digite ou clique no botão abaixo para gravar!"
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button
              type="button"
              onClick={startListening2}
              disabled={isListening2}
              style={{ padding: '10px 20px', marginRight: '10px' }}
            >
              Começar gravação
            </button>
            <button
              type="button"
              onClick={stopListening2}
              disabled={!isListening2}
              style={{ padding: '10px 20px' }}
            >
              Parar gravação
            </button>
          </div>
        </div>
        
        <div id="botoes" style={{ marginTop: '20px' }}>
          <button type="submit">Postar</button>
          <Link to="/">
            <button type="button">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Create;
