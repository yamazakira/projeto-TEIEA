import React, { useEffect, useState } from 'react'
import { api } from '../api/axiosInstance';
import '../globals.css';
import { HeartIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import textToSpeech from './tts';
import { Link } from 'react-router-dom';

const Home = () => {
    const [postagens, setPostagens] = useState([]);
    // const [postagem, setPostagem] = useState([]);
    const [users, setUsers] = useState<any[]>([]);
    localStorage.setItem('userIdLogado', '1');
    const userIdLogado = localStorage.getItem('userIdLogado');

    // TAMANHO DAS LETRAS
    const [fontSizeP, setFontSizeP] = useState<number>(16);
    const [fontSizeTitle, setFontSizeTitle] = useState<number>(20);
    const increaseFontSize = () => {
        setFontSizeP(prevSize => prevSize + 2);
        setFontSizeTitle(prevSize => prevSize + 2);
    };
    const decreaseFontSize = () => {
        setFontSizeP(prevSize => prevSize - 2);
        setFontSizeTitle(prevSize => prevSize - 2);
    };
    const resetFontSize = () => {
        setFontSizeP(16);
        setFontSizeTitle(20);
    };

    // OBTER POSTS
    const getPostagens = async () => {
        try {
            const response = await api.get("post");
            const data = response.data;
            setPostagens(data);
            getUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    // OBTER USUARIOS
    const getUsers = async (posts: any[]) => {
        try {
            const userIds = Array.from(new Set(posts.map(post => post.userId)));
            //console.log(userIds);

            const userResponses = await Promise.all(userIds.map((userId: any) => api.get(`/user/${userId}`)));
            const usersData = userResponses.map(response => response.data);
            setUsers(usersData);
        } catch (error) {
            console.error(error);
        }
    };

    // USUARIO POR ID
    const getUserById = (userId: any) => {
        return users.find((user: any) => user.id === userId);
    };
    useEffect(() => {
        getPostagens();
        //console.log(users);
    }, []);

    // CONVERSÃO TEXTO PARA FALA
    interface TextToSpeechButtonProps {
        text: string;
    }
    const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({ text }) => {
        return (
            <button onClick={() => textToSpeech(text)}>
                Ouvir
            </button>
        );
    };

    // ExCLUIR POST
    const excluirPost = (postId: any, postUserId: any) => {
        if (postId) {
            api.delete(`/user/${postUserId}/post/${postId}`, {
            })
                .then(() => {
                    alert("Post excluído com sucesso!");
                    getPostagens();
                });
        }
    };
    return (
        <div className='feedPosts'>
            <div className="buttonsContainer">
                <button onClick={increaseFontSize}>Aumentar fonte</button>
                <button onClick={decreaseFontSize}>Diminuir fonte</button>
                <button onClick={resetFontSize}>Resetar fonte</button>
            </div>

            {postagens
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((post: any) => {
                    console.log('post userId: ', post.userId)
                    console.log('usuarioIdLogado: ', userIdLogado)
                    const user = getUserById(post.userId);
                    return (

                        <div key={post.id} className='postIndividual'>
                            <div className='flex userInfo'>
                                {user && user.avatar && (
                                    <img
                                        src={user.avatar}
                                        alt={`${user.name}'s avatar`}
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                    />
                                )}
                                <p className=''
                                    style={{ fontSize: `${fontSizeP}px` }}>{user ? user.name : 'Unknown User'}</p>


                            </div>


                            <div className='postConteudo'>
                                <Link to={`/post/${post.id}`} className='postClicavel'
                                onClick={() => localStorage.setItem('usuarioDoPost', post.userId)}>
                                    <div className='postTextWrapper'>
                                        <div className='postTitulo'>
                                            <h3 className='' style={{ fontSize: `${fontSizeTitle}px` }}>
                                                {post.title}
                                            </h3>
                                        </div>
                                        <div className='postDesc'>
                                            <p className='' style={{ fontSize: `${fontSizeP}px` }}>
                                                {post.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                <div className='postTTSButtons'>
                                    <TextToSpeechButton text={post.title} />
                                    <TextToSpeechButton text={post.description} />
                                </div>
                            </div>



                            <div className='postDados'>
                                <div className='postLikes'>
                                    <HeartIcon style={{ height: 24, width: 24 }} />
                                    <p>{post.likes}</p>
                                </div>
                                <div className='postComents'>
                                    <ChatBubbleOvalLeftIcon style={{ height: 24, width: 24 }} />
                                    <p>{post.likes}</p>
                                </div>
                                <div className='excluirPost'>
                                    {post.userId === userIdLogado && (
                                        <button
                                            onClick={() => excluirPost(post.id, post.userId)}>Excluir Post</button>
                                    )}
                                </div>
                            </div>

                        </div>
                    );
                })}
        </div>

    )
}

export default Home