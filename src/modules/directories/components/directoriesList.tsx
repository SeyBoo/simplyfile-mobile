import DirectoryCard from './directoryCard';
import React, { FunctionComponent } from 'react';
import { DirectoryMetadata } from '../../../common/types/directory.interface';

interface DirectoryListProps {
	directories: DirectoryMetadata[] | null;
}

const DirectoriesList: FunctionComponent<DirectoryListProps> = ({
	directories,
}) => {
	if (directories === null) {
		return null;
	}

	return directories?.map((directory) => (
		<DirectoryCard
			name={directory.name}
			key={directory.uuid}
			uuid={directory.uuid}
		/>
	));
};

export default DirectoriesList;
