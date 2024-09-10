import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';

const IgboTranslation = () => {
    const [translation, setTranslation] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchTranslation = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://igboapi.com/api/v1/words/random');
            const data = await response.json();
            setTranslation(`${data.word}: ${data.definitions[0].englishDefinitions[0]}`);
        } catch (error) {
            console.error('Error fetching Igbo translation:', error);
            setTranslation('Failed to fetch translation');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTranslation();
    }, []);

    return (
        <View className="mt-4">
            <Text className="text-lg font-semibold mb-2">Igbo Word of the Day</Text>
            <Text className="mb-2">{loading ? 'Loading...' : translation}</Text>
            <Button onPress={fetchTranslation} disabled={loading}>
                <Text>Get New Word</Text>
            </Button>
        </View>
    );
};

export default IgboTranslation;