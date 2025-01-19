import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
    const [text, setText] = useState<string>('');
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const [recognition] = useState(() => {
        if ('webkitSpeechRecognition' in window) {
            const instance = new webkitSpeechRecognition();
            instance.continuous = true;
            instance.lang = 'pt-BR';
            return instance;
        } else {
            setError('Seu navegador não suporta reconhecimento de áudio.');
            return null;
        }
    });

    useEffect(() => {
        if (recognition) {
            recognition.onresult = (event: SpeechRecognitionEvent) => {
                console.log('onresult event: ', event);
                setText(event.results[0][0].transcript); 
                recognition.stop(); 
                setIsListening(false); 
            };

            // recognition.onerror = (event: SpeechRecognitionErrorCode) => {
            //     console.error('Speech recognition error', event);
            //     setError(event.error);
            //     setIsListening(false);
            // };

            recognition.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, [recognition]);

    const startListening = () => {
        if (recognition) {
            setText(''); 
            setIsListening(true);
            recognition.start();
        }
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    };

    return {
        text,
        isListening,
        error,
        startListening,
        stopListening,
    };
};

export default useSpeechRecognition;
