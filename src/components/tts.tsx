const textToSpeech = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'pt-BR';
    speech.pitch = 1;
    speech.rate = 1;
    
    window.speechSynthesis.speak(speech);
};

export default textToSpeech;