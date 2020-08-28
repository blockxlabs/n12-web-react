import gql from 'graphql-tag';

export const GET_NOTIFICATIONS_BY_DAPP = gql` 
query notificationsByDApp($dAppUuid: String!, $searchQuery: String $offset: Int, $limit: Int) {
  notificationsByDApp(dAppUuid: $dAppUuid, searchQuery: $searchQuery, offset: $offset, limit: $limit) @connection(key: "notifications", filter: ["dAppUuid", "searchQuery"]){
   notifications{
      uuid,
      dAppUuid,
      name,
      shortDescription,
      longDescription
    }
    dApp{
      uuid,
      name,
      description,
      logoUrl
    }
    totalCount
  }
}
`;