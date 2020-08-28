import gql from 'graphql-tag';

export const ALL_DAPPS = gql` 
query allDApps {
  allDApps{
    uuid
		name
	  description
    logoUrl
  }
}
`;

export const SEARCH_LIKE_DAPPS_INFO = gql` 
query searchDApps($searchLike:  String!) {
  search(searchLike: $searchLike) {
    uuid
    createdAt
    updatedAt
    name
    description
    logoUrl
    Notifications
  }
}
`;

export const SELECTED_DAPP = gql`
query selectedDapp($dAppUuid: String!) {
  dApps(uuid: $dAppUuid){
    uuid,
    name,
    description,
    logoUrl,  
    Notifications{
      uuid,
      dAppUuid,
      name,
      shortDescription,
      longDescription
    }  
  }
}
`;