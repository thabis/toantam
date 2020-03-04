import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { IconButton } from '@components/icon/icon';
import { formatDateTime, caculateDateFollow, getDateFromNow } from '@utils/date';
import { Divider } from 'react-native-elements';
import styles from './stylesItemOrderDetail';
/**
 * render Header Store
 * @param {component} section
 * @param {int} index
 * @param {boolean} isActive
 * @param {Array} sections
 */
export const renderHeaderPrinter = (section, index, isActive) => {
  const { title } = section;
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleHeader}>{title}</Text>
      <IconButton
        icon={isActive ? 'arrow-down' : 'arrow-up'}
        size={18}
        propsStyles={styles.iconHeader}
      />
    </View>
  );
};

export const renderCustomerPrinter = (item) => {
  const { customer } = item;
  const { name, phone } = customer;
  const { receiver_info, delivery_address, delivery_date } = item;
  const isSameName = name === receiver_info;
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Người nhận hàng:
        </Text>
        <Text style={styles.textRow}>{receiver_info}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Ngày giao hàng:
        </Text>
        <Text style={styles.textRow}>{delivery_date}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.rowWrap}>
        <Text style={styles.textRow}>
          Địa chỉ:
        </Text>
        <Text style={styles.textRow}>{delivery_address}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      {!isSameName && (
        <View style={styles.row}>
          <Text style={styles.textRow}>
            Người đặt hàng:
          </Text>
          <Text style={styles.textRow}>{receiver_info}</Text>
        </View>
      )
      }
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Số điện thoại:
        </Text>
        <Text style={styles.textRow}>{phone}</Text>
      </View>
    </View>
  );
};


export const renderOrderPrinter = (item, listValueOrderById) => {
  const {
    order_no, name,
    saler
  } = item;
  const { first_name, last_name } = saler;
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Người phụ trách:
        </Text>
        <Text style={styles.textRow}>
          {first_name}
          {' '}
          {last_name}
        </Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Mã đơn hàng:
        </Text>
        <Text style={styles.textRow}>{order_no}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          File thiết kế:
        </Text>
        <Text style={styles.textRow}>{name}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Loại in:
        </Text>
        <Text style={styles.textRow}>
          {listValueOrderById.print_face && listValueOrderById.print_face}
          {' '}
          và
          {' '}
          {listValueOrderById.print_type && listValueOrderById.print_type}
        </Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Loại giấy:
        </Text>
        <Text style={styles.textRow}>{listValueOrderById.paper_name && listValueOrderById.paper_name}</Text>
      </View>
    </View>
  );
};

export const renderPrintInfo = (item, listValueOrderById) => {
  const { method, template_number, quantity } = item;

  return (
    <View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Số lượng mẫu:
        </Text>
        <Text style={styles.textRow}>
          {template_number}
          {' '}
          mẫu
        </Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Số lượng in:
        </Text>
        <Text style={styles.textRow}>{quantity}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Mặt in:
        </Text>
        <Text style={styles.textRow}>{listValueOrderById.print_face && listValueOrderById.print_face}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Màu in:
        </Text>
        <Text style={styles.textRow}>{listValueOrderById.print_type && listValueOrderById.print_type}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Cán màn:
        </Text>
        <Text style={styles.textRow}>{listValueOrderById.rolling_name && listValueOrderById.rolling_name}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Gia công khác:
        </Text>
        <Text style={styles.textRow}>{listValueOrderById.outsource_name && listValueOrderById.outsource_name}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Loại hàng:
        </Text>
        <Text style={styles.textRow}>{listValueOrderById.category_name && listValueOrderById.category_name}</Text>
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <View style={styles.row}>
        <Text style={styles.textRow}>
          Quy cách:
        </Text>
        <Text style={styles.textRow}>
          {method}
          {' '}
          mm
        </Text>
      </View>
    </View>
  );
};

export const renderNotesPrinter = (item) => {
  const { notes } = item;
  return (
    <FlatList
      data={notes}
      renderItem={renderItemNotes}
      style={{ height: 280 }}
      keyExtractor={(_item, index) => index.toString()}
    />
  );
};

const renderItemNotes = ({ item }) => {
  const { note, created_time } = item;
  const caculateDate = caculateDateFollow(created_time);
  const dateFromNow = getDateFromNow(caculateDate, created_time);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.blockColumn}>
        <Text style={[styles.textRow, { paddingVertical: 3 }]} numberOfLines={2}>
          <IconButton
            icon="bubble"
            size={16}
            propsStyles={styles.iconOrderStyles}
          />
          {' '}
          {note}
        </Text>
        <Text style={styles.textRow}>
          <IconButton
            icon="clock"
            size={16}
            propsStyles={styles.iconOrderStyles}
          />
          {' '}
          {dateFromNow}
        </Text>
      </View>
      <Divider style={{ paddingHorizontal: 5, backgroundColor: '#fff' }} />
    </View>
  );
};
