import gql from 'graphql-tag';

export const GET_NOTIFICATIONS_BY_DAPP = gql` 
query notifcationsByDApp($dAppUuid: String!, $offset: Int, $limit: Int) {
  notifcationsByDApp(dAppUuid: $dAppUuid, offset: $offset, limit: $limit) {
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