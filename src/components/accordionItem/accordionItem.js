import React, { PureComponent } from 'react';
import {
  View,
  Text
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import styles from './styles';

class AccordionItem extends PureComponent {
  constructor(props) {
    super(props);
    this.sections = [];
    this.state = {
      activeSections: [0]
    };
    this.initSection();
    this.underlayColor = 'rgba(141, 230, 230, 0.3)';
  }

  initSection = () => {
    const { sections } = this.props;
    if (sections) this.sections = sections;
  }


  renderHeader = (section, index, isActive, sections) => {
    const { renderHeader } = this.props;
    if (typeof renderHeader === 'function') {
      return renderHeader(section, index, isActive, sections);
    }
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Tiêu đề không khả dụng</Text>
      </View>
    );
  }

  renderSectionTitle = (section, index, isActive, sections) => {
    const { renderTitle, disableTitle } = this.props;
    if (typeof renderTitle === 'function') {
      return renderTitle(section, index, isActive, sections);
    }
    if (disableTitle) return null;
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Tiêu đề không khả dụng</Text>
      </View>
    );
  }

  renderContent = (section, index, isActive, sections) => {
    const data = this.sections[index];
    const { renderContentProps } = data;
    if (typeof renderContentProps === 'function') {
      return renderContentProps(section, index, isActive, sections);
    }
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Nội dung không khả dụng</Text>
      </View>
    );
  }


  updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    const { activeSections, sectionContainerStyle, underlayColor, containerStyle } = this.state;
    if (underlayColor) { this.underlayColor = underlayColor }
    return (
      <Accordion
        sections={this.sections}
        activeSections={activeSections}
        renderHeader={this.renderHeader}
        renderContent={this.renderContent}
        renderSectionTitle={this.renderSectionTitle}
        onChange={this.updateSections}
        underlayColor={this.underlayColor}
        containerStyle={[styles.containerStyle, containerStyle]}
        sectionContainerStyle={[styles.sectionContainerStyle, sectionContainerStyle]}
      />
    );
  }
}
export default AccordionItem;
