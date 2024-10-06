import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/card';

// Replace '<YOUR_API_KEY>' with your actual API key
const API_KEY = '<YOUR_API_KEY>';

const IgboTranslation = () => {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchRandomWord = async () => {
        setLoading(true);
        const options = {
            method: 'GET',
            headers: { 'X-API-Key': API_KEY }
        };

        try {
            const response = await fetch('https://igboapi.com/api/v1/words/random', options);
            const data = await response.json();
            setWord(data.word);
            setDefinition(data.definitions[0].englishDefinitions[0]);
        } catch (error) {
            console.error('Error fetching Igbo translation:', error);
            setWord('Error');
            setDefinition('Failed to fetch translation');
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
                ) : (
                    <View>
                        <Text className="text-xl font-bold mb-2">{word}</Text>
                        <Text className="text-base">{definition}</Text>
                    </View>
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