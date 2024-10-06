import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/card';

// Replace '<YOUR_API_KEY>' with your actual API key
const API_KEY = '<YOUR_API_KEY>';

interface IgboWord {
  id: string;
  word: string;
  wordClass: string;
  definitions: string[];
  pronunciation?: string;
  examples?: Array<{ igbo: string; english: string }>;
}

const IgboTranslation = () => {
    const [wordData, setWordData] = useState<IgboWord | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchRandomWord = async () => {
        setLoading(true);
        const options = {
            method: 'GET',
            headers: { 'X-API-Key': API_KEY }
        };

        try {
            const response = await fetch('https://igboapi.com/api/v1/words', options);
            const data = await response.json();
            if (data && data.length > 0) {
                // Randomly select a word from the returned array
                const randomIndex = Math.floor(Math.random() * data.length);
                setWordData(data[randomIndex]);
            } else {
                throw new Error('No words returned from API');
            }
        } catch (error) {
            console.error('Error fetching Igbo word:', error);
            setWordData(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRandomWord();
    }, []);

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Igbo Word of the Day</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Text className="text-center">Loading...</Text>
                ) : wordData ? (
                    <View>
                        <Text className="text-xl font-bold mb-2">{wordData.word}</Text>
                        <Text className="text-base mb-2">({wordData.wordClass})</Text>
                        {wordData.pronunciation && (
                            <Text className="text-sm italic mb-2">Pronunciation: {wordData.pronunciation}</Text>
                        )}
                        <Text className="text-base mb-2">Definitions:</Text>
                        {wordData.definitions.map((def, index) => (
                            <Text key={index} className="text-base ml-4">• {def}</Text>
                        ))}
                        {wordData.examples && wordData.examples.length > 0 && (
                            <View className="mt-4">
                                <Text className="text-base font-semibold">Example:</Text>
                                <Text className="text-base italic">{wordData.examples[0].igbo}</Text>
                                <Text className="text-base">{wordData.examples[0].english}</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <Text className="text-center">Failed to fetch word</Text>
                )}
            </CardContent>
            <CardFooter>
                <Button onPress={fetchRandomWord} disabled={loading} className="w-full">
                    <Text className="text-primary-foreground">Get New Word</Text>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default IgboTranslation;