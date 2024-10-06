import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/card';

const IgboTranslation = () => {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchTranslation = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://www.igboapi.com/api/v1/words/random');
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
        fetchTranslation();
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
                <Button onPress={fetchTranslation} disabled={loading} className="w-full">
                    <Text className="text-primary-foreground">Get New Word</Text>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default IgboTranslation;