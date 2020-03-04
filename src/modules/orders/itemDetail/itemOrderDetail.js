import React, { PureComponent } from 'react';
import AccordionItem from '@components/accordionItem/accordionItem';
import {
  renderHeaderStore,
  renderCustomer,
  renderOrder,
  renderOutSource,
  renderPayment,
  renderNotes
} from './sectionItemStore';
import {
  renderOrderPrinter,
  renderPrintInfo

} from './sectionItemPrinter';


class ItemOrderDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientOrderNo = ['#f59267', '#f06363'];
    this.gradientHeader = ['#56d1d5', '#56b9d5'];
    this.listValueOrderById = this.init();
    this.sections = [];
    this.initSectionByRole();
  }

  init = () => {
    const { item, listPaper, listCategory } = this.props;
    const listValue = [];
    if (!item) return listValue;
    const {
      category_id, paper_id, number_print_face, print_types, outsources
    } = item;
    const paper_name = listPaper.filter(e => e.value === paper_id);
    if (paper_name.length > 0) {
      listValue.paper_name = paper_name[0].label;
    }
    Object.keys(listCategory).forEach((val) => {
      const listSub = listCategory[val];
      listSub.find((e) => {
        if (e.id === category_id) {
          listValue.category_name = `${val} - ${e.category_name}`;
        }
        return listValue.category_name;
      });
    });
    listValue.print_face = `${number_print_face} mặt`;
    if (print_types.length > 0) {
      listValue.print_type = print_types[0].print_type_name;
    }
    outsources.map((e) => {
      if (e.group === 'rolling') {
        if (!listValue.rolling_name) {
          listValue.rolling_name = '';
        } else {
          listValue.rolling_name += ', ';
        }
        listValue.rolling_name += e.name;
      } else if (e.group === 'other') {
        if (!listValue.outsource_name) {
          listValue.outsource_name = '';
        } else {
          listValue.outsource_name += ', ';
        }
        listValue.outsource_name += e.name;
      }
      // return listValue;
    });
    return listValue;
  }

  initSectionByRole = () => {
    const { item, role } = this.props;
    let { notes } = item;
    notes = notes.reverse();
    let sectionsRole = [];
    if (role === 'store') {
      sectionsRole = [
        {
          title: 'THÔNG TIN GIAO HÀNG',
          renderContentProps: (section, index, isActive) => renderCustomer(item, isActive),
        },
        {
          title: 'THÔNG TIN ĐƠN HÀNG',
          renderContentProps: (section, index, isActive) => renderOrder(item, this.listValueOrderById, isActive),
        },
        {
          title: 'THÔNG TIN GIA CÔNG',
          renderContentProps: (section, index, isActive) => renderOutSource(item, this.listValueOrderById, isActive),
        },
        {
          title: 'THÔNG TIN THANH TOÁN',
          renderContentProps: (section, index, isActive) => renderPayment(item, isActive),
        },
        {
          title: 'LỊCH SỬ GHI CHÚ',
          renderContentProps: (section, index, isActive) => renderNotes(notes, isActive),
        },
      ];
    }
    if (role === 'deliver') {
      sectionsRole = [
        {
          title: 'THÔNG TIN GIAO HÀNG',
          renderContentProps: () => renderCustomer(item, this.listValueOrderById),
        },
        {
          title: 'THÔNG TIN THANH TOÁN',
          renderContentProps: () => renderPayment(item, this.listValueOrderById),
        },
      ];
    }
    if (role === 'printer') {
      sectionsRole = [
        {
          title: 'THÔNG TIN IN ẤN',
          renderContentProps: () => renderPrintInfo(item, this.listValueOrderById),
        },
        {
          title: 'THÔNG TIN ĐƠN HÀNG',
          renderContentProps: () => renderOrderPrinter(item, this.listValueOrderById),
        },
        {
          title: 'LỊCH SỬ GHI CHÚ',
          renderContentProps: (section, index, isActive) => renderNotes(notes, isActive),
        },
      ];
    }
    if (role === 'designer') {
      sectionsRole = [
        {
          title: 'THÔNG TIN ĐƠN HÀNG',
          renderContentProps: () => renderOrderPrinter(item, this.listValueOrderById),
        },
        {
          title: 'THÔNG TIN IN ẤN',
          renderContentProps: () => renderPrintInfo(item, this.listValueOrderById),
        },
        {
          title: 'LỊCH SỬ GHI CHÚ',
          renderContentProps: (section, index, isActive) => renderNotes(notes, isActive),
        },
      ];
    }
    this.sections = sectionsRole;
  }

  renderHeader = (section, index, isActive, sections) => {
    const { role } = this.props;
    if (role === 'store' || role === 'deliver' || role === 'designer' || role === 'printer') {
      return renderHeaderStore(section, index, isActive, sections);
    }
    return null;
  }

  render() {
    return (
      <AccordionItem
        sections={this.sections}
        renderHeader={this.renderHeader}
        disableTitle
      />
    );
  }
}
export default ItemOrderDetail;
