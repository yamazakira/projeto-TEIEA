import React, { useEffect, useState } from 'react'
import { api } from '../api/axiosInstance';
import '../globals.css';
import { HeartIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import textToSpeech from './tts';

const Home = () => {
    const [postagens, setPostagens] = useState([]);
    // const [postagem, setPostagem] = useState([]);
    const [users, setUsers] = useState<any[]>([]);
    localStorage.setItem('userIdLogado', '1');
    const userIdLogado = localStorage.getItem('userIdLogado');

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

    const getUserById = (userId: any) => {
        return users.find((user: any) => user.id === userId);
    };

    useEffect(() => {
        getPostagens();
        //console.log(users);
    }, []);

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
                                <p className=''>{user ? user.name : 'Unknown User'}</p>


                            </div>

                            <div className='postConteudo'>
                                <div className='postTitulo'>
                                    <h3 className=''>{post.title}</h3>
                                    <TextToSpeechButton text={post.title} />
                                </div>
                                <div className='postDesc'>
                                    <p className=''>{post.description}</p>
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