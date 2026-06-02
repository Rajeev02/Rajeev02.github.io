import React, { useState, useEffect, memo } from "react";
import { Text, View, BackHandler } from "react-native";

const UserProfile = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 1. Mount & Update Logic
    const fetchUserData = () => {
      /* API Fetch Logic */
    };
    fetchUserData();

    const handleBack = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack,
    );

    // 2. Unmount / Cleanup Logic
    return () => {
      backHandler.remove(); // This acts as componentWillUnmount
    };
  }, [userId]); // Triggers refetch if userId changes (componentDidUpdate)

  return (
    <View>{loading ? <Text>Loading...</Text> : <Text>Welcome User</Text>}</View>
  );
};

// Replaces shouldComponentUpdate for performance
export default memo(UserProfile);
