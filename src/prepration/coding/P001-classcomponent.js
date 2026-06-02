import React, { Component } from "react";
import { Text, View, BackHandler } from "react-native";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, userData: null };
  }

  // 1. Mount
  componentDidMount() {
    this.fetchUserData();
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBack,
    );
  }

  // 2. Update Optimization
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.userData !== this.state.userData ||
      nextState.loading !== this.state.loading
    );
  }

  // 3. Update execution
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUserData(); // Refetch if prop changed
    }
  }

  // 4. Unmount / Cleanup
  componentWillUnmount() {
    this.backHandler.remove();
  }

  fetchUserData = () => {
    /* API Fetch Logic */
  };
  handleBack = () => {
    return true;
  };

  render() {
    return (
      <View>
        {this.state.loading ? (
          <Text>Loading...</Text>
        ) : (
          <Text>Welcome User</Text>
        )}
      </View>
    );
  }
}
export default UserProfile;
