import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="Login"   options={{ headerShown: true } } />

    </Stack>
  );
}
