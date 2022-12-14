import React, { FunctionComponent, useCallback, useEffect } from 'react';
import PageLayout from '../../common/layouts/pageLayout';
import { useAppDispatch, useAppSelector } from '../../common/hooks/store';
import { fetchDirectory } from '../../modules/directories/store/thunks';
import { Spinner } from 'native-base';
import { AuthStackParamList } from '../../common/navigation/authRoutes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import DocumentsList from '../../modules/documents/components/documentsList';

export const Directory: FunctionComponent<
	NativeStackScreenProps<AuthStackParamList, 'Directory'>
> = ({ route }) => {
	const { uuid } = route.params;
	const dispatch = useAppDispatch();
	const directory = useAppSelector(
		(state) => state.directories.currentDirectory
	);
	const currentDocument = useAppSelector((state) => state.documents.document);
	const handleFetchDirectory = useCallback(async () => {
		try {
			await dispatch(fetchDirectory(uuid));
		} catch (e) {
			console.log(e);
		}
	}, [dispatch, uuid]);

	useEffect(() => {
		(async () => {
			await handleFetchDirectory();
			// Force to refresh if the current document state change
		})();
	}, [
		directory?.metadata.uuid,
		dispatch,
		uuid,
		currentDocument,
		handleFetchDirectory,
	]);

	if (directory === null || directory?.metadata?.uuid !== uuid) {
		return <Spinner />;
	}

	return (
		<PageLayout
			title={directory.metadata.name}
			subtitle="directory"
			refetch={handleFetchDirectory}
		>
			<DocumentsList
				documents={directory.documents}
				handleFetchDirectory={handleFetchDirectory}
			/>
		</PageLayout>
	);
};
