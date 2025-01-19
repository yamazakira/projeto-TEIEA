import React, { useEffect, useState } from 'react'
import { api } from '../api/axiosInstance';
import { useParams } from 'react-router-dom';
import '../globals.css';
import { HeartIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import textToSpeech from './tts';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const usuarioDoPost = localStorage.getItem('usuarioDoPost');
    const userIdLogado = localStorage.getItem('userIdLogado');

    useEffect(() => {
        api.get(`user/${usuarioDoPost}/post/${id}`)
            .then((resp: any) => {
                console.log(resp.data);
                setPost(resp.data);
            })
            .catch((error) => console.error('Error fetching post:', error));
    }, [id, usuarioDoPost]);

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

    // OBTER USUARIOS
    const getUsers = async () => {
        try {
            const response = await api.get("user");
            const data = response.data;
            setUsers(data);
            //console.log(data)
        } catch (error) {
            console.error(error);
        }
    };

    // USUARIO POR ID
    const getUserById = (userId: any) => {
        return users.find((user: any) => user.id === userId);
    };

    useEffect(() => {
        getUsers();
    }, []);

    if (!post) {
        return <p>Carregando</p>;
    }

    // OBTER POSTS
    const getPostagens = async () => {
        try {
            await api.get("post");
        } catch (error) {
            console.log(error);
        }
    };

    // ExCLUIR POST
    const excluirPost = (postId: any, postUserId: any) => {
        if (postId) {
            api.delete(`/user/${postUserId}/post/${postId}`, {
            })
                .then(() => {
                    alert("Post excluído com sucesso!");
                    navigate('/home');
                    getPostagens();
                });
        }
    };

    const user = getUserById(post.userId);

    return (
        <div className='feedPosts'>
            <div className="buttonsContainer">
                <button onClick={increaseFontSize}>Aumentar fonte</button>
                <button onClick={decreaseFontSize}>Diminuir fonte</button>
                <button onClick={resetFontSize}>Resetar fonte</button>
            </div>

            <div>
                {user && (
                    <div key={post.id} className='postIndividual'>
                        <div className='flex userInfo'>
                            {user.avatar && (
                                <img
                                    src={user.avatar}
                                    alt={`${user.name}'s avatar`}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                />
                            )}
                            <p style={{ fontSize: `${fontSizeP}px` }}>{user.name}</p>
                        </div>

                        <div className='postConteudo'>
                            <div className='postTextWrapper'>
                                <div className='postTitulo'>
                                    <h3 style={{ fontSize: `${fontSizeTitle}px` }}>{post.title}</h3>
                                </div>
                                <div className='postDesc'>
                                    <p style={{ fontSize: `${fontSizeP}px` }}>{post.description}</p>
                                </div>
                            </div>

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
                                <p>{post.comments}</p> {/* Assuming post.comments should be used here */}
                            </div>
                            <div className='excluirPost'>
                                {post.userId === userIdLogado && (
                                    <button onClick={() => excluirPost(post.id, post.userId)}>
                                        Excluir Post
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ margin: '20px 0', borderTop: '2px solid #ccc' }}></div>

                <div key={post.id} className='postIndividual'>
                    <div className='flex userInfo'>
                        {user.avatar && (
                            <img
                                src={user.avatar}
                                alt={`${user.name}'s avatar`}
                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                            />
                        )}
                        <p style={{ fontSize: `${fontSizeP}px` }}>{user.name}</p>
                    </div>
                    <div className='postConteudo'>
                        <div className='postTextWrapper'>
                            <div className='postDesc'>
                                <p style={{ fontSize: `${fontSizeP}px` }}>
                                    Este é um exemplo de comentário.
                                </p>
                            </div>
                        </div>

                        <div className='postTTSButtons'>
                            <TextToSpeechButton text="Este é um exemplo de comentário." />
                        </div>
                    </div>

                    <div className='postDados'>
                        <div className='postLikes'>
                            <HeartIcon style={{ height: 24, width: 24 }} />
                            <p>12</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostPage;