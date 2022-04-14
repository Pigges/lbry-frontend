import { connect } from 'react-redux';
import { doSetAdBlockerFound } from 'redux/actions/app';
import { selectOdyseeMembershipIsPremiumPlus } from 'redux/selectors/user';
import AdsBanner from './view';

const select = (state, props) => ({
  userHasPremiumPlus: selectOdyseeMembershipIsPremiumPlus(state),
});

const perform = {
  doSetAdBlockerFound,
};

export default connect(select, perform)(AdsBanner);
