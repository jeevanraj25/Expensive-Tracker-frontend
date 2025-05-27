import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function index() {
  return (
    <SafeAreaView>
<View className='flex-1 items-center justify-center'> 
      <Text className='text-4xl font-bold'>index</Text>
       <Text className='text-4xl font-bold'>hello world</Text>
    </View>
    </SafeAreaView>
    
  )
}