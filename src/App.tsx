import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import store from './common/store';
import { Provider } from 'react-redux';
import Navigation from './common/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';

const App = () => {
	return (
		<Provider store={store}>
			<NativeBaseProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<PortalProvider>
						<StatusBar barStyle="dark-content" />
						<Navigation />
					</PortalProvider>
				</GestureHandlerRootView>
			</NativeBaseProvider>
		</Provider>
	);
};

export default App;
