import * as React from "react";
import { View, ScrollView } from "react-native";
import IgboTranslation from '~/components/IgboTranslation';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Globe, History } from "lucide-react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="p-4">
          <Text className="text-red-500">Something went wrong. Please try reloading the app.</Text>
          <Text className="text-red-500">{this.state.error?.toString()}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <ScrollView className="flex-1 bg-background p-4">
        <Text className="text-2xl font-bold mb-4">Igbo Language Dashboard</Text>
        
        <IgboTranslation />
        
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
    </ErrorBoundary>
  );
}