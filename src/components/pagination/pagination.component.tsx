import React, { useEffect, useState } from "react";

import styles from './pagination.style';
import { Text, TouchableOpacity, View, ScrollView } from "react-native";

interface IPaginationProps {
  totalPages: number;
  changePage: CallableFunction;
}

export const PaginationComponent = (props: IPaginationProps) => {

  const listData: Array<number> = Array.from({ length: props.totalPages }, (v, k) => k + 1)

  const [currentPage, setCurrentPage] = useState(1 as number);
  const [oldCurrentPage, setOldCurrentPage] = useState(0 as number);
  const [scrollRef, setScrollRef] = useState(null as any);
  const [allViewRef, setAllViewRef] = useState({} as any);

  const changePage = (item: number) => {
    setCurrentPage(item);
  }

  const _onLayout = (item: number, layoutProps: any) => {
    setAllViewRef({ ...allViewRef, [`view${item}`]: layoutProps.nativeEvent });
  }

  useEffect(() => {
    if (currentPage !== oldCurrentPage) {
      scrollToView();
      props.changePage(currentPage);
    }
  }, [allViewRef]);

  const _renderItem = ({ item }: { item: number }) => {
    return (
      <View key={item.toString()} onLayout={(layoutProps) => _onLayout(item, layoutProps)}>
        <TouchableOpacity style={[styles.btnView, currentPage == item && styles.activeBtnView]} onPress={() => changePage(item)}>
          <Text style={styles.btnText}>{item}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const nextPageChange = () => {
    if (currentPage < listData.length) {
      const newPageNumber = currentPage + 1;
      setCurrentPage(newPageNumber);
    }
  }

  const prePageChange = () => {
    if (1 < currentPage) {
      const newPageNumber = currentPage - 1;
      setCurrentPage(newPageNumber);
    }
  }

  const scrollToView = () => {
    setOldCurrentPage(currentPage);
    setTimeout(() => {
      const page = `view${currentPage}`;
      if (allViewRef[page]?.layout) {
        scrollRef.scrollTo({ x: allViewRef[page].layout.x })
      }
    }, 500);
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20 }}>
      <TouchableOpacity style={styles.btnView} onPress={() => setCurrentPage(1)}>
        <Text style={styles.btnText}>First</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnView} onPress={prePageChange}>
        <Text style={styles.btnText}>Prev</Text>
      </TouchableOpacity>
      <View style={{ maxWidth: 150, justifyContent: "center" }}>
        <ScrollView horizontal={true} ref={view => setScrollRef(view)} >
          <View style={{ flexDirection: 'row' }}>
            {
              listData.map((item) => _renderItem({ item }))
            }
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.btnView} onPress={nextPageChange}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnView} onPress={() => setCurrentPage(listData.length)}>
        <Text style={styles.btnText}>Last({listData.length})</Text>
      </TouchableOpacity>
    </View>
  );
};
