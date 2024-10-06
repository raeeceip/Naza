import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/card';
import { Play } from 'lucide-react';
import { Audio } from 'expo-av';

const API_KEY = '<YOUR_API_KEY>'; // Replace with your actual API key

interface IgboWord {
  id: string;
  word: string;
  wordClass: string;
  definitions: string[];
  pronunciation: string;
  examples?: Array<{ igbo: string; english: string }>;
}

const IgboTranslation = () => {
    const [words, setWords] = useState<IgboWord[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    const fetchWords = useCallback(async () => {
        console.log("Fetching words...");
        setLoading(true);
        setError(null);
        const options = {
            method: 'GET',
            headers: { 'X-API-Key': API_KEY }
        };

        try {
            const response = await fetch('https://igboapi.com/api/v1/words?keyword=a&page=1&range=10', options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("API Response:", JSON.stringify(data).slice(0, 200) + "..."); // Log a preview of the response

            if (Array.isArray(data) && data.length > 0) {
                setWords(data);
                setCurrentIndex(0);
            } else {
                throw new Error('No words returned from API');
            }
        } catch (error) {
            console.error('Error fetching Igbo words:', error);
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWords();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [fetchWords]);

    const playPronunciation = async (url: string) => {
        console.log("Playing pronunciation:", url);
        try {
            if (sound) {
                await sound.unloadAsync();
            }
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
            setSound(newSound);
            await newSound.playAsync();
        } catch (error) {
            console.error("Error playing pronunciation:", error);
        }
    };

    const nextWord = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    };

    const prevWord = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
    };

    const currentWord = words[currentIndex];

    if (loading) {
        return (
            <Card className="w-full max-w-md mx-auto justify-center items-center p-4">
                <ActivityIndicator size="large" color="#0000ff" />
                <Text className="mt-2">Loading Igbo words...</Text>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full max-w-md mx-auto p-4">
                <Text className="text-center text-red-500">Error: {error}</Text>
                <Button onPress={fetchWords} className="mt-4">
                    <Text className="text-primary-foreground">Retry</Text>
                </Button>
            </Card>
        );
    }

    if (!currentWord) {
        return (
            <Card className="w-full max-w-md mx-auto p-4">
                <Text className="text-center">No word data available</Text>
                <Button onPress={fetchWords} className="mt-4">
                    <Text className="text-primary-foreground">Fetch Words</Text>
                </Button>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Igbo Word of the Day</CardTitle>
            </CardHeader>
            <CardContent>
                <Text className="text-xl font-bold mb-2">{currentWord.word}</Text>
                <Text className="text-base mb-2">({currentWord.wordClass})</Text>
                <TouchableOpacity 
                    onPress={() => playPronunciation(currentWord.pronunciation)}
                    className="flex-row items-center mb-2"
                >
                    <Play size={20} className="mr-2" />
                    <Text className="text-sm italic">Play Pronunciation</Text>
                </TouchableOpacity>
                <Text className="text-base mb-2">Definitions:</Text>
                {currentWord.definitions.map((def, index) => (
                    <Text key={index} className="text-base ml-4">• {def}</Text>
                ))}
                {currentWord.examples && currentWord.examples.length > 0 && (
                    <View className="mt-4">
                        <Text className="text-base font-semibold">Example:</Text>
                        <Text className="text-base italic">{currentWord.examples[0].igbo}</Text>
                        <Text className="text-base">{currentWord.examples[0].english}</Text>
                    </View>
                )}
            </CardContent>
            <CardFooter className="flex-row justify-between">
                <Button onPress={prevWord} disabled={words.length <= 1}>
                    <Text className="text-primary-foreground">Previous</Text>
                </Button>
                <Text>{currentIndex + 1} / {words.length}</Text>
                <Button onPress={nextWord} disabled={words.length <= 1}>
                    <Text className="text-primary-foreground">Next</Text>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default IgboTranslation;