/* eslint-disable react/jsx-props-no-spreading */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { bottomSheet } from '@/src/core/components/BottomSheet';
import BottomSheet from './bottomsheet';
import Header from '@/src/core/components/Header';
import ListShow from '@/src/core/components/ListView';
import { useDeletePostMutation, useGetPostsQuery, useLazyGetPostsByPageQuery, useUpdatePostMutation } from './api';
import { PostItem } from '@/types';
import EditBottomSheet from './edit-bottomsheet';
import { animatedAlert } from '@/src/core/components/AnimatedAlert';
import { capitalizeFirstLetter } from '@/src/core/utils/string';
import { animatedToast } from '@/src/core/components/Toast';
import usePostStore from '@/src/core/zustand/zustand';

export default function Index() {
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [useZustand, setUseZustand] = useState(false);

  // for zustand
  const remove = usePostStore((s) => s.delete);
  const update = usePostStore((s) => s.update);

  const handleEdit = (item: PostItem) => {
    bottomSheet.show({ render: (
      <EditBottomSheet
        userId={item.userId}
        id={item.id}
        title={item.title}
        body={item.body}
        onSubmit={async (updatedData) => {
          try {
            await updatePost({ id: item.id, ...updatedData });
            if (useZustand) {
              update({ ...item, ...updatedData });
            }
          } catch (error) {
            console.log(error);
          }
        }}
      />
    ),
    });
  };

  const handleDelete = async (item: PostItem) => {
    animatedAlert.show({ message: 'Are you sure you want to delete this item? This action cannot be undone.' }, async (value) => {
      try {
        if (value === 'ok') {
          await deletePost(item.id);
          if (useZustand) {
            remove(item.id);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleSwitch = (value: 'zustand' | 'rtk') => {
    if (value === 'zustand' && !useZustand) {
      animatedToast.show({
        type: 'success',
        title: 'Switched to Zustand',
        message: 'You are now using Zustand state management.',
      });
      setUseZustand(true);
      return;
    }

    if (value === 'rtk' && useZustand) {
      animatedToast.show({
        type: 'success',
        title: 'Switched to RTK',
        message: 'You are now using Redux Toolkit Query.',
      });
      setUseZustand(false);
    }
  };

  const renderItem = ({ item }: { item: PostItem }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{capitalizeFirstLetter(item.title)}</Text>
        <Text style={styles.body}>{capitalizeFirstLetter(item.body)}</Text>
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconBtn}>
          <Ionicons name="create-outline" size={20} color="#612657" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.iconBtn}>
          <Ionicons name="trash-outline" size={20} color="#ff3838" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <Header
        title="List Screen"
        onMenuPress={() => bottomSheet.show({ render: <BottomSheet /> })}
        showSwitch
        onSwitchOn={() => handleSwitch('zustand')}
        onSwitchOff={() => handleSwitch('rtk')}

      />
      <ListShow
        useZustand={useZustand}
        renderItem={renderItem}
        query1={useGetPostsQuery}
        query2={useLazyGetPostsByPageQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#00000030',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  textContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f2f2f',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#4c4c4c',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  },
});
