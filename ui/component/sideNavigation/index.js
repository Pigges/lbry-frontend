import { connect } from 'react-redux';
import { selectSubscriptions } from 'redux/selectors/subscriptions';
import { doClearClaimSearch } from 'redux/actions/claims';
import { doClearPurchasedUriSuccess } from 'redux/actions/file';
import { selectFollowedTags } from 'redux/selectors/tags';
import { selectUserVerifiedEmail, selectUser, selectOdyseeMembershipName, selectOdyseeMembershipForUri } from 'redux/selectors/user';
import { selectHomepageData, selectWildWestDisabled } from 'redux/selectors/settings';
import { doSignOut } from 'redux/actions/app';
import { selectUnseenNotificationCount } from 'redux/selectors/notifications';
import { selectPurchaseUriSuccess } from 'redux/selectors/claims';

import SideNavigation from './view';

const select = (state) => ({
  subscriptions: selectSubscriptions(state),
  followedTags: selectFollowedTags(state),
  email: selectUserVerifiedEmail(state),
  purchaseSuccess: selectPurchaseUriSuccess(state),
  unseenCount: selectUnseenNotificationCount(state),
  user: selectUser(state),
  homepageData: selectHomepageData(state),
  wildWestDisabled: selectWildWestDisabled(state),
  odyseeMembership: selectOdyseeMembershipName(state),
  odyseeMembershipByUri: (uri) => selectOdyseeMembershipForUri(state, uri),
});

export default connect(select, {
  doClearClaimSearch,
  doSignOut,
  doClearPurchasedUriSuccess,
})(SideNavigation);
