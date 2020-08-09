import { gql } from '@apollo/client';

export const GET_SUBSCRIPTIONS = gql`
  query getUserSubscriptions($userUuid: String!) {
    UserSubscriptions(userUuid: $userUuid ){
      uuid
      dAppUuid,
      userUuid,
      Notification{
        uuid
        name
        shortDescription
        longDescription
      },
      DApp{
        uuid
        name
        logoUrl
      },
      User{
        email
      }
    }
  }
`;