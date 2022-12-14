import React, { FunctionComponent } from 'react';
import { Document } from '../../../common/types/documents.interface';
import { Box, Button, HStack, Icon, Image, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { ActionSheetIOS, Alert, Platform } from 'react-native';
import {
	deleteDocument,
	updateDocumentName,
	bookmarkDocument,
} from '../../documents/store/thunks';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../common/hooks/store';

interface DocumentCardProps {
	document: Document;
	handleRefetch: () => Promise<void>;
}

type DocumentNav = {
	navigate: (
		value: string,
		arg1: { uuid: string; directoryUuid: string }
	) => void;
};

const DocumentCard: FunctionComponent<DocumentCardProps> = ({
	document,
	handleRefetch,
}) => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<DocumentNav>();
	const { uuid, directory } = document;

	const handleRename = async (text: string) => {
		await dispatch(updateDocumentName(uuid, text));
		await handleRefetch();
	};

	const handleDelete = async () => {
		await dispatch(deleteDocument(uuid));
		await handleRefetch();
	};

	const handleBookmark = async () => {
		await dispatch(bookmarkDocument(uuid));
		await handleRefetch();
	};

	const handleRenameModal = () => {
		if (Platform.OS === 'ios') {
			Alert.prompt(
				`Update ${document.name}`,
				'',
				[
					{ text: 'Cancel', style: 'cancel' },
					{
						text: 'Update',
						onPress: (text) => {
							if (text) {
								(async () => handleRename(text))();
							}
						},
					},
				],
				'plain-text'
			);
		}
		// TODO Android
	};

	const handleLongPress = () => {
		if (Platform.OS === 'ios') {
			ActionSheetIOS.showActionSheetWithOptions(
				{
					options: ['Cancel', 'Rename', 'Delete'],
					destructiveButtonIndex: 2,
					cancelButtonIndex: 0,
					userInterfaceStyle: 'dark',
				},
				(buttonIndex) => {
					if (buttonIndex === 1) {
						handleRenameModal();
					} else if (buttonIndex === 2) {
						(async () => handleDelete())();
					}
				}
			);
		}
		//TODO Android
	};

	return (
		<Button
			background="transparent"
			width="150px"
			_pressed={{
				opacity: 0.5,
			}}
			onPress={() =>
				navigation.navigate('Document', { uuid, directoryUuid: directory })
			}
			onLongPress={() => handleLongPress()}
		>
			<Image
				source={{ uri: document.image }}
				borderTopRadius="xl"
				height="175px"
				alt={document.name}
			/>
			<Box backgroundColor="white" borderBottomRadius="xl" p={3}>
				<HStack justifyContent="space-between" alignItems="center">
					<Text>{moment(document.creationDate).fromNow()}</Text>
				</HStack>
				<HStack justifyContent="space-between" alignItems="center" mt={2}>
					<Text fontWeight="bold" width="70%" fontSize="lg" height={10}>
						{document.name}
					</Text>
					<Button
						background="transparent"
						width={'1/2'}
						_pressed={{
							opacity: 0.5,
						}}
						onPress={() => handleBookmark()}
					>
						<Icon
							size="6"
							color="black"
							as={
								<MaterialIcons
									name={document.bookmarked ? 'bookmark' : 'bookmark-border'}
								/>
							}
						/>
					</Button>
				</HStack>
			</Box>
		</Button>
	);
};

export default DocumentCard;
