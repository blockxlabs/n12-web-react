import gql from 'graphql-tag';

export const UNSUBSCRIBE_NOTIFICATIONS = gql`
  mutation unsubscribeNotifications($userNotifications: [String!]!) {
    unsubscribeNotifications(userNotifications: $userNotifications)
  }
`;