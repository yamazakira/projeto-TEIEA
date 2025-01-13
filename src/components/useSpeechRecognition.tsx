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

    // Handle the speech recognition result
    useEffect(() => {
        if (recognition) {
            recognition.onresult = (event: SpeechRecognitionEvent) => {
                console.log('onresult event: ', event);
                setText(event.results[0][0].transcript); // Capture the spoken text
                recognition.stop(); // Stop the recognition after capturing the result
                setIsListening(false); // Update listening state
            };

            recognition.onerror = (event: SpeechRecognitionError) => {
                console.error('Speech recognition error', event);
                setError(event.error); // Set any recognition errors
                setIsListening(false); // Stop listening on error
            };

            recognition.onend = () => {
                setIsListening(false); // Update listening state when recognition ends
            };
        }

        return () => {
            if (recognition) {
                recognition.stop(); // Cleanup: stop the recognition when the component unmounts
            }
        };
    }, [recognition]);

    const startListening = () => {
        if (recognition) {
            setText(''); // Clear the previous text when starting a new recognition
            setIsListening(true);
            recognition.start(); // Start speech recognition
        }
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop(); // Stop the recognition when requested
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
