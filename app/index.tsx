import * as React from "react";
import { View, ScrollView } from "react-native";
import IgboTranslation from '~/components/IgboTranslation';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Book, Globe, History } from "lucide-react";

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

  React.useEffect(() => {
    // Simulating fetching the word count from an API
    setTimeout(() => setWordCount(5000), 1000);
  }, []);

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="text-2xl font-bold mb-4">Igbo Language Dashboard</Text>
      
      <DashboardCard 
        title="Igbo Word of the Day" 
        icon={<Book className="w-6 h-6 text-primary" />}
      >
        <IgboTranslation />
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