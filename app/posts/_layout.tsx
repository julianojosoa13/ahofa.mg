import { wp } from "@/utils/screensize";
import { AntDesign } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";

const PostsLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CreatePosts"
        options={{
          title: t("new post"),
        }}
      />
    </Stack>
  );
};

export default PostsLayout;
