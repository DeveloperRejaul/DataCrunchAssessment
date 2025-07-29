/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/require-default-props */
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PostItem } from '@/types';
import AnimatedInput from '@/src/core/components/AnimatedInput';
import Button from '@/src/core/components/Button';
import { colors } from '@/src/core/constance/colors';
import { bottomSheet } from '@/src/core/components/BottomSheet';

interface Props extends PostItem {
  onSubmit?: (data: { title: string; body: string }) => void;
}

export default function EditBottomSheet({ title, body, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title || '',
      body: body || '',
    },
  });

  const submitForm = (data: { title: string; body: string }) => {
    bottomSheet.hide();
    if (onSubmit) onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        rules={{ required: 'Title is required' }}
        render={({ field: { onChange, value } }) => (
          <AnimatedInput
            label="Title"
            value={value}
            onChangeText={onChange}
            placeholder="Enter title"
            inActiveBorderColor="#cccccc"
            activeBorderColor="#fe4487"
            inputType="text"
            multiline
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <Controller
        control={control}
        name="body"
        rules={{ required: 'Description is required' }}
        render={({ field: { onChange, value } }) => (
          <AnimatedInput
            label="Description"
            value={value}
            onChangeText={onChange}
            placeholder="Enter description"
            inputType="text"
            multiline
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />
        )}
      />
      {errors.body && <Text style={styles.error}>{errors.body.message}</Text>}

      <View style={{ marginTop: 20 }}>
        <Button
          text="Update Post"
          onPress={handleSubmit(submitForm)}
          action="primary"
          variant="solid"
          textStyle={{ textAlign: 'center', color: colors.weight }}
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    rowGap: 10,
  },
  error: {
    color: '#ff3838',
    fontSize: 13,
    marginBottom: 8,
    marginTop: 2,
  },
});
