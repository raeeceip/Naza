import * as React from "react";
import { View, ScrollView } from "react-native";
import IgboTranslation from '~/components/IgboTranslation';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Book, Globe, History, Plus, Minus } from "lucide-react";

const DashboardCard = ({ title, icon, children }) => (
  <Card className="w-full mb-4">
    <CardHeader className="flex-row items-center">
      {icon}
      <CardTitle className="ml-2">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default function Screen() {
  const [wordCount, setWordCount] = React.useState(0);
  const [translationCount, setTranslationCount] = React.useState(1);

  React.useEffect(() => {
    // Simulating fetching the word count from an API
    setTimeout(() => setWordCount(5000), 1000);
  }, []);

  const addTranslation = () => setTranslationCount(prev => Math.min(prev + 1, 5));
  const removeTranslation = () => setTranslationCount(prev => Math.max(prev - 1, 1));

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="text-2xl font-bold mb-4">Igbo Language Dashboard</Text>
      
      <DashboardCard 
        title="Igbo Words of the Day" 
        icon={<Book className="w-6 h-6 text-primary" />}
      >
        <View className="flex-row justify-between items-center mb-4">
          <Button onPress={removeTranslation} disabled={translationCount === 1}>
            <Minus className="w-4 h-4" />
          </Button>
          <Text>Showing {translationCount} word{translationCount > 1 ? 's' : ''}</Text>
          <Button onPress={addTranslation} disabled={translationCount === 5}>
            <Plus className="w-4 h-4" />
          </Button>
        </View>
        {[...Array(translationCount)].map((_, index) => (
          <View key={index} className="mb-4">
            <IgboTranslation />
          </View>
        ))}
      </DashboardCard>

      <DashboardCard 
        title="Dictionary Stats" 
        icon={<Globe className="w-6 h-6 text-primary" />}
      >
        <Text className="text-lg">Total Words: {wordCount}</Text>
      </DashboardCard>

      <DashboardCard 
        title="Recent Updates" 
        icon={<History className="w-6 h-6 text-primary" />}
      >
        <Text className="text-base">• New words added</Text>
        <Text className="text-base">• Improved translations</Text>
        <Text className="text-base">• Audio pronunciations updated</Text>
      </DashboardCard>
    </ScrollView>
  );
}