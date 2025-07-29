/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Created by: Rezaul Karim
 * Date: 2025-07-03
 * File: ListShow.tsx
 * Description: [Insert purpose here]
 */

import React, { useEffect } from 'react';
import type { FlatListProps } from 'react-native';
import { FlatList, ActivityIndicator, StyleSheet, Text, RefreshControl } from 'react-native';
import ScreenLoading from './ScreenLoading';
import usePostStore from '../zustand/zustand';

interface IListShowProps extends Omit<FlatListProps<any>, 'data'>{
    query1:any
    query2:any
    queryParams?:Record<string, string|number|boolean>
    useZustand?: boolean;
}

let page = 0;
const limit = 10;

function ListShow(props: IListShowProps) {
  const { query1, query2, queryParams, useZustand, ...extra } = props;
  const [refreshing, setRefreshing] = React.useState(false);

  // for zustand
  const [firstLoadDone, setFirstLoadDone] = React.useState(false);
  const post = usePostStore((state) => state.post);
  const add = usePostStore((s) => s.add);
  const setAll = usePostStore((s) => s.setAll);

  const { data, isLoading, isFetching, refetch } = query1(null);
  const [get, res] = query2();

  useEffect(() => {
    if (!useZustand || firstLoadDone) return;
    if (data?.body && data.body.length > 0) {
      add(data.body);
      setFirstLoadDone(true);
    }
  }, [data, useZustand, firstLoadDone]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      page = 0;
      const { data: res } = await refetch();
      if (useZustand && res.body && res.body.length > 0) {
        setAll(res.body);
      }
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const handleMore = async () => {
    try {
      if (isFetching || isLoading || res.isFetching || res.isLoading || !data?.body || (data?.body && data.body.length < limit)) return;
      if (res.data && !((res.data.body?.length || 0) >= limit)) {
        return;
      }

      page += 1;
      const { data: result } = await get({ page, limit, ...queryParams });
      if (useZustand && result?.body?.length) {
        add(result.body);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      data={useZustand ? post : data?.body || []}
      onEndReached={handleMore}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      onEndReachedThreshold={0.1}
      contentContainerStyle={styles.container}
      ListEmptyComponent={(isLoading || isFetching) ? <ScreenLoading style={styles.empty} /> : <Text style={styles.empty}>No data found</Text>}
      ListFooterComponent={(res.isLoading || res.isFetching) ? <ActivityIndicator size="small" color="#000" /> : null}
      {...extra}
    />
  );
}

export default ListShow;
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    padding: 12,
  },
  empty: {
    paddingTop: 20,
    textAlign: 'center',
  },
});
